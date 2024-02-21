const express = require("express");

const Router = express.Router();

const AdminController = require("../controllers/admin");

const isAuth = require("../middleware/verify");

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

Router.get("/doctors", isAuth, AdminController.getDoctors);

Router.get("/hospitals", isAuth, AdminController.getHospitals);

Router.get("/getGraphData", isAuth, AdminController.getGraphData)

Router.get("/checkAppointmentStatus", isAuth, AdminController.getAppointmentStatus);

Router.delete("/patients/:id", isAuth, AdminController.deletePatient);

Router.delete("/hospitals/:id", isAuth, AdminController.deleteHospital);

Router.delete("/doctors/:id", isAuth, AdminController.deleteDoctor);

Router.get("/patients/:id", isAuth, AdminController.getPatient)

Router.get("/hospitals/:id", isAuth, AdminController.getHospital)

Router.get("/doctors/:id", AdminController.getDoctor)

Router.get("/patients/appointments/:id", isAuth, AdminController.getPatientAppointments)

Router.get("/hospitals/appointments/:id", isAuth, AdminController.getHospitalAppointments)

Router.get("/doctors/appointments/:id", isAuth, AdminController.getDoctorAppointments)

module.exports = Router;
