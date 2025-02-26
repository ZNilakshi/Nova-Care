const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  nic: { type: String, required: true },
  age: { type: Number, required: true, min: 1 },
  spc: { type: String },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  specialization: { type: String, required: true },
  location: { type: String, required: true },
  doctorFee: { type: Number, required: true },
  totalFee: { type: Number, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
