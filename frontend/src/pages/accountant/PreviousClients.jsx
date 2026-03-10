import React, { useState } from "react";
import totalClients from "../../assets/accountant/Dashboard/totalClients.png";
import pendingPayment from "../../assets/accountant/previousClients/pendingPayment.png";
import currentClients from "../../assets/accountant/Dashboard/currentClients.png";
import payout from "../../assets/accountant/Dashboard/payout.png";
import save from "../../assets/accountant/client/save.png";
import "../../style/salesExecutive/dashboard.css";
// import { Button } from "bootstrap";

const PreviousClients = () => {
  const [showPopup, setShowpopup] = useState(false);

  const openPopup = () => setShowpopup(true);
  const closePopup = () => setShowpopup(false);

  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1 style={{ fontSize: "36px" }}>
              Previous Clients (Last 30 Days)
            </h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL CLIENTS</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={totalClients} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>PENDING PAYMENT</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={pendingPayment} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>CURRENT CLIENTS</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={currentClients} alt="" />
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
              <h1 style={{ color: "#5A5C69" }}>Past Clients</h1>
              <div id="client-list">
                <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <th> </th>
                      <th>Company Name</th>
                      <th>Client Name</th>
                      <th>Email_id</th>
                      <th>Contact no.</th>
                      <th>Total Payment</th>
                      <th>Due Payment</th>
                      <th>Starting Date</th>
                      <th>End Date</th>
                      <th>More Details</th>
                    </thead>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10,000</td>
                      <td>10,000</td>
                      <td>10/10/25</td>
                      <td>10/12/25</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10,000</td>
                      <td>10,000</td>
                      <td>10/10/25</td>
                      <td>10/12/25</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10,000</td>
                      <td>10,000</td>
                      <td>10/10/25</td>
                      <td>10/12/25</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10,000</td>
                      <td>10,000</td>
                      <td>10/10/25</td>
                      <td>10/12/25</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10,000</td>
                      <td>10,000</td>
                      <td>10/10/25</td>
                      <td>10/12/25</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10,000</td>
                      <td>10,000</td>
                      <td>10/10/25</td>
                      <td>10/12/25</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                  </table>
                </div>
                {showPopup && (
                  <div className="overlay" onClick={closePopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                      {/* Header */}
                      <div className="popup-header">
                        <h2>Company Name</h2>
                        <button className="close-btn" onClick={closePopup}>
                          Close
                        </button>
                      </div>

                      {/* Services */}
                      <h3 className="services-title">List of Services:</h3>
                      <ol className="services-list">
                        <li>Logo Design</li>
                        <li>Business Card Design</li>
                        <li>Poster Design</li>
                      </ol>

                      {/* Input & Save */}
                      <div className="input-row">
                        <div className="input-wrapper">
                          <input
                            type="text"
                            className="input-with-icon"
                            placeholder="Work Order"
                          />
                          <img src={save} className="inside-icon" alt="" />
                        </div>

                        <button className="save-btn">Save</button>
                      </div>

                      <button className="invoice-btn">View Invoice</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PreviousClients;
