const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
exports.getLogin = (req, res) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render("auth/adminLogin", {
        path2: "/admin/login",
        errorMessage: message,
    });
};

exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({ email: email })
        .then((Admin) => {
            if (!Admin) {
                req.flash("error", "Invalid email or password.");
                return res.redirect("/admin/login");
            }
            bcrypt
                .compare(password, Admin.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.type = "admin";
                        req.session.admin = Admin;
                        return req.session.save((err) => {
                            res.redirect("/admin/dashboard");
                        });
                    }
                    req.flash("error", "Invalid email or password.");
                    res.redirect("/admin/login");
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/doctors/login");
                });
        })
        .catch((err) => console.log(err));
};

exports.getDashboard = (req, res) => {
    res.send("woking");
};
