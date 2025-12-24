import React, { useState, useEffect } from "react";
import logo from "../../assets/managementEmployee/sidebar/logo.png";
import profile from "../../assets/managementEmployee/sidebar/profile.png";
import dashboard from "../../assets/finance/sidebar/dashboard.png";
import invoice from "../../assets/finance/sidebar/invoice.png";
import payout from "../../assets/finance/sidebar/payout.png";
import addEmployeePayout from "../../assets/finance/sidebar/addEmployeePayout.png";
import clientMgmt from "../../assets/finance/sidebar/clientMgmt.png";
import employeeMgmt from "../../assets/finance/sidebar/employeeMgmt.png";
import report from "../../assets/finance/sidebar/report.png";
import "../salesManager/sidebar.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const userRole = localStorage.getItem("role");

    console.log("SIDEBAR NAME:", name); // debug
    setUserName(name);
    setRole(userRole);
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

          <ul id="nav-menu" style={{backgroundColor:"#3d68e7"}}>
            <li className="nav-item">
              <img src={dashboard} alt="Dashboard Icon" id="nav-icon" />
              <NavLink to="/finance/dashboard">Dashboard</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={invoice} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/finance/invoice">Invoice</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={clientMgmt} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/finance/client-management">Client Management</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={employeeMgmt} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/finance/employee-management">Employee Management</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={addEmployeePayout} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/finance/add-employee-payout">Add Employee Payout</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={payout} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/finance/payout">Payout</NavLink>
              <hr className="nav-separator" />
            </li>
            <li className="nav-item">
              <img src={report} alt="Sales Report Icon" id="nav-icon" />
              <NavLink to="/finance/reports">Reports</NavLink>
              <hr className="nav-separator" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;