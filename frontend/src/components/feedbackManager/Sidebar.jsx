import React, { useState, useEffect } from "react";
import logo from "../../assets/feedbackManager/sidebar/logo.png";
import profile from "../../assets/feedbackManager/sidebar/profile.png";
import dashboard from "../../assets/feedbackManager/sidebar/dashboard.png";
import teamReport from "../../assets/feedbackManager/sidebar/teamReport.png";
import salary from "../../assets/feedbackManager/sidebar/salary.png";
// import teamReport from "../../assets/feedbackManager/sidebar/teamReport.png";
// import feedback from "../../assets/feedbackManager/sidebar/feedback.png";
// import complaints from "../../assets/feedbackManager/sidebar/complaints.png";
import "../feedbackManager/sidebar.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (storedUser) {
      const fullName =`${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();
  
      setUserName(fullName || "User");
          setRole(storedUser.role || "");

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
              <p id="profile-title">{role}</p>

            </div>
          </div>

          <ul id="nav-menu" style={{ backgroundColor: "#3d68e7" }}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard" id="nav-icon" />
              <NavLink to="/feedbackmanager/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>
           
            <li className="nav-item">
              <img src={dashboard} alt="Feedback" id="nav-icon" />
              <NavLink to="/feedbackmanager/feedbacks">Feedbacks</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={dashboard} alt="Complaints" id="nav-icon" />
              <NavLink to="/feedbackmanager/complaints">Complaints</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={profile} alt="Team" id="nav-icon" />
              <NavLink to="/feedbackmanager/team-members">Team Members</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={teamReport} alt="Reports" id="nav-icon" />
              <NavLink to="/feedbackmanager/team-report">Team Reports</NavLink>
              <hr className="nav-separator" />
            </li>

             <li className="nav-item">
              <img src={salary} alt="Salary" id="nav-icon" />
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