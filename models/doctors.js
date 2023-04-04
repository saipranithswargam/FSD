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

    gender: { type: String, enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported'}},

    treatment: { type: String, enum: {
        values: ['therapy', 'surgery','medication'],
        message: '{VALUE} is not supported'}},

    Speciality: [{ type: String}],

    note: { type: String},

    hospitalsWorkingFor : [{type:mongoose.Types.ObjectId}],

},{timestamps:true})

const Doctors = mongoose.model("Doctors", doctorSchema);


module.exports = Doctors;