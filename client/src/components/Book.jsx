import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    sessions: [
      { date: "February 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Hyderabad" },
      { date: "February 07, 2025", day: "FRI", time: "13:00 - 15:00", status: "Available", location: "Delhi" },
      { date: "February 09, 2025", day: "SUN", time: "13:00 - 15:00", status: "Holiday", location: "Hyderabad" },
    ],
  },
  {
    name: "Dr Priya Sharma",
    specialty: "Cardiology",
    experience: "25 years",
    degrees: "MBBS, MD",
    languages: ["English", "Hindi"],
    locations: ["Delhi", "Bangalore"],
    description: "Dr Priya Sharma is an expert cardiologist practicing in Delhi.",
    photo: "/doctor2.jpg",
    sessions: [
      { date: "February 06, 2025", day: "THU", time: "10:00 - 12:00", status: "Available", location: "Delhi" },
      { date: "February 08, 2025", day: "SAT", time: "10:00 - 12:00", status: "Available", location: "Bangalore" },
      { date: "February 10, 2025", day: "MON", time: "10:00 - 12:00", status: "Holiday", location: "Delhi" },
    ],
  },
];

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors[id];

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
              </div>
              {session.status === "Holiday" ? (
                <button style={{ background: "#f0ad4e", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "not-allowed" }}>Holiday</button>
              ) : (
                <button
  onClick={() => navigate("/appointment-form", { state: { doctorName: doctor.name, date: session.date, time: session.time } })}
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

export default BookAppointment;
