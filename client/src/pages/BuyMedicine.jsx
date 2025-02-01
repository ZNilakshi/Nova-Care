/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaSearch, FaMapMarkerAlt, FaVideo, FaFlask, FaHospital } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f8f9fa' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#155724', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>NOVA CARE Pharmacy</div>
        <div>
          <a href="#" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>NOVA CARE Products</a>
          <a href="#" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Baby Care</a>
          <a href="#" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Women Care</a>
          <a href="#" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Health Devices</a>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#198754', color: 'white' }}>
        <h1>Buy Medicines and Essentials</h1>
        <div style={{ marginTop: '20px', display: 'inline-flex', borderRadius: '5px', overflow: 'hidden' }}>
          <input type="text" placeholder="Search Medicines" style={{ padding: '10px', width: '300px', border: 'none' }} />
          <button style={{ backgroundColor: '#0d6efd', padding: '10px', border: 'none', cursor: 'pointer' }}>
            <FaSearch style={{ color: 'white' }} />
          </button>
        </div>
      </div>
      
      {/* Services Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
        <ServiceCard icon={<FaMapMarkerAlt />} title="Pharmacy Near Me" description="Find Store" />
        <ServiceCard icon={<MdLocalOffer />} title="Get 15% off on Medicines" description="Upload Now" />
        <ServiceCard icon={<FaHospital />} title="Hospital Visit" description="Pre-book" />
        <ServiceCard icon={<FaVideo />} title="Video Consult" description="In 15 Min" />
        <ServiceCard icon={<FaFlask />} title="Lab Tests" description="At Home" />
      </div>
      
      {/* Shop By Brand Section */}
      <div style={{ padding: '20px' }}>
        <h2>Shop By Brand</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <img src="/oziva.png" alt="OZIVA" style={{ width: '100px' }} />
          <img src="/vaseline.png" alt="Vaseline" style={{ width: '100px' }} />
          <img src="/pampers.png" alt="Pampers" style={{ width: '100px' }} />
          <img src="/whisper.png" alt="Whisper" style={{ width: '100px' }} />
          <img src="/lakme.png" alt="Lakme" style={{ width: '100px' }} />
          <img src="/onetouch.png" alt="OneTouch" style={{ width: '100px' }} />
        </div>
      </div>
      
      {/* Hot Sellers Section */}
      <div style={{ padding: '20px' }}>
        <h2>Hot Sellers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          <ProductCard name="Dabur Vatika Shampoo" price="₹49" discount="57% off" />
          <ProductCard name="Vicco Turmeric Shaving Cream" price="₹49" discount="35% off" />
          <ProductCard name="Yardley Rose Moisturizing Body Lotion" price="₹212.5" discount="50% off" />
          <ProductCard name="Fogg Body Spray" price="₹137.5" discount="50% off" />
          <ProductCard name="Parachute Body Lotion" price="₹99" discount="50% off" />
          <ProductCard name="Garnier Face Wash" price="₹174.5" discount="50% off" />
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
      <div style={{ fontSize: '30px', color: '#198754', marginBottom: '10px' }}>{icon}</div>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</h2>
      <p style={{ color: '#6c757d', fontSize: '14px' }}>{description}</p>
    </div>
  );
};

const ProductCard = ({ name, price, discount }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
      <h3>{name}</h3>
      <p style={{ color: '#198754', fontSize: '16px', fontWeight: 'bold' }}>{price}</p>
      <p style={{ color: 'red', fontSize: '14px' }}>{discount}</p>
      <button style={{ backgroundColor: '#198754', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>ADD</button>
    </div>
  );
};

export default HomePage;
