import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51QtYgJKkJcTRQClqduXmKSglIZ7P4kvBTqtHqWIFTpwjvWwkEqVUGHqod0e0j83NjSv9ox5hD2QDxbZTJ1GbCuGm00QQ62Nn1T");
const API_URL = "https://nova-care-production.up.railway.app";

const CheckoutForm = ({ clientSecret, appointmentDetails, doctorId, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!stripe || !elements) {
            setMessage("Stripe is not loaded yet. Please try again.");
            setLoading(false);
            return;
        }

        try {
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: { return_url: window.location.origin },
                redirect: "if_required",
            });

            if (result.error) {
                setMessage(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                setMessage();
                onPaymentSuccess(appointmentDetails, doctorId);
            }
        } catch (err) {
            setMessage("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: "center", padding: "20px" }}>
            <PaymentElement />
            {message && <p style={{ color: "red" }}>{message}</p>}
            <button
                type="submit"
                disabled={loading}
                style={{
                    marginTop: "15px",
                    padding: "10px",
                    background: loading ? "#ccc" : "#0096C7",
                    color: "white",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};
const Payment = ({ totalFee, appointmentDetails, doctorId }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await fetch(`${API_URL}/create-payment-intent`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: totalFee }),
                });

                if (!response.ok) throw new Error("Failed to fetch payment intent.");

                const { clientSecret } = await response.json();
                setClientSecret(clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
                setMessage("Error creating payment. Please try again.");
            }
        };

        createPaymentIntent();
    }, [totalFee]);

    // ✅ FIXED: Define handlePaymentSuccess
    const handlePaymentSuccess = async (appointmentDetails, doctorId) => {
        try {
            setMessage("Processing Appointment...");

            if (!appointmentDetails) {
                setMessage("Appointment details are missing.");
                return;
            }

            const { sessionLocation, date, time, patientPhone, doctorName } = appointmentDetails;

            await fetch(`${API_URL}/api/doctors/${doctorId}/decrease-slot`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionLocation, date, time }),
            });

            await fetch(`${API_URL}/api/send-message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: patientPhone,
                    message: `Hello, your appointment with Dr. ${doctorName} is confirmed! 📅 Date: ${date}, ⏰ Time: ${time}, 📍 Location: ${sessionLocation}. Thank you!`,
                }),
            });

            setMessage("Appointment Confirmed!");
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            setMessage("Error processing appointment: " + error.message);
        }
    };

    const stripeOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
        },
        paymentMethodOrder: ["card"], // Only show Card payment
        wallets: {
            applePay: "never",    // Disable Apple Pay
            googlePay: "never",   // Disable Google Pay
            amazonPay: "never",   // Disable Amazon Pay
            cashApp: "never"      // Disable Cash App Pay
        }
    };
    

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <p><strong>Total Fee:</strong> Rs{totalFee}.00</p>
            {message && <p style={{ color: message.includes("Confirmed") ? "green" : "blue" }}>{message}</p>}
            {clientSecret && (
    <Elements stripe={stripePromise} options={stripeOptions}>
        <CheckoutForm
            clientSecret={clientSecret}
            appointmentDetails={appointmentDetails}
            doctorId={doctorId}
            onPaymentSuccess={handlePaymentSuccess}
        />
    </Elements>
)}

           
        </div>
    );
};


export default Payment;
