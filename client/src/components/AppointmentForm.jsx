import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doctors } from "../pages/DoctorCard"; // Import doctors list

const AppointmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctorName, date, time, specialization, doctorPhoto } = location.state || {};

  // ✅ Doctor Fee Calculation
  const selectedDoctor = doctors.find((doctor) => doctor.name === doctorName);
  const doctorFee = selectedDoctor ? parseInt(selectedDoctor.fee.replace(/\D/g, "")) : 0;
  const echannellingFee = 399;
  const totalFee = doctorFee + echannellingFee;

  const [formData, setFormData] = useState({
    title: "Mr",
    name: "",
    phone: "",
    nic: "",
    age: "",
    area: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Remove error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Required fields validation
    ["name", "phone", "nic", "age", "area"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fill in all required fields.");
      return;
    }

    navigate("/payment", {
      state: {
        totalFee: `Rs ${totalFee}.00`,
      },
    });
  };

  return (
    <div style={styles.container}>
      {/* Left Sidebar - Doctor Info */}
      <div style={styles.sidebar}>
        <img src={doctorPhoto || "https://via.placeholder.com/100"} alt={doctorName || "Doctor"} style={styles.image} />
        <h3 style={styles.doctorName}>{doctorName || "Dr. Not Specified"}</h3>
        <p><strong>Specialization:</strong> {specialization || "General"}</p>
        <p><strong>Session Date:</strong> {date || "TBD"}</p>
        <p><strong>Session Time:</strong> {time || "TBD"}</p>
      </div>

      {/* Center Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.formTitle}>📅 Book Your Appointment</h2>

        {/* Title & Name */}
        <div style={styles.flexRow}>
          <select name="title" value={formData.title} onChange={handleChange} style={styles.input}>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={inputStyle(errors.name)} />
        </div>
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        {/* Phone */}
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={inputStyle(errors.phone)} />
        {errors.phone && <p style={styles.error}>{errors.phone}</p>}

        {/* NIC */}
        <input type="text" name="nic" placeholder="National ID (NIC)" value={formData.nic} onChange={handleChange} style={inputStyle(errors.nic)} />
        {errors.nic && <p style={styles.error}>{errors.nic}</p>}

        {/* Age */}
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} style={inputStyle(errors.age)} />
        {errors.age && <p style={styles.error}>{errors.age}</p>}

        {/* Area */}
        <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} style={inputStyle(errors.area)} />
        {errors.area && <p style={styles.error}>{errors.area}</p>}

        {/* Submit Button */}
        <button type="submit" style={styles.button}>Proceed to Payment</button>
      </form>

      {/* Right Sidebar - Payment Details */}
      <div style={styles.sidebar}>
        <h3 style={styles.paymentTitle}>💳 Payment Details</h3>
        <p><strong>Doctor’s Fee:</strong> Rs {doctorFee}</p>
        <p><strong>eChannelling Fee:</strong> Rs {echannellingFee}</p>
        <p><strong>Discount:</strong> Rs 0.00</p>
        <hr />
        <h4 style={styles.total}>Total: Rs {totalFee}.00</h4>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "40px",
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
  paymentTitle: {
    color: "#0096C7",
    textAlign: "center",
  },
  total: {
    color: "#0096C7",
    fontWeight: "bold",
  },
};

// Input styling helper function
const inputStyle = (error) => ({
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: `1px solid ${error ? "red" : "#ccc"}`,
  marginBottom: "10px",
});

export default AppointmentForm;
