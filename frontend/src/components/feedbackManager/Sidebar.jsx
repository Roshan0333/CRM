import React, { useState, useEffect } from "react";
import logo from "../../assets/feedbackManager/sidebar/logo.png";
import profile from "../../assets/feedbackManager/sidebar/profile.png";
import dashboard from "../../assets/feedbackManager/sidebar/dashboard.png";
import teamMamber from "../../assets/feedbackManager/sidebar/teamMember.png";
import teamReport from "../../assets/feedbackManager/sidebar/teamReport.png";
import feedback from "../../assets/feedbackManager/sidebar/feedback.png";
import complaints from "../../assets/feedbackManager/sidebar/complaints.png";
import salary from "../../assets/feedbackManager/sidebar/salary.png";
import "../feedbackManager/sidebar.css";
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

              <p id="profile-title">Feedback / Manager</p>
            </div>
          </div>

          <ul id="nav-menu" style={{backgroundColor:"#3d68e7"}}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/feedbackmanager/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={feedback} alt="User Data Icon" id="nav-icon" />
              <NavLink to="/feedbackmanager/feedbacks">Feedbacks</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={complaints} alt="Prospect Icon" id="nav-icon" />
              <NavLink to="/feedbackmanager/complaints">Complaints</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={teamMamber} alt="Report Icon" id="nav-icon" />
              <NavLink to="/feedbackmanager/team-members">Team Members</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={teamReport} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/feedbackmanager/team-report">Team Report</NavLink>
              <hr className="nav-separator" />
            </li>
            
            <li className="nav-item">
              <img src={salary} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/feedbackmanager/salary">Salary</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
