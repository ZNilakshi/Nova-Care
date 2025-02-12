import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHeartbeat, 
  FaBrain, 
  FaRibbon, 
  FaVenus, 
  FaHandHoldingMedical, 
  FaEye, 
  FaTint, 
  FaProcedures 
} from "react-icons/fa";

const specialties = [
  { name: "Cardiology", icon: <FaHeartbeat />, details: "Cardiology focuses on heart-related conditions and treatments.", image: "/card.jpg" },
  { name: "Neurology", icon: <FaBrain />, details: "Neurology deals with disorders of the nervous system.", image: "/neuro.jpg" },
  { name: "Oncology", icon: <FaRibbon />, details: "Oncology is the study and treatment of cancer.", image: "/onco.jpg" },
  { name: "Gynecology", icon: <FaVenus />, details: "Gynecology focuses on women's reproductive health.", image: "/gyneco.jpg" },
  { name: "Dermatology", icon: <FaHandHoldingMedical />, details: "Dermatology involves the treatment of skin conditions.", image: "/dermo.jpg" },
  { name: "Ophthalmology", icon: <FaEye />, details: "Ophthalmology deals with eye-related issues.", image: "/ophthal.png" },
  { name: "Endocrinology", icon: <FaTint />, details: "Endocrinology focuses on hormone-related conditions.", image: "/endo.png" },
  { name: "Nephrology", icon: <FaProcedures />, details: "Nephrology deals with kidney health and diseases.", image: "/nephr.jpg" },
];

const ClinicalExcellence = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState({
    image: "/clinical.png",
    details: "Welcome to our Centres of Clinical Excellence. Select a specialty to learn more.",
    showButton: false,
    name: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <section style={{ background: "linear-gradient(to bottom, #e3f2fd, #ffffff)", padding: "50px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>
          Explore our Centres of Clinical Excellence
        </h2>
        <p style={{ color: "#555", marginTop: "10px" }}>
          NOVA CARE Hospitals has dedicated Centres of Excellence for several key specialties and super specialties.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginTop: "30px" }}>
          {/* Left Side - Image and Details */}
          <div style={{ flex: "2", minWidth: "300px", textAlign: "center", paddingRight: "20px", position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSpecialty.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ position: "relative" }}
              >
                <img
                  src={selectedSpecialty.image}
                  alt="Specialty Details"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    filter: "blur(2px)",
                  }}
                />
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "black",
                  padding: "20px",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "100%",
                }}>
                  <p style={{ fontSize: "18px", fontWeight: "500" }}>{selectedSpecialty.details}</p>
                  {selectedSpecialty.showButton && (
                    <button
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px"
                      }}
                      onClick={() => navigate("/book-appointment", { state: { specialty: selectedSpecialty.name } })}
                    >
                      Find Doctors
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Specialties List */}
          <div style={{ flex: "2", minWidth: "350px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
                gap: "10px",
                width: "100%",
              }}
            >
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s, border 0.3s",
                    cursor: "pointer",
                    border: selectedSpecialty.name === specialty.name ? "3px solid #FFD700" : "3px solid transparent",
                  }}
                  onClick={() => setSelectedSpecialty({ 
                    image: specialty.image, 
                    details: specialty.details, 
                    showButton: true, 
                    name: specialty.name 
                  })}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div style={{ fontSize: "30px", display: "block" }}>{specialty.icon}</div>
                  <p style={{ fontSize: "16px", fontWeight: "600", marginTop: "8px" }}>{specialty.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalExcellence;
