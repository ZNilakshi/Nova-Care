import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doctors } from "../pages/DoctorCard"; // Import doctors list

const AppointmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctorName, date, time, specialization, doctorPhoto } = location.state || {};

  // Find the selected doctor's details including the fee
  const selectedDoctor = doctors.find((doctor) => doctor.name === doctorName);
  const doctorFee = selectedDoctor ? selectedDoctor.fee : "N/A";

  const [formData, setFormData] = useState({
    title: "Mr",
    name: "",
    phone: "",
    nic: "",
    email: "",
    area: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.nic) {
      alert("Please fill all required fields.");
      return;
    }
    alert(`Appointment Confirmed for ${formData.name}!`);
    navigate("/");
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Left Sidebar */}
      <div style={{ width: "20%", background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
        <img src={doctorPhoto || "https://via.placeholder.com/100"} alt={doctorName || "Doctor"} style={{ width: "100%", borderRadius: "8px" }} />
        <h3>{doctorName || "Dr. Not Specified"}</h3>
        <p><strong>Specialization:</strong> {specialization || "General"}</p>
        <p><strong>Session Date:</strong> {date || "TBD"}</p>
        <p><strong>Session Time:</strong> {time || "TBD"}</p>
      </div>

      {/* Center Form */}
      <form onSubmit={handleSubmit} style={{ flex: "1", background: "#fff", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#007bff", textAlign: "center" }}>Place Appointment</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <select name="title" value={formData.title} onChange={handleChange} style={{ flex: "1", padding: "10px" }}>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={{ flex: "2", padding: "10px" }} />
        </div>

        <input type="email" name="email" placeholder="Receipt will be sent to this email" value={formData.email} onChange={handleChange} style={{ padding: "10px", margin: "10px 0" }} />

        <div style={{ display: "flex", gap: "10px" }}>
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required style={{ flex: "1", padding: "10px" }} />
          <input type="text" name="area" placeholder="Enter your city" value={formData.area} onChange={handleChange} style={{ flex: "1", padding: "10px" }} />
        </div>

        <input type="text" name="nic" placeholder="NIC Number" value={formData.nic} onChange={handleChange} required style={{ padding: "10px", margin: "10px 0" }} />

        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="checkbox" /> Option for No Show Refund
        </label>

        <button type="submit" style={{ background: "#007bff", color: "white", padding: "12px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Pay</button>
      </form>

      {/* Right Sidebar */}
      <div style={{ width: "20%", display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
          <h4>Patient Details</h4>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>NIC:</strong> {formData.nic}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Email:</strong> {formData.email}</p>
        </div>

        {/* Payment Details - Dynamically Display Doctor's Fee */}
        <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
          <h4>Payment Details</h4>
          <p>Host Fee + Doc Fee: {doctorFee}</p>
          <p>eChannelling Fee: ₹ 399.00</p>
          <p>Discount: Rs 0.00</p>
          <p>No Show Fee: Rs 0.00</p>
          <hr />
          <p><strong>Total Fee: {doctorFee !== "N/A" ? `Rs ${parseInt(doctorFee.replace("₹", "")) + 399}.00` : "N/A"}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
