import React, { useState } from "react";
import totalProjects from "../../assets/managerManagement/managerReport/totalProjects.png";
import completedProjects from "../../assets/managerManagement/managerReport/completedprojects.png";
import pendingProjects from "../../assets/managerManagement/managerReport/pendingProjects.png";
import payout from "../../assets/managerManagement/managerReport/payout.png";
import download from "../../assets/managerManagement/managerReport/download.png";
import "../../style/salesExecutive/dashboard.css";
import "../../style/managementEmployee/dashboard.css";
// import { Button } from "bootstrap";

const ManagerReport = () => {
  const [showPopup, setShowpopup] = useState(false);

  const openPopup = () => setShowpopup(true);
  const closePopup = () => setShowpopup(false);

  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1>Manager Report</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL PROJECTS</h3>
                <div id="num-vector">
                  <p>300</p>
                  <img src={totalProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>COMPLETED PROJECTS</h3>
                <div id="num-vector">
                  <p>7</p>
                  <img src={completedProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>PENDING PROJECTS</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={pendingProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH PAYOUT</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={payout} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>My Projects</h1>
                <div id="client-list">
                  <table style={{ width: "100%" }}>
                    <thead>
                      <th> </th>
                      <th>Company Name</th>
                      <th>Invoice No.</th>
                      <th>Services</th>
                      <th>Date</th>
                      <th>Deadline</th>
                      <th>Activity</th>
                      <th>More Details </th>
                    </thead>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>
                        <button onClick={openPopup}>Update</button>
                      </td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>
                        <button onClick={openPopup}>Update</button>
                      </td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>
                        <button onClick={openPopup}>Update</button>
                      </td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>
                        <button onClick={openPopup}>Update</button>
                      </td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>
                        <button onClick={openPopup}>Update</button>
                      </td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>
                        <button onClick={openPopup}>Update</button>
                      </td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                  </table>
                  {showPopup && (
                    <div id="popup-overlay" onClick={closePopup}>
                      <div id="popup-box" onClick={(e) => e.stopPropagation()}>
                        <h2 id="popup-title">Company Name</h2>

                        <div id="popup-grid">
                          <div id="popup-item">
                            <p>Download Logo</p>
                            <img src={download} alt="" />
                          </div>
                          <div id="popup-item">
                            <p>Client References</p>
                            <img src={download} alt="" />
                          </div>
                          <div id="popup-item">
                            <p>Download Brochure</p>
                            <img src={download} alt="" />
                          </div>
                          <div id="popup-item">
                            <p>Download Content</p>
                            <img src={download} alt="" />
                          </div>
                          <div id="popup-item">
                            <p>Download Client Images</p>
                            <img src={download} alt="" />
                          </div>
                          <div id="popup-item">
                            <p>Download Client Videos</p>
                            <img src={download} alt="" />
                          </div>
                          <div id="popup-item">
                            <p>Download Company Details</p>
                            <img src={download} alt="" />
                          </div>
                          <div id="popup-item">
                            <p>Other Details</p>
                            <img src={download} alt="" />
                          </div>
                        </div>

                        <button id="popup-close-btn" onClick={closePopup}>
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ManagerReport;
