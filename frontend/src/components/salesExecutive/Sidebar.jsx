import React, { useState, useEffect } from "react";
import logo from "../../assets/salesExecutive/sidebar/logo.png";
import profile from "../../assets/salesExecutive/sidebar/profile.png";
import dashboard from "../../assets/salesExecutive/sidebar/dashboard.png";
import prospect from "../../assets/salesExecutive/sidebar/prospect.png";
import report from "../../assets/salesExecutive/sidebar/report.png";
import salesReport from "../../assets/salesExecutive/sidebar/salesReport.png";
import userData from "../../assets/salesExecutive/sidebar/userData.png";
import "../salesExecutive/sidebar.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
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
              <p id="profile-title">Sales Executive</p>
            </div>
          </div>

          <ul id="nav-menu" style={{backgroundColor:"#3d68e7"}}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/salesexecutive/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={userData} alt="User Data Icon" id="nav-icon" />
              <NavLink to="/salesexecutive/userdata">User Data</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={prospect} alt="Prospect Icon" id="nav-icon" />
              <NavLink to="/salesexecutive/prospect">Prospect</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={report} alt="Report Icon" id="nav-icon" />
              <NavLink to="/salesexecutive/report">Report</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={salesReport} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/salesexecutive/sales-report">Sales Report</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
