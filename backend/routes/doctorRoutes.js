const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const fs = require("fs");
const uploadDir = "uploads/doctors/";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/doctors/");
  },
  filename: (req, file, cb) => {
      cb(null, "doctor_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });



router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    console.log("📥 Incoming Request Data:", req.body);
    console.log("📂 Uploaded File:", req.file);

    const { name, specialty, experience, degrees, languages, locations, description, fee } = req.body;

    if (!name || !specialty || !experience || !degrees || !languages || !locations || !description || !fee) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

 
    const existingDoctor = await Doctor.findOne({ name, specialty });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor already exists" });
    }


    const photo = req.file ? `https://nova-care-production.up.railway.app/uploads/doctors/${req.file.filename}` : null;

    const newDoctor = new Doctor({
      name,
      specialty,
      experience,
      degrees,
      languages,
      locations,
      description,
      fee,
      photo,
    });

    await newDoctor.save();

    console.log(" Doctor Added:", newDoctor);
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



router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const moment = require("moment");

router.patch("/:doctorId/decrease-slot", async (req, res) => {
  try {
    const { doctorId } = req.params;
    let { sessionLocation, date, time } = req.body;

    console.log(` Received request to decrease slot for Doctor ID: ${doctorId}`);
    console.log("Raw Request Body:", req.body);

    if (!doctorId || !sessionLocation || !date || !time) {
      console.log("Missing required fields.");
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

   
    const formattedDate = moment(date, "ddd, MMM D, YYYY").format("YYYY-MM-DD");
    console.log(" Converted Date:", formattedDate);

   
    const formattedTime = moment(time, ["h:mm A", "HH:mm"]).format("HH:mm");
    console.log("Converted Time:", formattedTime);


    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      console.log("Doctor not found.");
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }

    console.log("🔍 Doctor's Availability Before Update:", doctor.availability);

  
    const matchingAvailability = doctor.availability.find(
      (slot) =>
        slot.date === formattedDate &&
        moment(slot.time, "HH:mm").format("HH:mm") === formattedTime &&
        slot.location === sessionLocation
    );

    if (!matchingAvailability) {
      console.log("No matching availability found.");
      return res.status(400).json({ success: false, message: "No matching availability found." });
    }

    console.log(" Found matching slot:", matchingAvailability);

    if (matchingAvailability.availableSlots <= 0) {
      console.log(" No available slots left.");
      return res.status(400).json({ success: false, message: "No available slots left." });
    }


    const newAppointmentTime = moment(formattedTime, "HH:mm").add(15, "minutes").format("HH:mm");
    console.log("⏳ New Appointment Time:", newAppointmentTime);


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

    console.log("Update Result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      console.log("Slot not updated. Check session details.");
      return res.status(400).json({ success: false, message: "Slot not updated. Check session details." });
    }

    res.json({ success: true, message: "Slot updated successfully.", newTime: newAppointmentTime });

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