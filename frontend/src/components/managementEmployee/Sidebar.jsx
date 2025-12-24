import React, { useState, useEffect } from "react";
import logo from "../../assets/managementEmployee/sidebar/logo.png";
import profile from "../../assets/managementEmployee/sidebar/profile.png";
import dashboard from "../../assets/managementEmployee/sidebar/dashboard.png";
import completedProjects from "../../assets/managementEmployee/sidebar/completedProjects.png";
import payout from "../../assets/managementEmployee/sidebar/payout.png";
import help from "../../assets/managementEmployee/sidebar/help.png";
import myProjects from "../../assets/managementEmployee/sidebar/myProjects.png";

import "../salesManager/sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);


  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* === Hamburger Menu (Visible on small screens only) === */}

      {/* === Sidebar === */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div id="sidebar-container">
      <div id="menu-toggle" className={isOpen ? "open" : ""} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
          <div id="sidebar-header" style={{backgroundColor:"#3158c9"}}>
            <img src={logo} alt="Graphura Logo" id="logo-img" />
          </div>

          <div id="profile-section" style={{backgroundColor:"#3d68e7"}}>
            <img src={profile} alt="Profile Icon" id="profile-img" />
            <div id="profile-details">
              <h1 id="profile-name">{userName || "User"}</h1>

              <p id="profile-title">Employee</p>
            </div>
          </div>

          <ul id="nav-menu" style={{backgroundColor:"#3d68e7"}}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/managementemployee/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={myProjects} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managementemployee/my-projects">My Projects</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={completedProjects} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managementemployee/complete-projects">Completed Projects</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={payout} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managementemployee/payout">payout</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={help} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managementemployee/help">Help</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
