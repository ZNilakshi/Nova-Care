import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // New arrow icons

const hospitals = [
  { name: "Colombo", image: "/colombo.jpg", address: " E. W. Perera Mawatha, Colombo 10, Sri Lanka. ", contact: "+94715801066" },
  { name: "Gampaha", image: "/gampaha.jpg", address: " Perera Mawatha, Gampaha, Sri Lanka. ", contact: "+9474560000" },
  { name: "Negombo", image: "/negombo.jpg", address: " Perera Mawatha, Negombo, Sri Lanka.", contact: "+94740485000" },
  { name: "Galle", image: "/galle.jpg", address: " Perera Mawatha, Galle, Sri Lanka.", contact: "+9474245000" },
];

const HospitalsInSriLanka = () => {
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === hospitals.length - 1 ? 0 : prevIndex + 1;
      setSelectedHospital(hospitals[newIndex]);
      return newIndex;
    });
  }, []);

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        handleNext();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isMobile, handleNext]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? hospitals.length - 1 : prevIndex - 1;
      setSelectedHospital(hospitals[newIndex]);
      return newIndex;
    });
  };

  return (
    <section
      style={{
        padding: "40px 20px",
        background: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
        Hospitals In Sri Lanka
      </h2>
      <p style={{ color: "#555", maxWidth: "600px", marginBottom: "30px" }}>
        NOVACARE Group has over 10,00+ beds across 13+ hospitals, 60+ pharmacies, 70+ clinics, and 230+ diagnostic centers.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1100px",
          gap: "30px",
        }}
      >
        {/* Mobile Slideshow / Desktop Grid */}
        <div style={{ width: isMobile ? "100%" : "50%" }}>
          {isMobile ? (
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <button
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: "5px",
                       border: "none",
                  color: "black",
                  padding: "12px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "18px",
                  transition: "0.3s",
                  boxShadow: "0 4px 10px rgba(117, 115, 115, 0.2)",
                }}
              >
                <FaChevronLeft />
              </button>

              <div>
                <img
                  src={selectedHospital.image}
                  alt={selectedHospital.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "5px",
                  }}
                />
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>{selectedHospital.name}</p>
              </div>

              <button
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: "5px",
                  
                  border: "none",
                  color: "black",
                  padding: "12px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "18px",
                  transition: "0.3s",
                  boxShadow: "0 4px 10px rgba(48, 47, 47, 0.2)",
                }}
              >
                <FaChevronRight />
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "15px",
                justifyContent: "center",
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
                    borderRadius: "10px",
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
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "5px",
                    }}
                  />
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>{hospital.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Selected Hospital Details */}
        <div
          style={{
            width: isMobile ? "100%" : "45%",
            background: "#e3f2fd",
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
              width: "80%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Hospitals In {selectedHospital.name}</h3>
          <p style={{ color: "#555", marginBottom: "10px" }}>{selectedHospital.address}</p>
          <p style={{ fontWeight: "bold", color: "#007BFF" }}>{selectedHospital.contact}</p>
        </div>
      </div>
    </section>
  );
};

export default HospitalsInSriLanka;
