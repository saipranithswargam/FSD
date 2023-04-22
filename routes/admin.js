const express = require("express");

const Router = express.Router();

const AdminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");

Router.get("/login", AdminController.getLogin);

Router.post("/login", AdminController.postLogin);

Router.get("/dashboard", isAuth, AdminController.getDashboard);

module.exports = Router;
