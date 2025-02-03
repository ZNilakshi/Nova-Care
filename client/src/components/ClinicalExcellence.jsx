import React from "react";
import { 
  FaHeartbeat, 
  FaBrain, 
  FaStethoscope, 
  FaBone, 
  FaRibbon, 
  FaVenus, 
  FaHandHoldingMedical, 
  FaEye, 
  FaBaby, 
  FaTint, 
  FaToilet, 
  FaProcedures, 
  FaLungs 
} from "react-icons/fa";

const specialties = [
  { name: "Cardiology", icon: <FaHeartbeat /> },
  { name: "Neurology", icon: <FaBrain /> },
  { name: "Gastroenterology", icon: <FaStethoscope /> },
  { name: "Orthopedic", icon: <FaBone /> },
  { name: "Oncology", icon: <FaRibbon /> },
  { name: "Gynecology", icon: <FaVenus /> },
  { name: "Dermatology", icon: <FaHandHoldingMedical /> },
  { name: "Ophthalmology", icon: <FaEye /> },
  { name: "Pediatrics", icon: <FaBaby /> },
  { name: "Endocrinology", icon: <FaTint /> },
  { name: "Urology", icon: <FaToilet /> },
  { name: "Nephrology", icon: <FaProcedures /> },
  { name: "Pulmonology", icon: <FaLungs /> },
  { name: "Rheumatology", icon: <FaHandHoldingMedical /> },
];

const ClinicalExcellence = () => {
  return (
    <section style={{ background: "linear-gradient(to bottom, #e3f2fd, #ffffff)", padding: "50px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>
          Explore our Centres of Clinical Excellence
        </h2>
        <p style={{ color: "#555", marginTop: "10px" }}>
          NOVA CARE Hospitals has dedicated Centres of Excellence for several key specialties and super specialties. 
          They are unique and state-of-the-art facilities spread across several of the Apollo hospital locations.
        </p>

        {/* Two-column layout */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginTop: "30px" }}>
          {/* Left Side - Image */}
          <div style={{ flex: "2", minWidth: "300px", textAlign: "center", paddingRight: "20px" }}>
            <img
              src="/clinical.png" // Replace with actual image path
              alt="Doctor Consultation"
              style={{
                width: "100%",
                maxWidth: "600px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Right Side - Specialties List */}
          <div style={{ flex: "2", minWidth: "300px" }}>
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
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
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