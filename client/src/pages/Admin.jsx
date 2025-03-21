import React, { useState ,useEffect ,  useCallback } from "react";
import "./AdminDashboard.css";
import { Edit3, Trash2 } from "lucide-react";
import Modal from "../components/Modal";

const API_URL = "https://nova-care-production.up.railway.app";

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
 

 const fetchDoctors = useCallback ( () => {
  fetch(`${API_URL}/api/doctors`)
    .then((res) => res.json())
    .then((data) => {
     
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

  

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    return new Date(0, 0, 0, hour, minute).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  
  const handleDoctorChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);  

    fetch(`${API_URL}/api/doctors/uploadPhoto`, {
        method: "POST",
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Uploaded file path:", data.filePath);
      setDoctor((prev) => ({
          ...prev,
          photo: `${API_URL}${data.filePath}`, 
      }));
  })
  
    .catch((err) => console.error("Upload error:", err));
};


  
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
  
    if (editingDoctorIndex !== null) {
     
      const doctorId = doctors[editingDoctorIndex]._id;
      
      fetch(`${API_URL}/api/doctors/update/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchDoctors(); 
        resetDoctorForm();
        setEditingDoctorIndex(null); 
        setShowDoctorForm(false); 
      })
      .catch((err) => console.error(err));
    } else {
     
      fetch(`${API_URL}/api/doctors/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchDoctors(); 
        resetDoctorForm();
        setShowDoctorForm(false); 
      })
      .catch((err) => console.error(err));
    }
  };
  
  

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
  


 const handleEditDoctor = (index) => {
  const selectedDoctor = doctors[index];
  setDoctor({ ...selectedDoctor }); 
  setEditingDoctorIndex(index);
  setShowDoctorForm(true); 
};


 
  const handleDeleteDoctor = (index) => {
    const doctorId = doctors[index]._id;

    fetch(`${API_URL}/api/doctors/delete/${doctorId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchDoctors();
      })
      .catch((err) => console.error(err));
  };

  
  
  const handleAvailabilityChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  };

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault();
    const doctorIndex = parseInt(availability.doctorIndex, 10);
  
    if (!isNaN(doctorIndex) && doctorIndex >= 0) {
      const doctorId = doctors[doctorIndex]._id;
  
     
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
  
      
      try {
        let updatedAvailability = [...doctors[doctorIndex].availability];

if (editingAvailabilityIndex !== null) {
  updatedAvailability[editingAvailabilityIndex] = { ...availability };
} else {
  updatedAvailability.push({ ...availability });
}
 const response = await fetch(
          `${API_URL}/api/doctors/updateAvailability/${doctorId}`,
          {
            method: "PUT", 
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
  
        fetchDoctors(); 
      } catch (error) {
        console.error("Error saving availability:", error);
      }
  
      
      setAvailability({ doctorIndex: "", date: "",  time: "", location: "", availableSlots: "" });
      setEditingAvailabilityIndex(null);
    }
  };
  
  
  const handleEditAvailability = (doctorIndex, availIndex) => {
    setAvailability({ 
      doctorIndex: doctorIndex.toString(),  
      ...doctors[doctorIndex].availability[availIndex] 
    });
    setEditingAvailabilityIndex(availIndex);
    setShowAvailabilityForm(true); 
  };
  

 const openDoctorForm = () => setShowDoctorForm(true);
 const closeDoctorForm = () => setShowDoctorForm(false);

 
 const openAvailabilityForm = () => setShowAvailabilityForm(true);
 const closeAvailabilityForm = () => setShowAvailabilityForm(false);

  return (
    <div >
   

    
      <main >

      <button className="bu"  onClick={openDoctorForm} >
          Add  Doctor
        </button>
        <button  className="bu" onClick={openAvailabilityForm} >
          Manage Availability
        </button>
          <Modal isOpen={showDoctorForm} onClose={closeDoctorForm}>
          
    
      
   <form onSubmit={handleDoctorSubmit} className="form-container">
   <h2>{editingDoctorIndex !== null ? "Update Doctor" : "Register Doctor"}</h2>
 
   <div className="form-grid">
   
     <div className="form-group">
       <div className="floating-label">
         <input type="text" name="name" value={doctor.name} onChange={handleDoctorChange} required />
         <label>Doctor Name</label>
       </div>
     </div>
 
     
     <div className="form-group">
  <div className="floating-label">
    <select
      name="specialty"
      value={doctor.specialty}
      onChange={handleDoctorChange}
      required
    >
      <option value="" hidden></option>
      {["Cardiology", "Neurology", "Oncology", "Gynecology", "Dermatology", "Ophthalmology", "Endocrinology", "Nephrology"].map((spec) => (
        <option key={spec} value={spec}>{spec}</option>
      ))}
    </select>
    <label>Specialty</label>
  </div>
</div>
 
    
     <div className="form-group">
       <div className="floating-label">
         <input type="number" name="experience" value={doctor.experience} onChange={handleDoctorChange} required />
         <label>Experience (Years)</label>
       </div>
     </div>
 
  
     <div className="form-group">
       <div className="floating-label">
         <input name="degrees" value={doctor.degrees} onChange={handleDoctorChange} required />
         <label>Degrees</label>
       </div>
     </div>
 
    
     <div className="form-group full-width">
       <div className="floating-label">
         <textarea name="description" value={doctor.description} onChange={handleDoctorChange} required />
         <label>Description</label>
       </div>
     </div>
     <div className="form-group">
    <label>Languages</label>
    <div className="checkbox-group">
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
  </div>

  
  <div className="form-group">
    <label>Locations</label>
    <div className="checkbox-group">
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
  </div>

    
     <div className="form-group">
       <div className="floating-label">
         <input type="number" name="fee" value={doctor.fee} onChange={handleDoctorChange} required />
         <label>Consultation Fee (Rs.)</label>
       </div>
     </div>
 
    
     <div className="form-group">
       <label>Photo</label>
       <input type="file" accept="image/*" onChange={handlePhotoChange} />
       {doctor.photo && <img src={doctor.photo} alt="Doctor" className="doctor-photo-preview" />}
     </div>
   </div>
 
   <button type="submit" className="submit-btn">
     {editingDoctorIndex !== null ? "Update Doctor" : "Register Doctor"}
   </button>
 </form>
 
   


</Modal>

<Modal isOpen={showAvailabilityForm} onClose={closeAvailabilityForm}>
  
   <form onSubmit={handleAvailabilitySubmit} className="availability-form">
    <h2>{editingAvailabilityIndex !== null ? "Update Availability" : "Add Availability"}</h2>

    <div className="form-grid">
     
      <div className="form-group">
      <div className="floating-label">
        <select name="doctorIndex" onChange={handleAvailabilityChange} value={availability.doctorIndex} required>
          <option value=""></option>
          {doctors.map((doc, index) => (
            <option key={index} value={index}>
              {doc.name}
            </option>
          ))}
        </select>
        <label>Doctor</label>
        </div>
      </div>

     
      <div className="form-group">
        <div className="floating-label">
          <input type="date" name="date" onChange={handleAvailabilityChange} value={availability.date} required />
          <label>Date</label>
        </div>
      </div>

      
      <div className="form-group">
        <div className="floating-label">
          <input type="time" name="time" onChange={handleAvailabilityChange} value={availability.time} required />
          <label>Time</label>
        </div>
      </div>

      
      <div className="form-group">
      <div className="floating-label">
       
        <select name="location" onChange={handleAvailabilityChange} value={availability.location} required>
        <option value=""></option>
          {["Colombo", "Negombo", "Kalutara", "Gampaha"].map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <label>Location</label>
        </div>
      </div>

      
      <div className="form-group">
        <div className="floating-label">
          <input type="number" name="availableSlots" onChange={handleAvailabilityChange} value={availability.availableSlots} required />
          <label>Available Slots</label>
        </div>
      </div>
    </div>

    <button type="submit" className="submit-btn">
      {editingAvailabilityIndex !== null ? "Update Availability" : "Add Availability"}
    </button>
  </form>
</Modal>

      
   
        <div className="doctors-list">
      {doctors.map((doc, index) => (
        <div key={index} className="doctor-row">
         
          <div className="doctor-details">
  <div className="doctor-profile">
    {doc.photo && <img src={doc.photo} alt={doc.name} className="doctor-photo" />}
    <div className="doctor-info">
      <h3 className="doctor-name">{doc.name}</h3>
      <p className="doctor-specialty">{doc.specialty}</p>
      <p>{doc.description}</p>

    </div>
  </div>

  <div className="doctor-meta">
    <p><strong>Experience:</strong> {doc.experience} years</p>
    <p><strong>Degrees:</strong> {doc.degrees}</p>
    <p><strong>Languages:</strong> {doc.languages.join(", ")}</p>
    <p><strong>Locations:</strong> {doc.locations.join(", ")}</p>
       <p className="doctor-fee"><strong>Fee:</strong> Rs. {doc.fee}.00</p>
  
  </div>

  <div className="doctor-actions">
   <button onClick={() => handleEditDoctor(index)} className="edit-btn"><Edit3 /></button>
    <button onClick={() => handleDeleteDoctor(index)} className="delete-btn"><Trash2 /></button>
  </div>
</div>

             
              <div className="doctor-availability">
            <h4>Availability:</h4>
            {doc.availability.length > 0 ? (
              <div className={`availability-list ${doc.availability.length > 4 ? "scrollable" : ""}`}>
                {doc.availability.map((slot, i) => (
                  <div key={i} className="availability-item">
                    <p><strong>Date:</strong> {slot.formattedDate}</p>
                    <p><strong>Time:</strong> {slot.formattedTime}</p>
                    <p><strong>Location:</strong> {slot.location}</p>
                    <p><strong>Slots:</strong> {slot.availableSlots}</p>
                   <button onClick={() => handleEditAvailability(index, i)} className="edit-btn"><Edit3 /></button>
      </div>
                ))}
              </div>
            ) : (
              <p>No availability added</p>
            )}
          </div>
        </div>
      ))}
    </div>
      </main>
    </div>
  );
};


export default AdminDashboard;


