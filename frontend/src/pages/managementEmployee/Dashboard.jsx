import React, { useState } from "react";
import income from "../../assets/managementEmployee/Dashboard/income.png";
import projects from "../../assets/managementEmployee/Dashboard/projects.png";
import completedProjects from "../../assets/managementEmployee/Dashboard/completedprojects.png";
import pendingProjects from "../../assets/managementEmployee/Dashboard/pendingProjects.png";
import download from "../../assets/managementEmployee/Dashboard/download.png";
import "../../style/salesExecutive/dashboard.css";
import "../../style/managementEmployee/dashboard.css";
// import { Button } from "bootstrap";

const Dashboard = () => {
  const [showPopup, setShowpopup] = useState(false);

  const openPopup = () => setShowpopup(true);
  const closePopup = () => setShowpopup(false);

  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1>Dashboard</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>LAST MONTH INCOME</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={income} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>CURRENT PROJECTS</h3>
                <div id="num-vector">
                  <p>5</p>
                  <img src={projects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>COMPLETED PROJECTS</h3>
                <div id="num-vector">
                  <p>4</p>
                  <img src={completedProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>PENDING PROJECTS</h3>
                <div id="num-vector">
                  <p>3</p>
                  <img src={pendingProjects} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>Pending Projects</h1>
                <div
                  id="client-list"
                  style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  <table style={{width:"100%"}}>
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

export default Dashboard;
