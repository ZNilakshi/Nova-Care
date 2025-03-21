import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://nova-care-production.up.railway.app";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredLocation, setFilteredLocation] = useState(null);
  const [showAllSessions, setShowAllSessions] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors/${id}`);
        if (!response.ok) {
          throw new Error("Doctor not found");
        }
        const data = await response.json();
        console.log("Doctor data:", data); 
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <p>Loading doctor details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!doctor) return <p>Doctor not found</p>;

  const filteredSessions = doctor.availability
    ? doctor.availability.filter((session) => {
        if (showAllSessions) {
          return session.availableSlots > 0;
        }
        if (filteredLocation) {
          return session.location === filteredLocation && session.availableSlots > 0;
        }
        return session.availableSlots > 0;
      })
    : [];

  return (
    <section style={{ padding: "10px",  background: "#f5f9fc", fontFamily: "'Poppins', sans-serif" ,  minHeight: "50vh",}}>
      <div style={{ maxWidth: "95%", margin: "80px auto", display: "flex", gap: "25px", flexWrap: "wrap" }}>
       
        <div style={{ width: "30%", minWidth: "250px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "18px", color: "#0096C7", marginBottom: "15px" }}>📍 Available Locations</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            <li
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "10px 15px",
                borderRadius: "8px",
                background: filteredLocation ? "" : "#85C1E9"
              }}
              onClick={() => setFilteredLocation(null)}
            >
              🔄 Show All Locations
            </li>
            {doctor.availability &&
              [...new Set(doctor.availability.map((session) => session.location))].map((location, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    background: filteredLocation === location ? "#85C1E9" : "transparent"
                  }}
                  onClick={() => setFilteredLocation(location)}
                >
                  🏥 {location}
                </li>
              ))}
          </ul>
        </div>


        <div style={{ flex: "1", background: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
      
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <img src={doctor.photo} alt={doctor.name} style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <h2 style={{ fontSize: "22px", color: "#0096C7", margin: "0" }}> {doctor.name}</h2>
              <p style={{ fontSize: "16px", color: "#666", margin: "5px 0" }}>
                {doctor.specialty || doctor.specialization || "Specialty not available"} 
              </p>
              <p style={{ fontSize: "14px", color: "#888", margin: "0" }}><b>Experience:</b> {doctor.experience} Years</p>
            
              <p style={{ fontSize: "14px", color: "#888", margin: "0" }}><b>Degrees:</b> {doctor.degrees}</p>
              <p style={{ fontSize: "14px", color: "#888", margin: "0" }}><b>Languages:</b> {doctor.languages?.join(", ") || "N/A"}</p>
              <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
                Fee: <span style={{ color: "black" }}>Rs .{doctor.fee}.00</span>
              </p>
            </div>
          </div>

       
          <div style={{ borderBottom: "2px solid #ddd", paddingBottom: "15px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", color: "#0096C7", marginBottom: "12px", cursor: "pointer" }} onClick={() => setShowAllSessions(!showAllSessions)}>
              📅 Available Sessions
            </h3>

            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, index) => {
       
                const dateObj = new Date(session.date);
                const formattedDate = isNaN(dateObj)
                  ? "Invalid Date"
                  : dateObj.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

               
                let formattedTime = "Invalid Time";
                if (session.time) {
                  const timeParts = session.time.split(":");
                  if (timeParts.length === 2) {
                    const [hour, minute] = timeParts;
                    formattedTime = new Date(1970, 0, 1, hour, minute).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });
                  }
                }

    return (
      <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #ddd" }}>
        <div>
          <p style={{ margin: "0", fontSize: "15px", color: "#444" }}>{formattedDate}</p>
          <p style={{ margin: "0", fontSize: "18px", color: "#0096C7", fontWeight: "bold" }}>{formattedTime}</p>
          <p style={{ margin: "0", fontSize: "14px", color: "#888" }}>🩺 Available Slots: <b>{session.availableSlots}</b></p>
          <p style={{ margin: "0", fontSize: "14px", color: "#888" }}>📍 Location: <b>{session.location}</b></p>
        </div>
        <button
          onClick={() => navigate("/appointment-form", {
            state: {
              doctorId: doctor._id,
              doctorName: doctor.name,
              date: formattedDate,
              time: formattedTime,
              doctorPhoto: doctor.photo,
              location: session.location,
              specialization: doctor.specialty,
              doctorFee: Number(doctor.fee)
            }
          })}
          style={{
            background: "#0096C7",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          📅 Book
        </button>
      </div>
    );
  })
) : (
  <p style={{ fontSize: "14px", color: "#888" }}>No available sessions.</p>
)}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
