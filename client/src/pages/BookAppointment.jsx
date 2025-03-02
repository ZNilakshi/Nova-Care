import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DoctorCard from "./DoctorCard"; // Remove the local doctors array
import "./BookAppointment.css";

const API_URL = "https://nova-care-production.up.railway.app";

const BookAppointment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const specialtyFromQuery = queryParams.get("specialty"); 

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialtyFromQuery || "");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [doctors, setDoctors] = useState([]); // Fetch doctors from backend

  useEffect(() => {
    if (location.state?.specialty) {
      setSelectedSpecialty(location.state.specialty);
    }
  }, [location.state]);

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`); // Adjust if needed
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (selectedCity === "" || doctor.locations.includes(selectedCity)) &&
      (selectedSpecialty === "" || doctor.specialty === selectedSpecialty) &&
      (selectedLanguage === "" || doctor.languages.includes(selectedLanguage))
    );
  });

  return (
    <section className="book-appointment">
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
            <DoctorCard key={doctor._id} doctor={doctor} index={index} />
          )) : (
            <p className="no-doctors">No doctors found matching the selected filters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
