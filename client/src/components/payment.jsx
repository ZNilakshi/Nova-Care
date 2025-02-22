import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalFee, doctorId, appointmentDetails } = location.state || {};

  const [selectedPayment, setSelectedPayment] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvn, setCvn] = useState("");

  const handleProceed = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    if (!acceptedTerms) {
      alert("Please accept the Terms and Conditions.");
      return;
    }
    setShowPaymentDetails(true);
  };
  
  
  
 
  const handlePay = async () => {
    if (!cardNumber || !expiryMonth || !expiryYear || !cvn) {
      alert("Please fill in all required fields.");
      return;
    }
  
    console.log("Payment Page State:", location.state);
  
    try {
      alert("Processing Payment...");
      console.log("Doctor ID:", doctorId);
  
      if (!doctorId) {
        console.error("doctorId is missing. Cannot update slot.");
        return;
      }
  
      // ✅ Send date & time exactly as entered
      const rawDate = appointmentDetails.date; // Example: "Sat, Mar 22, 2025"
      const rawTime = appointmentDetails.time; // Example: "10:27 AM"
  
      console.log("Sending API Request with:", {
        sessionLocation: appointmentDetails?.sessionLocation,
        date: rawDate,  // No conversion
        time: rawTime,  // No conversion
      });
  
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}/decrease-slot`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionLocation: appointmentDetails?.sessionLocation,
          date: rawDate, 
          time: rawTime, 
        }),
      });
  
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update slot:", errorData.message);
        alert("Failed to update slot: " + errorData.message);
        return;
      }
  
      const data = await response.json();
      console.log("Slot updated successfully:", data);
  
      alert(`Payment Successful! `);
      navigate("/");
  
    } catch (error) {
      console.error("Error updating slot:", error);
      alert("Error updating slot: " + error.message);
    }
  };
  
  
  
  


  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Left Section - Pay Now */}
        <div style={styles.leftSection}>
          <h2 style={styles.title}>💳 Pay Now</h2>
          <p style={styles.fee}><strong>Total Fee:</strong> {totalFee || "N/A"}</p>
          
          <h3 style={styles.paymentTitle}>Choose Payment Method</h3>
          <div style={styles.buttonGroup}>
            {["Visa", "Mastercard"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPayment(type)}
                style={{ ...styles.paymentButton, border: selectedPayment === type ? "3px solid #0096C7" : "black" }}
              >
                <img src={`/${type.toLowerCase()}.png`} alt={type} style={styles.smallLogo} />
              </button>
            ))}
          </div>

          <div style={styles.checkboxContainer}>
            <input 
              type="checkbox" 
              id="terms" 
              checked={acceptedTerms} 
              onChange={() => setAcceptedTerms(!acceptedTerms)} 
              style={styles.checkbox} 
            />
            <label htmlFor="terms" style={styles.label}> I Accept the Terms and Conditions</label>
          </div>

          <button onClick={handleProceed} style={styles.button}>Proceed To Payment</button>
        </div>

        {/* Right Section - Payment Details */}
        {showPaymentDetails && (
          <div style={styles.rightSection}>
            <h2 style={styles.title}>🔒 Payment Details</h2>
            <p style={styles.fee}><strong>Card Type:</strong> {selectedPayment}</p>

            <div style={styles.formGroup}>
              <label>Card Number *</label>
              <input 
                type="text" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)} 
                style={styles.input} 
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div style={styles.row}>
              <div>
                <label>Expiration Month *</label>
                <select value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)} style={styles.select}>
                  <option value="">Month</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Expiration Year *</label>
                <select value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)} style={styles.select}>
                  <option value="">Year</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={String(2025 + i)}>{2025 + i}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label>CVN *</label>
              <input 
                type="password" 
                value={cvn} 
                onChange={(e) => setCvn(e.target.value)} 
                style={styles.input} 
                placeholder="123"
              />
            </div>

            <button onClick={handlePay} style={styles.button}>Pay</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    
    background: "#f4f8fc", 
    padding: "70px" 
  },
  contentWrapper: { 
    display: "flex", 
    gap: "20px", 
    maxWidth: "800px", 
    width: "100%",
    flexWrap: "wrap"  // Allows wrapping on smaller screens
  },
  leftSection: { 
    flex: 1, 
    background: "#fff", 
    padding: "20px", 
    borderRadius: "12px", 
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)", 
    textAlign: "center",
    minWidth: "300px" // Ensures minimum width for small screens
  },
  rightSection: { 
    flex: 1, 
    background: "#eef5f9", 
    padding: "20px", 
    borderRadius: "12px", 
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)", 
    minWidth: "300px"
  },
  buttonGroup: { 
    display: "flex", 
    gap: "10px", 
    justifyContent: "center", 
    flexWrap: "wrap" // Wrap buttons on smaller screens
  },
  paymentButton: { 
    padding: "12px", 
    borderRadius: "8px", 
    cursor: "pointer", 
    width: "80px", 
    height: "50px", 
    background: "transparent",
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center"
  },
  button: { 
    marginTop: "15px", 
    background: "#0096C7", 
    color: "white", 
    padding: "12px", 
    borderRadius: "8px", 
    cursor: "pointer", 
    width: "100%", 
    fontSize: "16px"
  },
  row: { 
    display: "flex", 
    justifyContent: "space-between", 
    gap: "10px", 
    flexWrap: "wrap" // Wrap fields in smaller screens
  },
  select: { 
    width: "48%", 
    padding: "8px",
    minWidth: "100px" // Prevents too small width on mobile
  },
  smallLogo: { 
    width: "40px", 
    height: "30px" 
  },
  input: { 
    width: "100%", 
    padding: "10px", 
    borderRadius: "5px", 
    border: "1px solid #ccc" 
  },

  // RESPONSIVE STYLES
  "@media (max-width: 768px)": {
    contentWrapper: { 
      flexDirection: "column", 
      alignItems: "center" 
    },
    leftSection: { 
      width: "90%", 
      marginBottom: "20px" 
    },
    rightSection: { 
      width: "90%" 
    },
    buttonGroup: { 
      flexDirection: "row", 
      justifyContent: "center" 
    },
    row: { 
      flexDirection: "column", 
      gap: "10px" 
    },
    select: { 
      width: "100%" 
    }
  }
};

export default Payment;
