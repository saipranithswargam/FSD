const Hospitals = require("../models/hospitals");
const Patient = require("../models/patients");
const Appointments = require("../models/appointments");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
exports.getLogin = (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("auth/login", {
        path: "/patients/register",
        path2: "/patients/login",
        errorMessage: message,
    });
};
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Patient.findOne({ email: email })
        .then((patient) => {
            if (!patient) {
                req.flash("error", "Invalid email or password.");
                return res.redirect("/patients/login");
            }
            bcrypt
                .compare(password, patient.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.type = "patient";
                        req.session.patient = patient;
                        return req.session.save((err) => {
                            res.redirect("/patients/dashboard");
                        });
                    }
                    req.flash("error", "Invalid email or password.");
                    return res.redirect("/patients/login");
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/patients/login");
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
    res.render("auth/patientSignup", {
        errorMessage: message,
    });
};

exports.postRegister = (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const gender = req.body.gender;
    const age = req.body.age;
    const height = req.body.height;
    const weight = req.body.weight;
    const allergies = req.body.allergies;
    const bloodGroup = req.body.bloodGroup;
    const state = req.body.state;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;
    const confirmPassword = req.body.confirPpassword;
    const maritalStatus = req.body.maritalStatus;
    Patient.findOne({ email: email })
        .then((patient) => {
            if (patient) {
                req.flash(
                    "error",
                    "E-Mail exists already, please pick a different one."
                );
                return res.redirect("/patients/register");
            }
            return bcrypt
                .hash(password, 12)
                .then((hashedPassword) => {
                    const newPatient = new Patient({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        mobileNum: mobileNumber,
                        height: height,
                        weight: weight,
                        bloodGroup: bloodGroup,
                        state: state,
                        city: city,
                        pincode: pincode,
                        age: age,
                        gender: gender,
                        married: maritalStatus,
                        allergies: allergies,
                    });
                    return newPatient.save();
                })
                .then((result) => {
                    res.redirect("/patients/login");
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
        name: req.session.patient.name,
        age: req.session.patient.age,
        city: req.session.patient.city,
        state: req.session.patient.state,
        pincode: req.session.patient.pincode,
    };
    res.render("dashboard/patientDashboard", {
        data: data,
    });
};

exports.getHospitals = (req, res) => {
    Hospitals.find({}).then((hospitals) => {
        console.log(hospitals);
        res.render("results/hospitalsList", {
            hospitals: hospitals,
        });
    });
};

exports.getMedicalRecords = (req, res) => {
    data = {
        medicalRecords: req.patient.medicalRecords,
    };
    res.render("results/medicalRecords", {
        data: data,
    });
};

exports.getMyAppointments = (req, res) => {
    Appointments.find({ patientId: req.patient._id })
        .populate("doctorId hospitalId")
        .then((data) => {
            ConfirmedAppointments.find({ patientId: req.patient._id })
                .then((cdata) => {
                    res.render("results/medicalAppointments", {
                        appointments: data,
                        cappointments: cdata,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getFiltered = (req, res) => {
    const location = req.params.location;
    const speciality = req.params.speciality;
    if (location !== "All" && speciality !== "All") {
        Hospitals.find({ city: location, specialityDep: speciality })
            .then((hospitals) => {
                console.log(hospitals);
                res.render("results/filteredHospitals", {
                    hospitals: hospitals,
                    speciality: speciality,
                    location: location,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    if (location === "All" && speciality !== "All") {
        Hospitals.find({ specialityDep: speciality })
            .then((hospitals) => {
                console.log(hospitals);
                res.render("results/filteredHospitals", {
                    hospitals: hospitals,
                    speciality: speciality,
                    location: location,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    if (location !== "All" && speciality === "All") {
        Hospitals.find({ city: location })
            .then((hospitals) => {
                console.log(hospitals);
                res.render("results/filteredHospitals", {
                    hospitals: hospitals,
                    speciality: speciality,
                    location: location,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

exports.postFiltered = (req, res) => {
    if (req.body.location === "All" && req.body.speciality === "All") {
        return res.redirect("/patients/hospitals");
    }
    res.redirect(
        `/patients/hospitals/filtered/${req.body.location}/${req.body.speciality}`
    );
};

exports.getDoctorsList = (req, res) => {
    const id = req.params.id;
    Hospitals.findById(id)
        .then((hospital) => {
            hospital.populate("doctorsWorking").then((doctors) => {
                res.render("results/listDoc", {
                    doctors: hospital.doctorsWorking,
                    type: hospital.specialityDep,
                    hospitalId: id,
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getBookDoctor = (req, res) => {
    const hospitalId = req.params.hospitalId;
    const doctorId = req.params.doctorId;
    res.render("forms/bookDoctor", {
        doctorId: doctorId,
        hospitalId: hospitalId,
    });
};

exports.postBookDoctor = (req, res) => {
    const hospitalId = req.body.hospitalId;
    const doctorId = req.body.doctorId;
    const appointmentDate = req.body.appointmentDate;
    const appointmentTime = req.body.appointmentTime;
    const diseaseDescription = req.body.diseaseDescription;
    const type = req.body.type;
    const patientId = req.patient._id;
    const appointment = new Appointments({
        patientId: patientId,
        hospitalId: hospitalId,
        doctorId: doctorId,
        type: type,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        diseaseDescription: diseaseDescription,
    });
    appointment
        .save()
        .then((result) => {
            console.log(result);
            res.render("booked");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.cancleRequestedAppointment = (req, res) => {
    Appointments.deleteOne({ _id: req.body.appointmentId })
        .then(() => {
            res.redirect("/patients/myappointments");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
