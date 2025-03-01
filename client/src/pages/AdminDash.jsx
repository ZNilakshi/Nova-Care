import React, { useState } from "react";
import Admin from "../pages/Admin";
import ManageProducts from "../pages/PAdmin";
import "./Admin.css"; // External CSS file for styling

const AdminDash = () => {
  // Set "doctors" as the default selected component
  const [selectedComponent, setSelectedComponent] = useState("doctors");

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li 
            className={selectedComponent === "doctors" ? "active" : ""}
            onClick={() => setSelectedComponent("doctors")}
          >
            Manage Doctors
          </li>
          <li 
            className={selectedComponent === "products" ? "active" : ""}
            onClick={() => setSelectedComponent("products")}
          >
            Manage Products
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        {selectedComponent === "doctors" && <Admin />}
        {selectedComponent === "products" && <ManageProducts />}
      </main>
    </div>
  );
};

export default AdminDash;
