import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Payment from "./payment";

const API_URL = "https://nova-care-production.up.railway.app";
 

const AppointmentForm = () => {

   const location = useLocation();
  const { doctorId, doctorName, date, time, specialization, doctorPhoto, location: sessionLocation, doctorFee } = location.state || {};

  // Ensure doctorFee is parsed correctly
  const parsedDoctorFee = doctorFee 
    ? (typeof doctorFee === "string" && doctorFee.replace 
        ? parseInt(doctorFee.replace(/\D/g, "")) 
        : Number(doctorFee)) 
    : 0;

  const echannellingFee = 399;
  const totalFee = parsedDoctorFee + echannellingFee; // Calculate total fee

  const [formData, setFormData] = useState({
    title: "Mr",
    name: "",
    phone: "",
    nic: "",
    age: "",
    spc: "",
  });

  const [errors, setErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false); // Show payment after form submission

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    ["name", "phone", "age"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
  
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const appointmentData = {
      doctorId,
      doctorName,
      specialization,
      sessionLocation,
      date,
      time,
      doctorFee: parsedDoctorFee,
      echannellingFee,
      totalFee,
      patient: formData,
      paymentStatus: "Pending",
    };
  
    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
  
      if (response.ok) {
        setShowPayment(true);
      } else {
        console.error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  return (
    <div style={styles.container}>
      {/* Sidebar with doctor details */}
      <div style={styles.sidebar}>
        <img src={doctorPhoto || "https://via.placeholder.com/100"} alt={doctorName || "Doctor"} style={styles.image} />
        <h3 style={styles.doctorName}>Dr. {doctorName || "Dr. Not Specified"}</h3>
        <p><strong>Specialization:</strong> {specialization || "Not specified"}</p>
        <p><strong>Location:</strong> {sessionLocation || "Not specified"}</p>
        <p><strong>Session Date:</strong> {date || "TBD"}</p>
        <p><strong>Session Time:</strong> {time || "TBD"}</p>
      </div>

      {/* Appointment Form */}
      {!showPayment ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>📅 Book Your Appointment</h2>
          <div style={styles.flexRow}>
            <select name="title" value={formData.title} onChange={handleChange} style={styles.input}>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
            </select>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={inputStyle(errors.name)} />
          </div>
          {errors.name && <p style={styles.error}>{errors.name}</p>}
          <input type="text" name="phone" placeholder="Whatsapp Number" value={formData.phone} onChange={handleChange} style={inputStyle(errors.phone)} />
          {errors.phone && <p style={styles.error}>{errors.phone}</p>}
          <input type="text" name="nic" placeholder="National ID (NIC)" value={formData.nic} onChange={handleChange} style={inputStyle(errors.nic)} />
          {errors.nic && <p style={styles.error}>{errors.nic}</p>}
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} style={inputStyle(errors.age)} />
          {errors.age && <p style={styles.error}>{errors.age}</p>}
          <input type="text" name="spc" placeholder="Any Special notes" value={formData.spc} onChange={handleChange} style={inputStyle(errors.spc)} />
          
          <button type="submit" style={styles.button}>Proceed to Payment</button>
        </form>
      ) : (
        /* Show entered user details and payment component */
        <div style={styles.userDetailsContainer}>
          <h2 style={styles.sectionTitle}> Patient Details</h2>
          <p><strong>Name:</strong> {formData.title} {formData.name}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>NIC:</strong> {formData.nic}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Special Note:</strong> {formData.spc}</p>
          </div>
      )}

      {/* Payment Details Sidebar */}
      {!showPayment && (
        <div style={styles.sidebar}>
          <h3 style={styles.paymentTitle}>💳 Payment Details</h3>
          <p><strong>Doctor’s Fee:</strong> Rs {doctorFee || "0.00"}</p>
          <p><strong>eChannelling Fee:</strong> Rs {echannellingFee}</p>
          <hr />
          <h4 style={styles.total}>Total: Rs {totalFee}.00</h4>
        </div>
      )}

      {/* Payment Section (Visible after form submission) */}
      {showPayment && (
        <div style={styles.paymentContainer}>
          <h2> Payment Section</h2>
          <Payment 
    totalFee={totalFee}
    doctorId={doctorId}
    appointmentDetails={{
        sessionLocation,
        date,
        time,
        patientPhone: formData.phone,  
        doctorName: doctorName        
    }}
/>



        </div>
      )}
    </div>
  );
};

// Input styling function
const inputStyle = (error) => ({
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: `1px solid ${error ? "red" : "#ccc"}`,
  marginBottom: "10px",
});

// Styles
const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "80px",
    fontFamily: "'Poppins', sans-serif",
    background: "#f4f8fc",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  sidebar: {
    width: "25%",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    minWidth: "280px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  doctorName: {
    color: "#0096C7",
    marginTop: "15px",
  },
  userDetailsContainer: {
    flex: "1",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    minWidth: "300px",
  },
  paymentContainer: {
    flex: "1",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    minWidth: "300px",
  },
  form: {
    flex: "1",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    minWidth: "300px",
  },
  formTitle: {
    color: "#0096C7",
    textAlign: "center",
    marginBottom: "20px",
  },
  flexRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: "1",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  button: {
    background: "#0096C7",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    marginTop: "15px",
    fontSize: "16px",
    transition: "0.3s",
  },
  total: {
    color: "#0096C7",
    fontWeight: "bold",
  },
};

export default AppointmentForm;
