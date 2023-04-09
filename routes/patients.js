const express = require("express");

const Router = express.Router();

const isAuth = require("../middleware/is-auth");

const PatientController = require("../controllers/patients");

Router.get("/login", PatientController.getLogin);

Router.post("/login", PatientController.postLogin);

Router.get("/register", PatientController.getRegister);

Router.post("/register", PatientController.postRegister);

Router.get("/dashboard", isAuth, PatientController.getDashboard);

Router.get("/logout", isAuth, PatientController.Logout);

Router.get("/hospitals", isAuth, PatientController.getHospitals);

Router.get("/medicalrecords",isAuth,PatientController.getMedicalRecords)

Router.get("/myappointments",isAuth,PatientController.getMyAppointments)

Router.get("/hospitals/filtered/:location/:speciality",isAuth,PatientController.getFiltered);

Router.post("/hospitals/filtered", isAuth, PatientController.postFiltered);

Router.get("/doctorlist/:id", isAuth, PatientController.getDoctorsList);

Router.get("/bookdoctor/:hospitalId/:doctorId", isAuth ,PatientController.getBookDoctor);

Router.post("/bookdoctor",isAuth,PatientController.postBookDoctor);

Router.post("/cancleRequestedAppointment",isAuth,PatientController.cancleRequestedAppointment)
module.exports = Router;
