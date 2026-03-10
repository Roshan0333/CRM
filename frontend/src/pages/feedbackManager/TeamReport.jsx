import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

import "../../style/feedbackManager/fteamreport.css"

function TeamReport() {
  const [day, setDay] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [reportData, setReportData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const dummyData = [
        { id: 1, name: "Isha", calls: 1234, prospects: 23, untouched: 1200, monthlySales: 2, totalSales: 15, day: "Monday", tl: "TL1" },
        { id: 2, name: "Arjun", calls: 950, prospects: 12, untouched: 500, monthlySales: 5, totalSales: 20, day: "Tuesday", tl: "TL1" },
        { id: 3, name: "Priya", calls: 60, prospects: 5, untouched: 20, monthlySales: 0, totalSales: 5, day: "Monday", tl: "TL2" }
      ];
      setReportData(dummyData);
      setOriginalData(dummyData);
    };

    fetchData();
  }, []);

  const handleSearch = async () => {

    try{
      const response = await axios.get(`http://localhost:5000/api/reports`, {
      params: {
        day: day,
        tl: teamLeader
      }
    });

    setReportData(response.data);

    } catch (error) {
      console.error("Error filtering reports:", error);
    }

  };



  // const handleDayChange = (e) => setDay(e.target.value);
  // const handleTeamLeaderChange = (e) => setTeamLeader(e.target.value);

  return (
    <div className="feedbackreport-container">
      <div>
        <h2 className="feedbackreport-title">Report</h2>
      </div>
      <div className="feedbackreport-filters">

        <select className="feedbackreport-dropdown" value={day}
          onChange={(e) => setDay(e.target.value)}>
          <option value="">Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <select className="feedbackreport-dropdown" value={teamLeader}
          onChange={(e) => setTeamLeader(e.target.value)}>
          <option value="">Team Leader Name</option>
          <option value="TL1">TL1</option>
          <option value="TL2">TL2</option>
          {/* Add real team leader names as needed */}
        </select>
      </div>
      <div className="feedbackreport-search"><button className="feedbackreport-search-btn" onClick={handleSearch}>Search</button></div>
      <div className="feedbackreport-table-container">
        <table className="feedbackreport-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Today's Calls</th>
              <th>Today's Prospect</th>
              <th>Untouched Data</th>
              <th>Monthly Sales</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length > 0 ? (
              reportData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.calls}</td>
                  <td>{item.prospects}</td>
                  <td>{item.untouched}</td>
                  <td>{item.monthlySales}</td>
                  <td>{item.totalSales}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No data available for this selection</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default TeamReport
