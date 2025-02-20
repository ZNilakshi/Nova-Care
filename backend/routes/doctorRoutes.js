const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Add a new doctor
router.post("/add", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log incoming data
    const { name, specialty, experience, degrees, languages, locations, description, fee } = req.body;

    if (!name || !specialty || !experience || !degrees || !languages || !locations || !description || !fee) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newDoctor = new Doctor(req.body);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully!", doctor: newDoctor });
  } catch (error) {
    console.error("Error in /add route:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Add or update availability for a doctor
router.post("/updateAvailability/:id", async (req, res) => {
  try {
    const { date, time, location, availableSlots } = req.body;
    
    if (!date || !time || !location || !availableSlots) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Add new availability
    doctor.availability.push({ date, time, location, availableSlots });

    await doctor.save();
    res.status(200).json({ message: "Availability updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Update doctor details
router.put("/update/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Doctor updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/updateAvailability/:id", async (req, res) => {
  try {
    const { availability } = req.body;

    if (!availability || !Array.isArray(availability)) {
      return res.status(400).json({ message: "Invalid availability data" });
    }

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.availability = availability; // Replace the entire availability array
    await doctor.save();

    res.status(200).json({ message: "Availability updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Backend (Express.js)


// Delete a doctor
router.delete("/delete/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
