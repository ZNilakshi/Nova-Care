import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QtYgJKkJcTRQClqduXmKSglIZ7P4kvBTqtHqWIFTpwjvWwkEqVUGHqod0e0j83NjSv9ox5hD2QDxbZTJ1GbCuGm00QQ62Nn1T");
const API_URL = "https://nova-care-production.up.railway.app";

function PaymentForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error, } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    } else {
      alert("Payment Successful! Your order has been placed.");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.paymentForm}>
      <CardElement style={styles.cardElement} />
      <button type="submit" disabled={!stripe} style={styles.submitButton}>Pay</button>
    </form>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentSuccess = async () => {
    const orderDetails = {
      ...userDetails,
      items: cart,
      totalAmount: subtotal,
    };
  
    try {
      await fetch(`${API_URL}/api/orders/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });
   // Reduce product quantity in the database
   await fetch(`${API_URL}/api/reduce-stock` , {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }), // Send purchased items
  });

      localStorage.removeItem("cart");
      navigate("/");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Checkout</h2>
        <form>
          <input type="text" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleChange} required style={styles.input} />
          <input type="text" name="address" placeholder="Address" value={userDetails.address} onChange={handleChange} required style={styles.input} />
          <input type="tel" name="phone" placeholder="Phone" value={userDetails.phone} onChange={handleChange} required style={styles.input} />
        </form>
        <Elements stripe={stripePromise}>
          <PaymentForm onSuccess={handlePaymentSuccess} />
        </Elements>
      </div>
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
  },
  formContainer: { flex: 1, padding: "16px" },
  summaryContainer: { flex: 1, padding: "16px", background: "#f8f8f8", borderRadius: "8px" },
  title: { fontSize: "22px", fontWeight: "600", marginBottom: "16px" },
  summaryTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "8px" },
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
  total: { fontSize: "18px", fontWeight: "700", textAlign: "right" },
  paymentForm: { marginTop: "16px" },
  cardElement: { padding: "10px", border: "1px solid #ccc", borderRadius: "4px" },
};
