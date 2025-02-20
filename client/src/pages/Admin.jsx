import React, { useState ,useEffect } from "react";
import "./AdminDashboard.css";


const AdminDashboard = () => {

  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({
    name: "",
    specialty: "",
    experience: "",
    degrees: "",
    languages: "",
    locations: "",
    description: "",
    fee: "",
    photo: null,
  });
 // Fetch doctors from API
 const fetchDoctors = () => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);


  const [availability, setAvailability] = useState({
    doctorIndex: "",
    days: "",
    time: "",
    location: "",
    availableSlots: "",
  });

  const [editingDoctorIndex, setEditingDoctorIndex] = useState(null);
  const [editingAvailabilityIndex, setEditingAvailabilityIndex] = useState(null);

  // Handle Doctor Input Change
  const handleDoctorChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  // Handle Photo Upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctor({ ...doctor, photo: URL.createObjectURL(file) });
    }
  };

  // Handle Doctor Submission (Add / Update)
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (editingDoctorIndex !== null) {
      fetch(`http://localhost:5000/api/doctors/update/${doctors[editingDoctorIndex]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          fetchDoctors(); // Refresh list
        })
        .catch((err) => console.error(err));
    } else {
      fetch("http://localhost:5000/api/doctors/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          fetchDoctors();
        })
        .catch((err) => console.error(err));
    }
    

    setDoctor({
      name: "",
      specialty: "",
      experience: "",
      degrees: "",
      languages: "",
      locations: "",
      description: "",
      fee: "",
      photo: null,
    });
  };

 // Edit Doctor Details (Only allowed fields)
 const handleEditDoctor = (index) => {
    const { name, specialty, experience, degrees, languages, locations, description, fee, photo } = doctors[index];
    setDoctor({ name, specialty, experience, degrees, languages, locations, description, fee, photo });
    setEditingDoctorIndex(index);

    fetch(`http://localhost:5000/api/doctors/update/${doctors[index]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setEditingDoctorIndex(null);
        })
        .catch((err) => console.error(err));
      
  };

  // Delete Doctor
  const handleDeleteDoctor = (index) => {
    const doctorId = doctors[index]._id;

    fetch(`http://localhost:5000/api/doctors/delete/${doctorId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchDoctors();
      })
      .catch((err) => console.error(err));
  };

  
  // Handle Availability Input Change
  const handleAvailabilityChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  };

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault();
    const doctorIndex = parseInt(availability.doctorIndex, 10);
  
    if (!isNaN(doctorIndex) && doctorIndex >= 0) {
      const doctorId = doctors[doctorIndex]._id;
  
      // Update UI immediately for a smoother experience
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor, index) => {
          if (index === doctorIndex) {
            const updatedAvailability =
              editingAvailabilityIndex !== null
                ? doctor.availability.map((slot, i) =>
                    i === editingAvailabilityIndex ? { ...availability } : slot
                  )
                : [...doctor.availability, { ...availability }];
  
            return { ...doctor, availability: updatedAvailability };
          }
          return doctor;
        })
      );
  
      // Send full availability array to backend
      try {
        let updatedAvailability = [...doctors[doctorIndex].availability];

if (editingAvailabilityIndex !== null) {
  updatedAvailability[editingAvailabilityIndex] = { ...availability };
} else {
  updatedAvailability.push({ ...availability });
}
     
  
        const response = await fetch(
          `http://localhost:5000/api/doctors/updateAvailability/${doctorId}`,
          {
            method: "PUT", // 🔥 Change from POST to PUT
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ availability: updatedAvailability }), // Send full array
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to save availability.");
        }
  
        const data = await response.json();
        console.log("Availability saved successfully:", data);
  
        fetchDoctors(); // Fetch updated list after saving
      } catch (error) {
        console.error("Error saving availability:", error);
      }
  
      // Reset form
      setAvailability({ doctorIndex: "", days: "", time: "", location: "", availableSlots: "" });
      setEditingAvailabilityIndex(null);
    }
  };
  


  // Edit Availability
  const handleEditAvailability = (doctorIndex, availIndex) => {
    setAvailability({ doctorIndex, ...doctors[doctorIndex].availability[availIndex] });
    setEditingAvailabilityIndex(availIndex);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Manage Doctors</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Doctor Details Form */}
        <h2>{editingDoctorIndex !== null ? "Edit Doctor Details" : "Register Doctor"}</h2>
        <form onSubmit={handleDoctorSubmit} className="form-container">
          {Object.keys(doctor).map((key) =>
            key !== "photo" ? (
              <div key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input name={key} value={doctor[key]} onChange={handleDoctorChange} />
              </div>
            ) : null
          )}

          <div>
            <label>Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {doctor.photo && <img src={doctor.photo} alt="Doctor" className="doctor-photo" />}
          </div>

          <button type="submit">
            {editingDoctorIndex !== null ? "Update Doctor" : "Register Doctor"}
          </button>
        </form>

        {/* Availability Form */}
        <h2>{editingAvailabilityIndex !== null ? "Edit Availability" : "Add Availability"}</h2>
        <form onSubmit={handleAvailabilitySubmit} className="form-container">
          <label>Doctor:</label>
          <select name="doctorIndex" onChange={handleAvailabilityChange} value={availability.doctorIndex}>
            <option value="">Select Doctor</option>
            {doctors.map((doc, index) => (
              <option key={index} value={index}>
                {doc.name}
              </option>
            ))}
          </select>
          <input name="days" placeholder="Days" onChange={handleAvailabilityChange} value={availability.days} />
          <input name="time" placeholder="Time" onChange={handleAvailabilityChange} value={availability.time} />
          <input name="location" placeholder="Location" onChange={handleAvailabilityChange} value={availability.location} />
          <input name="availableSlots" placeholder="Available Slots" onChange={handleAvailabilityChange} value={availability.availableSlots} />
          
          <button type="submit">
            {editingAvailabilityIndex !== null ? "Update Availability" : "Add Availability"}
          </button>
        </form>

        {/* Doctors List */}
        <h2>Doctors List</h2>
        <div className="doctors-list">
          {doctors.map((doc, index) => (
            <div key={index} className="doctor-card">
              <h3>{doc.name}</h3>
              <p><strong>Specialty:</strong> {doc.specialty}</p>
              <p><strong>Experience:</strong> {doc.experience} years</p>
              <p><strong>Degrees:</strong> {doc.degrees}</p>
              <p><strong>Languages:</strong> {doc.languages}</p>
              <p><strong>Location:</strong> {doc.locations}</p>
              <p><strong>Description:</strong> {doc.description}</p>
              <p><strong>Fee:</strong> ${doc.fee}</p>
              {doc.photo && <img src={doc.photo} alt={doc.name} className="doctor-photo" />}

              {/* Availability Section */}
              <h4>Availability:</h4>
              {doc.availability.length > 0 ? (
                doc.availability.map((slot, i) => (
                  <p key={i} className="availability-item">
                    {slot.days} | {slot.time} | {slot.location} | {slot.availableSlots} slots
                    <button onClick={() => handleEditAvailability(index, i)}>Edit</button>
                  </p>
                ))
              ) : (
                <p>No availability added</p>
              )}

              <div className="doctor-actions">
                <button onClick={() => handleEditDoctor(index)} className="edit-btn">Edit Details</button>
                <button onClick={() => handleDeleteDoctor(index)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


