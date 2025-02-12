import React, { useState , useEffect} from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import DoctorCard, { doctors } from "./DoctorCard"; // Import doctors from DoctorCard.js

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const specialtyFromQuery = queryParams.get("specialty"); // Get the specialty from the URL
  
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialtyFromQuery || "");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  
  useEffect(() => {
    if (location.state?.specialty) {
      setSelectedSpecialty(location.state.specialty);
    }
  }, [location.state]);

  // Filter doctors based on selection
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (selectedCity === "" || doctor.locations.includes(selectedCity)) &&
      (selectedSpecialty === "" || doctor.specialty === selectedSpecialty) &&
      (selectedLanguage === "" || doctor.languages.includes(selectedLanguage))
    );
  });

  return (
    <section style={{ padding: "30px", background: "#f8f9fa" }}>
      <div style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
        <span
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </span>{" "}
        &gt; <span style={{ fontWeight: "bold" }}>Book Appointment</span>
      </div>

      <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
        Best Doctors in Sri Lanka
      </h2>

      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "20px" }}>
        {/* Filters */}
        <aside style={{ flex: "1", minWidth: "250px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>Filters</h3>

          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}>
            <option value="">City</option>
            <option value="Colombo">Colombo</option>
            <option value="Negombo">Negombo</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Kalutara">Kalutara</option>
          </select>

          <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}>
            <option value="">Specialty</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Oncology">Oncology</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Dermatolog">Dermatology</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="Endocrinology">Endocrinology</option>
            <option value="Nephrology">Nephrology</option>
          </select>

          

          <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}>
            <option value="">Language</option>
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
          </select>

          <p onClick={() => { setSelectedCity(""); setSelectedSpecialty(""); setSelectedLanguage(""); }} style={{ color: "#007bff", cursor: "pointer", textAlign: "left", marginTop: "10px" }}>
            CLEAR FILTERS
          </p>
        </aside>

        {/* Display filtered doctors */}
        <div style={{ flex: "3", display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredDoctors.length > 0 ? filteredDoctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} index={index} />
          )) : (
            <p>No doctors found matching the selected filters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
