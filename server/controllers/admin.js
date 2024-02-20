const Admin = require("../models/admin");
const Hospitals = require("../models/hospitals");
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
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
    // admin@123
    //admin@gmail.com
    Admin.findOne({ email: email })
        .then((admin) => {
            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password."
                });
            }

            bcrypt.compare(password, admin.password)
                .then((doMatch) => {
                    if (doMatch) {
                        console.log(doMatch);
                        const token = jwt.sign(
                            { id: admin._id, type: 'admin' },
                            String(process.env.SECRET),
                            {
                                expiresIn: "3h",
                            }
                        );
                        res.cookie("chs", token, {
                            httpOnly: true,
                            sameSite: "none",
                            secure: true,
                            maxAge: 24 * 60 * 60 * 1000,
                        });
                        return res
                            .status(200)
                            .json({ ...admin._doc, type: "admin" });
                    }
                    return res
                        .status(401)
                        .json({ message: "Invalid email or password." });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error"
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        });
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
            res.json(patients);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while fetching patients' });
        });
};

exports.getHospitals = (req, res) => {
    Hospitals.find({})
        .then((hospitals) => {
            res.json(hospitals);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while fetching hospitals' });
        });
}
exports.getDoctors = (req, res) => {
    Doctors.find({})
        .then((doctors) => {
            res.json(doctors);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while fetching doctors' });
        });
}
exports.postChosen = (req, res) => {
    if (req.body.chosen === "verifyDoctor") {
        return res.redirect("/admin/verifydoctor");
    }
    if (req.body.chosen === "verifyHospital") {
        return res.redirect("/admin/verifyhospital");
    }
};

exports.Logout = (req, res, next) => {
    res.clearCookie('chs');
    req._id = null;
    return res
        .status(200)
        .json({ message: "Logged out!!" });
};

exports.getGraphData = (req, res) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const monthsArray = Array.from({ length: 12 }, (_, i) => ({ month: getMonthName(i + 1), totalAppointments: 0 }));

    function getMonthName(monthNumber) {
        switch (monthNumber) {
            case 1: return 'Jan';
            case 2: return 'Feb';
            case 3: return 'Mar';
            case 4: return 'Apr';
            case 5: return 'May';
            case 6: return 'Jun';
            case 7: return 'Jul';
            case 8: return 'Aug';
            case 9: return 'Sep';
            case 10: return 'Oct';
            case 11: return 'Nov';
            case 12: return 'Dec';
            default: return '';
        }
    }
    ConfirmedAppointments.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $year: { $toDate: "$appointmentDate" } }, currentYear]
                }
            }
        },
        {
            $group: {
                _id: { month: { $month: { $dateFromString: { dateString: "$appointmentDate" } } } },
                totalAppointments: { $sum: 1 }
            }
        }
    ]).exec().then(result => {
        let numAppointments = 0;
        result.forEach(month => {
            const index = month._id.month - 1;
            monthsArray[index] = { month: getMonthName(month._id.month), totalAppointments: month.totalAppointments };
            numAppointments += month.totalAppointments
        });
        console.log(monthsArray);
        return res.status(200).json({ data: monthsArray, total: numAppointments });
    }).catch(err => {
        console.error(err);
        return res.status(500).json("internalServerError")
    });

}

exports.getAppointmentStatus = async (req, res) => {
    try {
        const { patientId } = req.body;

        // Check if patient exists
        const patient = await Patients.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Check if patient has appointments
        const appointments = await Appointments.findOne({ patientId });
        // Check if patient has confirmed appointments
        const confirmedAppointments = await ConfirmedAppointments.findOne({ patientId });

        // Determine appointment status
        let appointmentStatus = "Not booked";
        if (confirmedAppointments) {
            appointmentStatus = "Confirmed";
        } else if (appointments) {
            appointmentStatus = "Pending";
        }

        res.status(200).json({ appointmentStatus });
    } catch (error) {
        console.error("Error checking appointment status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}