const express = require("express");

const Router = express.Router();

const doctorController = require("../controllers/doctor");

const isAuth = require("../middleware/is-auth");

Router.get("/login", doctorController.getLogin);

Router.post("/login", doctorController.postLogin);

Router.get("/register", doctorController.getRegister);

Router.post("/register", doctorController.postRegister);

Router.get("/dashboard", isAuth, doctorController.getDashboard);

Router.get("/logout", isAuth, doctorController.Logout);

Router.get("/addhospital", isAuth, doctorController.addHospital);

Router.post("/addhospital", isAuth, doctorController.postAddHospital);

Router.get("/removehospital", isAuth, doctorController.getRemoveHospital);

Router.post("/removehospital", isAuth, doctorController.postRemoveHospital);

Router.get(
    "/prescribe/:patientId/:hospitalId/:appointmentId",
    isAuth,
    doctorController.getPrescribe
);

Router.get(
    "/gethospitalsworkingfor",
    isAuth,
    doctorController.getHospitalsWorkingFor
);

Router.post("/prescribe", isAuth, doctorController.postPrescribe);

Router.get(
    "/bookedappointments",
    isAuth,
    doctorController.getBookedAppointments
);

Router.get(
    "/medicalrecords/:patientId",
    isAuth,
    doctorController.getMedicalRecords
);

Router.get(
    "/skipappointment/:appointmentId",
    isAuth,
    doctorController.removeAppointment
);

Router.post("/chosen", isAuth, doctorController.postChosen);

Router.get("/modify", isAuth, doctorController.getModify);

Router.post("/modify", isAuth, doctorController.postModify);

module.exports = Router;
