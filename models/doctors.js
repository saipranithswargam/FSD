const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    name: { type: String},

    email: { type: String},

    mobileNum: { type: String},

    liscenceNo: { type: String },

    PracticeAddress: {
        city: {type: String},
        state: {type: String},
        pincode: {type: String}
    },

    DOB: {type: Date},

    experience: {type: Number},

    availability: {type: Number},

    medicalInsuranceNo: {type: String},

    gender: { type: String, enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported'}},

    treatment: { type: String, enum: {
        values: ['therapy', 'surgery','medication'],
        message: '{VALUE} is not supported'}},

    Speciality: [{ type: String}],

    note: { type: String},

    patientsCurrent: [{type: mongoose.Schema.Types.ObjectId, ref: "Patients"}],

    patientsHistory: [{type: mongoose.Schema.Types.ObjectId, ref: "Patients"}],

},{timestamps:true})

const Doctors = new mongoose.model("Doctors", doctorSchema);

// const d1 = new Doctors({
//     name: "doctor1",
//     email: "doctor1@gmail.com",
//     mobileNum: "9999999999",
//     liscenceNo: "654654654654",
//     PracticeAddress: {
//         city: "testCity",
//         state: "testState",
//         pincode: "000000"
//     },
//     experience: 5,
//     availability: 10,
//     medicalInsuranceNo: "123456789",
//     gender:"male",
//     treatment: "surgery",
//     Speciality: ["Ortho"],
//     note: "nope"

// });

// d1.patientsCurrent.push("640077b19adc2de5943936b5");

// d1.save();

module.exports = Doctors;