import React from "react";
import { FaCalendarCheck, FaUserMd, FaHospital, FaNotesMedical, FaLaptopMedical, FaPills } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "30px 0", background: "#F8FAFC" }}>
      {services.map((service, index) => (
        <div
          key={index}
          style={{
            width: "150px",
            height: "150px",
            background: service.active ? "#0096C7" : "#fff",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "background 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0096C7";  // Change background on hover
            e.currentTarget.style.color = "#fff";          // Change text color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = service.active ? "#0096C7" : "#fff"; // Reset background
            e.currentTarget.style.color = service.active ? "#fff" : "#000";         // Reset text color
          }}
        >
          <service.icon size={40} color={service.active ? "#fff" : "#000"} />
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            {service.name}
          </p>
        </div>
      ))}
    </div>
  );
};

const services = [
  { name: "Book Appointment", icon: FaCalendarCheck, active: false },
  { name: "Find Doctor", icon: FaUserMd, active: false },
  { name: "Find Hospital", icon: FaHospital, active: false },
  { name: " Health Check-Up", icon: FaNotesMedical, active: false },
  { name: "Consult Online", icon: FaLaptopMedical, active: false },
  { name: "Buy Medicine", icon: FaPills, active: false }, // Active service
];

export default ServicesSection;
