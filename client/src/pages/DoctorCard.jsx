import React from "react";
import { useNavigate } from "react-router-dom";

// Store all doctor details here
export const doctors = [
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
    fee: "₹800", // Added fee
    sessions: [
      { date: "February 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Hyderabad", availableSlots: 5 },
      { date: "February 07, 2025", day: "FRI", time: "13:00 - 15:00", status: "Available", location: "Delhi", availableSlots: 3 },
      { date: "February 09, 2025", day: "SUN", time: "13:00 - 15:00", status: "Holiday", location: "Hyderabad", availableSlots: 0 },
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
    availability: "Tue - Fri",
    time: "10:00 - 12:00",
    fee: "₹1000", // Added fee
    sessions: [
      { date: "February 06, 2025", day: "THU", time: "10:00 - 12:00", status: "Available", location: "Delhi", availableSlots: 4 },
      { date: "February 08, 2025", day: "SAT", time: "10:00 - 12:00", status: "Available", location: "Bangalore", availableSlots: 2 },
      { date: "February 10, 2025", day: "MON", time: "10:00 - 12:00", status: "Holiday", location: "Delhi", availableSlots: 0 },
    ],
  },
];

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
          <strong>📍 {doctor.locations.join(", ")}</strong>
        </p>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>{doctor.description}</p>
      </div>

      {/* Appointment Section */}
      <div style={{ textAlign: "center" }}>
        <h4 style={{ color: "#007bff", fontSize: "16px", marginBottom: "5px" }}>{doctor.availability}</h4>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>({doctor.time})</p>
        {/* Displaying Fee */}
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
          Fee: <span style={{ color: "#ff7f50" }}>{doctor.fee}</span>
        </p>
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
  );
};

export default DoctorCard;
