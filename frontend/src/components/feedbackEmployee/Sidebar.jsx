import React, { useState, useEffect } from "react";
import logo from "../../assets/feedbackEmployee/sidebar/logo.png";
import profile from "../../assets/feedbackEmployee/sidebar/profile.png";
import dashboard from "../../assets/feedbackEmployee/sidebar/dashboard.png";
import feedbacks from "../../assets/feedbackEmployee/sidebar/feedbacks.png";
import complaints from "../../assets/feedbackEmployee/sidebar/complaints.png";
import salary from "../../assets/feedbackEmployee/sidebar/salary.png";
import "../feedbackManager/sidebar.css";
import { NavLink } from "react-router-dom";
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
              <p id="profile-title">Feedback / Employee</p>
            </div>
          </div>

          <ul id="nav-menu" style={{backgroundColor:"#3d68e7"}}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/feedbackemployee/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={feedbacks} alt="User Data Icon" id="nav-icon" />
              <NavLink to="/feedbackemployee/feedbacks">Feedbacks</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={complaints} alt="Prospect Icon" id="nav-icon" />
              <NavLink to="/feedbackemployee/complaints">Complaints</NavLink>
              <hr className="nav-separator" />
            </li>
            
            <li className="nav-item">
              <img src={salary} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/feedbackemployee/salary">Salary</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
