const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Types.ObjectId, ref: "Doctors" },
  patientId: { type: mongoose.Types.ObjectId, ref: "Patients" },
  rating: {type: Number}
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;