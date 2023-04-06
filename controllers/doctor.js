const Doctor = require("../models/doctors");
const bcrypt = require("bcrypt");
const Hospital = require("../models/hospitals");
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
    console.log(req.body);
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
        Hospital.findOne({ regNo: hregNo }).then((hospital) => {
            if (!hospital) {
                req.flash(
                    "error",
                    "Cannot Find any Hospital With Given Registration Number "
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
                        });
                        newDoc.hospitalsWorkingFor.push(hospital._id);
                        return newDoc.save();
                    })
                    .then((finalResult) => {
                        console.log(finalResult);
                        res.redirect("/doctors/login");
                    });
            });
        });
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
        name: req.session.doctor.name,
        age: req.session.doctor.age,
        city: req.session.doctor.city,
        state: req.session.doctor.state,
        pincode: req.session.doctor.pincode,
        speciality: req.session.doctor.Speciality[0],
        hospitalsWorkingFor: namesOfHospitals,
    };
    res.render("dashboard/doctorDashboard", {
        data: data,
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
    Hospital.findOne({ regNo: regNo })
        .then((hospital) => {
            if (!hospital) {
                req.flash(
                    "error",
                    "Cannot Find any Hospital With Given Registration Number "
                );
                return res.redirect("/doctors/addhospital");
            }
            const hospitalsAdded = req.session.doctor.hospitalsWorkingFor;
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
            Doctor.findById(req.doctor._id).then((doctor) => {
                doctor.hospitalsWorkingFor.push(hospital._id);
                doctor.save();
                res.redirect("/doctors/dashboard");
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
