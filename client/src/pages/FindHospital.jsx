import React, { useState } from "react";

const hospitals = [
  {
    city: "Colombo",
    name: "Colombo General Hospital",
    image: "/colombo.jpg",
    address: "Plot No.1A, Colombo",
    contact: "+8401801066",
    website: "https://www.colombohospital.com",
    history: "Established in 1864, Colombo General Hospital is one of the oldest and most renowned hospitals in Sri Lanka.",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
    hours: "Open 24/7",
    services: ["Emergency", "Surgery", "Maternity", "Pharmacy", "Diagnostics"],
    facilities: ["MRI, CT Scan, ICU, NICU, Advanced Operation Theaters"],
    departments: ["Cardiology", "Neurology", "General Surgery", "Pediatrics"],
    emergency: "24/7 Emergency Unit, Ambulance Service: 1990",
    doctors: ["Dr. Sunil Perera (Cardiologist)", "Dr. Kavindi Silva (Neurologist)"],
    reviews: "Rated 4.7/5 - Excellent patient care and modern facilities.",
  },
  {
    city: "Gampaha",
    name: "Gampaha City Hospital",
    image: "/gampaha.jpg",
    address: "Plot No.1A, Gampaha",
    contact: "+9100000000",
    website: "https://www.gampahacityhospital.com",
    history: "Founded in 1952, Gampaha City Hospital has been a key healthcare provider in the region.",
    specialties: ["Pediatrics", "Gynecology", "Urology"],
    hours: "8 AM - 10 PM",
    services: ["Outpatient", "Maternity", "Diagnostics", "Rehabilitation"],
    facilities: ["Digital X-ray, ICU, Physiotherapy"],
    departments: ["Gynecology", "Pediatrics", "Urology"],
    emergency: "Emergency unit available (8 AM - 10 PM). No 24/7 ambulance service.",
    doctors: ["Dr. Ruwan De Silva (Pediatrician)", "Dr. Anusha Fernando (Gynecologist)"],
    reviews: "Rated 4.5/5 - Friendly staff and well-maintained facilities.",
  },
  {
    city: "Negombo",
    name: "Negombo Regional Hospital",
    image: "/negombo.jpg",
    address: "Plot No.1A, Negombo",
    contact: "+9100000000",
    website: "https://www.negombohospital.com",
    history: "A state-of-the-art hospital established in 1980, specializing in dermatology and ENT services.",
    specialties: ["Dermatology", "ENT", "Pulmonology"],
    hours: "9 AM - 8 PM",
    services: ["Outpatient", "Skin Care", "Pharmacy", "ENT Surgeries"],
    facilities: ["Dermatology Lab, Allergy Testing, Hearing Aids"],
    departments: ["ENT", "Pulmonology", "Dermatology"],
    emergency: "Basic emergency services available from 9 AM - 8 PM.",
    doctors: ["Dr. Sameera Rajapaksha (Dermatologist)", "Dr. Nadeesha Weerasinghe (ENT Specialist)"],
    reviews: "Rated 4.3/5 - Excellent dermatology services, but limited emergency care.",
  },
  {
    city: "Galle",
    name: "Galle National Hospital",
    image: "/galle.jpg",
    address: "Plot No.1A, Galle",
    contact: "+9100000000",
    website: "https://www.gallenationalhospital.com",
    history: "A leading hospital in southern Sri Lanka, known for cancer treatment and mental health services.",
    specialties: ["Oncology", "Psychiatry", "Neurosurgery"],
    hours: "Open 24/7",
    services: ["Cancer Treatment", "Mental Health", "Emergency", "ICU"],
    facilities: ["Radiotherapy, Chemotherapy Units, Counseling Centers"],
    departments: ["Oncology", "Psychiatry", "General Medicine"],
    emergency: "24/7 Emergency Department, Specialized Trauma Center",
    doctors: ["Dr. Ashan Jayasuriya (Oncologist)", "Dr. Priyanthi Perera (Psychiatrist)"],
    reviews: "Rated 4.6/5 - Top hospital for cancer and mental health care.",
  },
];

const HospitalList = () => {
  const [selectedCity, setSelectedCity] = useState("All");

  // Filter hospitals based on selected city
  const filteredHospitals =
    selectedCity === "All"
      ? hospitals
      : hospitals.filter((hospital) => hospital.city === selectedCity);

  return (
    <div style={{ display: "flex", minHeight: "100vh", padding: "20px" }}>
      {/* Left Sidebar */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", paddingRight: "15px" }}>
        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          <li
            onClick={() => setSelectedCity("All")}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: selectedCity === "All" ? "bold" : "normal",
              color: selectedCity === "All" ? "#007bff" : "#000",
            }}
          >
            All
          </li>
          {hospitals.map((hospital, index) => (
            <li
              key={index}
              onClick={() => setSelectedCity(hospital.city)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: selectedCity === hospital.city ? "bold" : "normal",
                color: selectedCity === hospital.city ? "#007bff" : "#000",
              }}
            >
              {hospital.city}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Section */}
      <div style={{ width: "900px", borderRight: "1px solid #ddd", paddingRight: "15px" }}>
     
      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <h2 style={{ fontSize: "22px", color: "#007bff", marginBottom: "15px" }}>
          {selectedCity === "All" ? "Hospitals In Sri Lanka" : `Hospitals in ${selectedCity}`}
        </h2>
        <hr style={{ width: "50px", border: "2px solid #007bff", marginBottom: "20px" }} />

        {/* Hospital Cards */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {filteredHospitals.map((hospital, index) => (
            <div key={index} style={{ width: "350px", padding: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "8px", background: "#fff" }}>
              <img src={hospital.image} alt={hospital.name} style={{ width: "500", height: "350px", objectFit: "cover" }} />
              <h3>{hospital.name}</h3>
              <p><strong>Address:</strong> {hospital.address}</p>
              <p><strong>Contact:</strong> {hospital.contact}</p>
              <p><strong>History:</strong> {hospital.history}</p>
              <p><strong>Specialties:</strong> {hospital.specialties.join(", ")}</p>
              <p><strong>Facilities:</strong> {hospital.facilities.join(", ")}</p>
              <p><strong>Emergency:</strong> {hospital.emergency}</p>
              <p><strong>Doctors:</strong> {hospital.doctors.join(", ")}</p>
              <p><strong>Reviews:</strong> {hospital.reviews}</p>
              <a href={hospital.website} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff" }}>Visit Website</a>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default HospitalList;
