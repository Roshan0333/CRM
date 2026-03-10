import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import teamMember from "../../assets/salesTeamLead/Dashboard/teamMember.png";
import totalCall from "../../assets/salesTeamLead/Dashboard/totalCall.png";
import prospect from "../../assets/salesTeamLead/Dashboard/Prospect.png";
import clientData from "../../assets/salesTeamLead/Dashboard/clientData.png";

import "../../style/salesTeamLead/dashboard.css";

const API = "http://localhost:5000/api/salesTeamLead";

const Dashboard = () => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const [tableData, setTableData] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalProspects: 0,
    totalCalls: 0,
  });

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    const [dashRes, prospectRes] = await Promise.all([
      axios.get(`${API}/dashboard`, config),
      axios.get(`${API}/prospects`, config),
    ]);

    setDashboardData(dashRes.data);

    const mapped = prospectRes.data.map((p) => ({
      id: p._id,
      client: p.clientName,
      email: p.email,
      contact: p.contact,
      reminder: p.reminderDate
        ? new Date(p.reminderDate).toLocaleDateString()
        : "-",
      updateHistory: p.updateHistory || [],
    }));

    setTableData(mapped);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= STATS ================= */
  const stats = useMemo(
    () => ({
      team: 10,
      calls: dashboardData.totalCalls,
      prospect: dashboardData.totalProspects,
      clients: tableData.length,
    }),
    [dashboardData, tableData]
  );

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!status || !comment) {
      alert("Please select status and write comment");
      return;
    }

    await axios.put(
      `${API}/update-prospect/${selectedRow.id}`,
      { status, comment, date: new Date() },
      config
    );

    setShowUpdatePopup(false);
    setSelectedRow(null);
    setStatus("");
    setComment("");

    await fetchData();
    alert("Update saved successfully");
  };

  return (
    <div id="dashboard-container">
      {/* ================= DASHBOARD CARDS ================= */}
      <section id="dashboard-data">
        <h1>Dashboard</h1>

        <div id="data-wrap">
          <div id="data">
            <h3>TEAM MEMBER</h3>
            <div id="num-vector">
              <p>{stats.team}</p>
              <img src={teamMember} alt="" />
            </div>
          </div>

          <div id="data">
            <h3>TOTAL CALL BY TEAM</h3>
            <div id="num-vector">
              <p>{stats.calls}</p>
              <img src={totalCall} alt="" />
            </div>
          </div>

          <div id="data">
            <h3>TOTAL PROSPECT</h3>
            <div id="num-vector">
              <p>{stats.prospect}</p>
              <img src={prospect} alt="" />
            </div>
          </div>

          <div id="data">
            <h3>TOTAL CLIENT DATA</h3>
            <div id="num-vector">
              <p>{stats.clients}</p>
              <img src={clientData} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= TABLE ================= */}
      <section id="hot-clients">
        <table id="stl-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Reminder</th>
              <th>Activity</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i}>
                <td>{row.client}</td>
                <td>{row.email}</td>
                <td>{row.contact}</td>
                <td>{row.reminder}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedRow(row);
                      setShowUpdatePopup(true);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedRow(row);
                      setShowViewPopup(true);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================= UPDATE POPUP ================= */}
      {showUpdatePopup && (
        <div id="popup-overlay">
          <div id="popup-box">
            <div id="popup-header">
              <h3>Update Status</h3>
              <button id="close-btn" onClick={() => setShowUpdatePopup(false)}>
                Close
              </button>
            </div>

            <div className="radio-group">
              {["Interested", "Follow Up", "Not Interested", "Converted"].map(
                (s) => (
                  <label key={s}>
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    {s}
                  </label>
                )
              )}
            </div>

            <div className="comment-section">
              <label>Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <button id="update-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      )}

      {/* ================= VIEW POPUP ================= */}
      {showViewPopup && selectedRow && (
        <div id="popup-overlay">
          <div id="popup-box">
            <div id="popup-header">
              <h3>Last Updates</h3>
              <button id="close-btn" onClick={() => setShowViewPopup(false)}>
                Close
              </button>
            </div>

            <div id="popup-content">
              {selectedRow.updateHistory.length > 0 ? (
                selectedRow.updateHistory.map((u, i) => (
                  <div className="update-row" key={i}>
                    <div className="date">
                      {new Date(u.date).toLocaleDateString()}
                    </div>
                    <div className="desc">
                      <b>{u.status}</b> – {u.comment}
                    </div>
                  </div>
                ))
              ) : (
                <p>No updates found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
