import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctorName, date, time } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    nic: "",
    email: "",
    address: "",
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
    alert("Appointment Confirmed!");
    navigate("/");
  };

  return (
    <section style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#c93e3e" }}>Book Your Appointment</h2>
      <p><strong>Doctor:</strong> {doctorName}</p>
      <p><strong>Date:</strong> {date} | <strong>Time:</strong> {time}</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" name="name" placeholder="Name (Required)" value={formData.name} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone (Required)" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="nic" placeholder="NIC (Required)" value={formData.nic} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address (Optional)" value={formData.address} onChange={handleChange} />
        <button type="submit" style={{ background: "#d9534f", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Confirm Appointment</button>
      </form>
    </section>
  );
};

export default AppointmentForm;
