const hospitalController = require("../controllers/hospital");

const express = require('express');

const isAuth = require("../middleware/is-auth");

const Router = express.Router();

Router.get("/login",hospitalController.getLogin);

Router.post("/login",hospitalController.postLogin);

Router.get("/register",hospitalController.getRegister);

Router.post("/register",hospitalController.postRegister);

Router.get("/dashboard",isAuth,hospitalController.getDashboard);

Router.get("/logout",isAuth,hospitalController.Logout);

module.exports = Router;
