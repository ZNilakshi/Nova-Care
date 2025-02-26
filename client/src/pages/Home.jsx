import React from "react";
import { Button, Container } from "react-bootstrap";
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
      <div className="video-container">
        <video autoPlay loop muted className="video-bg">
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-text">
          <h1>Your Happiness Matters</h1>
          <h3>We care for you with excellence</h3>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        <Button variant="outline-primary" className="contact-button">
          <FaPhoneAlt /> +94702610614
        </Button>
        <Button variant="warning" className="book-button">Book Appointment</Button>
      </div>

      {/* Sections */}
      <Container className="mt-4">
        <ServicesSection />
        <ClinicalExcellence />
        <Whychooseus />
        <Hospitals />
      </Container>

      {/* Footer */}
      <Footer />

      {/* Styles */}
      <style>{`
        .video-container {
          position: relative;
          width: 100%;
          height: 50%;
          overflow: hidden;
        }

        .video-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          text-align: center;
          padding: 10px 20px;
          border-radius: 8px;
        }

        .video-text h1 {
          font-size: 6vw;
          font-weight: bold;
        }

        .video-text h3 {
          font-size: 3vw;
          font-weight: normal;
        }

        .floating-buttons {
          position: fixed;
          right: 20px;
          bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 1000;
        }

        .contact-button, .book-button {
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .video-text h1 {
            font-size: 5vw;
          }

          .video-text h3 {
            font-size: 2.5vw;
          }

          .floating-buttons {
            right: 10px;
            bottom: 10px;
          }

          .contact-button, .book-button {
            font-size: 14px;
            padding: 8px;
          }
        }

        @media (max-width: 480px) {
          .video-container {
            height: 50vh;
          }

          .video-text h1 {
            font-size: 7vw;
          }

          .video-text h3 {
            font-size: 4vw;
          }

          .floating-buttons {
            right: 5px;
            bottom: 5px;
          }

          .contact-button, .book-button {
            font-size: 12px;
            padding: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
