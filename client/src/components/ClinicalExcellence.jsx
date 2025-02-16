import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaBrain, FaRibbon, FaVenus, FaHandHoldingMedical, FaEye, FaTint, FaProcedures } from "react-icons/fa";

const specialties = [
  { name: "Cardiology", icon: <FaHeartbeat /> },
  { name: "Neurology", icon: <FaBrain /> },
  { name: "Oncology", icon: <FaRibbon /> },
  { name: "Gynecology", icon: <FaVenus /> },
  { name: "Dermatology", icon: <FaHandHoldingMedical /> },
  { name: "Ophthalmology", icon: <FaEye /> },
  { name: "Endocrinology", icon: <FaTint /> },
  { name: "Nephrology", icon: <FaProcedures /> },
];

const ClinicalExcellence = () => {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Explore our Centres of Clinical Excellence</h2>
        <p style={styles.subHeading}>
          NOVA CARE Hospitals has dedicated Centres of Excellence for several key specialties and super specialties.
        </p>

        <div style={styles.content}>
          {/* Left Side - Image */}
          <div style={styles.imageContainer}>
            <img src="/clinical.png" alt="Clinical Excellence" style={styles.image} />
          </div>

          {/* Right Side - Specialties Grid */}
          <div style={styles.grid}>
            {specialties.map((specialty, index) => (
              <div
                key={index}
                style={styles.specialtyCard}
                onClick={() => navigate("/book-appointment", { state: { specialty: specialty.name } })}
              >
                <div style={styles.icon}>{specialty.icon}</div>
                <p style={styles.specialtyName}>{specialty.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { background: " #ffffff", padding: "50px 20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
  container: { maxWidth: "1100px", margin: "0 auto", textAlign: "center" },
  heading: { fontSize: "28px", fontWeight: "bold", color: "#333" },
  subHeading: { color: "#555", marginTop: "10px" },
  content: { display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "30px", marginTop: "30px" },
  imageContainer: { flex: "1", minWidth: "300px", textAlign: "center" },
  image: { width: "100%", maxWidth: "400px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
  grid: { flex: "2", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", justifyContent: "center" },
  specialtyCard: { background: "#e3f2fd", padding: "25px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center", cursor: "pointer", transition: "transform 0.2s" },
  icon: { fontSize: "30px", color: "#0096C7" },
  specialtyName: { fontSize: "16px", fontWeight: "600", marginTop: "8px" },
};

export default ClinicalExcellence;
