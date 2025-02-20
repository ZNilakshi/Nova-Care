const Doctor = require("../models/Doctor");

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Public
const createDoctor = async (req, res) => {
  try {
    const { name, specialty, experience, degrees, languages, locations, description, fee, photo } = req.body;

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
      availability: [],
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor", error });
  }
};

// @desc    Update doctor details
// @route   PUT /api/doctors/:id
// @access  Public
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    Object.assign(doctor, req.body); // Merge updates
    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Public
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.remove();
    res.json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error });
  }
};

module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor };
