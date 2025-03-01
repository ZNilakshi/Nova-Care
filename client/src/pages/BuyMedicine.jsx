import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const BuyMedicinePage = () => {

  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
 
  const [cart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || {}; // Load from localStorage
  });
   const [selectedBrand, setSelectedBrand] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility

  // Fetch brands and products from the backend
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/brands");
        const data = await response.json();
        setBrands(data);
        setDisplayedProducts(data.flatMap((brand) => brand.products));
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandClick = (brand) => {
    if (selectedBrand === brand.name) {
      setSelectedBrand(null);
      setDisplayedProducts(brands.flatMap((brand) => brand.products));
    } else {
      setSelectedBrand(brand.name);
      setDisplayedProducts(brand.products);
    }
  };
  
 
  useEffect(() => {
    Object.keys(cart).forEach((productName) => {
      localStorage.setItem("product_" + productName, JSON.stringify(cart[productName]));
    });
  }, [cart]);
  
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new product with quantity
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Show popup for 3 seconds
    setPopupVisible(true);
    setTimeout(() => {
        setPopupVisible(false);
    }, 13000);
};


  const increaseQuantity = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map(item => 
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
    );

    localStorage.setItem("cart", JSON.stringify(cart));
};

  const decreaseQuantity = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map(item => 
        item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0); // Remove item if quantity reaches 0

    localStorage.setItem("cart", JSON.stringify(cart));
};



  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f8f9fa", position: "relative" }}>
      <Navbar cart={cart} navigate={navigate} />
      <BrandSelection brands={brands} selectedBrand={selectedBrand} handleBrandClick={handleBrandClick} />
      <ProductList displayedProducts={displayedProducts} cart={cart} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
    {/* Popup for "View Cart" message */}
    {popupVisible && (
  <div
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      opacity: "0.8",
      transition: "opacity 0.3s ease",
    }}
  >
    <button
      onClick={() => navigate("/cart")}
      style={{
        backgroundColor: "#155724",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      View Cart
    </button>
  </div>
)}

    </div>
    
  );
};

const Navbar = ({ navigate }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage whenever it changes
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Calculate total quantity correctly
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      style={{
        backgroundColor: "#155724",
        marginTop: "40px",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        NOVA CARE Pharmacy
      </div>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
        onClick={() => navigate("/cart")}
      >
        <FaShoppingCart size={24} />
        {totalItems > 0 && (
          <span
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              position: "absolute",
              top: "-5px",
              right: "-10px",
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    </nav>
  );
};



const BrandSelection = ({ brands, selectedBrand, handleBrandClick }) => {
  const [index, setIndex] = useState(0);
  const [visibleBrands, setVisibleBrands] = useState(2); // Default to 2 for mobile

  // Adjust visible brands based on screen width
  useEffect(() => {
    const updateVisibleBrands = () => {
      const width = window.innerWidth;
      if (width < 600) setVisibleBrands(2); // Small screens
      else if (width < 900) setVisibleBrands(4); // Medium screens
      else if (width < 1200) setVisibleBrands(5); // Large tablets/small desktops
      else setVisibleBrands(5); // Large desktops
    };

    updateVisibleBrands(); // Run once on mount
    window.addEventListener("resize", updateVisibleBrands); // Listen for screen changes

  return () => window.removeEventListener("resize", updateVisibleBrands); // Cleanup
  }, []);

  const nextSlide = () => {
    if (index + visibleBrands < brands.length) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        textAlign: "center",
        position: "relative",
        background: "#e3f2fd",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "10px auto",
        maxWidth: "95%",
      }}
    >
      <h2
        style={{
          color: "#155724",
          fontSize: "26px",
          marginBottom: "15px",
          fontWeight: "bold",
        }}
      >
        Shop By Brand
      </h2>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Left Arrow */}
        {index > 0 && (
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: "-30px",
              zIndex: 2,
                 color: "black",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            ❮
          </button>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${visibleBrands}, 1fr)`,
            gap: "10px",
            width: "90%",
            height: "230px",
            overflow: "hidden",
            padding: "5px",
          }}
        >
          {brands.slice(index, index + visibleBrands).map((brand, idx) => (
            <div
              key={idx}
              onClick={() => handleBrandClick(brand)}
              style={{
                backgroundColor: selectedBrand === brand.name ? "#d1f7d1" : "white",
                padding: "15px",
                borderRadius: "15px",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.3s",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
           <img src={`http://localhost:5000${brand.image}`} alt={brand.name}  style={{ width: "120px", height: "120px", borderRadius: "10px" }}/>

              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "10px",
                  color: "#333",
                }}
              >
                {brand.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {index + visibleBrands < brands.length && (
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: "-30px",
              zIndex: 2,
              color: "black",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
};

const ProductList = ({ displayedProducts, cart, addToCart, increaseQuantity, decreaseQuantity }) => (
  <div style={{ padding: "20px" }}>
    <div 
      style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 2fr))", // Responsive grid
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {displayedProducts.map((product, idx) => (
        <ProductCard 
          key={idx} 
          product={product} 
          cart={cart} 
          addToCart={addToCart} 
          increaseQuantity={increaseQuantity} 
          decreaseQuantity={decreaseQuantity} 
        />
      ))}
    </div>
  </div>
);


const ProductCard = ({ product, cart, addToCart, increaseQuantity, decreaseQuantity }) => {
  const [quantity, setQuantity] = useState(cart[product.name]?.quantity || 0);

  useEffect(() => {
    // Sync quantity with cart updates
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = updatedCart.find((item) => item.name === product.name);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cart, product.name]);

  return (
    <div 
      style={{ 
        backgroundColor: "white", 
        padding: "15px", 
        textAlign: "center", 
        borderRadius: "10px", 
        minWidth: "160px", 
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <img 
        src={`http://localhost:5000${product.image}`} 
        alt={product.name}  
        style={{ width: "120px", height: "120px", borderRadius: "10px" }} 
      />
      <h3 style={{ fontSize: "14px", marginTop: "10px" }}>{product.name}</h3>
      
      <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
        Rs.{product.price}  
      </p>
      <p style={{ color: "#008000", fontSize: "12px", fontWeight: "bold" }}>{product.discount}% off</p>

      {quantity > 0 ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", background: "#f8f9fa", borderRadius: "5px", padding: "5px" }}>
          <button 
            onClick={() => {
              decreaseQuantity(product);
              setQuantity(quantity - 1);
            }} 
            style={{ backgroundColor: "gray", color: "black", border: "3px solid gray", padding: "5px 15px", borderRadius: "5px", cursor: "pointer" }}
          >
            -
          </button>
          <span style={{ fontWeight: "bold", fontSize: "17px" }}>{quantity}</span>
          <button 
            onClick={() => {
              increaseQuantity(product);
              setQuantity(quantity + 1);
            }} 
            style={{ backgroundColor: "gray", color: "black", border: "1px solid gray", padding: "5px 15px", borderRadius: "5px", cursor: "pointer" }}
          >
            +
          </button>
        </div>
      ) : (
        <button 
          onClick={() => {
            addToCart(product);
            setQuantity(1);
          }} 
          style={{ backgroundColor: "#004d40", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", width: "100%" }}
        >
          ADD
        </button>
      )}
    </div>
  );
};


export default BuyMedicinePage;
