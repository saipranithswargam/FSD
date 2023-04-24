const Hospital = require("../models/hospitals");
const Appointments = require("../models/appointments");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const MedicalRecords = require("../models/medicalRecords");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Doctors = require("../models/doctors");
const Hospitals = require("../models/hospitals");
let config = {
    service: "gmail",
    auth: {
        user: "testingnode061229@gmail.com",
        pass: "xzentliyxvefqpwl",
    },
};
let transporter = nodemailer.createTransport(config);
exports.getLogin = (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("auth/hospitalLogin", {
        path: "/hospitals/register",
        path2: "/hospitals/login",
        errorMessage: message,
    });
};

exports.postLogin = (req, res) => {
    const regNo = req.body.regNo;
    const password = req.body.password;
    Hospital.findOne({ regNo: regNo, verified: "true" })
        .then((hospital) => {
            if (!hospital) {
                req.flash(
                    "error",
                    "Invalid Registration Number or password or you are not yet verified"
                );
                return res.redirect("/hospitals/login");
            }
            bcrypt
                .compare(password, hospital.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.type = "hospital";
                        req.session.hospital = hospital;
                        return req.session.save((err) => {
                            res.redirect("/hospitals/dashboard");
                        });
                    }
                    req.flash(
                        "error",
                        "Invalid Registration Number or password."
                    );
                    res.redirect("/hospitals/login");
                })
                .catch((err) => {
                    console.log(err);
                    req.flash(
                        "error",
                        "Invalid Registration Number or password."
                    );
                    res.redirect("/hospitals/login");
                });
        })
        .catch((err) => console.log(err));
};

exports.getRegister = (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("auth/hospitalRegistration", {
        errorMessage: message,
    });
};

