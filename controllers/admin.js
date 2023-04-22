const Admin = require("../models/admin");
const Hospitals = require("../models/hospitals");
const Doctors = require("../models/doctors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
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
    res.render("dashboard/adminDashboard");
};

exports.getVerifyDoctor = (req, res) => {
    Doctors.find({ verified: "false" }).then((doctors) => {
        res.render("verify/doctorVerify", {
            doctors: doctors,
        });
    });
};

exports.getVerifyHospital = (req, res) => {
    Hospitals.find({ verified: "false" }).then((hospitals) => {
        res.render("verify/hospitalVerify", {
            hospitals: hospitals,
        });
    });
};

exports.postVerifyDoctor = (req, res) => {
    console.log(req.body);
    if (req.body.status === "accept") {
        Doctors.findByIdAndUpdate(req.body.doctorId, { verified: "true" }).then(
            (updated) => {
                const hospitalId = updated.hospitalsWorkingFor[0];
                Hospitals.findById(hospitalId)
                    .then((hospital) => {
                        console.log(hospital);
                        hospital.doctorsWorking.push(updated._id);
                        return hospital.save();
                    })
                    .then((result) => {
                        res.render("success/verifiedDoctor");
                        let message = {
                            from: "testingnode061229@gmail.com",
                            to: "saipranithswargam@gmail.com", //need to be changed
                            subject: "Doctor Verification Completed",
                            html: `
                        We are glad to inform you that You have been sucessfully Verified and Accepted.
                        Thanks For Joining Us !
                        `,
                        };
                        transporter.sendMail(message);
                    });
            }
        );
    }
    if (req.body.status === "deny") {
        Doctors.findByIdAndDelete(req.body.doctorId).then((deletedDoc) => {
            res.render("success/denyVerification", {
                message1: "The Doctor Has been Rejected Sucessfully",
                message2: "Doctor will be informed about this via email",
                message3: "Back to Doctor Verification",
                path: "/admin/verifydoctor",
            });
            let message = {
                from: "testingnode061229@gmail.com",
                to: "saipranithswargam@gmail.com", //need to be changed
                subject: "Doctor Verification Denied",
                html: `
                We are sorry to inform you that Your Doctor verification Process failed .
                    `,
            };
            transporter.sendMail(message);
        });
    }
};

exports.postVerifyHospital = (req, res) => {
    console.log(req.body);
    if (req.body.status === "accept") {
        Hospitals.findByIdAndUpdate(req.body.hospitalId, {
            verified: "true",
        }).then((updated) => {
            res.render("success/verifiedHospital");
            let message = {
                from: "testingnode061229@gmail.com",
                to: "saipranithswargam@gmail.com", //need to be changed
                subject: "Hospital Verification Completed",
                html: `
                    We are glad to inform you that Your hospital has been sucessfully Verified and Accepted.
                    Thanks For Joining Us !
                    `,
            };
            transporter.sendMail(message);
        });
    }
    if (req.body.status === "deny") {
        Hospitals.findByIdAndDelete(req.body.hospitalId).then((deletedDoc) => {
            res.render("success/denyVerification", {
                message1: "The Hospital has been Rejected sucessfully!",
                message2: "Hospital will be informed about this via email",
                message3: "Back To Hospital Verification",
                path: "/admin/verifyhospital",
            });
            let message = {
                from: "testingnode061229@gmail.com",
                to: "saipranithswargam@gmail.com", //need to be changed
                subject: "Hospital Verification Denied",
                html: `
                    We are sorry to inform you that Your hospital has failed Verification Process.
                    `,
            };
            transporter.sendMail(message);
        });
    }
};

exports.getVerifySearchHospitals = (req, res) => {
    Hospitals.findOne({ verified: "false", regNo: req.body.regNo }).then(
        (hospital) => {
            //error handling
            res.send(hospital);
        }
    );
};

exports.getVerifySearchDoctors = (req, res) => {
    Doctors.find({ verified: "false", email: req.body.email }).then(
        (doctor) => {
            res.send(doctor);
            //error handling
        }
    );
};

exports.getVerifiedDoctors = (req, res) => {
    Doctors.find({ verified: "true" }).then((doctors) => {
        res.send(doctors);
    });
};

exports.getVerifiedHospitals = (req, res) => {
    Hospitals.find({ verified: "true" }).then((hospitals) => {
        res.send(hospitals);
    });
};

exports.postChosen = (req, res) => {
    if (req.body.chosen === "verifyDoctor") {
        return res.redirect("/admin/verifydoctor");
    }
    if (req.body.chosen === "verifyHospital") {
        return res.redirect("/admin/verifyhospital");
    }
    if (req.body.chosen === "verifiedDoctors") {
        return res.redirect("/admin/verifieddoctors");
    }
    if (req.body.chosen === "verifiedHospitals") {
        return res.redirect("/admin/verifiedhospitals");
    }
};

exports.Logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
