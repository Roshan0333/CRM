import React, { useState, useEffect } from "react";
import logo from "../../assets/managementTL/sidebar/logo.png";
import profile from "../../assets/managementTL/sidebar/profile.png";
import dashboard from "../../assets/managementTL/sidebar/dashboard.png";
import projects from "../../assets/managementTL/sidebar/projects.png";
import review from "../../assets/managementTL/sidebar/review.png";
import report from "../../assets/managementTL/sidebar/report.png";
import transferProjects from "../../assets/managementTL/sidebar/transferProjects.png";
import teamMember from "../../assets/managementTL/sidebar/teamMember.png";
import payout from "../../assets/managementTL/sidebar/payout.png";
import "../salesManager/sidebar.css";
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

              <p id="profile-title">TL / Management</p>
            </div>
          </div>

          <ul id="nav-menu" style={{ backgroundColor: "#3d68e7" }}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/managementTL/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={projects} alt="User Data Icon" id="nav-icon" />
              <NavLink to="/managementTL/projects">Projects</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={transferProjects} alt="Prospect Icon" id="nav-icon" />
              <NavLink to="/managementTL/transfer-projects">Transfer Projects</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={report} alt="Report Icon" id="nav-icon" />
              <NavLink to="/managementTL/report">Report</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={teamMember} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managementTL/team-member">Team Member</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={payout} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managementTL/payout">Payout</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={review} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managementTL/review">Review</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
