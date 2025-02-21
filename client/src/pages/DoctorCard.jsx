import React from "react";
import { useNavigate } from "react-router-dom";

// Store all doctor details here
export const doctors = [];

const DoctorCard = ({ doctor, index }) => {
  const navigate = useNavigate();

  return (
    <div
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
          style={{ width: "110px", height: "110px", borderRadius: "10%" }}
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
          <strong>📍 {doctor.locations.join(", ")}</strong>
        </p>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>{doctor.description}</p>
      </div>

      {/* Appointment Section */}
      <div style={{ textAlign: "center" }}>
        {/* Display Availability */}
{doctor.availability?.length > 0 ? (
  <div>
    {doctor.availability.map((slot, index) => (
      <p key={index} style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
        <strong>{slot.date}</strong> | {slot.time} | {slot.location} ({slot.availableSlots} slots)
      </p>
    ))}
  </div>
) : (
  <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>No availability data</p>
)}
 {/* Displaying Fee */}
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
          Fee: <span style={{ color: "#FFD700" }}>{doctor.fee}</span>
        </p>
        
        <button
          onClick={() => navigate(`/book/${doctor._id}`)}
          style={{
            background: "#0096C7",
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
  );
};

export default DoctorCard;
