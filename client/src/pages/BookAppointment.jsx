import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

const doctors = [
  {
    name: "Dr Venkata Rao Abbineni",
    specialty: "Internal Medicine",
    experience: "40 years",
    degrees: "MBBS, MD",
    languages: ["English", "Telugu"],
    location: "Apollo Health City, Jubilee Hills",
    description:
      "Dr Venkata Rao Abbineni is an experienced Interventional based in Hyderabad. Dr Venkata Rao Abbineni graduated from...",
    photo: "/doctor1.jpg", // Replace with actual image path
    availability: "Mon - Sat",
    time: "13:00 - 15:00",
  },
];

const DoctorAppointment = () => {
  
  const navigate = useNavigate();
  return (
    <section style={{ padding: "30px", background: "#f8f9fa" }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
        <span
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={() => navigate("/")} // Navigate to Home page
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
          
          {/* Dropdowns */}
          {["City", "Speciality", "Language", "Gender"].map((filter) => (
            <select
              key={filter}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <option>{filter}</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          ))}
          
          {/* Clear Filters */}
          <p style={{ color: "#007bff", cursor: "pointer", textAlign: "left", marginTop: "10px" }}>
            CLEAR FILTERS
          </p>
        </aside>

        {/* Right Side - Doctor List */}
        <div style={{ flex: "3", display: "flex", flexDirection: "column", gap: "20px" }}>
          {doctors.map((doctor, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr", // 3 columns: Image | Details | Appointment
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
                  <strong>📍 {doctor.location}</strong>
                </p>
                <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
                  {doctor.description}
                </p>
              </div>

              {/* Appointment Section */}
              <div style={{ textAlign: "center" }}>
                <h4 style={{ color: "#007bff", fontSize: "16px", marginBottom: "5px" }}>{doctor.availability}</h4>
                <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>({doctor.time})</p>
                <button
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
          ))}
        </div>

      </div>
    </section>
  );
};

export default DoctorAppointment;
