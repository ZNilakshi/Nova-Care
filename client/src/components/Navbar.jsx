import { useState, useEffect } from "react";
import { FiPhoneCall, FiSearch, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const buttonStyle = {
    background: "white",
    border: "1px solid #0096C7",
    borderRadius: "8px",
    padding: "4px 8px",
    color: "#002147",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "background 0.3s, color 0.3s",
  };

  const hoverStyle = {
    background: "#0096C7",
    color: "white",
  };

  return (
    <nav style={{ background: "#0096C7", padding: "8px 16px", color: "white", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src="/NOVA CARE.png" alt="Apollo Hospitals" style={{ height: "80px" }} /> {/* Increased logo size */}

        {!isMobile && (
          <div style={{ display: "flex", background: "white", borderRadius: "20px", padding: "4px 12px", alignItems: "center", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}>
            <input
              type="text"
              placeholder="Search Doctor or Hospital"
              style={{ border: "none", outline: "none", fontSize: "12px", flex: 1, padding: "6px", borderRadius: "8px", width: "350px" }}
            />
            <button style={{ border: "none", background: "#0096C7", color: "white", padding: "6px 10px", borderRadius: "30%", cursor: "pointer" }}>
              <FiSearch size={16} />
            </button>
          </div>
        )}

        {!isMobile && (
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {[
              { label: "Emergency", number: "1066" },
              { label: "NOVACARE Lifeline", number: "1860-500-1066" },
            ].map(({ label, number }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "10px", marginTop: "2px", color: "white" }}>{label}</p>
                <button
                  style={buttonStyle}
                  onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
                >
                  <FiPhoneCall size={14} /> {number}
                </button>
              </div>
            ))}
          </div>
        )}

        {isMobile && (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "white" }}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        )}
      </div>

      <div
        style={{
          display: !isMobile || isMobileMenuOpen ? "flex" : "none",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          marginTop: "8px",
          padding: isMobile ? "8px" : "0",
          background: isMobile ? "white" : "none",
          boxShadow: isMobile ? "0px 2px 5px rgba(0,0,0,0.2)" : "none",
          zIndex: 1000,
        }}
      >
        {[].map((name) => (
          <div key={name} style={{ position: "relative", margin: "8px", textAlign: isMobile ? "center" : "left" }}>
            <button onClick={() => toggleDropdown(name)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "500", color: "black", width: "100%" }}>
              {name} ▼
            </button>
            {openDropdown === name && (
              <div style={{ position: isMobile ? "static" : "absolute", left: 0, background: "white", padding: "8px", borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", textAlign: "left", zIndex: 999 }}>
                {["Option 1", "Option 2", "Option 3"].map((sub) => (
                  <p key={sub} style={{ margin: "4px 0", cursor: "pointer" }}>{sub}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
