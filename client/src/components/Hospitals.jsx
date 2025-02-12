import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const hospitals = [
  { name: "Colombo", image: "/colombo.jpg", address: "Plot No.1A, Colombo", contact: "+8401801066" },
  { name: "Gampaha", image: "/gampaha.jpg", address: "Plot No.1A, Gampaha", contact: "+9100000000" },
  { name: "Negombo", image: "/negombo.jpg", address: "Plot No.1A, Negombo", contact: "+9100000000" },
  { name: "Galle", image: "/galle.jpg", address: "Plot No.1A, Galle", contact: "+9100000000" },
];

const HospitalsInSriLanka = () => {
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle next & prev in mobile slideshow
  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? hospitals.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedHospital(hospitals[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === hospitals.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedHospital(hospitals[newIndex]);
  };

  return (
    <section
      style={{
        padding: "50px",
        background: "#F8FAFC",
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        flexWrap: "wrap",
        position: "relative",
      }}
    >
      {/* Left Side - Locations (Desktop Grid / Mobile Slideshow) */}
      <div style={{ width: isMobile ? "100%" : "50%", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>Hospitals In Sri Lanka</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          NOVACARE Group has over 10,00+ beds across 13+ hospitals, 6,0+ pharmacies, 70+ clinics, and 2,30+ diagnostic centers.
        </p>

        {/* Mobile Slideshow */}
        {isMobile ? (
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: "10px",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
                padding: "10px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <FaArrowLeft />
            </button>

            <div>
              <img
                src={selectedHospital.image}
                alt={selectedHospital.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "5px",
                }}
              />
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>{selectedHospital.name}</p>
            </div>

            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "10px",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
                padding: "10px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <FaArrowRight />
            </button>
          </div>
        ) : (
          // Desktop Grid View
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "10px",
            }}
          >
            {hospitals.map((hospital, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedHospital(hospital);
                  setCurrentIndex(index);
                }}
                style={{
                  padding: "15px",
                  border: selectedHospital.name === hospital.name ? "2px solid #FFB400" : "2px solid transparent",
                  borderRadius: "8px",
                  background: "white",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "0.3s",
                  boxShadow: selectedHospital.name === hospital.name ? "0px 4px 10px rgba(0,0,0,0.1)" : "none",
                }}
              >
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "5px",
                  }}
                />
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>{hospital.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Selected Hospital Details */}
      <div
        style={{
          width: isMobile ? "100%" : "45%",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          marginTop: isMobile ? "20px" : "0",
        }}
      >
        <img
          src={selectedHospital.image}
          alt={selectedHospital.name}
          style={{
            width: "300px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Hospitals In {selectedHospital.name}</h3>
        <p style={{ color: "#555", marginBottom: "10px" }}>{selectedHospital.address}</p>
        <p style={{ fontWeight: "bold", color: "#007BFF" }}>{selectedHospital.contact}</p>
      </div>
    </section>
  );
};

export default HospitalsInSriLanka;
