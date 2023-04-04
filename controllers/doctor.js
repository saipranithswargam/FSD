const Doctor = require("../models/doctors");
const bcrypt = require("bcrypt");
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
        errorMessage:message,
    });
};

exports.postRegister = (req,res)=>{
    console.log(req.body);
    res.send("ok");
}