import React, { useEffect, useState } from "react";
import axios from "axios";

/* ========= ASSETS ========= */
import clientData from "../../assets/salesTeamLead/untouchedData/clientData.png";
import totalProspectus from "../../assets/salesTeamLead/untouchedData/totalProspect.png";
import totalUntouchedData from "../../assets/salesTeamLead/untouchedData/totalUntouchedData.png";
import call from "../../assets/salesTeamLead/untouchedData/call.png";

import "../../style/salesTeamLead/untouchedData.css";

const API_URL = "http://localhost:5000/api/untouched";

const UntouchedData = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCard, setActiveCard] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [stats, setStats] = useState({
    totalData: 0,
    todayCalls: 0,
    totalProspect: 0,
    totalUntouched: 0,
  });

  useEffect(() => {
    fetchStats();
    fetchTableData();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get(`${API_URL}/stats`);
    setStats(res.data);
  };

  const fetchTableData = async () => {
    const res = await axios.get(API_URL);
    setTableData(res.data);
    setFilteredData(res.data);
  };

  /* ===== SEARCH ===== */
  const handleSearch = () => {
    let filtered = [...tableData];

    if (searchText.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.clientName?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.memberName?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (searchDate) {
      filtered = filtered.filter(
        (item) =>
          item.createdAt &&
          new Date(item.createdAt).toISOString().split("T")[0] === searchDate
      );
    }

    setFilteredData(filtered);
  };

  /* ===== CARD FILTER ===== */
  const handleCardClick = (title) => {
    setActiveCard(title);

    if (title === "TOTAL DATA") {
      setFilteredData(tableData);
    }

    if (title === "TODAY CALLS") {
      setFilteredData(tableData.filter((d) => d.lastCall));
    }

    if (title === "TOTAL PROSPECT") {
      setFilteredData(tableData.filter((d) => d.isProspect));
    }

    if (title === "TOTAL UNTOUCHED DATA") {
      setFilteredData(tableData.filter((d) => !d.lastCall));
    }
  };

  const statsCards = [
    { title: "TOTAL DATA", value: stats.totalData, icon: clientData, color: "#2d4fd7" },
    { title: "TODAY CALLS", value: stats.todayCalls, icon: call, color: "#19a974" },
    { title: "TOTAL PROSPECT", value: stats.totalProspect, icon: totalProspectus, color: "#00a8e8" },
    { title: "TOTAL UNTOUCHED DATA", value: stats.totalUntouched, icon: totalUntouchedData, color: "#f2b705" },
  ];

  return (
    <div id="untouchedData-container">
      <h2 className="page-title">Untouched Data</h2>

      {/* ===== FILTER BAR ===== */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Member Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* ===== STATS ===== */}
      <div className="stats-row">
        {statsCards.map((card, i) => (
          <div
            key={i}
            className={`stats-card ${activeCard === card.title ? "active" : ""}`}
            style={{ borderColor: card.color }}
            onClick={() => handleCardClick(card.title)}
          >
            <div>
              <p style={{ color: card.color }}>{card.title}</p>
              <h3>{card.value}</h3>
            </div>
            <img src={card.icon} alt="" />
          </div>
        ))}
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Client Name</th>
              <th>Email ID</th>
              <th>Contact No.</th>
              <th>Last Call</th>
              <th>Sales Executive Name</th>
              <th className="blue">Transfer Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty">
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((d) => (
                <tr key={d._id}>
                  <td>{d.companyName}</td>
                  <td>{d.clientName}</td>
                  <td>{d.email}</td>
                  <td>{d.contact}</td>
                  <td>{d.lastCall ? new Date(d.lastCall).toLocaleDateString() : "—"}</td>
                  <td>
                   <span className="badge">
                    {d.assignedTo
                     ? `${d.assignedTo.firstName} ${d.assignedTo.lastName}`
                      : "-"}
                    </span>

                   </td>

                  <td>
                    {d.transferredAt
                      ? new Date(d.transferredAt).toLocaleDateString()
                      : "Select"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UntouchedData;
