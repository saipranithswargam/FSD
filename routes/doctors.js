const express = require('express');

const Router = express.Router();

const doctorController = require("../controllers/doctor")

Router.get("/login",doctorController.getLogin);

Router.post("/login",doctorController.postLogin);

Router.get("/register",doctorController.getRegister);

Router.post("/register",doctorController.postRegister);

module.exports = Router;