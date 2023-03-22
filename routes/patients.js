const express = require("express");
const router = express.Router();
const Patients = require("../models/patients");
const bcrypt = require("bcrypt");
const Patient = require("../db/Patient");

router.get("/login", (req, res) => {
    res.render("auth/login", {
        path: "/patients/register",
    });
});

router.get("/register", (req, res) => {
    res.render("auth/patientSignup");
});

router.get("/dashboard/:id", (req, res) => {
    const id = req.params.id;
    Patient.findByPk(id).then((patientDetails) => {
        res.render("dashboard/patientDashboard", { data: patientDetails });
    });
});

router.post("/register", (req, res) => {
    const details = req.body;
    Patient.create({
        name: details.name,
        gender: details.gender,
        height: details.height,
        weight: details.weight,
        bloodGroup: details.bloodGroup,
        married: details.maritalStatus,
        allergies: details.allergies,
        age: details.age,
        state: details.state,
        city: details.city,
        pincode: details.pincode,
        mobileNum: details.mobileNumber,
        emergencyContact: details.emergencyContact,
        password: details.password,
        email: details.email,
    })
        .then((result) => {
            res.redirect(`/patients/dashboard/${result.id}`);
        })
        .catch((err) => {
            console.error(err.message);
        });
});

router.post("/login", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    Patient.findOne({
        where: { email: email },
    }).then((data) => {
        if (!data) {
            res.render("error/incPass.ejs", {
                path: "/patients/login",
            });
            return 
        }
        if (data.password === password) {
            res.redirect(`/patients/dashboard/${data.id}`);
        } else {
            res.render("error/incPass.ejs", {
                path: "/patients/login",
            });
        }
    });
});

module.exports = router;
