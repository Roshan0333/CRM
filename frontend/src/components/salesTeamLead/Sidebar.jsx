import React, { useState, useEffect } from "react";
import logo from "../../assets/salesTeamLead/sidebar/logo.png";
import profile from "../../assets/salesTeamLead/sidebar/profile.png";
import dashboard from "../../assets/salesTeamLead/sidebar/dashboard.png";
import prospect from "../../assets/salesTeamLead/sidebar/prospect.png";
import prospectForm from "../../assets/salesTeamLead/sidebar/prospectForm.png";
import report from "../../assets/salesTeamLead/sidebar/report.png";
import totalSales from "../../assets/salesTeamLead/sidebar/total-sales.png";
import teamMember from "../../assets/salesTeamLead/sidebar/team-member.png";
import transferData from "../../assets/salesTeamLead/sidebar/transferData.png";
import untouchedData from "../../assets/salesTeamLead/sidebar/untouchedData.png";
import "../salesTeamLead/sidebar.css";
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

              <p id="profile-title">TL - Sales</p>
            </div>
          </div>

          <ul id="nav-menu" style={{ backgroundColor: "#3d68e7" }}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/salesTeamLead/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={totalSales} alt="User Data Icon" id="nav-icon" />
              <NavLink to="/salesTeamLead/total-sales">Total Sales</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={prospect} alt="Prospect Icon" id="nav-icon" />
              <NavLink to="/salesTeamLead/prospect">Prospect</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={report} alt="Report Icon" id="nav-icon" />
              <NavLink to="/salesTeamLead/report">Report</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={teamMember} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/salesTeamLead/team-member">Team Member</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={transferData} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/salesTeamLead/transfer-data">Transfer Data</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={untouchedData} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/salesTeamLead/untouched-data">Untoched Data</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={prospectForm} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/salesTeamLead/prospect-form">Prospect Form</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
