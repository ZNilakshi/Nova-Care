import React, { useEffect, useState } from "react";
import DoctorCard from "./BookAppointment";

const API_URL = "https://nova-care-production.up.railway.app";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors from the backend
    fetch(`${API_URL}/api/doctors`)  // Adjust URL based on backend
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  return (
    <div style={{ display: "grid", gap: "20px", padding: "20px" }}>
      {doctors.length > 0 ? (
        doctors.map((doctor, index) => <DoctorCard key={index} doctor={doctor} index={index} />)
      ) : (
        <p>Loading doctors...</p>
      )}
    </div>
  );
};

export default DoctorsList;
