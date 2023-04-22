const Doctor = require("../models/doctors");
const bcrypt = require("bcrypt");
const Hospital = require("../models/hospitals");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const MedicalRecords = require("../models/medicalRecords");
exports.getLogin = (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("auth/login", {
        path: "/doctors/register",
        path2: "/doctors/login",
        errorMessage: message,
    });
};
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Doctor.findOne({ email: email })
        .then((doctor) => {
            if (!doctor) {
                req.flash("error", "Invalid email or password.");
                return res.redirect("/doctors/login");
            }
            bcrypt
                .compare(password, doctor.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.type = "doctor";
                        req.session.doctor = doctor;
                        return req.session.save((err) => {
                            res.redirect("/doctors/dashboard");
                        });
                    }
                    req.flash("error", "Invalid email or password.");
                    res.redirect("/doctors/login");
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/doctors/login");
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
    res.render("auth/doctorRegistration", {
        errorMessage: message,
    });
};

exports.postRegister = (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const liscenceNo = req.body.liscenceNo;
    const experience = req.body.experience;
    const speciality = req.body.speciality;
    const state = req.body.state;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const mobileNum = req.body.mobileNum;
    const hregNo = req.body.regNo;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    Doctor.findOne({ email: email }).then((doctor) => {
        if (doctor) {
            req.flash(
                "error",
                "E-Mail exists already, please pick a different one."
            );
            return res.redirect("/doctors/register");
        }
        Hospital.findOne({ regNo: hregNo, verified: "true" }).then(
            (hospital) => {
                if (!hospital) {
                    req.flash(
                        "error",
                        "Cannot find Hospital or hasn't been verified yet "
                    );
                    return res.redirect("/doctors/register");
                }
                Doctor.findOne({ liscenceNo: liscenceNo }).then((doc) => {
                    if (doc) {
                        req.flash(
                            "error",
                            "doctor already exists with Given Liscence Number"
                        );
                        return res.redirect("/doctors/register");
                    }
                    return bcrypt
                        .hash(password, 12)
                        .then((hashedPassword) => {
                            const newDoc = new Doctor({
                                name: name,
                                email: email,
                                mobileNum: mobileNum,
                                liscenceNo: liscenceNo,
                                city: city,
                                state: state,
                                pincode: pincode,
                                age: age,
                                experience: experience,
                                Speciality: speciality,
                                password: hashedPassword,
                                verified: "false",
                            });
                            newDoc.hospitalsWorkingFor.push(hospital._id);
                            return newDoc.save();
                        })
                        .then((finalResult) => {
                            hospital.doctorsWorking.push(finalResult._id);
                            return hospital.save();
                        })
                        .then((result) => {
                            res.render("success/docRegistrationSuccess");
                        });
                });
            }
        );
    });
};

exports.getDashboard = async (req, res) => {
    const hospitalsWorkingFor = await req.doctor.populate(
        "hospitalsWorkingFor"
    );
    let namesOfHospitals = hospitalsWorkingFor.hospitalsWorkingFor.map(
        (hospitalDetails) => {
            return hospitalDetails.hName;
        }
    );
    namesOfHospitals = namesOfHospitals.filter((hospitalName) => {
        return hospitalName != null;
    });
    const data = {
        name: req.doctor.name,
        age: req.doctor.age,
        city: req.doctor.city,
        state: req.doctor.state,
        pincode: req.doctor.pincode,
        speciality: req.doctor.Speciality,
        hospitalsWorkingFor: namesOfHospitals,
    };
    res.render("dashboard/doctorDashboard", {
        data: data,
    });
};

exports.getBookedAppointments = (req, res) => {
    ConfirmedAppointments.find({ doctorId: req.doctor._id })
        .populate("patientId")
        .then((appointments) => {
            console.log(appointments);
            res.render("results/confirmedDocAppointments", {
                appointments: appointments,
            });
        });
};

exports.addHospital = (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("auth/addHospital", {
        errorMessage: message,
    });
};

exports.postAddHospital = (req, res) => {
    const hname = req.body.hospitalName;
    const regNo = req.body.regNo;
    Hospital.findOne({ regNo: regNo, verified: "true" })
        .then((hospital) => {
            if (!hospital) {
                req.flash(
                    "error",
                    "Cannot find Hospital or Hospital hasn't been verified"
                );
                return res.redirect("/doctors/addhospital");
            }
            const hospitalsAdded = req.doctor.hospitalsWorkingFor;
            const isThere = hospitalsAdded.find((id) => {
                return id.toString() === hospital._id.toString();
            });
            if (isThere) {
                req.flash(
                    "error",
                    "Hospital Trying to already exists in your hospitals working list "
                );
                return res.redirect("/doctors/addhospital");
            }
            hospital.doctorsWorking.push(req.doctor._id);
            hospital.save().then((result) => {
                console.log(result);
                Doctor.findById(req.doctor._id).then((doctor) => {
                    doctor.hospitalsWorkingFor.push(hospital._id);
                    doctor.save().then((result) => {
                        res.render("success/hospitalAddedSuccess");
                    });
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getRemoveHospital = (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("auth/removeHospital", {
        errorMessage: message,
    });
};

exports.postRemoveHospital = (req, res) => {
    var hname = req.body.hospitalName;
    const regNo = req.body.regNo;
    req.doctor.populate("hospitalsWorkingFor").then((result) => {
        const match = result.hospitalsWorkingFor.find((hospital) => {
            return hospital.regNo === regNo;
        });
        if (!match) {
            req.flash(
                "error",
                "Hospital Trying to Add isn't there in your working hospital list "
            );
            return res.redirect("/doctors/removehospital");
        }
        Doctor.findByIdAndUpdate(
            result._id,
            { $pullAll: { hospitalsWorkingFor: [match._id] } },
            { new: true }
        ).then((newDoctor) => {
            console.log(newDoctor);
            Hospital.findOneAndUpdate(
                { regNo: regNo },
                { $pullAll: { doctorsWorking: [req.doctor._id] } },
                { new: true }
            ).then((finalObject) => {
                res.render("success/hospitalRemovedSucess");
            });
        });
    });
};

exports.getPrescribe = (req, res) => {
    console.log(req.params);
    res.render("results/prescription", {
        patientId: req.params.patientId,
        hospitalId: req.params.hospitalId,
        appointmentId: req.params.appointmentId,
    });
};

exports.postPrescribe = (req, res) => {
    console.log(req.body);
    const date = new Date();
    const medicalRecord = new MedicalRecords({
        hospitalId: req.body.hospitalId,
        patientId: req.body.patientId,
        doctorId: req.doctor._id,
        bloodPressure: req.body.bloodPressure,
        temperature: req.body.temperature,
        height: req.body.height,
        weight: req.body.weight,
        oxygen: req.body.oxygen,
        surgery: req.body.surgery,
        medicalTests: req.body.medicalTests,
        note: req.body.note,
        medicines: req.body.medicines,
        date: date.toLocaleDateString(),
    });
    medicalRecord
        .save()
        .then((medicalrecord) => {
            return ConfirmedAppointments.findById(req.body.appointmentId);
        })
        .then((appointment) => {
            return appointment.deleteOne();
        })
        .then((result) => {
            console.log(result);
            res.send("working");
        });
};

exports.getHospitalsWorkingFor = (req, res) => {
    req.doctor.populate("hospitalsWorkingFor").then((result) => {
        res.send(result.hospitalsWorkingFor);
    });
};

exports.getMedicalRecords = (req, res) => {
    MedicalRecords.find({ patientId: req.params.patientId })
        .then((medicalRecords) => {
            res.send(medicalRecords);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postChosen = (req, res) => {
    if (req.body.chosen === "addHospital") {
        return res.redirect("/doctors/addhospital");
    }
    if (req.body.chosen === "removeHospital") {
        return res.redirect("/doctors/removehospital");
    }
    if (req.body.chosen === "hospitalsWorking") {
        return res.redirect("/doctors/gethospitalsworkingfor");
    }
};

exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
