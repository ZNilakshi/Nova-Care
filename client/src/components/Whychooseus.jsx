export default function WhyChooseUs() {
    const stats = [
      { number: "13+", text: "Largest private healthcare network of Hospitals", icon: "🏥" },
      { number: "70+", text: "Largest private network of clinics across India", icon: "🏡" },
      { number: "2,30+", text: "Diagnostic centres across Sri Lanka", icon: "🩺" },
      { number: "6,0+", text: "Pharmacies", icon: "💊" },
      { number: "11,0+", text: "Doctors", icon: "👨‍⚕️" },
      { number: "10,00+", text: "Beds", icon: "🛏️" },
    ];
  
    return (
      <div style={{ display: "flex", alignItems: "center", background: "#EAF6FF", padding: "40px", borderRadius: "10px" }}>
        {/* Left Content */}
        <div style={{ flex: 1, paddingRight: "40px" }}>
          <h2 style={{ color: "#002147", fontSize: "28px", textAlign: "center", marginBottom: "15px" }}>Why Choose NOVA CARE?</h2>
          <p style={{ color: "#444", fontSize: "16px", marginBottom: "30px" }}>
            Established in 1983, NOVA CARE has a robust presence across the healthcare ecosystem. 
            From routine wellness & preventive healthcare to life-saving treatments and diagnostic services, 
            we have touched more than 200 million lives from over 150 countries.
          </p>
  
          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {stats.map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "15px", border: "1px solid #1661BE", borderRadius: "10px" }}>
                <div style={{ background: "white", padding: "10px", borderRadius: "10px", fontSize: "25px" }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "22px", color: "#1661BE", fontWeight: "bold", marginBottom: "5px" }}>{item.number}</p>
                  <p style={{ fontSize: "14px", color: "#444" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Right Image */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img src="/whychoose.jpg" alt="Doctors discussing" style={{ width: "100%", maxWidth: "500px", borderRadius: "10px" }} />
        </div>
      </div>
    );
  }
  