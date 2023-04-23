const Hospitals = require("../models/hospitals");
const Patient = require("../models/patients");
const Appointments = require("../models/appointments");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const MedicalRecords = require("../models/medicalRecords");
const PDFDocument = require("pdfkit");
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
    Hospitals.find({ verified: "true" }).then((hospitals) => {
        console.log(hospitals);
        res.render("results/hospitalsList", {
            hospitals: hospitals,
        });
    });
};

exports.getMedicalRecords = (req, res) => {
    MedicalRecords.find({ patientId: req.patient._id })
        .populate("hospitalId doctorId")
        .then((data) => {
            const doctors = data.map((medicalRecord) => {
                return medicalRecord.doctorId;
            });
            const hospitals = data.map((medicalRecord) => {
                return medicalRecord.hospitalId;
            });
            var set1 = new Set(hospitals);
            const finalHospitals = [...set1];
            var set2 = new Set(doctors);
            const finalDoctors = [...set2];
            res.render("results/medicalRecords", {
                data: data,
                doctors: finalDoctors,
                hospitals: finalHospitals,
            });
        });
};

exports.postFilteredMedicalRecords = (req, res) => {
    if (req.body.doctor === "All" && req.body.hospital === "All") {
        return res.redirect("/patients/medicalrecords");
    } else {
        res.redirect(
            `/patients/medicalrecords/filtered/${req.body.hospital}/${req.body.doctor}`
        );
    }
};

exports.getFilteredMedicalRecords = (req, res) => {
    const doctorId = req.params.doctorId;
    const hospitalId = req.params.hospitalId;
    if (doctorId !== "All" && hospitalId !== "All") {
        MedicalRecords.find({
            patientId: req.patient._id,
            hospitalId: hospitalId,
            doctorId: doctorId,
        })
            .populate("hospitalId doctorId")
            .then((data) => {
                const doctors = data.map((medicalRecord) => {
                    console.log(medicalRecord.doctorId);
                    return medicalRecord.doctorId;
                });
                const hospitals = data.map((medicalRecord) => {
                    return medicalRecord.hospitalId;
                });
                var set1 = new Set(hospitals);
                const finalHospitals = [...set1];
                var set2 = new Set(doctors);
                const finalDoctors = [...set2];
                return res.render("results/filteredMedicalRecords", {
                    data: data,
                    doctors: finalDoctors,
                    hospitals: finalHospitals,
                    selectedDoctor: doctorId,
                    selectedHospital: hospitalId,
                });
            });
    }
    if (doctorId === "All" && hospitalId !== "All") {
        MedicalRecords.find({
            patientId: req.patient._id,
            hospitalId: hospitalId,
        })
            .populate("hospitalId doctorId")
            .then((data) => {
                const doctors = data.map((medicalRecord) => {
                    return medicalRecord.doctorId;
                });
                const hospitals = data.map((medicalRecord) => {
                    return medicalRecord.hospitalId;
                });
                var set1 = new Set(hospitals);
                const finalHospitals = [...set1];
                var set2 = new Set(doctors);
                const finalDoctors = [...set2];
                return res.render("results/filteredMedicalRecords", {
                    data: data,
                    doctors: finalDoctors,
                    hospitals: finalHospitals,
                    selectedDoctor: "All",
                    selectedHospital: hospitalId,
                });
            });
    }
    if (doctorId !== "All" && hospitalId === "All") {
        MedicalRecords.find({
            patientId: req.patient._id,
            doctorId: doctorId,
        })
            .populate("hospitalId doctorId")
            .then((data) => {
                const doctors = data.map((medicalRecord) => {
                    return medicalRecord.doctorId;
                });
                const hospitals = data.map((medicalRecord) => {
                    return medicalRecord.hospitalId;
                });
                var set1 = new Set(hospitals);
                const finalHospitals = [...set1];
                var set2 = new Set(doctors);
                const finalDoctors = [...set2];
                return res.render("results/filteredMedicalRecords", {
                    data: data,
                    doctors: finalDoctors,
                    hospitals: finalHospitals,
                    selectedHospital: "All",
                    selectedDoctor: doctorId,
                });
            });
    }
};

exports.getMyAppointments = (req, res) => {
    Appointments.find({ patientId: req.patient._id })
        .populate("doctorId hospitalId")
        .then((data) => {
            ConfirmedAppointments.find({ patientId: req.patient._id })
                .populate("doctorId hospitalId")
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
        Hospitals.find({
            city: location,
            specialityDep: speciality,
            verified: "true",
        })
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
        Hospitals.find({ specialityDep: speciality, verified: "true" })
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
        Hospitals.find({ city: location, verified: "true" })
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
            hospital.populate("doctorsWorking").then((results) => {
                const finalDoctorsList = results.doctorsWorking.filter(
                    (doctor) => {
                        return doctor.verified === "true";
                    }
                );
                res.render("results/listDoc", {
                    doctors: finalDoctorsList,
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
    console.log(req.body);
    if (req.body.type === "requested") {
        Appointments.deleteOne({ _id: req.body.appointmentId })
            .then(() => {
                res.redirect("/patients/myappointments");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    if (req.body.type === "confirmed") {
        ConfirmedAppointments.deleteOne({ _id: req.body.appointmentId })
            .then(() => {
                res.redirect("/patients/myappointments");
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

exports.postChosen = (req, res) => {
    if (req.body.chosen === "appointment") {
        return res.redirect("/patients/myappointments");
    }
    if (req.body.chosen === "medicalrecords") {
        return res.redirect("/patients/medicalrecords");
    }
};

exports.getMedicalRecord = (req, res) => {
    const medicalRecordId = req.params.medicalrecordId;
    MedicalRecords.findById(medicalRecordId)
        .populate("hospitalId doctorId")
        .then((record) => {
            if (!record) {
                return res.send("no medical record found");
            }
            const RecordName = "MedicalRecord-" + medicalRecordId + ".pdf";
            const pdfDoc = new PDFDocument();
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                'inline; filename="' + RecordName + '"'
            );
            pdfDoc.pipe(res);
            pdfDoc.fontSize(26).text("MedicalRecord", {
                underline: true,
                align: "center",
            });
            pdfDoc.moveDown(0.5);
            pdfDoc
                .fontSize(10)
                .text("HospitalName:" + record.hospitalId.hName, {
                    align: "left",
                });
            pdfDoc.moveUp(1);
            pdfDoc.fontSize(10).text("DoctorName:" + record.doctorId.name, {
                align: "center",
            });
            pdfDoc.end();
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
