const Hospital = require("../models/hospitals");
const Appointments = require("../models/appointments");
const bcrypt = require("bcrypt");
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
    res.send("treated patients page");
};

exports.getBookedAppointments = (req, res) => {
    res.render("results/bookedAppointments");
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

exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
