const express = require("express");

const Router = express.Router();

const isAuth = require("../middleware/verify");

const PatientController = require("../controllers/patients");

const imageController = require("../util/image_upload");

Router.post("/login", PatientController.postLogin);

Router.post("/register", PatientController.postRegister);

Router.get("/logout", isAuth, PatientController.Logout);

Router.post("/hospitals", isAuth, PatientController.getHospitals);

Router.get("/medicalrecords", isAuth, PatientController.getMedicalRecords);

Router.post(
    "/medicalrecords/filtered",
    isAuth,
    PatientController.postFilteredMedicalRecords
);

Router.get(
    "/medicalrecords/filtered/:hospitalId/:doctorId",
    isAuth,
    PatientController.getFilteredMedicalRecords
);

Router.get(
    "/hospitals/filtered/:location/:speciality",
    isAuth,
    PatientController.getFiltered
);

Router.post("/hospitals/filtered", isAuth, PatientController.postFiltered);

Router.get("/hospitals/:radius/:longitude/:latitude/:speciality", PatientController.getNearByHospitals);

Router.get("/doctorlist/:id", isAuth, PatientController.getDoctorsList);

Router.get(
    "/bookdoctor/:hospitalId/:doctorId",
    isAuth,
    PatientController.getBookDoctor
);

Router.post("/bookdoctor", isAuth, PatientController.postBookDoctor);

Router.post(
    "/cancleRequestedAppointment",
    isAuth,
    PatientController.cancleRequestedAppointment
);

Router.get(
    "/medicalrecord/:medicalrecordId",
    isAuth,
    PatientController.getMedicalRecord
);

Router.get("/getratehospital", isAuth, PatientController.getConsultedHospitals);

Router.get("/rate/:hospitalId", isAuth, PatientController.getRating);

Router.post("/rate/hospital", isAuth, PatientController.postRating);

Router.get(
    "/requestedappointments",
    isAuth,
    PatientController.getRequestedAppointments
);

Router.get(
    "/confirmendappointments",
    isAuth,
    PatientController.getConfirmAppointments
);
Router.post("/chosen", isAuth, PatientController.postChosen);

Router.get("/modify", isAuth, PatientController.getModify)

Router.post("/modify", isAuth, PatientController.postModify)

Router.post("/upload", isAuth, imageController.uploadImage, PatientController.uploadImage)

module.exports = Router;
