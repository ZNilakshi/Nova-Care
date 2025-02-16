import React from "react";
import { Button } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import ServicesSection from "../components/ServiceSection";
import ClinicalExcellence from "../components/ClinicalExcellence";
import Whychooseus from "../components/Whychooseus";
import Hospitals from "../components/Hospitals";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div style={{ position: "relative", textAlign: "left" }}>
      {/* Video Section */}
      <div style={{ position: "relative", width: "100%", height: "700px", overflow: "hidden" }}>
        <video
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "82px", fontWeight: "bold" }}>Your Happiness Matters</div>
          <div style={{ fontSize: "50px", fontWeight: "normal" , color: "black" ,}}>We care for you with excellence</div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <Button
          variant="outline-primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
          }}
        >
          <FaPhoneAlt /> +91 8069991061
        </Button>
        <Button variant="warning" style={{ fontWeight: "bold" }}>Book Appointment</Button>
      </div>

      {/* Sections */}
      <div style={{ marginTop: "10px" }}>
        <ServicesSection />
        <ClinicalExcellence />
        <Whychooseus />
        <Hospitals />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
