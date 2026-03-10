import React, { useState } from "react";
import "../../style/salesManager/TransferDataToFin.css";
import "../../style/salesManager/managerReport.css";

const TransferDataToFin = () => {
  const [showPopup, setShowpopup] = useState(false);

  const openPopup = () => setShowpopup(true);
  const closePopup = () => setShowpopup(false);

  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="hot-clients">
            <div id="transfer-container">
              <div id="heading">
                <h1>Transfer Data to Fin.</h1>
                <button id="heading-btn" onClick={openPopup}>Add New +</button>
              </div>
              <div id="client-list">
                <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <th> </th>
                      <th>Company Name</th>
                      <th>Client Name</th>
                      <th>Email_id</th>
                      <th>Contact no.</th>
                      <th>Date</th>
                      <th>Ammount</th>
                      <th>TL Name</th>
                      <th>Sales Executive</th>
                      <th>Services</th>
                      <th>Action</th>
                    </thead>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                      <td>
                        <button onClick={openPopup}>View</button>
                      </td>
                    </tr>
                  </table>
                </div>
                {showPopup && (
                  <div className="overlay" onClick={closePopup}>
                    <div
                      id="transfer-popup"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div id="popup-grid">
                        {/* LEFT SIDE INPUTS */}
                        <input
                          type="text"
                          className="popup-input"
                          placeholder="Company Name"
                        />
                        <input
                          type="text"
                          className="popup-input"
                          placeholder="Amount"
                        />

                        <input
                          type="text"
                          className="popup-input"
                          placeholder="Client Name"
                        />
                        <select className="popup-select">
                          <option>TL Name</option>
                        </select>

                        <input
                          type="email"
                          className="popup-input"
                          placeholder="Email_id"
                        />
                        <select className="popup-select">
                          <option>Sales Executive</option>
                        </select>

                        <input
                          type="text"
                          className="popup-input"
                          placeholder="Contact no."
                        />
                        <select className="popup-select">
                          <option>Services</option>
                        </select>

                        <input
                          type="text"
                          className="popup-input"
                          placeholder="Date"
                        />
                      </div>

                      <button id="popup-save">Add New +</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section id="hot-clients">
            <div id="container">
              <h1>Transfer Data History</h1>
              <div id="client-list">
                <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <th> </th>
                      <th>Company Name</th>
                      <th>Client Name</th>
                      <th>Email_id</th>
                      <th>Contact no.</th>
                      <th>Date</th>
                      <th>Ammount</th>
                      <th>Tl Name</th>
                      <th>Sales Executive</th>
                      <th>Services</th>
                    </thead>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>Vivek Kumar</td>
                      <td>vivek@gmail.com</td>
                      <td>0123456789</td>
                      <td>10/10/25</td>
                      <td>10,000</td>
                      <td>Vivek</td>
                      <td>Vivek Kumar</td>
                      <td>Bold text column</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TransferDataToFin;
