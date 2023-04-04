const Patient = require("../models/patients");
const bcrypt = require("bcrypt");
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
                    res.redirect("/patients/login");
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
        medicalRecords : req.session.patient.medicalRecords,
    };
    res.render("dashboard/patientDashboard", {
        data: data,
    });
};

exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
