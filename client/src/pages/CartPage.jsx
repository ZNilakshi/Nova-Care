import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <FaArrowLeft size={20} /> Back to Home
      </button>
      
      <h2 style={{ marginTop: "20px" }}>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item, index) => (
            <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}
      
      {cart.length > 0 && (
        <h3 style={{ marginTop: "20px" }}>Total: ₹{totalPrice}</h3>
      )}
    </div>
  );
};

export default CartPage;
