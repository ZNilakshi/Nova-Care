const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  date: { type: String, required: true }, 
  time: String, 
  location: String, 
  availableSlots: Number, 
});


const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true }, 
  degrees: { type: String, required: true },
  languages: [{ type: String }], 
  locations: [{ type: String }], 
  description: { type: String, required: true },
  fee: { type: Number, required: true },
  photo: { type: String }, 
  availability: [availabilitySchema], 
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
