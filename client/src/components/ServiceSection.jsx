import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaHospital,   FaPills } from "react-icons/fa";

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "30px 0",
        background: "#e3f2fd",
      }}
    >
      {services.map((service, index) => (
        <div
          key={index}
          style={{
            width: "250px",
            height: "200px",
            background: service.active ? "#fff" : "#0096C7",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "background 0.5s, color 0.3s",
          }}
          onClick={() => navigate(service.route)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = service.active ? "#fff " : "#0096C7";
            e.currentTarget.style.color = service.active ? "#000" : "#000";
          }}
        >
          <service.icon size={40} color={service.active ? "#000" : "#000"} />
          <p style={{ marginTop: "10px", fontWeight: "bold", textAlign: "center" }}>{service.name}</p>
        </div>
      ))}
    </div>
  );
};

const services = [
  { name: "Book Appointment", icon: FaCalendarCheck, route: "/book-appointment", active: false },
  { name: "Find Hospital", icon: FaHospital, route: "/find-hospital", active: false },
   { name: "Buy Medicine", icon: FaPills, route: "/buy-medicine", active: false },
];

export default ServicesSection;
