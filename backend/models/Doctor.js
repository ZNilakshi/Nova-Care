const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Store date as a string (e.g., "2025-02-21") or use Date type
  time: String, // Time slot (e.g., "9 AM - 12 PM")
  location: String, // Specific location
  availableSlots: Number, // Number of available slots per session
});


const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true }, // Changed to Number
  degrees: { type: String, required: true },
  languages: [{ type: String }], // Array of languages
  locations: [{ type: String }], // Array of locations
  description: { type: String, required: true },
  fee: { type: Number, required: true },
  photo: { type: String }, // Store image URL or path
  availability: [availabilitySchema], // Nested availability schema
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
