import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import ServicesSection from "./components/ServiceSection";
import BookAppointment from "./pages/BookAppointment";
import FindDoctor from "./pages/FindDoctor";
import FindHospital from "./pages/FindHospital";
import HealthCheckup from "./pages/HealthCheckUp";
import ConsultOnline from "./pages/ConsultOnline";
import BuyMedicine from "./pages/BuyMedicine";
import Book from "./components/Book";
import AppointmentForm from "./components/AppointmentForm";
import DoctorCard from "./pages/DoctorCard"; // Ensure this is correctly placed

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/find-hospital" element={<FindHospital />} />
        <Route path="/health-checkup" element={<HealthCheckup />} />
        <Route path="/consult-online" element={<ConsultOnline />} />
        <Route path="/appointment-form" element={<AppointmentForm />} />
        <Route path="/doctorcard" element={<DoctorCard />} /> {/* Fixed the route */}
        <Route path="/buy-medicine" element={<BuyMedicine />} />
      </Routes>
    </Router>
  );
};

export default App;
