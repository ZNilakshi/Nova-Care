import React, { useState } from "react";

const hospitals = [
  { name: "Ahmedabad", image: "/ahmedabad.jpg", address: "Plot No.1A, Bhat GIDC Estate Dist. Airport Gandhinagar Road, Dist. Gandhinagar, Ahmedabad - 382428 Gujarat", contact: "+8401801066" },
  { name: "Aragonda", image: "/aragonda.jpg", address: "Address for Aragonda Hospital", contact: "+9100000000" },
  { name: "Bangalore", image: "/bangalore.jpg", address: "Address for Bangalore Hospital", contact: "+9100000000" },
  { name: "Bhubaneshwar", image: "/bhubaneshwar.jpg", address: "Address for Bhubaneshwar Hospital", contact: "+9100000000" },
];

const HospitalsInIndia = () => {
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);

  return (
    <section style={{ padding: "50px", background: "#F8FAFC", display: "flex", gap: "30px", justifyContent: "center" }}>
      {/* Left Side - Locations */}
      <div style={{ width: "50%" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>Hospitals In India</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Apollo Group has over 10,000+ beds across 73+ hospitals, 6,000+ pharmacies, 700+ clinics, and 2,300+ diagnostic centers.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px" }}>
          {hospitals.map((hospital, index) => (
            <button
              key={index}
              onClick={() => setSelectedHospital(hospital)}
              style={{
                padding: "12px",
                border: selectedHospital.name === hospital.name ? "2px solid #FFB400" : "2px solid transparent",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
                textAlign: "center",
                transition: "0.3s",
              }}
            >
              <img src={`/icons/${hospital.name.toLowerCase()}.png`} alt={hospital.name} style={{ width: "40px", height: "40px", marginBottom: "5px" }} />
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>{hospital.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right Side - Selected Hospital Details */}
      <div style={{ width: "45%", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <img src={selectedHospital.image} alt={selectedHospital.name} style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }} />
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Hospitals In {selectedHospital.name}</h3>
        <p style={{ color: "#555", marginBottom: "10px" }}>{selectedHospital.address}</p>
        <p style={{ fontWeight: "bold", color: "#007BFF" }}>{selectedHospital.contact}</p>
      </div>
    </section>
  );
};

export default HospitalsInIndia;
