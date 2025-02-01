import { useState } from "react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav style={{ background: "white", padding: "10px 20px", color: "black", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
      {/* First Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src="/NOVA CARE.png" alt="Apollo Hospitals" style={{ height: "70px" }} />

        {/* Search Bar */}
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
  <button 
    style={{ 
      border: "none", 
      background: "#019CE0", 
      color: "white", 
      padding: "8px 12px", 
      borderRadius: "18%", 
      cursor: "pointer", 
      marginLeft: "5px"
    }}
  >
    🔍
  </button>
</div>


        {/* Emergency & Apollo Lifeline */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "12px", marginTop: "2px", color: "black" }}>Emergency</p>
            <button style={{ background: "white", border: "1px solid  #019CE0", borderRadius: "8px", padding: "5px 10px", color: "#002147", cursor: "pointer" }}>
              📞 1066
            </button>
            
          </div>

          <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "12px", marginTop: "2px", color: "black" }}>Apollo Lifeline</p>
            <button style={{ background: "white", border: " 1px solid #019CE0", borderRadius: "8px", padding: "5px 10px", color: "#002147", cursor: "pointer" }}>
              📞 1860-500-1066
            </button>
              </div>

          {/* Language Selector */}
          <select style={{ background: "#019CE0", border: "none", borderRadius: "8px", padding: "10px 12px", color: "white", cursor: "pointer" }}>
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </div>
      </div>

      {/* Second Row - Navigation */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
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
          <div key={item.name} style={{ position: "relative", margin: "0 10px" }}>
            <button
              onClick={() => toggleDropdown(item.name)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "black" }}
            >
              {item.name} ▼
            </button>
            {openDropdown === item.name && (
              <div style={{ position: "absolute", left: 0, background: "white", padding: "10px", borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", color: "black" }}>
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
