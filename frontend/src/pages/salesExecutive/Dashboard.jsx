import React, { useState } from "react";
import clientData from "../../assets/salesExecutive/Dashboard/clientData.png";
import payout from "../../assets/salesExecutive/Dashboard/payout.png";
import prospectNumber from "../../assets/salesExecutive/Dashboard/prospectNumber.png";
import totalSales from "../../assets/salesExecutive/Dashboard/totalSales.png";
import "../../style/salesExecutive/dashboard.css";
import Sidebar from "../../components/salesExecutive/Sidebar";
import LastUpdatePopUp from "./LastupdatePopUp";
import UpdataDataPopUp from "./UpdateDataPopUp";
const Dashboard = () => {
  const [showLastUpdatePopup, setshowLastUpdatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatepopup] = useState(false);

  const openPopup = () => setshowLastUpdatePopup(true);
  const closePopup = () => setshowLastUpdatePopup(false);

  const openUpdatePopup = () => setShowUpdatepopup(true);
  const closeUpdatePopup = () => setShowUpdatepopup(false);

  return (
    <main>
      <Sidebar />
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1>Dashboard</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL CLIENT'S DATA</h3>
                <div id="num-vector">
                  <p>300</p>
                  <img src={clientData} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL SALES</h3>
                <div id="num-vector">
                  <p>7</p>
                  <img src={totalSales} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH PAYOUT</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={payout} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>PROSPECT NUMBER</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={prospectNumber} alt="" />
                </div>
              </div>
            </div>
          </section>

          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>Hot Clients</h1>

                <div
                  id="client-list"
                  style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  <table id="se-table">
                    <thead id="sales-exe-thead">
                      <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Client Name</th>
                        <th>Email ID</th>
                        <th>Contact No.</th>
                        <th>Reminder Date</th>
                        <th>Activity</th>
                        <th>Last Update</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <tr key={item}>
                          <td>{item}</td>
                          <td>Graphura India</td>
                          <td>Vivek Kumar</td>
                          <td>vivek@gmail.com</td>
                          <td>0123456789</td>
                          <td>10/10/25</td>
                          <td>
                            {/* <button onClick={openPopup}>Update</button> */}
                            <button onClick={openUpdatePopup}>Update</button>
                          </td>
                          <td>
                            <button onClick={openPopup}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {showLastUpdatePopup && <LastUpdatePopUp closePopup={closePopup} />}
      {showUpdatePopup && <UpdataDataPopUp closeUpdatePopup = {closeUpdatePopup}/> }
      
      {/* {showLastUpdatePopup && (
        <div id="popup-overlay" onClick={closePopup}>
          <div id="popup-box" onClick={(e) => e.stopPropagation()}>
            <div id="popup-header">
              <h3>Last Update</h3>
              <button id="close-btn" onClick={closePopup}>
                Close
              </button>
            </div>

            <div id="popup-content">
              <div className="update-row">
                <p className="date">25/06/2025 07:04 PM</p>
                <p className="desc">
                  I cannot directly generate HTML and CSS from an image of a
                  dashboard. My capabilities do not extend to converting visual
                  layouts into code.
                </p>
              </div>

              <div className="update-row">
                <p className="date">25/06/2025 07:04 PM</p>
                <p className="desc">
                  I cannot directly generate HTML and CSS from an image of a
                  dashboard. My capabilities do not extend to converting visual
                  layouts into code.
                </p>
              </div>

              <div className="update-row">
                <p className="date">25/06/2025 07:04 PM</p>
                <p className="desc">
                  I cannot directly generate HTML and CSS from an image of a
                  dashboard. My capabilities do not extend to converting visual
                  layouts into code.
                </p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </main>
  );
};

export default Dashboard;
