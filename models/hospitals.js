const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
    {
        hName: { type: String },

        regNo: { type: String },

        city: { type: String },
        state: { type: String },
        pincode: { type: String },

        password: { type: String },
        government: { type: String },

        specialityDep: { type: String },

        email: { type: String },
        
        doctorsWorking: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Doctors" },
        ],
        verified: { type: String },
    },
    { timestamps: true }
);

const Hospitals = mongoose.model("Hospitals", hospitalSchema);

module.exports = Hospitals;
