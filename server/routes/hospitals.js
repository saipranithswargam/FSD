const hospitalController = require("../controllers/hospital");

const express = require("express");

const isAuth = require("../middleware/verify");

const imageController = require("../util/image_upload");

const Router = express.Router();

Router.get("/login", hospitalController.getLogin);

Router.post("/login", hospitalController.postLogin);

Router.get("/register", hospitalController.getRegister);

Router.post("/register", hospitalController.postRegister);

Router.get("/dashboard", isAuth, hospitalController.getDashboard);

Router.get("/logout", isAuth, hospitalController.Logout);

Router.get("/patientstreated", isAuth, hospitalController.getTreated);

Router.get(
    "/bookedappointments",
    isAuth,
    hospitalController.getBookedAppointments
);

Router.post(
    "/acceptappointment",
    isAuth,
    hospitalController.postAcceptAppointment
);

Router.get(
    "/requestedappointments",
    isAuth,
    hospitalController.getRequestedAppointments
);

Router.post(
    "/resheduleappointment",
    isAuth,
    hospitalController.postRescheduleAppointment
);

Router.get(
    "/resheduleappointment/:appointmentId",
    isAuth,
    hospitalController.getResheduleAppointment
);

Router.post(
    "/requestedappointments/searchpatient",
    isAuth,
    hospitalController.postSearchPatientRequestedAppointment
);

Router.post(
    "/bookedappointments/searchpatient",
    isAuth,
    hospitalController.postSearchPatientBookedAppointment
);

Router.post("/chosen", isAuth, hospitalController.postChosen);

Router.get("/doctors", isAuth, hospitalController.getDoctors);

Router.post(
    "/patientstreated/searchpatient",
    isAuth,
    hospitalController.getSearchPatientTreated
);

Router.get("/removedoctor/:doctorId", isAuth, hospitalController.removeDoctor);

Router.get("/modify", isAuth, hospitalController.getmodify);

Router.post("/modify", isAuth, hospitalController.postModify);

Router.post("/upload", isAuth, imageController.uploadImage, hospitalController.uploadImage)

module.exports = Router;
