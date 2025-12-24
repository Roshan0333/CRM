import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import myProfile from "../../assets/salesExecutive/Dashboard/myProfile.png";
import myProfileArrow from "../../assets/salesExecutive/Dashboard/myProfileArrow.png";
import '../salesManager/header.css';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div id='header-btns'>
      <Button id='btn'>Proposals</Button>
      <Button id='btn'>Custom Plan</Button>
      <Button id='btn'>Work Order</Button>

      {/* फक्त इथे wrapper + onClick */}
      <div className="profile-container">
        <Button
          id='img-btn'
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={myProfile} alt="" />
          My Profile
          <img id='arrow' src={myProfileArrow} alt="" />
        </Button>

        {showDropdown && (
          <div className="profile-dropdown">
            <button className="dropdown-item">Profile Settings</button>
            <button className="dropdown-item">Account Details</button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
