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

module.exports = Router;
