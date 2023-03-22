const express = require("express");
const router = new express.Router();
const Hospitals = require("../models/hospitals");
const bcrypt = require("bcrypt");
const Hospital = require("../db/Hospital");
const { query } = require("express");

router.get("/hospitalList", (req, res) => {
    res.render("additionals/hospitalsList");
});
router.get("/login", (req, res) => {
    res.render("auth/hospitalLogin", {
        path: "/hospitals/register",
    });
});
router.get("/register", (req, res) => {
    res.render("auth/hospitalRegistration");
});
router.get("/dashboard/:regNo", (req, res) => {
    const regNo = req.params.regNo;
    Hospital.findOne({where:{
        regNo:regNo
    }}).then(data=>{
        if(!data){
            res.redirect("/505");
            return ;
        }
        res.render("dashboard/hospitalDashboard",{data:data});
    })
    
});

router.post("/register", (req, res) => {
    const details = req.body;
    Hospital.create({
        hname: details.hname,
        regNo: details.regNo,
        city: details.city,
        state: details.state,
        pincode: details.pincode,
        government: details.government,
        specialityDep: details.Speciality,
        password: details.password,
    })
        .then((result) => {
            console.log(result);
            res.redirect(`/hospitals/dashboard/${result.regNo}`);
        })
        .catch((err) => {
            console.error(err.message);
        });
});
router.post("/login", (req, res) => {
    const regNo = req.body.regNo;
    const password = req.body.password;
    console.log(req.body)
    Hospital.findOne({
        where: { regNo: regNo },
    }).then((data) => {
        if(!data){
            res.render("error/incPass.ejs",{
                path:"/hospitals/login"
            });
            return ;
        }
        if (data.password === password) {
            res.redirect(`/hospitals/dashboard/${data.regNo}`);
        } else {
            res.render("error/incPass.ejs",{
                path:"/hospitals/login"
            });
        }
    });
});

module.exports = router;
