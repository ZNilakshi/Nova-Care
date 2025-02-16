import React, { useState } from "react";

const hospitals = [
  {
    city: "Colombo",
    name: "Colombo General Hospital",
    image: "/colombo.jpg",
    address: "Plot No.1A, Colombo",
    contact: "+8401801066",
       history: "Established in 1864, Colombo General Hospital is one of the oldest and most renowned hospitals in Sri Lanka.",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
    hours: "Open 24/7",
    services: ["Emergency", "Surgery", "Maternity", "Pharmacy", "Diagnostics"],
    facilities: ["MRI, CT Scan, ICU, NICU, Advanced Operation Theaters"],
    departments: ["Cardiology", "Neurology", "General Surgery", "Pediatrics"],
    emergency: "24/7 Emergency Unit, Ambulance Service: 1990",
    doctors: ["Dr. Sunil Perera (Cardiologist)", "Dr. Kavindi Silva (Neurologist)"],
     },
  {
    city: "Gampaha",
    name: "Gampaha City Hospital",
    image: "/gampaha.jpg",
    address: "Plot No.1A, Gampaha",
    contact: "+9100000000",
       history: "Founded in 1952, Gampaha City Hospital has been a key healthcare provider in the region.",
    specialties: ["Pediatrics", "Gynecology", "Urology"],
    hours: "8 AM - 10 PM",
    services: ["Outpatient", "Maternity", "Diagnostics", "Rehabilitation"],
    facilities: ["Digital X-ray, ICU, Physiotherapy"],
    departments: ["Gynecology", "Pediatrics", "Urology"],
    emergency: "Emergency unit available (8 AM - 10 PM). No 24/7 ambulance service.",
    doctors: ["Dr. Ruwan De Silva (Pediatrician)", "Dr. Anusha Fernando (Gynecologist)"],
     },
  {
    city: "Negombo",
    name: "Negombo Regional Hospital",
    image: "/negombo.jpg",
    address: "Plot No.1A, Negombo",
    contact: "+9100000000",
       history: "A state-of-the-art hospital established in 1980, specializing in dermatology and ENT services.",
    specialties: ["Dermatology", "ENT", "Pulmonology"],
    hours: "9 AM - 8 PM",
    services: ["Outpatient", "Skin Care", "Pharmacy", "ENT Surgeries"],
    facilities: ["Dermatology Lab, Allergy Testing, Hearing Aids"],
    departments: ["ENT", "Pulmonology", "Dermatology"],
    emergency: "Basic emergency services available from 9 AM - 8 PM.",
    doctors: ["Dr. Sameera Rajapaksha (Dermatologist)", "Dr. Nadeesha Weerasinghe (ENT Specialist)"],
      },
  {
    city: "Galle",
    name: "Galle National Hospital",
    image: "/galle.jpg",
    address: "Plot No.1A, Galle",
    contact: "+9100000000",
       history: "A leading hospital in southern Sri Lanka, known for cancer treatment and mental health services.",
    specialties: ["Oncology", "Psychiatry", "Neurosurgery"],
    hours: "Open 24/7",
    services: ["Cancer Treatment", "Mental Health", "Emergency", "ICU"],
    facilities: ["Radiotherapy, Chemotherapy Units, Counseling Centers"],
    departments: ["Oncology", "Psychiatry", "General Medicine"],
    emergency: "24/7 Emergency Department, Specialized Trauma Center",
    doctors: ["Dr. Ashan Jayasuriya (Oncologist)", "Dr. Priyanthi Perera (Psychiatrist)"],
     },
];

const HospitalList = () => {
  const [selectedCity, setSelectedCity] = useState("All");
  
  const filteredHospitals = selectedCity === "All" ? hospitals : hospitals.filter(hospital => hospital.city === selectedCity);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1>Hospital Directory</h1>
        <p>Find the best hospitals in Sri Lanka</p>
      </header>
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li onClick={() => setSelectedCity("All")} className={selectedCity === "All" ? "active" : ""}>All</li>
            {hospitals.map((hospital, index) => (
              <li key={index} onClick={() => setSelectedCity(hospital.city)} className={selectedCity === hospital.city ? "active" : ""}>{hospital.city}</li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="content">
          <hr />
          <div className={`hospital-grid ${selectedCity === "All" ? "all" : ""}`}>

            {filteredHospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <img src={hospital.image} alt={hospital.name} />
                <h3>{hospital.name}</h3>
                <p><strong>Address:</strong> {hospital.address}</p>
                <p><strong>Contact:</strong> {hospital.contact}</p>
                <p><strong>History:</strong> {hospital.history}</p>
                <p><strong>Specialties:</strong> {hospital.specialties.join(", ")}</p>
                <p><strong>Facilities:</strong> {hospital.facilities.join(", ")}</p>
                <p><strong>Emergency:</strong> {hospital.emergency}</p>
                <p><strong>Doctors:</strong> {hospital.doctors.join(", ")}</p>
                 </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
       .header {
          text-align: center;
          
          color: black;
      
         
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          min-height: 100vh;
         
        }

        .sidebar {
          width: 250px;
          border-right: 1px solid #ddd;
          padding-right: 15px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          padding: 10px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          font-size: 14px;
          color: black;
        }

        .sidebar li.active {
          font-weight: bold;
          color: #007bff;
        }

        .content {
          flex: 1;
          padding-left: 20px;
          width: 100%;
        }

        .content h2 {
          font-size: 22px;
          color: #007bff;
          margin-bottom: 15px;
        }

        .content hr {
          width: 50px;
          border: 2px solid #007bff;
          margin-bottom: 20px;
        }

        .hospital-grid {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hospital-card {
          width: 100%;
          max-width: 700px;
          padding: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          background: #fff;
        }

        .hospital-card img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        .hospital-card h3 {
          margin-top: 10px;
          font-size: 18px;
        }

        .hospital-card p {
          font-size: 14px;
          margin: 5px 0;
        }

        .hospital-card a {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }
          .hospital-grid.all {
  flex-direction: column;
  align-items: center;
}

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          .sidebar ul {
            display: flex;
            gap: 15px;
            overflow-x: auto;
          }
          .hospital-grid {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};


export default HospitalList;
