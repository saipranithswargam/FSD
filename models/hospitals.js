const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({

    hName: {type: String},

    regNo: {type: String},

    address: {
        city: {type: String},
        state: {type: String},
        pincode: {type: String}
    },

    government: {type:String, enum: {
        values: ["yes","no","semi"],
        message: '{VALUE} is not supported'
    }},

    specialityDep: [{type:String}],

    doctorsWorking: [{type: mongoose.Schema.Types.ObjectId, ref: "Doctors"}]


},{timestamps:true})

const Hospitals = new mongoose.model("Hospitals", hospitalSchema);

// const h1 = new Hospitals({
//     hname: "Fortis",
//     regNo: "RDD756t577",
//     address: {
//         city: "Delhi",
//         state: "Delhi",
//         pincode: "323322"
//     },
//     government: "no",
//     specialityDep: ["Ortho","Dental","Physio"],
// })

// h1.doctorsWorking.push("64007d7a568d593cd0229410");

// h1.save();

module.exports = Hospitals;