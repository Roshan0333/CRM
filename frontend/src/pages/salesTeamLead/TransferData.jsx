import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/salesTeamLead/TransferData.css";

const API = "http://localhost:5000/api/salesTeamLead";

const SalesReport = () => {
  const [history, setHistory] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedCount, setSelectedCount] = useState("");

  useEffect(() => {
    fetchMembers();
    fetchHistory();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API}/team-members`);
      setMembers(res.data);
    } catch (err) {
      console.error("Member fetch error:", err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/transfer-history`);
      setHistory(res.data);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  const handleTransfer = async () => {
    if (!selectedMember || !selectedCount) {
      alert("Member aur Transfer Count select karna zaroori hai!");
      return;
    }

    try {
      await axios.post(`${API}/transfer`, {
        employeeId: selectedMember,
        transferCount: Number(selectedCount),
      });

      alert("Leads successfully transfer ho gayi ✅");
      setSelectedMember("");
      setSelectedCount("");
      fetchHistory();
    } catch (error) {
      console.error("Transfer error:", error);
      alert("Transfer failed ❌");
    }
  };

  return (
    <div
      id="transferData-container"
      style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}
    >
      <h3 className="page-title">Transfer Data</h3>

      {/* ================= TRANSFER ================= */}
      <div className="transfer-box">
        <select
          className="form-select pro-select"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          <option value="">Member Name</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.firstName} {m.lastName}
            </option>
          ))}
        </select>

        <select
          className="form-select pro-select"
          value={selectedCount}
          onChange={(e) => setSelectedCount(e.target.value)}
        >
          <option value="">Transfer Data in No.</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>

        <div className="text-end">
          <button className="transfer-btn" onClick={handleTransfer}>
            Transfer Leads
          </button>
        </div>
      </div>

      {/* ================= HISTORY ================= */}
      <h3 className="history-title">Transfer Data History</h3>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Transfer Data</th>
              <th>Date</th>
              <th>Transfer By</th>
              <th>Total Data</th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No transfer history
                </td>
              </tr>
            ) : (
              history.map((row) => (
                <tr key={row._id}>
                  <td>
                    <b>
                      {row.employee
                        ? `${row.employee.firstName} ${row.employee.lastName}`
                        : "N/A"}
                    </b>
                  </td>
                  <td>{row.transferCount}</td>
                  <td>{new Date(row.createdAt).toLocaleDateString("en-GB")}</td>
                  <td>
                    <span className="transfer-by">{row.transferBy}</span>
                  </td>
                  <td>{row.totalData}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
