const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: { type: String },

        email: { type: String },

        mobileNum: { type: String },

        password: { type: String },

        emergencyContact: { type: String },

        height: { type: String },
        weight: { type: String },
        bloodGroup: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },

        age: { type: Number },

        medicalInsuranceNo: { type: String },

        gender: {
            type: String,
            enum: {
                values: ["male", "female", "other"],
                message: "{VALUE} is not supported",
            },
        },

        married: {
            type: String,
            enum: {
                values: ["yes", "no"],
                message: "{VALUE} is not supported",
            },
        },

        allergies: { type: String },

        medicalRecords: [
            {
                doctorId: mongoose.Types.ObjectId,
                hospitalId: mongoose.Types.ObjectId,
                prescription: mongoose.Types.ObjectId,
            },
        ],
    },
    { timestamps: true }
);

const Patients = mongoose.model("Patients", patientSchema);

module.exports = Patients;
