import React from "react";
import { useNavigate } from "react-router-dom";

// Store all doctor details here
export const doctors = [
  {
    name: "Dr Dilan Perera",
    specialty: "Cardiology",
    experience: "40 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["Kalutara","Gampaha", "Colombo"],
    description: "Dr Dilan Perera is an experienced Interventional based in Gampaha.",
    photo: "/dilan.jpg",
    availability: "Mon - Fri",
    time: "13:00 - 15:00",
    fee: "Rs. 1000", // Added fee
    sessions: [
      { date: "March 05, 2025", day: "MON", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "TUE", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "THU", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 09, 2025", day: "FRI", time: "13:00 - 15:00", status: "Available", location: "Kalutara", availableSlots: 5 },
    
    ],
  },
  {
    name: "Dr Kasun Fernando",
    specialty: "Neurology",
    experience: "30 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["kalutara","Gampaha", "Negombo","Colombo"],
    description: "Dr Kasun Fernando is an experienced Interventional based in Negombo.",
    photo: "/kasun.jpeg",
    availability: "Mon - Sat",
    time: "9:00 - 12:00",
    fee: "Rs. 1200", // Added fee
    sessions: [
      { date: "March 05, 2025", day: "MON", time: "9:00 - 12:00", status: "Available", location: "Colombo", availableSlots: 8 },
      { date: "March 07, 2025", day: "TUE", time: "9:00 - 12:00", status: "Available", location: "Gampaha", availableSlots: 8 },
      { date: "March 05, 2025", day: "WED", time: "9:00 - 12:00", status: "Available", location: "Colombo", availableSlots: 8 },
      { date: "March 07, 2025", day: "THU", time: "9:00 - 12:00", status: "Available", location: "Gampaha", availableSlots: 8 },
      { date: "March 09, 2025", day: "FRI", time: "9:00 - 12:00", status: "Available", location: "Kalutara", availableSlots: 0 },
    { date: "March 09, 2025", day: "SAT", time: "9:00 - 12:00", status: "Holiday", location: "Kalutara", availableSlots: 0 },
    ],
  },
  {
    name: "Dr Isuru Jayawardana",
    specialty: "Oncology",
    experience: "25 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["kalutara","Gampaha", "Colombo"],
    description: "Dr Isuru Jayawardana is an experienced Interventional based in Kalutara.",
    photo: "/isuru.jpg",
    availability: "Mon - Wed",
    time: "13:00 - 15:00",
    fee: "Rs. 800", // Added fee
    sessions: [
      { date: "March 05, 2025", day: "MON", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "TUE", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "THU", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 09, 2025", day: "FRI", time: "13:00 - 15:00", status: "Holiday", location: "Kalutara", availableSlots: 0 },
 ],
  },
  {
    name: "Dr Malinda kahagalla",
    specialty: "Dermatology",
    experience: "26 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["kalutara","Gampaha", "Colombo"],
    description: "Dr Malinda kahagalla is an experienced Interventional based in Colombo.",
    photo: "/malinda.jpg",
    availability: "Mon - Fri",
    time: "13:00 - 15:00",
    fee: "Rs. 1100", // Added fee
    sessions: [
      { date: "February 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "February 07, 2025", day: "FRI", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 3 },
      { date: "February 07, 2025", day: "FRI", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 3 },
      { date: "February 09, 2025", day: "SUN", time: "13:00 - 15:00", status: "Holiday", location: "Kalutara", availableSlots: 0 },
      { date: "February 09, 2025", day: "SUN", time: "13:00 - 15:00", status: "Holiday", location: "Kalutara", availableSlots: 0 },
    ],
  },
  {
    name: "Dr Hasun Perera",
    specialty: "Gynecology",
    experience: "30 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["Kalutara","Gampaha", "Colombo"],
    description: "Dr Hasun Perera is an experienced Interventional based in Colombo.",
    photo: "/hasun.jpg",
    availability: "Mon - Sat",
    time: "13:00 - 15:00",
    fee: "Rs. 1000", // Added fee
    sessions: [
      { date: "March 05, 2025", day: "MON", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "TUE", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "THU", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 09, 2025", day: "FRI", time: "13:00 - 15:00", status: "Holiday", location: "Colombo", availableSlots: 0 },
 ],
  },
  {
    name: "Dr Nimesha Perera",
    specialty: "Ophthalmology",
    experience: "28 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["Kalutara","Gampaha", "Colombo"],
    description: "Dr Nimesha Perera is an experienced Interventional based in Colombo.",
    photo: "/nimesha.png",
    availability: "Mon - Sat",
    time: "13:00 - 15:00",
    fee: "Rs. 1100", // Added fee
    sessions: [
      { date: "March 05, 2025", day: "MON", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "TUE", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "THU", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 09, 2025", day: "FRI", time: "13:00 - 15:00", status: "Holiday", location: "Kalutara", availableSlots: 0 },
 ],
  },
  {
    name: "Dr Malshika Insari",
    specialty: "Endocrinology",
    experience: "25 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["Kalutara","Gampaha", "Colombo"],
    description: "Dr Dilan Perera is an experienced Interventional based in Colombo.",
    photo: "/malshika.png",
    availability: "Mon - Sat",
    time: "13:00 - 15:00",
    fee: "Rs. 1300", // Added fee
    sessions: [
      { date: "March 05, 2025", day: "MON", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "TUE", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "THU", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 09, 2025", day: "FRI", time: "13:00 - 15:00", status: "Holiday", location: "Kalutara", availableSlots: 0 },
 ],
  },
  {
    name: "Dr Shanika Perera",
    specialty: "Nephrology",
    experience: "27 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["kalutara","Gampaha", "Colombo"],
    description: "Dr Shanika Perera is an experienced Interventional based in Negombo.",
    photo: "/shanika.png",
    availability: "Mon - Sat",
    time: "13:00 - 15:00",
    fee: "Rs. 800", // Added fee
    sessions: [
      { date: "March 05, 2025", day: "MON", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "TUE", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 05, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "March 07, 2025", day: "THU", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "March 09, 2025", day: "FRI", time: "13:00 - 15:00", status: "Holiday", location: "Kalutara", availableSlots: 0 },
],
  },
  {
    name: "Dr Dasuni Perera",
    specialty: "Cardiology",
    experience: "25 years",
    degrees: "MBBS, MD",
    languages: ["English", "Sinhala"],
    locations: ["kalutara","Gampaha", "Colombo"],
    description: "Dr Dasuni Perera is an experienced Interventional based in Gampaha.",
    photo: "/dasuni.jpg",
    availability: "Mon - Wed",
    time: "13:00 - 15:00",
    fee: "Rs. 800", // Added fee
    sessions: [
      { date: "February 05, 2025", day: "MON", time: "13:00 - 15:00", status: "Available", location: "Colombo", availableSlots: 5 },
      { date: "February 07, 2025", day: "TUE", time: "13:00 - 15:00", status: "Available", location: "Gampaha", availableSlots: 5 },
      { date: "February 09, 2025", day: "WED", time: "13:00 - 15:00", status: "Available", location: "Kalutara", availableSlots: 5 },
    ],
  },
  
  {
    name: "Dr Amila Siriwardana",
    specialty: "Cardiology",
    experience: "45 years",
    degrees: "MBBS, MD",
    languages: ["English", "Hindi"],
    locations: ["Colombo", "Negombo"],
    description: "Dr Amila Siriwardana is an expert cardiologist practicing in colombo.",
    photo: "/amila.jpg",
    availability: "Tue - Fri",
    time: "10:00 - 12:00",
    fee: "Rs. 1000", // Added fee
    sessions: [
      { date: "February 06, 2025", day: "THU", time: "10:00 - 12:00", status: "Available", location: "Negombo", availableSlots: 4 },
      { date: "February 08, 2025", day: "SAT", time: "10:00 - 12:00", status: "Available", location: "Colombo", availableSlots: 4 },
      { date: "February 10, 2025", day: "MON", time: "10:00 - 12:00", status: "Holiday", location: "Colombo", availableSlots: 0 },
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
        <h4 style={{ color: "#007bff", fontSize: "16px", marginBottom: "5px" }}>{doctor.availability}</h4>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>({doctor.time})</p>
        {/* Displaying Fee */}
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
          Fee: <span style={{ color: "#FFD700" }}>{doctor.fee}</span>
        </p>
        <button
          onClick={() => navigate(`/book/${index}`)}
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
