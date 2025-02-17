import { useState, useEffect } from "react";
import { FiPhoneCall,  } from "react-icons/fi";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        background: "rgba(126, 124, 145, 0.5)",
        
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      {/* Logo and Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img src="/NOVA CARE.png" alt="Nova Care" style={{ height: "60px" }} />
        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>NOVA CARE</h2>
      </div>

      {/* Emergency Contact */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "center" }}>
             <button
              style={{
                background: "RED",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "16px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "rgba(20, 9, 119, 0.5)")}
              onMouseLeave={(e) => (e.target.style.background = "rgba(6, 5, 107, 0.2)")}
            >
              <p style={{ fontSize: "14px", margin: "2px 0", color: "white" }}>Emergency</p>
           
              <FiPhoneCall size={16} /> 1066
            </button>
          </div>
        </div>
      )}

    
    </nav>
  );
}