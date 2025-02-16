import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DoctorCard, { doctors } from "./DoctorCard"; // Import doctors from DoctorCard.js

import "./BookAppointment.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const specialtyFromQuery = queryParams.get("specialty"); 

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialtyFromQuery || "");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    if (location.state?.specialty) {
      setSelectedSpecialty(location.state.specialty);
    }
  }, [location.state]);

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (selectedCity === "" || doctor.locations.includes(selectedCity)) &&
      (selectedSpecialty === "" || doctor.specialty === selectedSpecialty) &&
      (selectedLanguage === "" || doctor.languages.includes(selectedLanguage))
    );
  });

  return (
    <section className="book-appointment">
      <div className="breadcrumb">
        <span className="home-link" onClick={() => navigate("/")}>Home</span> &gt; <span className="bold">Book Appointment</span>
      </div>

      <h2 className="heading">Best Doctors in Sri Lanka</h2>

      <div className="appointment-container">
        {/* Filters */}
        <aside className="filters">
          <h3 className="filter-heading">Filters</h3>

          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">City</option>
            <option value="Colombo">Colombo</option>
            <option value="Negombo">Negombo</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Kalutara">Kalutara</option>
          </select>

          <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
            <option value="">Specialty</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Oncology">Oncology</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="Endocrinology">Endocrinology</option>
            <option value="Nephrology">Nephrology</option>
          </select>

          <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="">Language</option>
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
          </select>

          <p className="clear-filters" onClick={() => { 
            setSelectedCity(""); 
            setSelectedSpecialty(""); 
            setSelectedLanguage(""); 
          }}>
            CLEAR FILTERS
          </p>
        </aside>

        {/* Display filtered doctors */}
        <div className="doctor-list">
          {filteredDoctors.length > 0 ? filteredDoctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} index={index} />
          )) : (
            <p className="no-doctors">No doctors found matching the selected filters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
