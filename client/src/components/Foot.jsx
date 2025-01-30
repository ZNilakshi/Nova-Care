import React from "react";

const Footer = () => {
  return (
    <footer style={{ background: "#031E49", color: "white", padding: "40px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        
        {/* Left Side - Logo, Newsletter, and Emergency */}
        <div style={{ width: "25%" }}>
          <img src="/apollo-logo.png" alt="Apollo Hospitals" style={{ width: "150px", marginBottom: "15px" }} />
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Subscribe to Our Newsletter</p>
          <input
            type="email"
            placeholder="Enter your email id"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              marginBottom: "10px",
            }}
          />
          <button style={{ width: "100%", padding: "10px", background: "#00AEEF", border: "none", borderRadius: "5px", color: "white" }}>
            Submit
          </button>
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>Emergency</p>
          <p>📞 1066</p>
          <p>📞 Apollo Lifeline International <br /> <span style={{ color: "#00AEEF" }}>+91 4043444106</span></p>
          <p>📞 Health Help Line <br /> <span style={{ color: "#00AEEF" }}>1860-500-1066</span></p>
        </div>

        {/* Center - Multiple Sections */}
        <div style={{ width: "70%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          {[
            { title: "Patient Care", items: ["Find A Doctor", "Medical Services", "Patient Testimonials", "Value Added Services", "Pay Online", "Apollo Surgery"] },
            { title: "Centres Of Excellence", items: ["Orthopaedics", "Nephrology & Urology", "Bariatric Surgery", "Cardiology", "Pulmonology", "Gastroenterology", "Spine Surgery", "Oncology"] },
            { title: "Medical Procedures", items: ["Proton Therapy", "Plastic Surgery", "Bone Marrow Transplant", "Oral & Maxillofacial Surgery", "Hand MicroSurgery", "G Scan – Open MRI", "Hip Arthroscopy"] },
            { title: "Corporate", items: ["Company Overview", "Our Doctors Achieve", "Apollo Story", "Management", "Investor Relations", "Awards & Accolades", "Careers"] },
            { title: "Hospitals", items: ["Hospitals In India", "International Hospitals", "Apollo Clinics", "Apollo Fertility", "Apollo Cancer Centers"] },
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