exports.postRegister = (req, res) => {
    const hname = req.body.hname;
    const regNo = req.body.regNo;
    const speciality = req.body.speciality;
    const isGovernment = req.body.government;
    const password = req.body.password;
    const state = req.body.state;
    const city = req.body.city.toString().toLowerCase();
    const pincode = req.body.pincode;
    const email = req.body.email;
    Hospital.findOne({ regNo: regNo })
        .then((hospital) => {
            if (hospital) {
                req.flash(
                    "error",
                    "Hospital with this registration number already exists ! Try login instead !"
                );
                return res.redirect("/hospitals/register");
            }
            return bcrypt
                .hash(password, 12)
                .then((hashedPassword) => {
                    const newHospital = new Hospital({
                        hName: hname,
                        regNo: regNo,
                        city: city,
                        state: state,
                        pincode: pincode,
                        password: hashedPassword,
                        government: isGovernment,
                        specialityDep: speciality,
                        verified: "false",
                        email: email,
                    });
                    return newHospital.save();
                })
                .then((result) => {
                    res.render("success/hospitalRegistrationSucess");
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getDashboard = (req, res) => {
    let count;
    if (!req.hospital.doctorsWorking) {
        count = 0;
    } else {
        count = req.hospital.doctorsWorking.length;
    }
    MedicalRecords.countDocuments({ hospitalId: req.hospital._id }).then(
        (patientTreatedCount) => {
            ConfirmedAppointments.countDocuments({
                hospitalId: req.hospital._id,
            }).then((bookedAppointmentsCount) => {
                res.render("dashboard/hospitalDashboard", {
                    patientTreatedCount: patientTreatedCount,
                    bookedAppointmentsCount: bookedAppointmentsCount,
                    doctorsCount: count,
                });
            });
        }
    );
};

exports.getTreated = (req, res) => {
    MedicalRecords.find({ hospitalId: req.hospital._id })
        .populate("doctorId patientId hospitalId")
        .then((result) => {
            res.render("results/getHospitalTreatedPatients", { data: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getSearchPatientTreated = (req, res) => {
    MedicalRecords.find({ hospitalId: req.hospital._id })
        .populate("doctorId patientId")
        .then((result) => {
            const filteredList = result.filter((document) => {
                return document.patientId.email === req.body.email;
            });
            res.render("results/getHospitalTreatedPatients", {
                data: filteredList,
            });
        });
};

exports.getBookedAppointments = (req, res) => {
    ConfirmedAppointments.find({ hospitalId: req.hospital._id })
        .populate("doctorId patientId")
        .then((data) => {
            res.render("results/bookedAppointments", { data: data });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getRequestedAppointments = (req, res) => {
    Appointments.find({ hospitalId: req.hospital._id })
        .populate("doctorId patientId")
        .then((data) => {
            res.render("results/requestedAppointments", {
                data: data,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.getResheduleAppointment = (req, res) => {
    const id = req.params.appointmentId;
    Appointments.findById(id).then((data) => {
        res.render("forms/rescheduleAppointment", {
            date: data.appointmentDate,
            time: data.appointmentTime,
            data: data,
        });
    });
};

exports.getAcceptAppointment = (req, res) => {
    Appointments.findById(req.params.appointmentId)
        .then((newAppointment) => {
            const confirmAppointment = new ConfirmedAppointments({
                hospitalId: newAppointment.hospitalId,
                doctorId: newAppointment.doctorId,
                patientId: newAppointment.patientId,
                appointmentDate: newAppointment.appointmentDate,
                appointmentTime: newAppointment.appointmentTime,
                diseaseDescription: newAppointment.diseaseDescription,
                type: newAppointment.type,
            });
            confirmAppointment.save().then((result) => {
                result.populate("doctorId patientId").then((Confirmed) => {
                    res.render("success/appointmentConfirmed");
                    let message = {
                        from: "testingnode061229@gmail.com",
                        // to: Confirmed.patientId.email,
                        to: "saipranithswargam@gmail.com",
                        subject: "Appointment Confirmed",
                        html: `
                            <p>You Appointment for the doctor ${Confirmed.doctorId.name} has been confirmed by hospital ${req.hospital.hName}</p>
                            <p>Appointment Date : ${Confirmed.appointmentDate}</p>
                            <p>Appointment Time : ${Confirmed.appointmentTime} </p>
                            `,
                    };
                    transporter.sendMail(message);
                    return newAppointment.deleteOne();
                });
            });
        })
        .then((error) => {
            console.log(error);
        });
};

exports.postResheduleAppointment = (req, res) => {
    Appointments.findById(req.body.appointmentId)
        .then((result) => {
            result.appointmentDate = req.body.appointmentDate;
            result.appointmentTime = req.body.appointmentTime;
            return result.save();
        })
        .then((newAppointment) => {
            const confirmAppointment = new ConfirmedAppointments({
                hospitalId: newAppointment.hospitalId,
                doctorId: newAppointment.doctorId,
                patientId: newAppointment.patientId,
                appointmentDate: newAppointment.appointmentDate,
                appointmentTime: newAppointment.appointmentTime,
                diseaseDescription: newAppointment.diseaseDescription,
                type: newAppointment.type,
            });
            confirmAppointment.save().then((result) => {
                result.populate("doctorId patientId").then((Confirmed) => {
                    res.render("success/appointmentConfirmed");
                    let message = {
                        from: "testingnode061229@gmail.com",
                        to: "saipranithswargam@gmail.com", //need to change
                        subject: "Appointment Confirmed",
                        html: `
                                <p>Your Appointment for the doctor ${Confirmed.doctorId.name} has been Resheduled by hospital ${req.hospital.hName}</p>
                                <p>Resheduled Appointment Date : ${Confirmed.appointmentDate}</p>
                                <p>Resheduled Appointment Time : ${Confirmed.appointmentTime} </p>
                                `,
                    };
                    transporter.sendMail(message);
                    return newAppointment.deleteOne();
                });
            });
        })
        .then((error) => {
            console.log(error);
        });
};

exports.postSearchPatientRequestedAppointment = (req, res) => {
    Appointments.find({ hospitalId: req.hospital._id })
        .populate("doctorId patientId")
        .then((data) => {
            const filteredData = data.filter((record) => {
                return record.patientId.email === req.body.email;
            });
            res.render("results/filteredRequestedAppointments", {
                data: filteredData,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.postSearchPatientBookedAppointment = (req, res) => {
    ConfirmedAppointments.find({ hospitalId: req.hospital._id })
        .populate("doctorId patientId")
        .then((data) => {
            const filteredData = data.filter((record) => {
                return record.patientId.email === req.body.email;
            });
            res.render("results/bookedAppointments", { data: filteredData });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postChosen = (req, res) => {
    if (req.body.chosen === "patientsTreated") {
        return res.redirect("/hospitals/patientstreated");
    }
    if (req.body.chosen === "requestedAppointments") {
        return res.redirect("/hospitals/requestedappointments");
    }
    if (req.body.chosen === "bookedAppointments") {
        return res.redirect("/hospitals/bookedappointments");
    }
};

exports.getDoctors = (req, res) => {
    Hospital.findById(req.hospital._id)
        .populate("doctorsWorking")
        .then((hospitalData) => {
            console.log(hospitalData);
            res.render("results/doctorsWorking", {
                doctors: hospitalData.doctorsWorking,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.removeDoctor = (req, res) => {
    const id = req.params.doctorId;
    Hospital.findByIdAndUpdate(
        req.hospital._id,
        { $pullAll: { doctorsWorking: [id] } },
        { new: true }
    )
        .then((result) => {
            return Doctors.findByIdAndUpdate(
                id,
                { $pullAll: { hospitalsWorkingFor: [result._id] } },
                { new: true }
            );
        })
        .then((finalresult) => {
            return Appointments.deleteMany({
                hospitalId: req.hospital._id,
                doctorId: id,
            });
        })
        .then((deleted) => {
            return ConfirmedAppointments.deleteMany({
                hospitalId: req.hospital._id,
                doctorId: id,
            });
        })
        .then((deletedConfirm) => {
            res.redirect("/hospitals/doctors");
            console.log(deletedConfirm);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getmodify = (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("results/getModifyHospital", {
        data: req.hospital,
        errorMessage: message,
    });
};

exports.postModify = (req, res) => {
    let email = req.body.email;
    if (email === req.hospital.email) {
        const hname = req.body.hname;
        const state = req.body.state;
        const city = req.body.city.toString().toLowerCase();
        const pincode = req.body.pincode;
        Hospital.findByIdAndUpdate(req.hospital._id, {
            hName: hname,
            city: city,
            state: state,
            pincode: pincode,
        }).then((result) => {
            return res.redirect("/hospitals/dashboard");
        });
    }
    if (email !== req.hospital.email) {
        Hospital.findOne({ email: email }).then((hospital) => {
            const hname = req.body.hname;
            const state = req.body.state;
            const city = req.body.city.toString().toLowerCase();
            const pincode = req.body.pincode;
            if (!hospital) {
                Hospital.findByIdAndUpdate(req.hospital._id, {
                    hName: hname,
                    city: city,
                    state: state,
                    pincode: pincode,
                    email: email,
                }).then((result) => {
                    return res.redirect("/hospitals/dashboard");
                });
            }
            if (hospital) {
                req.flash(
                    "error",
                    "Given Email to modify Already Registerd please give another."
                );
                return res.redirect("/hospitals/modify");
            }
        });
    }
};

exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
