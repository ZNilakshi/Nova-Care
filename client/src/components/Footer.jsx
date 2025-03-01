import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedin } from "react-icons/fa6";

const FooterBottom = () => {
  return (
    <div style={{
      background: "#007A99",
      color: "white",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      textAlign: "center",
      
    }}>
      
      {/* Copyright Text */}
      <p style={{ fontSize: "14px", margin: "5px 0", width: "100%" }}>
        © Copyright 2025, NOVA CARE Hospitals Group. All Rights Reserved.
      </p>

      {/* Social Media Icons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        {[FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedin].map((Icon, index) => (
          <div key={index} style={{
            background: "#E57342",
            borderRadius: "5px",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            width: "30px",
            height: "30px"
          }}>
            <Icon color="white" size={14} />
          </div>
        ))}
      </div>

      {/* Privacy Policy & Disclaimer */}
      <div style={{ fontSize: "14px", cursor: "pointer", display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
        <span>Privacy Policy</span> | <span>Disclaimer</span>
      </div>

    </div>
  );
};

export default FooterBottom;
