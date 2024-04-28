require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const verify = require('./middleware/verify');
const homeRoutes = require("./routes/index");
const patientRoutes = require("./routes/patients");
const hospitalRoutes = require("./routes/hospitals");
const doctorRoutes = require("./routes/doctors");
const adminRoutes = require("./routes/admin");
const Patients = require("./models/patients");
const Hospitals = require("./models/hospitals");
const Doctors = require("./models/doctors");
const Admin = require("./models/admin");
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path')
const app = express();
const bcrypt = require('bcrypt');
app.use(express.static("public"));
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static('uploads'));
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://golden-zabaione-725504.netlify.app",
            "http://127.0.0.1:5500",
            "*",
        ],
        methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

var accessLogStream = rfs.createStream("CHS", { interval: '2h', path: path.join(__dirname, 'log') })

app.use(morgan('combined', { stream: accessLogStream }))

app.get("/check", verify, async (req, res) => {
    if (req._type === "patients") {
        let patients = null;
        try {
            patients = await Patients.findOne({ _id: req._id });
            console.log(patients);
            if (!patients) {
                return res.status(404).json({
                    message: "User Not Found",
                });
            }
            patients.type = "patients";
            var modified_patients = { ...patients._doc, type: "patients" };
            return res.status(200).json(modified_patients);
        }
        catch {
            return res.status(400).send('error finding patients!');
        }
    }
    if (req._type === "doctors") {
        let user = null;
        try {
            user = await Doctors.findById(req._id).exec();
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found",
                });
            }
            var modified_user = { ...user._doc, type: "doctors" };
            console.log(modified_user);
            return res.status(200).json(modified_user);
        } catch {
            return res.status(400).send('error finding user!')
        }
    }
    if (req._type === "hospitals") {
        let hospital = null;
        try {
            hospital = await Hospitals.findById(req._id).exec();
            if (!hospital) {
                return res.status(404).json({
                    message: "hospital Not Found",
                });
            }
            var modified_hospital = { ...hospital._doc, type: "hospitals" };
            console.log(modified_hospital);
            return res.status(200).json(modified_hospital);
        } catch {
            return res.status(400).send('error finding hospital!')
        }
    }
    if (req._type === "admin") {
        let admin = null;
        try {
            admin = await Admin.findById(req._id).exec();
            if (!admin) {
                return res.status(404).json({
                    message: "admin Not Found",
                });
            }
            var modified_admin = { ...admin._doc, type: "admin" };
            console.log(modified_admin);
            return res.status(200).json(modified_admin);
        } catch {
            return res.status(400).send('error finding hospital!')
        }
    }
});
app.use("/patients", patientRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/doctors", doctorRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5050;

mongoose
    .connect(process.env.MONGO_URI)
    // .connect("mongodb://localhost:27017")
    .then(() => {
        // const mongoClient = mongoose.connection.getClient();
        // mongoClient.db().collection('hospitals').createIndex({ location: '2dsphere' });
        // console.log("database connected");
        app.listen(port, () => {
            console.log(`server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
