import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51QtYgJKkJcTRQClqduXmKSglIZ7P4kvBTqtHqWIFTpwjvWwkEqVUGHqod0e0j83NjSv9ox5hD2QDxbZTJ1GbCuGm00QQ62Nn1T");

const CheckoutForm = ({ totalFee, appointmentDetails, doctorId, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setMessage("Stripe is not loaded yet. Please try again.");
            setLoading(false);
            return;
        }
        if (!appointmentDetails) {
            setMessage("Appointment details are missing. Please try again.");
          setLoading(false);
          return;
      }
        try {
            const response = await fetch("http://localhost:5000/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalFee }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch payment intent.");
            }

            const { clientSecret } = await response.json();
            if (!clientSecret) {
                throw new Error("No client secret received. Please try again.");
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                setMessage("Payment Successful!");
                onPaymentSuccess(appointmentDetails, doctorId);
            }
        } catch (err) {
            setError(err.message || "Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: "center", padding: "20px" }}>
            <CardElement />
            {message && <p style={{ color: "red" }}>{error}</p>}
            <button 
                type="submit" 
                disabled={loading} 
                style={{
                    marginTop: "15px",
                    padding: "10px",
                    background: loading ? "#ccc" : "#0096C7",
                    color: "white",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer"
                }}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

const Payment = ({ totalFee, appointmentDetails, doctorId }) => {
   
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

  const handlePaymentSuccess = async (appointmentDetails, doctorId) => {
    console.log("Received appointment details:", appointmentDetails);
    console.log("Received doctor ID:", doctorId);

    
    try {
        setMessage("Processing Appointment...");

        console.log("Received appointmentDetails:", appointmentDetails);

        if (!appointmentDetails) {
            console.error("❌ Appointment details are missing.");
            setMessage("Appointment details are missing. Please try again.");
            return;
        }

        const { sessionLocation, date, time ,patientPhone, doctorName} = appointmentDetails;

        if (!sessionLocation || !date || !time) {
            console.error("❌ Missing sessionLocation, date, or time in appointmentDetails");
            setMessage("Missing session location, date, or time. Please check the appointment details.");
            return;
        }

        console.log("Sending API Request with:", { sessionLocation, date, time });

        const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}/decrease-slot`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionLocation,
                date,
                time,
            }),
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Failed to update slot:", errorData.message);
            setMessage("Failed to update slot: " + errorData.message);
            return;
        }

        console.log("✅ Slot updated successfully!");

        // 📩 Send WhatsApp Confirmation Message
       // 📩 Send WhatsApp Confirmation Message
       console.log("📩 Sending WhatsApp confirmation...");
       await fetch("http://localhost:5000/api/send-whatsapp-message", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
               phone: patientPhone,
               message: `Hello, your appointment with Dr. ${doctorName} is confirmed! 📅 Date: ${date}, ⏰ Time: ${time}, 📍 Location: ${sessionLocation}. Thank you!`
           }),
       });

       setMessage("Appointment Confirmed! WhatsApp notification sent.");
       setTimeout(() => navigate("/"), 3000);
   } catch (error) {
       console.error("❌ Error processing appointment:", error);
       setMessage("Error processing appointment: " + error.message);
   }
};

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <p><strong>Total Fee:</strong> Rs{totalFee}.00</p>
            {message && <p style={{ color: message.includes("Confirmed") ? "green" : "blue" }}>{message}</p>}
         
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    totalFee={totalFee} 
                    appointmentDetails={appointmentDetails} 
                    doctorId={doctorId} 
                    onPaymentSuccess={handlePaymentSuccess} 
                />
            </Elements>
        </div>
    );
};

export default Payment;