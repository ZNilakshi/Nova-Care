import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import ServicesSection from "../components/ServiceSection";
import ClinicalExcellence from "../components/ClinicalExcellence";
import Whychooseus from "../components/Whychooseus";
import Hospitals from "../components/Hospitals";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div style={{ position: "relative", textAlign: "left" }}>
      {/* Hero Section - Carousel */}
      <Carousel>
        <Carousel.Item>
          <div
            style={{
              background: "linear-gradient(to right, #004d7a, #008793, #00bf72)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              padding: "50px",
              textAlign: "center",
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                NOVA Care’s Expertise, <br />
                <span style={{ color: "#FFD700" }}>Delivered at Your Home</span>
              </h2>
              <p style={{ fontSize: "1.1rem", marginTop: "10px" }}>
                Step-down ICU | Physiotherapy | Attendant | Vaccination | Medical Equipment & More
              </p>
              <Button
                variant="warning"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  marginTop: "10px",
                }}
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            style={{
              background: "linear-gradient(to right, #004d7a, #008793, #00bf72)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              padding: "50px",
              textAlign: "center",
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                Trusted Healthcare, <br />
                <span style={{ color: "#FFD700" }}>Right at Your Doorstep</span>
              </h2>
              <p style={{ fontSize: "1.1rem", marginTop: "10px" }}>
                Quality home healthcare services tailored to your needs.
              </p>
              <Button
                variant="warning"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  marginTop: "10px",
                }}
              >
                LEARN MORE
              </Button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

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
