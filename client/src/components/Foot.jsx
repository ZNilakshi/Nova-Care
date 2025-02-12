import React from "react";

const Footer = () => {
  return (
    <footer style={{ background: "#031E49", color: "white", padding: "40px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        
        {/* Left Side - Logo, Newsletter, and Emergency */}
        <div style={{ width: "25%" }}>
          <img src="/NOVA CARE.png" alt="NOVA CARE" style={{ width: "150px", marginBottom: "15px" }} />
         
          
          
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>Emergency</p>
          <p>📞 1066</p>
          <p>📞 NOVA CARE Lifeline  <br /> <span style={{ color: "#00AEEF" }}>+94 404344406</span></p>
          <p>📞 Health Help Line <br /> <span style={{ color: "#00AEEF" }}>+94806210614</span></p>
        </div>

        {/* Center - Multiple Sections */}
        <div style={{ width: "70%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          {[
            { title: "Patient Care", items: ["Find A Doctor", "Medical Services",  ] },
            { title: "Centres Of Excellence", items: ["Orthopaedics", "Nephrology & Urology", "Bariatric Surgery", "Cardiology", "Pulmonology", "Gastroenterology", "Spine Surgery", "Oncology"] },
            { title: "Medical Procedures", items: ["Proton Therapy", "Plastic Surgery", "Bone Marrow Transplant", "Oral & Maxillofacial Surgery", "Hand MicroSurgery", "G Scan – Open MRI", "Hip Arthroscopy"] },
              { title: "Hospitals", items: ["Hospitals In Sri Lanka", "International Hospitals", "NOVA CARE Clinics", ] },
            { title: "Contact Us", items: ["Post A Query", "Consult Doctors Online", "Book Physical Appointment", "Give Feedback"] }
          ].map((section, index) => (
            <div key={index} style={{ width: "30%", marginBottom: "20px" }}>
              <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>{section.title}</p>
              {section.items.map((item, i) => (
                <p key={i} style={{ fontSize: "14px", margin: "5px 0", cursor: "pointer", opacity: "0.8" }}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
