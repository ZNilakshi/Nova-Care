const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  days: String,
  time: String,
  location: String,
  availableSlots: Number,
});

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: String,
  degrees: String,
  languages: String,
  locations: String,
  description: String,
  fee: Number,
  photo: String, // Store image URL or path
  availability: [availabilitySchema],
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
