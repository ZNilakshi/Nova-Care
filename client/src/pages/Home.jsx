import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import ServicesSection from "../components/ServiceSection";
import ClinicalExcellence from "../components/ClinicalExcellence";
import Whychooseus from "../components/Whychooseus";
import Hospitals from "../components/Hospitals";
import Foot from "../components/Foot";
import Footer from "../components/Footer";


const HomePage = () => {
  return (
    <div style={{ position: "relative", textAlign: "left" }}>
      {/* Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <div
            style={{
              background: "linear-gradient(to right, #5bbcff, #7dcfff)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              padding: "50px",
            }}
          >
            <div style={{ maxWidth: "500px" }}>
              <h2>
                Apollo’s Expertise, <br />
                <span style={{ color: "yellow", fontWeight: "bold" }}>
                  Delivered at your Home
                </span>
              </h2>
              <p>
                Services at home: Step down ICU | Physiotherapy | Attendant |
                Adult Vaccination | Medical Equipment & More
              </p>
              <Button variant="primary">BOOK NOW</Button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              background: "linear-gradient(to right, #5bbcff, #7dcfff)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              padding: "50px",
            }}
          >
            <div style={{ maxWidth: "500px" }}>
              <h2>
                , <br />
                <span style={{ color: "yellow", fontWeight: "bold" }}>
                  Delivered at your Home
                </span>
              </h2>
              <p>
                Services at home: Step down ICU | Physiotherapy | Attendant |
                Adult Vaccination | Medical Equipment & More
              </p>
              <Button variant="primary">BOOK NOW</Button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
 
      {/* Floating Buttons */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Button
          variant="outline-primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaPhoneAlt /> +91 8069991061
        </Button>
        <Button variant="info">Book Health Check-Up</Button>
        <Button variant="warning">Book Appointment</Button>
      </div>
      <div><ServicesSection /></div>
      <div><ClinicalExcellence/></div>
      <div><Whychooseus/></div>
      <div><Hospitals/></div>
      <div><Foot/></div>
      <div><Footer/></div>
    </div>
    
    
  );
};

export default HomePage;
