import { useState, useEffect } from "react";
import { FiPhoneCall, FiSearch, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav style={{ background: "white", padding: "10px 20px", color: "black", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
      {/* First Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <img src="/NOVA CARE.png" alt="Apollo Hospitals" style={{ height: "70px" }} />

        {/* Search Bar (Hidden on Mobile) */}
        {!isMobile && (
          <div style={{
            display: "flex",
            background: "white",
            borderRadius: "25px",
            padding: "5px 15px",
            alignItems: "center",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
          }}>
            <input
              type="text"
              placeholder="Search Doctor or Hospital"
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                flex: 1,
                padding: "8px",
                borderRadius: "20px"
              }}
            />
            <button style={{
              border: "none",
              background: "#019CE0",
              color: "white",
              padding: "8px 12px",
              borderRadius: "50%",
              cursor: "pointer"
            }}>
              <FiSearch size={18} />
            </button>
          </div>
        )}

        {/* Emergency & Apollo Lifeline (Hidden on Mobile) */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "12px", marginTop: "2px", color: "black" }}>Emergency</p>
              <button style={{ background: "white", border: "1px solid #019CE0", borderRadius: "8px", padding: "5px 10px", color: "#002147", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                <FiPhoneCall size={16} /> 1066
              </button>
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "12px", marginTop: "2px", color: "black" }}>Apollo Lifeline</p>
              <button style={{ background: "white", border: "1px solid #019CE0", borderRadius: "8px", padding: "5px 10px", color: "#002147", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                <FiPhoneCall size={16} /> 1860-500-1066
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Button (Visible only on Mobile) */}
        {isMobile && (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer"
          }}>
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        )}
      </div>

      {/* Second Row - Navigation (Hidden on Mobile unless toggled) */}
      <div style={{
        display: !isMobile || isMobileMenuOpen ? "flex" : "none",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        marginTop: "10px",
        padding: isMobile ? "10px" : "0",
        background: isMobile ? "white" : "none",
        boxShadow: isMobile ? "0px 2px 5px rgba(0,0,0,0.2)" : "none"
      }}>
        {[
          { name: "Patient Care", sub: ["Doctors", "Appointments", "Emergency"] },
          { name: "Centres of Excellence", sub: ["Cardiology", "Neurology", "Orthopedics"] },
          { name: "Health Information", sub: ["Blogs", "Symptoms Checker", "Videos"] },
          { name: "Corporate", sub: ["About Us", "Careers", "Investors"] },
          { name: "International Patients", sub: ["Medical Visa", "Travel Assistance", "Consult Online"] },
          { name: "Academics & Research", sub: ["Education", "Research Programs", "Clinical Trials"] },
          { name: "Hospitals", sub: ["Find a Hospital", "Facilities", "Departments"] },
          { name: "Contact Us", sub: ["Support", "Feedback", "Locations"] }
        ].map((item) => (
          <div key={item.name} style={{ position: "relative", margin: "10px", textAlign: isMobile ? "center" : "left" }}>
            <button onClick={() => toggleDropdown(item.name)} style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              color: "black",
              width: "100%"
            }}>
              {item.name} ▼
            </button>
            {openDropdown === item.name && (
              <div style={{
                position: isMobile ? "static" : "absolute",
                left: 0,
                background: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                textAlign: "left"
              }}>
                {item.sub.map((subItem) => (
                  <p key={subItem} style={{ margin: "5px 0", cursor: "pointer" }}>{subItem}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
