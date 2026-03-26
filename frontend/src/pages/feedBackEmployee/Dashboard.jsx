import React from "react";
import solvedComplaints from "../../assets/feedbackEmployee/Dashboard/solvedComplaints.png";
import unsolvedComplaints from "../../assets/feedbackEmployee/Dashboard/unsolvedComplaints.png";
import totalFeedback from "../../assets/feedbackEmployee/Dashboard/totalFeedback.png";
import remainingFeedback from "../../assets/feedbackEmployee/Dashboard/remainingFeedback.png";
import "../../style/salesExecutive/dashboard.css";
import "../../style/managementEmployee/dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios"
// import { Button } from "bootstrap";

const Dashboard = () => {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const openView = (item) => {
    setSelectedComplaint(item);
    setShowViewPopup(true);
  };

  // Discussion render karne wala function (Complaints.jsx se copy)
  const renderDiscussion = (text) => {
    if (!text) return <p style={{ textAlign: "center", padding: "20px" }}>No history available.</p>;
    return text.split("------------------").map((entry, i) => {
      if (!entry.trim()) return null;
      const dateMatch = entry.match(/\[(.*?)\]/);
      const timestamp = dateMatch ? dateMatch[1] : "Earlier";
      const content = entry.replace(/\[.*?\]/, "").replace("UPDATE:", "").trim();
      return (
        <div key={i} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
          <div style={{ fontWeight: "bold", fontSize: "12px", color: "#555" }}>{timestamp}</div>
          <div style={{ fontSize: "14px", marginTop: "5px" }}>{content}</div>
        </div>
      );
    });
  };

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/complaints/my-tasks", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = response.data;
      setComplaints(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee complaints:", error);
      setLoading(false);
    }
  };

  const solvedCount = complaints.filter(c => c.status === "Solved").length;
  const unsolvedCount = complaints.filter(c => c.status !== "Solved").length;
  const totalCount = complaints.length;

  useEffect(() => {
    fetchMyComplaints();
  }, []);



  return (

    <main>

      <style>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .popup-box {
          background: white;
          width: 90%;
          max-width: 600px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          overflow: hidden;
        }
        .popup-header {
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fc;
        }
        .popup-body {
          padding: 20px;
          max-height: 450px;
          overflow-y: auto;
        }
      `}</style>

      {/* Popup UI at the end of return */}
      {showViewPopup && (
        <div className="popup-overlay" onClick={() => setShowViewPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()} style={{ width: "600px" }}>
            <div className="popup-header" style={{ justifyContent: "space-between" }}>
              <h5 className="popup-title">{selectedComplaint?.companyName} - Discussion</h5>
              <button onClick={() => setShowViewPopup(false)} style={{ cursor: "pointer", border: "none", background: "none", fontSize: "20px" }}>×</button>
            </div>
            <div className="popup-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {renderDiscussion(selectedComplaint?.discussion)}
            </div>
          </div>
        </div>
      )}
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1>Dashboard</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>SOLVED COMPLAINTS</h3>
                <div id="num-vector">
                  <p>{solvedCount}</p>
                  <img src={solvedComplaints} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>UNSOLVED COMPLAINTS</h3>
                <div id="num-vector">
                  <p>{unsolvedCount}</p>
                  <img src={unsolvedComplaints} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL FEEDBACK</h3>
                <div id="num-vector">
                  <p>{totalCount}</p>
                  <img src={totalFeedback} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>REMAINING FEEDBACK</h3>
                <div id="num-vector">
                  <p>{unsolvedCount}</p>
                  <img src={remainingFeedback} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>Total Complaints</h1>
                <div id="client-list">
                  <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th> </th>
                          <th>Company Name</th>
                          <th>Subject</th>
                          <th>Email_Id</th>
                          <th>Issued Date</th>
                          <th>Discussion</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr><td colSpan="7" style={{ textAlign: "center" }}>Loading...</td></tr>
                        ) : complaints.length > 0 ? (
                          complaints.map((item, index) => (
                            <tr key={item._id || index}>
                              <td>{index + 1}</td>
                              <td>{item.companyName || "N/A"}</td>
                              <td>{item.feedbackId?.clientName || "N/A"}</td>
                              <td>{item.email_id || "N/A"}</td>
                              <td>{item.issuedDate}</td>
                              <td>
                                <button
                                  onClick={() => openView(item)}
                                  style={{
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    justifyContent: "center",
                                    margin: "0 auto",
                                    minWidth: "90px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "30px"
                                  }}>View</button>
                              </td>
                              <td>
                                <button
                                  style={{
                                    backgroundColor: item.status === "Solved" ? "#11CE4D" : "#D41A1A",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    justifyContent: "center",
                                    margin: "0 auto",
                                    minWidth: "90px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "30px"
                                  }}
                                >
                                  {item.status || "Unsolved"}
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="7" style={{ textAlign: "center" }}>No complaints found.</td></tr>
                        )}
                      </tbody>

                    </table>
                  </div>
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
