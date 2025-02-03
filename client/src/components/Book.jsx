import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../pages/DoctorCard"; // Import doctors from DoctorCard.js

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors[id]; // Get doctor details by ID

  const [filteredLocation, setFilteredLocation] = useState(null);
  const [showAllSessions, setShowAllSessions] = useState(false);

  if (!doctor) {
    return <p>Doctor not found</p>;
  }

  const filteredSessions = showAllSessions
    ? doctor.sessions.filter((session) => session.status === "Available")
    : filteredLocation
    ? doctor.sessions.filter((session) => session.location === filteredLocation)
    : doctor.sessions;

  return (
    <section style={{ padding: "30px", background: "#f8f9fa", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{ fontSize: "14px", color: "#666", marginBottom: "15px", cursor: "pointer" }}
        onClick={() => navigate(-1)}
      >
        ← Back to Doctors
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <img src={doctor.photo} alt={doctor.name} style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#ccc" }} />
          <div>
            <h2 style={{ fontSize: "20px", color: "#c93e3e", margin: "0" }}>{doctor.name}</h2>
            <p style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>{doctor.specialty} - {doctor.experience}</p>
            <p style={{ fontSize: "14px", color: "#888", margin: "0" }}><b>Degrees:</b> {doctor.degrees}</p>
            <p style={{ fontSize: "14px", color: "#888", margin: "0" }}><b>Languages:</b> {doctor.languages.join(", ")}</p>
          </div>
        </div>

        <div style={{ borderBottom: "2px solid #ddd", paddingBottom: "10px", marginBottom: "15px" }}>
          <h3 style={{ fontSize: "16px", color: "#444", marginBottom: "10px", cursor: "pointer" }} onClick={() => setShowAllSessions(!showAllSessions)}>
            📍 Available Sessions
          </h3>

          {filteredSessions.map((session, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ddd" }}>
              <div>
                <p style={{ margin: "0", fontSize: "14px", color: "#444" }}>{session.date}</p>
                <p style={{ margin: "0", fontSize: "18px", color: "#c93e3e", fontWeight: "bold" }}>{session.day} {session.time}</p>
                <p style={{ margin: "0", fontSize: "14px", color: "#888" }}>🩺 Available Slots: <b>{session.availableSlots}</b></p>
              </div>
              {session.status === "Holiday" ? (
                <button style={{ background: "#f0ad4e", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "not-allowed" }}>Holiday</button>
              ) : (
                <button
                  onClick={() => navigate("/appointment-form", { state: { doctorName: doctor.name, date: session.date, time: session.time, doctorPhoto: doctor.photo } })}
                  style={{ background: "#d9534f", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                  📅 Book
                </button>
              )}
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: "16px", color: "#444", marginBottom: "10px" }}>📍 Available Locations</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {doctor.locations.map((location, index) => (
              <li key={index} style={{ fontSize: "14px", color: "#c93e3e", marginBottom: "5px", cursor: "pointer" }} onClick={() => setFilteredLocation(location)}>
                🏥 {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Book;
