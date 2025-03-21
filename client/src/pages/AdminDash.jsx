import React, { useState } from "react";
import Admin from "../pages/Admin";
import ManageProducts from "../pages/PAdmin";
import "./Admin.css"; 

const AdminDash = () => {
   const [selectedComponent, setSelectedComponent] = useState("doctors");

  return (
    <div className="admin-container">
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


      <main className="admin-content">
        {selectedComponent === "doctors" && <Admin />}
        {selectedComponent === "products" && <ManageProducts />}
      </main>
    </div>
  );
};

export default AdminDash;
