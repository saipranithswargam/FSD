const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

    name: { type: String},

    email: { type: String},

    mobileNum: { type: String},

    emergencyContact: { type: String},

    medical: {
        height: {type: String},
        weight: {type: String},
        bloodGroup:{type: String}
    },

    address: {
        city: {type: String},
        state: {type: String},
        pincode: {type: String}
    },

    age: {type: Number},

    medicalInsuranceNo: {type: String},

    gender: { type: String, enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported'}},

    married: { type: String, enum: {
        values: ['yes', 'no'],
        message: '{VALUE} is not supported'}},

    allergies: { type: String},

    note: { type: String},

},{timestamps:true})

const Patients = new mongoose.model("Patients", patientSchema);

// const p1 = new Patients({
//     name: "test2",
//     email: "test2@gmail.com",
//     mobileNum: "9998099999",
//     emergencyContact: "8888778888",
//     medical: {
//         height: "184",
//         weight: "80",
//         bloodGroup: "O+"
//     },
//     address: {
//         city: "testCity",
//         state: "testState",
//         pincode: "000000"
//     },
//     age: 20,
//     medicalInsuranceNo: "123456789",
//     gender:"male",
//     married: "yes",
//     allergies: ["peanut"],
//     note: "nope"

// });

// p1.save();

module.exports = Patients;