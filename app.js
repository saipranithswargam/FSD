require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const Patient = require("./models/patients");
const Doctor = require("./models/doctors");
const Hospital = require("./models/hospitals");
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.doctor && !req.session.hospital && !req.session.patient) {
        return next();
    }
    if (req.session.type === "patient") {
        Patient.findById(req.session.patient._id)
            .then((patient) => {
                req.patient = patient;
                next();
            })
            .catch((err) => console.log(err));
    }
    if (req.session.type === "doctor") {
        Doctor.findById(req.session.doctor._id)
            .then((doctor) => {
                req.doctor = doctor;
                next();
            })
            .catch((err) => console.log(err));
    }
    if (req.session.type === "hospital") {
        Hospital.findById(req.session.hospital._id)
            .then((hospital) => {
                req.hospital = hospital;
                next();
            })
            .catch((err) => console.log(err));
    }
});

const homeRoutes = require("./routes/index");
const patientRoutes = require("./routes/patients");
const hospitalRoutes = require("./routes/hospitals");
const doctorRoutes = require("./routes/doctors");
app.use(homeRoutes);
app.use("/patients", patientRoutes);
app.use("/hospitals",hospitalRoutes);
app.use("/doctors",doctorRoutes)
mongoose
    .connect(process.env.DB_URI)
    .then((result) => {
        app.listen(3000, () => {
            console.log("Connected to database !");
        });
    })
    .catch((err) => {
        console.log(err);
    });
