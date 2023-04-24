const Admin = require("../models/admin");
const Hospitals = require("../models/hospitals");
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
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
    Doctors.countDocuments({ verified: "true" }).then((doctorsCount) => {
        Patients.countDocuments().then((patientsCount) => {
            Hospitals.countDocuments({ verified: "true" }).then(
                (hospitalsCount) => {
                    res.render("dashboard/adminDashboard", {
                        doctorsCount: doctorsCount,
                        patientsCount: patientsCount,
                        hospitalsCount: hospitalsCount,
                    });
                }
            );
        });
    });
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
                to: "saipranithswargam@gmail.com",
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
    Hospitals.find({ verified: "false", regNo: req.body.regNo })
        .then((hospitals) => {
            res.render("verify/hospitalVerify", {
                hospitals: hospitals,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getVerifySearchDoctors = (req, res) => {
    Doctors.find({ verified: "false", email: req.body.email }).then(
        (doctors) => {
            res.render("verify/doctorVerify", {
                doctors: doctors,
            });
        }
    );
};

exports.getVerifiedDoctors = (req, res) => {
    Doctors.find({ verified: "true" }).then((doctors) => {
        res.render("adminResults/verifiedListDoc", {
            doctors: doctors,
        });
    });
};

exports.getVerifiedHospitals = (req, res) => {
    Hospitals.find({ verified: "true" }).then((hospitals) => {
        res.render("adminResults/verifiedHospitalList", {
            hospitals: hospitals,
        });
    });
};

exports.getPatients = (req, res) => {
    Patients.find({})
        .then((patients) => {
            res.render("adminResults/patientsList", {
                patients: patients,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postChosen = (req, res) => {
    if (req.body.chosen === "verifyDoctor") {
        return res.redirect("/admin/verifydoctor");
    }
    if (req.body.chosen === "verifyHospital") {
        return res.redirect("/admin/verifyhospital");
    }
};

exports.Logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};
