const express = require("express");
const router = new express.Router();
const Doctors = require("../models/doctors");
const bcrypt = require("bcrypt");
const Doctor = require("../db/Doctor");

router.get("/login", (req, res) => {
    res.render("auth/login", {
        path: "/doctors/register",
        path2:"/doctors/login"
    });
});

router.get("/register", (req, res) => {
    res.render("auth/doctorRegistration");
});

router.get("/dashboard/:id", (req, res) => {
    const id = req.params.id;
    Doctor.findByPk(id).then((docDetails) => {
        res.render("dashboard/doctorDashboard", { data: docDetails });
    });
});

router.get("/prescribe", (req, res) => {
    res.render("additionals/prescription");
});

router.post("/register", (req, res) => {
    const details = req.body;
    Doctor.create({
        name: details.name,
        email: details.email,
        mobileNum: details.mobileNum,
        liscenceNo: details.liscenceNo,
        city: details.city,
        state: details.state,
        pincode: details.pincode,
        age: details.age,
        experience: details.experience,
        availability: details.availability,
        gender: details.gender,
        treatment: details.treatment,
        Speciality: details.Speciality,
        password: details.password,
    })
        .then((result) => {
            res.redirect(`/doctors/dashboard/${result.id}`);
        })
        .catch((err) => {
            console.error(err.message);
        });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Doctor.findOne({
        where: { email: email },
    }).then((data) => {
        if (!data) {
            res.render("error/incPass.ejs", {
                path: "/doctors/login",
            });
            return ;
        }
        if (data.password === password) {
            res.redirect(`/doctors/dashboard/${data.id}`);
        } 
        else {
            res.render("error/incPass.ejs", {
                path: "/doctors/login",
            });
        }
    });
});

router.get("/doctorsList/:regNo", async (req, res) => {
    const regNo = req.params;

    const allDoc = await Doctor.findAll({
        where: {
            hospitalRegNo: regNo,
        },
    });

    res.render("/additionals/doctorsList", { doctors: allDoc });
});

module.exports = router;
