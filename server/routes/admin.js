const express = require("express");

const Router = express.Router();

const AdminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");

Router.get("/login", AdminController.getLogin);

Router.post("/login", AdminController.postLogin);

Router.get("/dashboard", isAuth, AdminController.getDashboard);

Router.get("/verifyhospital", isAuth, AdminController.getVerifyHospital);

Router.post("/verifyhospital", isAuth, AdminController.postVerifyHospital);

Router.post(
    "/verifyhospital/searchhospital",
    isAuth,
    AdminController.getVerifySearchHospitals
);

Router.post(
    "/verifydoctor/searchdoctor",
    isAuth,
    AdminController.getVerifySearchDoctors
);

Router.get("/verifieddoctors", isAuth, AdminController.getVerifiedDoctors);

Router.get("/verifiedhospitals", isAuth, AdminController.getVerifiedHospitals);

Router.get("/verifydoctor", isAuth, AdminController.getVerifyDoctor);

Router.post("/verifydoctor", isAuth, AdminController.postVerifyDoctor);

Router.post("/chosen", isAuth, AdminController.postChosen);

Router.get("/logout", isAuth, AdminController.Logout);

Router.get("/patients", isAuth, AdminController.getPatients);

module.exports = Router;
