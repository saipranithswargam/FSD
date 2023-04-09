const mongoose = require("mongoose");

const MedicalRecords = new mongoose.Schema({
    hospitalId: { type: mongoose.Types.ObjectId, ref: "Hospitals" },
    doctorId: { type: mongoose.Types.ObjectId, ref: "Doctors" },
    patientId: { type: mongoose.Types.ObjectId, ref: "Patients" },
    
});
