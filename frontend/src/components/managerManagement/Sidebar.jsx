import React, { useState, useEffect } from "react";
import logo from "../../assets/managerManagement/sidebar/logo.png";
import profile from "../../assets/managerManagement/sidebar/profile.png";
import dashboard from "../../assets/managerManagement/sidebar/dashboard.png";
import managerReport from "../../assets/managerManagement/sidebar/managerReport.png";
import recivedData from "../../assets/managerManagement/sidebar/recivedData.png";
import review from "../../assets/managerManagement/sidebar/review.png";
import teamMamber from "../../assets/managerManagement/sidebar/teamMember.png";
import totalProjects from "../../assets/managerManagement/sidebar/totalProjects.png";
import teamReport from "../../assets/managerManagement/sidebar/teamReport.png";
import transferDataFDBK from "../../assets/managerManagement/sidebar/transferDataFDBK.png";
import workingProjects from "../../assets/managerManagement/sidebar/workingProjects.png";
import salary from "../../assets/managerManagement/sidebar/salary.png";
import "../managerManagement/sidebar.css";
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

              <p id="profile-title">Manager / Management</p>
            </div>
          </div>

          <ul id="nav-menu" style={{ backgroundColor: "#3d68e7" }}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/managermanagement/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={totalProjects} alt="User Data Icon" id="nav-icon" />
              <NavLink to="/managermanagement/total-projects">Total Projects</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={workingProjects} alt="Prospect Icon" id="nav-icon" />
              <NavLink to="/managermanagement/working-projects">Working Projects</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={teamMamber} alt="Report Icon" id="nav-icon" />
              <NavLink to="/managermanagement/team-members">Team Member</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={managerReport} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managermanagement/manager-report">Manager Report</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={teamReport} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managermanagement/team-report">Team Report</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={recivedData} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managermanagement/recived-data">Recived Data</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img
                src={transferDataFDBK}
                alt="Sales Report Icon"
                id="nav-icon"
              />
              <NavLink to="/managermanagement/transfer-data-to-feedback">
                Transfer Data to FDBK.
              </NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={review} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managermanagement/review">Review</NavLink>
              <hr className="nav-separator" />
            </li>

            <li className="nav-item">
              <img src={salary} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/managermanagement/salary">Salary</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
