const express = require('express');

const Router = express.Router();

const isAuth = require("../middleware/is-auth");

const PatientController = require("../controllers/patients");

Router.get("/login",PatientController.getLogin);

Router.post("/login",PatientController.postLogin);

Router.get("/register",PatientController.getRegister);

Router.post("/register",PatientController.postRegister);

Router.get("/dashboard",isAuth,PatientController.getDashboard);

Router.get("/logout",isAuth,PatientController.Logout);

module.exports = Router;