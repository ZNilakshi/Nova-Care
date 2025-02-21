import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartPage = ({ cart = {}, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const navigate = useNavigate();

  const cartItems = cart ? Object.entries(cart) : []; // Ensure cart is an object
  const totalAmount = cartItems.reduce((acc, [_, item]) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa" }}>
      <h2 style={{ textAlign: "center", color: "#155724" }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty.</p>
      ) : (
        <div style={{ maxWidth: "800px", margin: "auto", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)" }}>
          {cartItems.map(([name, item]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ddd" }}>
              <img src={item.imgSrc} alt={name} style={{ width: "60px", height: "60px", borderRadius: "5px" }} />
              <div style={{ flex: "1", marginLeft: "10px" }}>
                <h3 style={{ margin: "0", fontSize: "16px" }}>{name}</h3>
                <p style={{ margin: "5px 0", color: "#555" }}>₹{item.price} each</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button onClick={() => decreaseQuantity(name)} style={{ padding: "5px 10px", borderRadius: "5px", cursor: "pointer", background: "gray", color: "white" }}>-</button>
                <span style={{ margin: "0 10px", fontWeight: "bold" }}>{item.quantity || 1}</span>
                <button onClick={() => increaseQuantity(name)} style={{ padding: "5px 10px", borderRadius: "5px", cursor: "pointer", background: "gray", color: "white" }}>+</button>
              </div>
              <p style={{ margin: "0 10px", fontWeight: "bold" }}>₹{item.price * (item.quantity || 1)}</p>
              <button onClick={() => removeFromCart(name)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}>
                <FaTrash />
              </button>
            </div>
          ))}
          <h3 style={{ textAlign: "right", marginTop: "20px" }}>Total: ₹{totalAmount}</h3>
          <button onClick={() => navigate("/checkout")} style={{ display: "block", width: "100%", padding: "10px", backgroundColor: "#155724", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px", fontSize: "18px" }}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};


export default CartPage;