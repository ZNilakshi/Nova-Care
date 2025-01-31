import React, { useState } from "react";

const hospitals = [
  { city: "Ahmedabad", name: "Apollo Hospital", image: "/hospital1.jpg", address: "Ahmedabad, India" },
  { city: "Bangalore", name: "Fortis Hospital", image: "/hospital2.jpg", address: "Bangalore, India" },
  { city: "Delhi", name: "AIIMS Hospital", image: "/hospital3.jpg", address: "Delhi, India" },
];

const HospitalList = () => {
    

  const [selectedCity, setSelectedCity] = useState("All"); // Default to show all hospitals

  // Filter hospitals based on selected city
  const filteredHospitals = selectedCity === "All"
    ? hospitals
    : hospitals.filter(hospital => hospital.city === selectedCity);
    
  return (
    
    <div style={{ display: "flex", minHeight: "100vh", padding: "20px" }}>
       
      
      {/* Left Sidebar */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", paddingRight: "15px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", paddingBottom: "10px" }}>
        
         HOSPITALS IN INDIA
        </h3>
        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          <li
            onClick={() => setSelectedCity("All")}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: selectedCity === "All" ? "bold" : "normal",
              color: selectedCity === "All" ? "#007bff" : "#000",
            }}
          >
            All
          </li>
          {hospitals.map((hospital, index) => (
            <li
              key={index}
              onClick={() => setSelectedCity(hospital.city)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: selectedCity === hospital.city ? "bold" : "normal",
                color: selectedCity === hospital.city ? "#007bff" : "#000",
              }}
            >
              {hospital.city}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Section */}
      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <h2 style={{ fontSize: "22px", color: "#007bff", marginBottom: "15px" }}>
          {selectedCity === "All" ? "Hospitals In India" : `Hospitals in ${selectedCity}`}
        </h2>
        <hr style={{ width: "50px", border: "2px solid #007bff", marginBottom: "20px" }} />

        {/* Hospital Cards */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital, index) => (
              <div
                key={index}
                style={{
                  width: "320px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  background: "#fff",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <h3 style={{ fontSize: "18px", marginTop: "10px", color: "#333" }}>
                  {hospital.name}
                </h3>
                <p style={{ fontSize: "14px", color: "#777" }}>{hospital.address}</p>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "16px", color: "#777" }}>No hospitals found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
