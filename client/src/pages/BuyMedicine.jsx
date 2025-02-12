import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const brands = [
  {
    name: "OZIVA",
    src: "/oziva.png",
    products: [
      { name: "OZIVA Protein", price: 499, discount: "10% off", imgSrc: "/images/oziva_protein.png" },
      { name: "OZIVA Collagen", price: 699, discount: "15% off", imgSrc: "/images/oziva_collagen.png" }
    ]
  },
  {
    name: "Vaseline",
    src: "/vaseline.png",
    products: [
      { name: "Vaseline Moisturizer", price: 199, discount: "20% off", imgSrc: "/images/vaseline_moisturizer.png" },
      { name: "Vaseline Lip Balm", price: 99, discount: "10% off", imgSrc: "/images/vaseline_lipbalm.png" }
    ]
  },
  {
    name: "Pampers",
    src: "/pampers.png",
    products: [
      { name: "Pampers Diapers", price: 299, discount: "15% off", imgSrc: "/images/pampers_diapers.png" },
      { name: "Pampers Diapers", price: 299, discount: "15% off", imgSrc: "/images/pampers_diapers.png" },
      { name: "Pampers B Wipes", price: 150, discount: "10% off", imgSrc: "/images/pampers_wipes.png" },
      { name: "Pampers Diapers", price: 299, discount: "15% off", imgSrc: "/images/pampers_diapers.png" },
      { name: "Pampers Baby Wipes", price: 150, discount: "10% off", imgSrc: "/images/pampers_wipes.png" },
    
      { name: "Pampes Baby Wipes", price: 150, discount: "10% off", imgSrc: "/images/pampers_wipes.png" }
    ]
  },
  {
    name: "Whisper",
    src: "/whisper.png",
    products: [
      { name: "Whisper Pads", price: 250, discount: "10% off", imgSrc: "/images/whisper_pads.png" },
      { name: "Whisper Ultra", price: 280, discount: "12% off", imgSrc: "/images/whisper_ultra.png" }
    ]
  },
  {
    name: "CeraVe",
    src: "/cerave.png",
    products: [
      { name: "CeraVe Cleanser", price: 899, discount: "12% off", imgSrc: "/images/cerave_cleanser.png" },
      { name: "CeraVe Moisturizer", price: 999, discount: "15% off", imgSrc: "/images/cerave_moisturizer.png" }
    ]
  }
];



const allProducts = brands.flatMap((brand) => brand.products);

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState(allProducts);

  const handleBrandClick = (brand) => {
    if (brand === null) {
      setSelectedBrand(null);
      setDisplayedProducts(allProducts);
    } else if (selectedBrand === brand.name) {
      setSelectedBrand(null);
      setDisplayedProducts(allProducts);
    } else {
      setSelectedBrand(brand.name);
      setDisplayedProducts(brand.products);
    }
  };
  
  

  const addToCart = (product) => setCart((prev) => ({ ...prev, [product.name]: 1 }));
  const increaseQuantity = (product) => setCart((prev) => ({ ...prev, [product.name]: prev[product.name] + 1 }));
  const decreaseQuantity = (product) => setCart((prev) => {
    const updatedCart = { ...prev };
    if (updatedCart[product.name] > 1) {
      updatedCart[product.name] -= 1;
    } else {
      delete updatedCart[product.name];
    }
    return updatedCart;
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f8f9fa", position: "relative" }}>
      <Navbar cart={cart} navigate={navigate} />
      <BrandSelection brands={brands} selectedBrand={selectedBrand} handleBrandClick={handleBrandClick} />
      <ProductList displayedProducts={displayedProducts} cart={cart} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
    </div>
  );
};

const Navbar = ({ cart, navigate }) => (
  <nav style={{ backgroundColor: "#155724", color: "white", padding: "10px 20px", display: "flex", justifyContent: "space-between" }}>
    <div style={{ fontSize: "20px", fontWeight: "bold" }}>NOVA CARE Pharmacy</div>
    <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => navigate("/cart")}> 
      <FaShoppingCart size={24} />
      <span style={{ marginLeft: "5px", fontWeight: "bold" }}>{Object.keys(cart).length}</span>
    </div>
  </nav>
);

const BrandSelection = ({ brands, selectedBrand, handleBrandClick }) => {
  const [index, setIndex] = useState(0);
  const visibleBrands = 5;
  
  const nextSlide = () => setIndex((prev) => (prev + 1 < brands.length - (visibleBrands - 1) ? prev + 1 : prev));
  const prevSlide = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  
  return (
    <div style={{ padding: "10px", textAlign: "center", position: "relative", background: "#e3f2fd", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", margin: "10px 0 0 0" }}>
      <h2 style={{ color: "#155724", fontSize: "26px", marginBottom: "15px", fontWeight: "bold" }}>Shop By Brand</h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MdArrowBack size={40} style={{ cursor: "pointer", color: "#155724" }} onClick={prevSlide} />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${visibleBrands}, 200px)`, gap: "10px", overflow: "hidden", padding: "5px" }}>
          {brands.slice(index, index + visibleBrands).map((brand, idx) => (
            <div key={idx} 
            onClick={() => handleBrandClick(brand)} 
            style={{ backgroundColor: selectedBrand === brand.name ? "#d1f7d1" : "white", padding: "15px", borderRadius: "15px", textAlign: "center", cursor: "pointer", transition: "transform 0.3s", boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)" }}>
         <img src={brand.src} alt={brand.name} style={{ width: "150px", height: "140px", borderRadius: "10px", transition: "0.3s" }} />
         <p style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px", color: "#333" }}>{brand.name}</p>
       </div>
       
          ))}
        </div>
        <MdArrowForward size={30} style={{ cursor: "pointer", color: "#155724" }} onClick={nextSlide} />
      </div>
    </div>
  );
};

const ProductList = ({ displayedProducts, cart, addToCart, increaseQuantity, decreaseQuantity }) => (
  <div style={{ padding: "20px" }}>
    <div 
      style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
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
  const quantity = cart[product.name] || 0; 

  return (
    <div 
      style={{ 
        backgroundColor: "white", 
        padding: "15px", 
        textAlign: "center", 
        borderRadius: "10px", 
        minWidth: "160px", // Adjust the width to fit 5 products per row
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <img src={product.imgSrc} alt={product.name} style={{ width: "120px", height: "120px", borderRadius: "10px" }} />
      <h3 style={{ fontSize: "14px", marginTop: "10px" }}>{product.name}</h3>
      
      <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
        ₹{product.price} <span style={{ textDecoration: "line-through", color: "gray", fontSize: "12px" }}>MRP ₹{product.price * 2}</span>
      </p>
      <p style={{ color: "#008000", fontSize: "12px", fontWeight: "bold" }}>{product.discount}</p>

      {quantity > 0 ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", background: "#f8f9fa", borderRadius: "5px", padding: "5px" }}>
          <button 
            onClick={() => decreaseQuantity(product)} 
            style={{ backgroundColor: "white", color: "black", border: "1px solid gray", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
          >
            -
          </button>
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>{quantity}</span>
          <button 
            onClick={() => increaseQuantity(product)} 
            style={{ backgroundColor: "white", color: "black", border: "1px solid gray", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
          >
            +
          </button>
        </div>
      ) : (
        <button 
          onClick={() => addToCart(product)} 
          style={{ backgroundColor: "#004d40", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", width: "100%" }}
        >
          ADD
        </button>
      )}
    </div>
  );
};






export default HomePage;
