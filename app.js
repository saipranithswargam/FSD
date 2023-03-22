require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const Doctor = require("./db/Doctor");
const Patient = require("./db/Patient");
const Hospital = require("./db/Hospital");
const MedicalRec = require("./db/MedicalRec");

Doctor.hasMany(Patient);
Patient.belongsTo(Doctor, { constraints: true, onDelete: "CASCADE" });
Hospital.hasMany(Doctor);
Doctor.belongsTo(Hospital, { constraints: true, onDelete: "CASCADE" });
Patient.hasMany(MedicalRec);
MedicalRec.belongsTo(Patient, { constraints: true, onDelete: "CASCADE" });
Doctor.hasMany(MedicalRec);
MedicalRec.belongsTo(Doctor, { constraints: true, onDelete: "CASCADE" });

//creation of chs database
const sequelize = require("./db/database");
sequelize.sync().then(() => {
    console.log("Database is ready");
});

const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const hospitalsRouter = require("./routes/hospitals");

// const Doctor = require("./db/Doctor");
// const Patient = require("./db/Patient");
// const Hospital = require("./db/Hospital");
Doctor.hasMany(Patient);
Patient.belongsTo(Doctor, { constraints: true, onDelete: "CASCADE" });
Hospital.hasMany(Doctor);
Doctor.belongsTo(Hospital, { constraints: true, onDelete: "CASCADE" });
Patient.hasMany(MedicalRec);
MedicalRec.belongsTo(Patient, { constraints: true, onDelete: "CASCADE" });
Doctor.hasMany(MedicalRec);
MedicalRec.belongsTo(Doctor, { constraints: true, onDelete: "CASCADE" });
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("home/home");
});
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/faqs",(req,res)=>{
    res.render("faqs")
})
app.get("/docList",(req,res)=>{
    res.render("listDoc");
})
app.get("/booked",(req,res)=>{
    res.render("booked");
})

app.get("/serverError",(req,res)=>{
    res.render("error/500")
})
app.get("/closeCase",(req,res)=>{
    res.render("caseClosed");
})
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/hospitals", hospitalsRouter);

app.use((req, res, next) => {
    res.status(404).render('error/404', { pageTitle: 'Page Not Found', path: '/404' });
  })
app.listen(port, () => {
    console.log("Running on port 3000");
});
