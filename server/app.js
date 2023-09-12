require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const homeRoutes = require("./routes/index");
const patientRoutes = require("./routes/patients");
const hospitalRoutes = require("./routes/hospitals");
const doctorRoutes = require("./routes/doctors");
const adminRoutes = require("./routes/admin");
const app = express();
app.use(express.static("public"));
app.use(express.json());
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
app.use("/patients", patientRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/doctors", doctorRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 5050;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("database connected");
        app.listen(port, () => {
            console.log(`server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
