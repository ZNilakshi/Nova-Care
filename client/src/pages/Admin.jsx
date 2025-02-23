import React, { useState ,useEffect ,  useCallback } from "react";
import "./AdminDashboard.css";


const AdminDashboard = () => {
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({
    name: "",
    specialty: "",
    experience: "",
    degrees: "",
    languages: [],
    locations: [],
    description: "",
    fee: "",
    photo: null,
  });
 
 // Fetch doctors from API
 const fetchDoctors = useCallback ( () => {
  fetch("http://localhost:5000/api/doctors")
    .then((res) => res.json())
    .then((data) => {
      // Format availability dates & times before setting state
      const formattedDoctors = data.map((doc) => ({
        ...doc,
        availability: doc.availability.map((slot) => ({
          ...slot,
          formattedDate: formatDate(slot.date),
          formattedTime: formatTime(slot.time),
        })),
      }));
      setDoctors(formattedDoctors);
    })
    .catch((err) => console.error(err));
 }, [setDoctors] );
 
useEffect(() => {
  fetchDoctors();
}, [fetchDoctors]);

  const [availability, setAvailability] = useState({
    doctorIndex: "",
    date: "",
    time: "",
    location: "",
    availableSlots: "",
  });

  const [editingDoctorIndex, setEditingDoctorIndex] = useState(null);
  const [editingAvailabilityIndex, setEditingAvailabilityIndex] = useState(null);

  
  // Format Date (YYYY-MM-DD → "Friday, Feb 21, 2025")
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format Time ("15:30" → "3:30 PM")
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    return new Date(0, 0, 0, hour, minute).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  // Handle Doctor Input Change
  const handleDoctorChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  // Handle Photo Upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);  // Match backend

    fetch("http://localhost:5000/api/doctors/uploadPhoto", {
        method: "POST",
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Uploaded file path:", data.filePath);
      setDoctor((prev) => ({
          ...prev,
          photo: `http://localhost:5000${data.filePath}`, // Ensure the correct URL
      }));
  })
  
    .catch((err) => console.error("Upload error:", err));
};


  // Handle Doctor Submission (Add / Update)
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
  
    if (editingDoctorIndex !== null) {
      // Get doctor ID
      const doctorId = doctors[editingDoctorIndex]._id;
  
      fetch(`http://localhost:5000/api/doctors/update/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
  
          // Update frontend state
          setDoctors((prevDoctors) =>
            prevDoctors.map((doc, index) =>
              index === editingDoctorIndex ? { ...doc, ...doctor } : doc
            )
          );
  
          setEditingDoctorIndex(null);
          resetDoctorForm();
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
          fetchDoctors(); // Fetch updated list
          resetDoctorForm();
        })
        .catch((err) => console.error(err));
    }
  };
  
  // Reset Doctor Form
  const resetDoctorForm = () => {
    setDoctor({
      name: "",
      specialty: "",
      experience: "",
      degrees: "",
      languages: [],
      locations: [],
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
      setAvailability({ doctorIndex: "", date: "",  time: "", location: "", availableSlots: "" });
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

      <div className="toggle-box" onClick={() => setShowDoctorForm(!showDoctorForm)}>
     
        {/* Doctor Details Form */}
        <h2>{editingDoctorIndex !== null ? "Edit Doctor Details" : "Register Doctor"}</h2>
       </div>
       {showDoctorForm && (
     
        <form onSubmit={handleDoctorSubmit} className="form-container">
          <div>
              <label>Name</label>
              <input name="name" value={doctor.name} onChange={handleDoctorChange} required />
            </div>
            {/* Specialty Dropdown */}
            <div>
              <label>Specialty</label>
              <select name="specialty" value={doctor.specialty} onChange={handleDoctorChange} required>
                <option value="">Select Specialty</option>
                {["Cardiology", "Neurology", "Oncology", "Gynecology", "Dermatology", "Endocrinology", "Nephrology"].map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
         {/* Experience */}
         <div>
              <label>Experience (Years)</label>
              <input type="number" name="experience" value={doctor.experience} onChange={handleDoctorChange} required />
            </div>

            <div>
              <label>Degrees</label>
              <input name="degrees" value={doctor.degrees} onChange={handleDoctorChange} required />
            </div>

            <div>
              <label>Languages</label>
              {["Sinhala", "English", "Tamil"].map((lang) => (
                <label key={lang} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={lang}
                    checked={doctor.languages.includes(lang)}
                    onChange={(e) => {
                      const newLanguages = e.target.checked
                        ? [...doctor.languages, lang]
                        : doctor.languages.filter((l) => l !== lang);
                      setDoctor({ ...doctor, languages: newLanguages });
                    }}
                  />
                  {lang}
                </label>
              ))}
            </div>
 {/* Location Dropdown */}
 <div>
  <label>Locations</label>
  {["Colombo", "Negombo", "Kalutara", "Gampaha"].map((loc) => (
    <label key={loc} className="checkbox-label">
      <input
        type="checkbox"
        value={loc}
        checked={doctor.locations.includes(loc)}
        onChange={(e) => {
          const newLocations = e.target.checked
            ? [...doctor.locations, loc]
            : doctor.locations.filter((l) => l !== loc);
          setDoctor({ ...doctor, locations: newLocations });
        }}
      />
      {loc}
    </label>
  ))}
</div>


            

            <div>
              <label>Description</label>
              <textarea name="description" value={doctor.description} onChange={handleDoctorChange} required />
            </div>

            <div>
              <label>Consultation Fee ($)</label>
              <input type="number" name="fee" value={doctor.fee} onChange={handleDoctorChange} required />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
              {doctor.photo && <img src={doctor.photo} alt="Doctor" className="doctor-photo" />}
            </div>

            <button type="submit">
              {editingDoctorIndex !== null ? "Update Doctor" : "Register Doctor"}
            </button>
          



          

        
          
        </form>
)}
 <div className="toggle-box" onClick={() => setShowAvailabilityForm(!showAvailabilityForm)}>
     
        {/* Availability Form */}
        <h2>{editingAvailabilityIndex !== null ? "Edit Availability" : "Add Availability"}</h2>
       </div>

       {showAvailabilityForm && (
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
          {/* Date Picker */}
  <label>Date:</label>
  <input type="date" name="date" onChange={handleAvailabilityChange} value={availability.date} required />

  {/* Time Picker */}
  <label>Time:</label>
  <input type="time" name="time" onChange={handleAvailabilityChange} value={availability.time} required />

  {/* Location Dropdown */}
  <label>Location:</label>
  <select name="location" onChange={handleAvailabilityChange} value={availability.location} required>
    <option value="">Select Location</option>
    {["Colombo", "Negombo", "Kalutara", "Gampaha"].map((loc) => (
      <option key={loc} value={loc}>
        {loc}
      </option>
    ))}
  </select>

  {/* Available Slots */}
  <label>Available Slots:</label>
  <input type="number" name="availableSlots" onChange={handleAvailabilityChange} value={availability.availableSlots} required />
  
          <button type="submit">
            {editingAvailabilityIndex !== null ? "Update Availability" : "Add Availability"}
          </button>
        </form>
       )}
        {/* Doctors List */}
        <h2>Doctors List</h2>
        <div className="doctors-list">
          {doctors.map((doc, index) => (
            <div key={index} className="doctor-card">
              <h3>{doc.name}</h3>
              <p><strong>Specialty:</strong> {doc.specialty}</p>
              <p><strong>Experience:</strong> {doc.experience} years</p>
              <p><strong>Degrees:</strong> {doc.degrees}</p>
              <p><strong>Languages:</strong> {doc.languages.join(", ")}</p>
              <p><strong>Locations:</strong> {doc.locations.join(", ") }</p>
              <p><strong>Description:</strong> {doc.description}</p>
              <p><strong>Fee:</strong> ${doc.fee}</p>
              {doc.photo && <img src={doc.photo} alt={doc.name} className="doctor-photo" />}

              {/* Availability Section */}
              <h4>Availability:</h4>
{doc.availability.length > 0 ? (
  doc.availability.map((slot, i) => (
    <p key={i} className="availability-item">
       <strong> Date:</strong> {slot.formattedDate } |
      <strong> Time:</strong> {slot.formattedTime} |
     
      <strong> Location:</strong> {slot.location} |
      <strong> Slots:</strong> {slot.availableSlots}
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


