import React from 'react'
import "../../style/feedbackManager/fteamreport.css"

function TeamReport(){
    // const [day, setDay] = useState("");
  // const [teamLeader, setTeamLeader] = useState("");

  // const handleDayChange = (e) => setDay(e.target.value);
  // const handleTeamLeaderChange = (e) => setTeamLeader(e.target.value);

  return (
    <div className="feedbackreport-container">
      <div>
        <h2 className="feedbackreport-title">Report</h2>
      </div>
      <div className="feedbackreport-filters">
         
        <select className="feedbackreport-dropdown">
          <option value="">Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Tuesday">Wednesday</option>
          <option value="Tuesday">Thursday</option>
          <option value="Tuesday">Friday</option>
          <option value="Tuesday">Saturday</option>
          <option value="Tuesday">Sunday</option>
        </select>
        <select className="feedbackreport-dropdown">
          <option value="">Team Leader Name</option>
          <option value="TL1">TL1</option>
          <option value="TL2">TL2</option>
          {/* Add real team leader names as needed */}
        </select>
      </div>
        <div className="feedbackreport-search"><button className="feedbackreport-search-btn">Search</button></div>
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


export default TeamReport
