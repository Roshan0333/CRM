import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/salesTeamLead/Report.css";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/salesTeamLead";

function Report() {
  const navigate = useNavigate();

  const [masterData, setMasterData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("TOTAL DATA");
  const [loading, setLoading] = useState(true);

  /* 🔥 TRANSFER HISTORY STATE */
  const [transferHistory, setTransferHistory] = useState([]);
  const [totalTransferCount, setTotalTransferCount] = useState(0);

  /* ===== UPDATE MODAL ===== */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [status, setStatus] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [comment, setComment] = useState("");

  /* ===== VIEW MODAL ===== */
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    fetchReportData();
    fetchTransferHistory(); // 🔥 ADD
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/report`);
      const data = Array.isArray(res.data) ? res.data : [];
      setMasterData(data);
      setDisplayData(data);
    } catch (error) {
      console.error("Report fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* 🔥 FETCH TRANSFER HISTORY */
  const fetchTransferHistory = async () => {
    try {
      const res = await axios.get(
        `${API}/transfer-history`
      );

      const data = res.data || [];
      setTransferHistory(data);

      const today = new Date().toISOString().slice(0, 10);

      // ✅ TODAY TRANSFER COUNT
      const total = data
        .filter(i => i.createdAt?.slice(0, 10) === today)
        .reduce((sum, i) => sum + Number(i.transferCount || 0), 0);

      setTotalTransferCount(total);
    } catch (err) {
      console.error("Transfer history error", err);
    }
  };

  /* ===== FILTER (CALL / ALL ONLY) ===== */
  const handleFilter = (type, label) => {
    setActiveFilter(label);

    if (type === "all") {
      setDisplayData(masterData);
    } else {
      setDisplayData(masterData.filter(item => item?.type === type));
    }
  };

  /* ===== SAVE UPDATE ===== */
  const handleSaveUpdate = async () => {
    if (!status) {
      alert("Status required");
      return;
    }

    try {
      await axios.patch(`${API}/report/${selectedRow._id}`, {
        status,
        reminderDate,
        comment,
      });

      fetchReportData();
      setIsModalOpen(false);
      setStatus("");
      setReminderDate("");
      setComment("");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="report-page">
      <h1 className="report-title">TL Report</h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="report-cards">

        {/* TOTAL DATA */}
        <div
          className={`report-card blue ${activeFilter === "TOTAL DATA" ? "active" : ""}`}
          onClick={() => handleFilter("all", "TOTAL DATA")}
        >
          <div className="card-text">
            <p>Total Data</p>
            <h2>{masterData.length}</h2>
          </div>
          <div className="card-icon">📊</div>
        </div>

        {/* TODAY CALLS */}
        <div
          className={`report-card green ${activeFilter === "TODAY CALLS" ? "active" : ""}`}
          onClick={() => handleFilter("call", "TODAY CALLS")}
        >
          <div className="card-text">
            <p>Today Calls</p>
            <h2>{masterData.filter(x => x?.type === "call").length}</h2>
          </div>
          <div className="card-icon">📞</div>
        </div>

        {/* TODAY SALES */}
        <div className="report-card cyan">
          <div className="card-text">
            <p>Today Sales</p>
            <h2>8000</h2>
          </div>
          <div className="card-icon">💰</div>
        </div>

        {/* 🔥 TODAY TRANSFER (REAL DATA) */}
        <div
          className="report-card yellow"
          onClick={() => navigate("/salesTeamLead/transfer-data")}
        >
          <div className="card-text">
            <p>Today Transfer</p>
            <h2>{totalTransferCount}</h2>
          </div>
          <div className="card-icon">🔄</div>
        </div>

      </div>

      {/* ===== TABLE ===== */}
      <h2 className="table-title">Today Call Logs</h2>

      <div className="report-table-box">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Client</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Reminder Date</th>
                <th>Activity</th>
                <th>Call Details</th>
              </tr>
            </thead>

            <tbody>
              {displayData.map(row => (
                <tr key={row._id}>
                  <td>{row.companyName}</td>
                  <td>{row.clientName}</td>
                  <td>{row.email}</td>
                  <td>{row.contact}</td>
                  <td>{row.reminderDate ? row.reminderDate.slice(0, 10) : "-"}</td>

                  <td>
                    <button
                      className="update-btn"
                      onClick={() => {
                        setSelectedRow(row);
                        setStatus(row.status || "");
                        setReminderDate(row.reminderDate || "");
                        setComment(row.comment || "");
                        setIsModalOpen(true);
                      }}
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedRow(row);
                        setIsViewOpen(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>

      {/* ===== UPDATE MODAL ===== */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-body">
            <h3>Update Call</h3>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select Status</option>
              <option value="Talk">Talk</option>
              <option value="Not Talk">Not Talk</option>
            </select>

            <input
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
            />

            <textarea
              placeholder="Write comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="modal-actions">
              <button className="update-btn" onClick={handleSaveUpdate}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== VIEW MODAL ===== */}
      {isViewOpen && (
        <div className="modal-overlay">
          <div className="modal-body">
            <h3>Call Details</h3>

            <p><b>Status:</b> {selectedRow?.status || "-"}</p>
            <p><b>Reminder Date:</b> {selectedRow?.reminderDate?.slice(0, 10) || "-"}</p>

            <div className="view-comment-box">
              {selectedRow?.comment || "No comment added"}
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsViewOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Report;
