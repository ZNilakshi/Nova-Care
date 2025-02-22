const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();
const multer = require("multer");
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB file size limit

/** 
 * @route POST /api/doctors/add
 * @desc Add a new doctor
 */

router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    console.log(req.body); // Text fields
    console.log(req.file); // Uploaded file

     const { name, specialty, experience, degrees, languages, locations, description, fee } = req.body;

    if (!name || !specialty || !experience || !degrees || !languages || !locations || !description || !fee) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Store image as Base64 (alternative: Upload to Cloudinary, S3, etc.)
    let photo = "";
    if (req.file) {
      photo = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const newDoctor = new Doctor({
      name,
      specialty,
      experience,
      degrees,
      languages,
      locations,
      description,
      fee,
      photo, // Save Base64 image
    });

    await newDoctor.save();
    res.status(201).json({ success: true, message: "Doctor added successfully!", doctor: newDoctor });
  } catch (error) {
    console.error("Error in /add route:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

/**
 * @route GET /api/doctors/:id
 * @desc Get a single doctor by ID
 */


router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route GET /api/doctors/
 * @desc Get all doctors
 */


router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @route PATCH /api/doctors/:id/decrease-slot
 * @desc Decrease available slots by 1 when an appointment is booked
 */

router.patch("/:doctorId/decrease-slot", async (req, res) => {
  try {
      const { doctorId } = req.params;
      const { sessionLocation, date, time } = req.body;

      console.log(`Received request to decrease slot for: ${doctorId}`);
      console.log("Request Body:", req.body);

      if (!doctorId || !sessionLocation || !date || !time) {
          return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      // 🔍 Fetch and log the doctor's availability before updating
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
          return res.status(404).json({ success: false, message: "Doctor not found." });
      }
      console.log("Doctor's Availability Before Update:", doctor.availability);

      // 🔄 Update query
      const updateResult = await Doctor.updateOne(
          { 
              _id: doctorId, 
              "availability.location": sessionLocation, 
              "availability.date": date, 
              "availability.time": time 
          },
          { $inc: { "availability.$.availableSlots": -1 } } // Decrease slot count by 1
      );

      console.log("Update Result:", updateResult);

      // 🔍 Fetch and log the doctor's availability after updating
      const updatedDoctor = await Doctor.findById(doctorId);
      console.log("Doctor's Availability After Update:", updatedDoctor.availability);

      if (updateResult.modifiedCount === 0) {
          return res.status(400).json({ success: false, message: "Slot not updated. Check session details." });
      }

      res.json({ success: true, message: "Slot updated successfully." });

  } catch (error) {
      console.error("Error updating slot:", error);
      res.status(500).json({ success: false, message: "Server error." });
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
