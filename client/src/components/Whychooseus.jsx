import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function WhyChooseUs() {
  const stats = [
    { number: 13, suffix: "+", text: "Largest private healthcare network of Hospitals", icon: "🏥" },
    { number: 70, suffix: "+", text: "Largest private network of clinics across Sri Lanka", icon: "🏡" },
    { number: 230, suffix: "+", text: "Diagnostic centres across Sri Lanka", icon: "🩺" },
    { number: 60, suffix: "+", text: "Pharmacies", icon: "💊" },
    { number: 110, suffix: "+", text: "Doctors", icon: "👨‍⚕️" },
    { number: 1000, suffix: "+", text: "Beds", icon: "🛏️" },
  ];

  // Intersection Observer Hook
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div
        ref={ref}
        style={{
          background: "#EAF6FF",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Title Section */}
        <h2 style={{ color: "#002147", fontSize: "28px", marginBottom: "15px" }}>Why Choose NOVA CARE?</h2>
        <p style={{ color: "#444", fontSize: "16px", marginBottom: "30px" }}>
          Established in 1983, NOVA CARE has a robust presence across the healthcare ecosystem.
          From routine wellness & preventive healthcare to life-saving treatments and diagnostic services,
          we have touched more than 200 million lives from over 150 countries.
        </p>

        {/* Responsive Layout */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px" }}>
          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", flex: "1 1 500px" }}>
            {stats.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "15px",
                  border: "1px solid #1661BE",
                  borderRadius: "10px",
                  background: "white",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  justifyContent: "center",
                }}
              >
                <div style={{ background: "#EAF6FF", padding: "10px", borderRadius: "10px", fontSize: "25px" }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "22px", color: "#1661BE", fontWeight: "bold", marginBottom: "5px" }}>
                    {inView ? <CountUp start={0} end={item.number} duration={2} suffix={item.suffix} /> : item.number + item.suffix}
                  </p>
                  <p style={{ fontSize: "14px", color: "#444" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div style={{ flex: "1 1 500px", display: "flex", justifyContent: "center" }}>
            <img src="/whychoose.jpg" alt="Doctors discussing" style={{ width: "100%", maxWidth: "500px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
