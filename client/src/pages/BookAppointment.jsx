import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const doctors = [
  {
    name: "Dr Venkata Rao Abbineni",
    specialty: "Internal Medicine",
    experience: "40 years",
    degrees: "MBBS, MD",
    languages: ["English", "Telugu"],
    locations: ["Hyderabad", "Delhi"],
    description: "Dr Venkata Rao Abbineni is an experienced Interventional based in Hyderabad.",
    photo: "/doctor1.jpg",
    availability: "Mon - Sat",
    time: "13:00 - 15:00",
  },
  {
    name: "Dr Priya Sharma",
    specialty: "Cardiology",
    experience: "25 years",
    degrees: "MBBS, MD",
    languages: ["English", "Hindi"],
    locations:["Delhi","bb"] ,
    description: "Dr Priya Sharma is an expert cardiologist practicing in Delhi.",
    photo: "/doctor2.jpg",
    availability: "Tue - Fri",
    time: "10:00 - 12:00",
  },
];

const DoctorAppointment = () => {
  const navigate = useNavigate();

  // State for filters
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Filtered doctors based on selected filters
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (selectedCity === "" || doctor.locations.includes(selectedCity)) &&
      (selectedSpecialty === "" || doctor.specialty === selectedSpecialty) &&
      (selectedLanguage === "" || doctor.languages.includes(selectedLanguage))
    );
  });

  return (
    <section style={{ padding: "30px", background: "#f8f9fa" }}>
      {/* Breadcrumb Navigation */}
      <div style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
        <span
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </span>{" "}
        &gt; <span style={{ fontWeight: "bold" }}>Book Appointment</span>
      </div>

      {/* Title */}
      <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
        Best Doctors in India
      </h2>

      {/* Main Layout */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "20px" }}>
        {/* Left Side - Filters */}
        <aside
          style={{
            flex: "1",
            minWidth: "250px",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>Filters</h3>

          {/* City Filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            <option value="">City</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi">Delhi</option>
          </select>

          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            <option value="">Specialty</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Cardiology">Cardiology</option>
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            <option value="">Language</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
          </select>

          {/* Clear Filters */}
          <p
            onClick={() => {
              setSelectedCity("");
              setSelectedSpecialty("");
              setSelectedLanguage("");
            }}
            style={{ color: "#007bff", cursor: "pointer", textAlign: "left", marginTop: "10px" }}
          >
            CLEAR FILTERS
          </p>
        </aside>

        {/* Right Side - Doctor List */}
        <div style={{ flex: "3", display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr",
                  gap: "15px",
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  alignItems: "center",
                  border: "1px solid #007bff",
                }}
              >
                {/* Doctor Photo */}
                <div style={{ textAlign: "center" }}>
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                  />
                </div>

                {/* Doctor Details */}
                <div>
                  <h4 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>{doctor.name}</h4>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#e3f2fd",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontSize: "14px",
                      color: "#007bff",
                      marginTop: "5px",
                    }}
                  >
                    {doctor.experience}, {doctor.specialty}
                  </span>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>{doctor.degrees}</p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Language:</strong> {doctor.languages.join(", ")}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                     <strong>📍 {Array.isArray(doctor.locations) ? doctor.locations.join(", ") : "Location not available"}</strong>
                     </p>

                  <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>{doctor.description}</p>
                </div>

                {/* Appointment Section */}
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ color: "#007bff", fontSize: "16px", marginBottom: "5px" }}>{doctor.availability}</h4>
                  <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>({doctor.time})</p>
                  <button
                  onClick={() => navigate(`/book/${index}`)}
                    style={{
                      background: "#ff7f50",
                      color: "white",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    BOOK AN APPOINTMENT
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors found matching the selected filters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorAppointment;
