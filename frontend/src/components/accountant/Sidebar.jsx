import React, { useState, useEffect } from "react";
import logo from "../../assets/accountant/sidebar/logo.png";
import profile from "../../assets/accountant/sidebar/profile.png";
import dashboard from "../../assets/accountant/sidebar/dashboard.png";
import clientManagement from "../../assets/accountant/sidebar/clientManagement.png";
import invoice from "../../assets/accountant/sidebar/invoice.png";
import previousClients from "../../assets/accountant/sidebar/previousClients.png";
import "../salesExecutive/sidebar.css";
import { NavLink,useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (storedUser) {
      const fullName =
        `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();
  
      setUserName(fullName || "User");
    }
  }, []);


  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* === Hamburger Menu (Visible on small screens only) === */}

      {/* === Sidebar === */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div id="sidebar-container">
          <div
            id="menu-toggle"
            className={isOpen ? "open" : ""}
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div id="sidebar-header" style={{ backgroundColor: "#3158c9" }}>
            <img src={logo} alt="Graphura Logo" id="logo-img" />
          </div>

          <div id="profile-section" style={{ backgroundColor: "#3d68e7" }}>
            <img src={profile} alt="Profile Icon" id="profile-img" />
            <div id="profile-details">
            <h1 id="profile-name">{userName || "User"}</h1>
              <p id="profile-title">Accountant</p>
            </div>
          </div>

          <ul id="nav-menu" style={{ backgroundColor: "#3d68e7" }}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/accountant/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={clientManagement} alt="User Data Icon" id="nav-icon" />
              <NavLink to="/accountant/client-management">Client Management</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={invoice} alt="Prospect Icon" id="nav-icon" />
              <NavLink to="/accountant/invoice">Invoice</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={previousClients} alt="Report Icon" id="nav-icon" />
              <NavLink to="/accountant/previous-clients">Previous Clients</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
