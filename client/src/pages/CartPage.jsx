import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQty = (productName, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const removeItem = (productName) => {
    setCart((prev) => prev.filter((item) => item.name !== productName));
  };

  // Calculate subtotal
  const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Basket</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>Your cart is empty.</p>
      ) : (
        cart.map(({ name, price, image, quantity }) => (
          <div key={name} style={styles.cartItem}>
            <img src={`http://localhost:5000${image}`} alt={name} style={styles.image} />
            <div style={{ flex: 1, marginLeft: "16px" }}>
              <h3 style={styles.productName}>{name}</h3>
              <p style={styles.price}>Rs. {price.toFixed(2)}</p>
              <div style={styles.controls}>
                <button onClick={() => updateQty(name, -1)} style={styles.controlButton}>
                  <FaMinus size={16} />
                </button>
                <span style={{ margin: "0 8px" }}>{quantity}</span>
                <button onClick={() => updateQty(name, 1)} style={styles.controlButton}>
                  <FaPlus size={16} />
                </button>
                <button onClick={() => removeItem(name)} style={styles.removeButton}>
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <div style={styles.footer}>
        <p style={styles.subtotal}>Subtotal: Rs.{subtotal.toFixed(2)}</p>
        <button onClick={() => navigate("/checkout")} style={styles.checkoutButton}>
          Checkout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    minHeight: "61vh",
    margin: " 65px auto ",
    
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: { fontSize: "20px", fontWeight: "600", marginBottom: "16px" },
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    border: "1px solid #ddd",
    marginBottom: "8px",
    borderRadius: "4px",
  },
  image: { width: "64px", height: "64px", objectFit: "cover", borderRadius: "4px" },
  productName: { fontSize: "16px", fontWeight: "500" },
  price: { color: "#555" },
  controls: { display: "flex", alignItems: "center", marginTop: "8px" },
  controlButton: {
    padding: "4px 8px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    marginRight: "8px",
  },
  removeButton: {
    padding: "4px 8px",
    background: "#ff4d4f",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginLeft: "16px",
  },
  footer: { marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #ddd" },
  subtotal: { fontSize: "18px", fontWeight: "600" },
  checkoutButton: {
    width: "100%",
    marginTop: "16px",
    padding: "12px",
    background: "#155724",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
