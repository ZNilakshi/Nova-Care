import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHeartbeat, FaBrain, FaRibbon, FaVenus, FaHandHoldingMedical, 
  FaEye, FaTint, FaProcedures 
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

  const navigate = useNavigate();
  const detailsRef = useRef(null);

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty({ 
      image: specialty.image, 
      details: specialty.details, 
      showButton: true, 
      name: specialty.name 
    });

    // Scroll to details section on mobile view
    if (window.innerWidth <= 768 && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Explore our Centres of Clinical Excellence</h2>
        <p style={styles.subHeading}>
          NOVA CARE Hospitals has dedicated Centres of Excellence for several key specialties and super specialties.
        </p>

        <div style={styles.contentWrapper} className="contentWrapper">
          {/* Left Side - Image and Details */}
          <div style={styles.leftPanel} className="leftPanel" ref={detailsRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSpecialty.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={selectedSpecialty.image} alt="Specialty Details" style={styles.image} className="image"/>
                <div style={styles.detailsContainer}>
                  <p style={styles.detailsText}>{selectedSpecialty.details}</p>
                  {selectedSpecialty.showButton && (
                    <button
                      style={styles.button}
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
          <div style={styles.rightPanel} className="rightPanel">
            <div style={styles.grid} className="grid">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.specialtyCard,
                    border: selectedSpecialty.name === specialty.name ? "3px solid #FFD700" : "3px solid transparent",
                  }}
                  onClick={() => handleSpecialtyClick(specialty)}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div style={styles.icon}>{specialty.icon}</div>
                  <p style={styles.specialtyName}>{specialty.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 1024px) {
            .contentWrapper {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .leftPanel {
              padding: 10px;
              width: 100%;
            }
            .image {
              width: 100%;
              max-width: 400px;
              height: auto;
            }
            .rightPanel {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              margin-top: 20px;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              width: 100%;
              justify-content: center;
            }
          }

          @media (max-width: 600px) {
            .grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </section>
  );
};

const styles = {
  section: { background: "linear-gradient(to bottom, #e3f2fd, #ffffff)", padding: "50px 20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
  container: { maxWidth: "1100px", margin: "0 auto", textAlign: "center" },
  heading: { fontSize: "28px", fontWeight: "bold", color: "#333" },
  subHeading: { color: "#555", marginTop: "10px" },
  contentWrapper: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "30px" },
  leftPanel: { flex: "2", minWidth: "300px", textAlign: "center", padding: "20px" },
  image: { width: "100%", maxWidth: "400px", height: "auto", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
  detailsContainer: { marginTop: "15px", textAlign: "center" },
  detailsText: { fontSize: "18px", fontWeight: "500" },
  button: { padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" },
  rightPanel: { flex: "2", minWidth: "350px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", width: "100%" },
  specialtyCard: { background: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center", cursor: "pointer" },
  icon: { fontSize: "30px" },
  specialtyName: { fontSize: "16px", fontWeight: "600", marginTop: "8px" },
};

export default ClinicalExcellence;
