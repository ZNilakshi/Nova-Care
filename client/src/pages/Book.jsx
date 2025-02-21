import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Book = () => {
  const { id } = useParams(); // Get doctor ID from URL
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [filteredLocation, setFilteredLocation] = useState(null);
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [loading, ] = useState(true);

  // ✅ Fetch Doctor Details from Backend
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        console.log("Doctor ID from URL:", id); // Debugging
  
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
        if (!response.ok) throw new Error("Doctor not found");
  
        const data = await response.json();
        console.log("Fetched Doctor Data:", data); // Debugging
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
  
    fetchDoctor();
  }, [id]);
  
  if (loading) {
    return <p>Loading doctor details...</p>;
  }

  if (!doctor) {
    return <p>Doctor not found</p>;
  }

  // ✅ Filter Available Sessions by Location
  const filteredSessions = doctor.availability.filter((session) => {
    if (showAllSessions) {
      return session.availableSlots > 0;
    }
    if (filteredLocation) {
      return session.location === filteredLocation && session.availableSlots > 0;
    }
    return session.availableSlots > 0; // Default case
  });

  return (
    <section style={{ padding: "60px", background: "#f5f9fc", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "25px", flexWrap: "wrap" }}>
        
        {/* LEFT SIDE: Locations */}
        <div style={{ width: "30%", minWidth: "250px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "18px", color: "#0096C7", marginBottom: "15px" }}>📍 Available Locations</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            <li
              style={{
                fontSize: "16px",
                color: filteredLocation ? "" : "#555",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "10px 15px",
                borderRadius: "8px",
                transition: "0.3s",
                background: filteredLocation ? "" : "#85C1E9"
              }}
              onClick={() => setFilteredLocation(null)}
            >
              🔄 Show All Locations
            </li>
            {doctor.locations.map((location, index) => (
              <li
                key={index}
                style={{
                  fontSize: "16px",
                  color: filteredLocation === location ? "#0096C7" : "#333",
                  fontWeight: "bold",
                  cursor: "pointer",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  marginTop: "5px",
                  transition: "0.3s",
                  background: filteredLocation === location ? "#85C1E9" : "transparent"
                }}
                onClick={() => setFilteredLocation(location)}
              >
                🏥 {location}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE: Doctor Details & Sessions */}
        <div style={{ flex: "1", background: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
          {/* Doctor Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <img src={doctor.photo} alt={doctor.name} style={{ width: "90px", height: "90px", borderRadius: "50%", background: "#ddd", objectFit: "cover" }} />
            <div>
              <h2 style={{ fontSize: "22px", color: "#0096C7", margin: "0" }}>{doctor.name}</h2>
              <p style={{ fontSize: "16px", color: "#666", margin: "5px 0" }}>{doctor.specialty} - {doctor.experience} years</p>
              <p style={{ fontSize: "14px", color: "#888", margin: "0" }}><b>Degrees:</b> {doctor.degrees}</p>
              <p style={{ fontSize: "14px", color: "#888", margin: "0" }}><b>Languages:</b> {doctor.languages.join(", ")}</p>
            </div>
          </div>

          {/* Sessions */}
          <div style={{ borderBottom: "2px solid #ddd", paddingBottom: "15px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", color: "#0096C7", marginBottom: "12px", cursor: "pointer" }} onClick={() => setShowAllSessions(!showAllSessions)}>
              📅 Available Sessions
            </h3>

            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <div>
                    <p style={{ margin: "0", fontSize: "15px", color: "#444" }}>{session.date}</p>
                    <p style={{ margin: "0", fontSize: "18px", color: "#0096C7", fontWeight: "bold" }}>{session.time}</p>
                    <p style={{ margin: "0", fontSize: "14px", color: "#888" }}>🩺 Available Slots: <b>{session.availableSlots}</b></p>
                  </div>
                  <button
                    onClick={() =>
                      navigate("/appointment-form", {
                        state: {
                          doctorId: doctor._id,
                          doctorName: doctor.name,
                          date: session.date,
                          time: session.time,
                          doctorPhoto: doctor.photo,
                        },
                      })
                    }
                    style={{
                      background: "#0096C7",
                      color: "white",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#007bb5")}
                    onMouseOut={(e) => (e.target.style.background = "#0096C7")}
                  >
                    📅 Book
                  </button>
                </div>
              ))
            ) : (
              <p style={{ fontSize: "14px", color: "#888" }}>No available sessions for this location.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
