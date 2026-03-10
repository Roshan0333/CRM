import React from "react";
import "../../style/salesManager/teamreport.css";

function Report() {
  // const [day, setDay] = useState("");
  // const [teamLeader, setTeamLeader] = useState("");

  // const handleDayChange = (e) => setDay(e.target.value);
  // const handleTeamLeaderChange = (e) => setTeamLeader(e.target.value);

  return (
    <div className="manager-container">
      <div>
        <h2 className="manager-title">Report</h2>
      </div>
      <div className="manager-filters">
         
        <select className="manager-dropdown">
          <option value="">Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          {/* Add more days as needed */}
        </select>
        <select className="manager-dropdown">
          <option value="">Team Leader Name</option>
          <option value="TL1">TL1</option>
          <option value="TL2">TL2</option>
          {/* Add real team leader names as needed */}
        </select>
      </div>
        <div className="manager-search"><button className="manager-search-btn">Search</button></div>
      <div className="manager-table-container">
        <table className="manager-table">
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
            <tr>
              <td>TL Name</td>
              <td>1234</td>
              <td>23</td>
              <td>1200</td>
              <td>2</td>
              <td>15</td>
            </tr>
            <tr>
              <td>Sales Executive</td>
              <td>60</td>
              <td>5</td>
              <td>20</td>
              <td>0</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
            </tr>
            <tr>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
            </tr>
            <tr>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
              <td>Bold text column</td>
            </tr>
            {/* Add more rows as required */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
