const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment"); // Ensure correct model path

router.post("/appointment", async (req, res) => {
    try {
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();
      res.status(201).json({ message: "Appointment saved successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save appointment" });
    }
  });
  
module.exports = router;