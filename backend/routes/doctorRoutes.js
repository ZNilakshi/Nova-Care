const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer Storage for Doctor Photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/doctors/");
  },
  filename: (req, file, cb) => {
      cb(null, "doctor_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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

    // Store image 
    let photo = "";
        if (req.file) {
            photo = `/uploads/doctors/${req.file.filename}`;
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
      photo: req.file ? `https://nova-care-production.up.railway.app/uploads/doctors/${req.file.filename}` : null,
    });

    await newDoctor.save();
    res.status(201).json({ success: true, message: "Doctor added successfully!", doctor: newDoctor });
  } catch (error) {
    console.error("Error in /add route:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});


router.post("/uploadPhoto", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  res.json({
    success: true,
    message: "File uploaded successfully",
    filePath: `/uploads/doctors/${req.file.filename}`,
  });
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

const moment = require("moment");

router.patch("/:doctorId/decrease-slot", async (req, res) => {
  try {
    const { doctorId } = req.params;
    let { sessionLocation, date, time } = req.body;

    console.log(`📥 Received request to decrease slot for Doctor ID: ${doctorId}`);
    console.log("📥 Raw Request Body:", req.body);

    if (!doctorId || !sessionLocation || !date || !time) {
      console.log("❌ Missing required fields.");
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // Convert Date Format
    const formattedDate = moment(date, "ddd, MMM D, YYYY").format("YYYY-MM-DD");
    console.log("📆 Converted Date:", formattedDate);

    // Convert Time Format
    const formattedTime = moment(time, ["h:mm A", "HH:mm"]).format("HH:mm");
    console.log("⏰ Converted Time:", formattedTime);

    // Fetch doctor availability
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      console.log("❌ Doctor not found.");
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }

    console.log("🔍 Doctor's Availability Before Update:", doctor.availability);

    // Find the matching availability slot
    const matchingAvailability = doctor.availability.find(
      (slot) =>
        slot.date === formattedDate &&
        moment(slot.time, "HH:mm").format("HH:mm") === formattedTime &&
        slot.location === sessionLocation
    );

    if (!matchingAvailability) {
      console.log("❌ No matching availability found.");
      return res.status(400).json({ success: false, message: "No matching availability found." });
    }

    console.log("✅ Found matching slot:", matchingAvailability);

    if (matchingAvailability.availableSlots <= 0) {
      console.log("❌ No available slots left.");
      return res.status(400).json({ success: false, message: "No available slots left." });
    }

    // Add 15 minutes to the appointment time
    const newAppointmentTime = moment(formattedTime, "HH:mm").add(15, "minutes").format("HH:mm");
    console.log("⏳ New Appointment Time:", newAppointmentTime);

    // Update slot count and time
    const updateResult = await Doctor.updateOne(
      {
        _id: doctorId,
        "availability.date": formattedDate,
        "availability.time": formattedTime,
        "availability.location": sessionLocation,
      },
      {
        $inc: { "availability.$.availableSlots": -1 },
        $set: { "availability.$.time": newAppointmentTime },
      }
    );

    console.log("📌 Update Result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      console.log("❌ Slot not updated. Check session details.");
      return res.status(400).json({ success: false, message: "Slot not updated. Check session details." });
    }

    res.json({ success: true, message: "Slot updated successfully.", newTime: newAppointmentTime });

  } catch (error) {
    console.error("❌ Error updating slot:", error);
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
