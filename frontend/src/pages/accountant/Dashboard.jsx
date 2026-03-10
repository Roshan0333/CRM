import React, { useState } from "react";
import totalClients from "../../assets/accountant/Dashboard/totalClients.png";
import pendingClients from "../../assets/accountant/Dashboard/pendingClients.png";
import currentClients from "../../assets/accountant/Dashboard/currentClients.png";
import payout from "../../assets/accountant/Dashboard/payout.png";
import { CheckCircle, XCircle } from "lucide-react"; // << FIXED
import "../../style/salesExecutive/dashboard.css";

const Dashboard = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [setSelectedClient] = useState(null);

  const openTrackModal = (client = null) => {
    setSelectedClient(client);
    setSelectedTrack({
      payment: { status: "Done", date: "26-Jan-2025" },
      finance: "Approved",
      management: "Approved",
      employee: "Approved",
      hosting: "Pending",
    });
    setShowTrackModal(true);
  };

  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          {/* TOP CARDS */}
          <section id="dashboard-data">
            <h1>Dashboard</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL CLIENTS</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={totalClients} alt="" />
                </div>
              </div>

              <div id="data">
                <h3>PENDING CLIENTS</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={pendingClients} alt="" />
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

          {/* TABLE SECTION */}
          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>Past Clients</h1>

                <div id="client-list">
                  <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
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
                        </tr>
                      </thead>

                      <tbody>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <tr key={num}>
                            <td>{num}</td>
                            <td>Graphura India</td>
                            <td>Vivek Kumar</td>
                            <td>vivek@gmail.com</td>
                            <td>0123456789</td>
                            <td>10,000</td>
                            <td>10,000</td>
                            <td>10/10/25</td>
                            <td>10/12/25</td>
                            <td>
                              <button onClick={() => openTrackModal()}>
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* POPUP MODAL */}
                  {showTrackModal && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 99999,
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                          width: "95%",
                          maxWidth: "1200px",
                          padding: "32px",
                          maxHeight: "90vh",
                          overflowY: "auto",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "16px",
                          }}
                        >
                          <button
                            onClick={() => setShowTrackModal(false)}
                            style={{
                              backgroundColor: "#D41A1A",
                              color: "white",
                              padding: "8px 20px",
                              borderRadius: "4px",
                              fontSize: "14px",
                              fontWeight: "500",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Close
                          </button>
                        </div>

                        <h2
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: "32px",
                          }}
                        >
                          Client Management
                        </h2>

                        {/* TRACKER */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 16px",
                          }}
                        >
                          {/* STEP 1 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              flex: 1,
                            }}
                          >
                            <CheckCircle
                              style={{
                                width: "64px",
                                height: "64px",
                                color: "#11CE4D",
                                marginBottom: "8px",
                              }}
                            />
                            <p style={{ fontWeight: "bold" }}>Payment Done</p>
                            <small>{selectedTrack?.payment.date}</small>
                          </div>

                          <div
                            style={{
                              flex: 1,
                              height: "4px",
                              backgroundColor: "#11CE4D",
                              margin: "0 8px",
                            }}
                          ></div>

                          {/* STEP 2 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              flex: 1,
                            }}
                          >
                            <CheckCircle
                              style={{
                                width: "64px",
                                height: "64px",
                                color: "#11CE4D",
                                marginBottom: "8px",
                              }}
                            />
                            <p style={{ fontWeight: "bold" }}>
                              Financial Status
                            </p>
                            <small>{selectedTrack?.finance}</small>
                          </div>

                          <div
                            style={{
                              flex: 1,
                              height: "4px",
                              backgroundColor: "#11CE4D",
                              margin: "0 8px",
                            }}
                          ></div>

                          {/* STEP 3 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              flex: 1,
                            }}
                          >
                            <CheckCircle
                              style={{
                                width: "64px",
                                height: "64px",
                                color: "#11CE4D",
                                marginBottom: "8px",
                              }}
                            />
                            <p style={{ fontWeight: "bold" }}>
                              Management Status
                            </p>
                            <small>{selectedTrack?.management}</small>
                          </div>

                          <div
                            style={{
                              flex: 1,
                              height: "4px",
                              backgroundColor: "#11CE4D",
                              margin: "0 8px",
                            }}
                          ></div>

                          {/* STEP 4 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              flex: 1,
                            }}
                          >
                            <CheckCircle
                              style={{
                                width: "64px",
                                height: "64px",
                                color: "#11CE4D",
                                marginBottom: "8px",
                              }}
                            />
                            <p style={{ fontWeight: "bold" }}>
                              Employee Update
                            </p>
                            <small>{selectedTrack?.employee}</small>
                          </div>

                          <div
                            style={{
                              flex: 1,
                              height: "4px",
                              backgroundColor: "#D41A1A",
                              margin: "0 8px",
                            }}
                          ></div>

                          {/* STEP 5 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              flex: 1,
                            }}
                          >
                            <XCircle
                              style={{
                                width: "64px",
                                height: "64px",
                                color: "#D41A1A",
                                marginBottom: "8px",
                              }}
                            />
                            <p style={{ fontWeight: "bold" }}>Hosting Status</p>
                            <small>{selectedTrack?.hosting}</small>
                          </div>
                        </div>
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
