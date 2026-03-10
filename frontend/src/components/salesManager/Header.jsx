import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ MUST
import Button from 'react-bootstrap/Button';
import myProfile from "../../assets/salesExecutive/Dashboard/myProfile.png";
import myProfileArrow from "../../assets/salesExecutive/Dashboard/myProfileArrow.png";
import '../salesManager/header.css'
import ProfilePopup from "../../pages/profile/ProfilePopup";


const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.clear();
  setOpenMenu(false);
  setShowProfile(false);
  window.location.replace("/"); // ✅ BEST
};




  return (
    <>
      <div id="header-btns">
        <Button id="btn">Proposals</Button>
        <Button id="btn">Custom Plan</Button>
        <Button id="btn">Work Order</Button>

        {/* PROFILE BUTTON */}
        <div style={{ position: "relative" }}>
          <Button
            id="img-btn"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <img src={myProfile} alt="profile" />
            My Profile
            <img id="arrow" src={myProfileArrow} alt="arrow" />
          </Button>

          {/* 🔽 DROPDOWN */}
          {openMenu && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                width: "160px",
                zIndex: 2000,
                maxHeight: "120px",     // 🔹 scrollbar support
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => {
                  setOpenMenu(false);
                  setShowProfile(true);   // ✅ OPEN PROFILE POPUP
                }}
              >
                👤 View Profile
              </div>

             <div
  style={{
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
    color: "red",
  }}
  onClick={(e) => {
    e.preventDefault();   // ✅ STOP reload
    handleLogout();
  }}
>
  🚪 Logout
</div>

            </div>
          )}
        </div>
      </div>

      {/* 🔴 PROFILE POPUP */}
      {showProfile && (
        <ProfilePopup onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Header;

