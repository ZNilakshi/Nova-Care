import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QtYgJKkJcTRQClqduXmKSglIZ7P4kvBTqtHqWIFTpwjvWwkEqVUGHqod0e0j83NjSv9ox5hD2QDxbZTJ1GbCuGm00QQ62Nn1T");
const API_URL = "https://nova-care-production.up.railway.app";

function PaymentForm({ clientSecret, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      alert("Payment Successful!");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.paymentForm}>
      <PaymentElement style={styles.paymentElement} />
      {error && <p style={styles.error}>{error}</p>}
      <button type="submit" disabled={loading || !stripe} style={styles.submitButton}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: "", email: "", address: "", phone: "" });
  const [clientSecret, setClientSecret] = useState("");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  useEffect(() => {
    fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: subtotal }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [subtotal]);

  const handleChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const handlePaymentSuccess = async () => {
    try {
      await fetch(`${API_URL}/api/orders/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userDetails, items: cart, totalAmount: subtotal }),
      });

      await fetch(`${API_URL}/api/reduce-stock`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      localStorage.removeItem("cart");
      navigate("/");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const stripeOptions = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <div style={containerStyle}>
       <div style={styles.summaryContainer}>
        <h3 style={styles.summaryTitle}>Order Summary</h3>
        {cart.map(({ name, price, quantity }) => (
          <div key={name} style={styles.summaryItem}>
            <span>{name} (x{quantity})</span>
            <span>Rs{(price * quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <h3 style={styles.total}>Total: Rs. {subtotal.toFixed(2)}</h3>
      </div>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Checkout</h2>
        <form>
          <input type="text" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleChange} required style={styles.input} />
          <input type="text" name="address" placeholder="Address" value={userDetails.address} onChange={handleChange} required style={styles.input} />
          <input type="tel" name="phone" placeholder="Phone" value={userDetails.phone} onChange={handleChange} required style={styles.input} />
        </form>
        {clientSecret && (
          <Elements stripe={stripePromise} options={stripeOptions}>
            <PaymentForm clientSecret={clientSecret} onSuccess={handlePaymentSuccess} />
          </Elements>
        )}
      </div>
     
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    maxWidth: "800px",
    margin: "65px auto",
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    flexDirection: "row",
    gap: "16px",
  },
  formContainer: {
    flex: 1,
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  summaryContainer: {
    flex: 1,
    padding: "16px",
    background: "#f8f8f8",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    background: "#155724",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    marginTop: "10px",
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
  },
  total: {
    fontSize: "18px",
    fontWeight: "700",
    textAlign: "right",
  },
  paymentForm: {
    marginTop: "16px",
  },
  paymentElement: {
    padding: "10px",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};


const containerStyle = {
  ...styles.container,
  flexDirection: window.innerWidth <= 568 ? "column" : "row",
};


