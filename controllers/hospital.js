const Hospital = require("../models/hospitals");
const Appointments = require("../models/appointments");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const MedicalRecords = require("../models/medicalRecords");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
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
    Hospital.findOne({ regNo: regNo })
        .then((hospital) => {
            if (!hospital) {
                req.flash("error", "Invalid Registration Number or password.");
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
    console.log(req.body);
    const hname = req.body.hname;
    const regNo = req.body.regNo;
    const speciality = req.body.speciality;
    const isGovernment = req.body.government;
    const password = req.body.password;
    const state = req.body.state;
    const city = req.body.city;
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
                    res.redirect("/hospitals/login");
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
    const data = {
        hname: req.session.hospital.hName,
        city: req.session.hospital.city,
        state: req.session.hospital.state,
        pincode: req.session.hospital.pincode,
    };
    res.render("dashboard/hospitalDashboard", { data: data });
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
                        to: Confirmed.patientId.email,
                        subject: "Appointment Confirmed",
                        html: `
                                <p>You Appointment for the doctor ${Confirmed.doctorId.name} has been Resheduled by hospital ${req.hospital.hName}</p>
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

exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
