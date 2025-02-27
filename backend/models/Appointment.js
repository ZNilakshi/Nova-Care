const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: String,
  doctorName: String,
  specialization: String,
  sessionLocation: String,
  date: String,
  time: String,
  doctorFee: Number,
  echannellingFee: Number,
  totalFee: Number,
  patient: {
    title: String,
    name: String,
    phone: String,
    nic: String,
    age: Number,
    spc: String,
  },
  paymentStatus: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
