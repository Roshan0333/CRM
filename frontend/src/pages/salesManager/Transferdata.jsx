import React from "react";
import "../../style/salesManager/transferdata.css";

function Teamreport() {
  // const [day, setDay] = useState("");
  // const [teamLeader, setTeamLeader] = useState("");

  // const handleDayChange = (e) => setDay(e.target.value);
  // const handleTeamLeaderChange = (e) => setTeamLeader(e.target.value);

  const transferdata = [
    ...Array(6).fill({
      EmployeeName: "Bold text column",
      Transferdatainno: "Bold text column",
      Date: "Bold text column",
      Transferby: "Bold text column",
      Totaldata: "Bold text column",
    }),
  ];

  return (
    <div className="tdata-container">
      <div>
        <h2 className="tdata-title">Transfer Data</h2>
      </div>
      <div className="tdata-filters">

        <select className="tdata-dropdown">
          <option value="">TL/Member Name </option>
          <option value="Monday">Team 1</option>
          <option value="Tuesday">Team 2</option>
          {/* Add more days as needed */}
        </select>
        <div className="tdata-filter-action">
          <select className="tdata-dropdown">
            <option value="">Transfer Data in No</option>
            <option value="TL1">TL1</option>
            <option value="TL2">TL2</option>
          </select>

          <button className="tdata-search-btn">Transfer</button>
        </div>
      </div>
      <div className="tdata-table-container">
        <div>
          <h2 className="tdata-title">Transfer Data History</h2>
        </div>
        <table className="tdata-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Transfer data in no</th>
              <th>Date</th>
              <th>Transfer By</th>
              <th>Total data in account</th>
            </tr>
          </thead>
          <tbody>
            {transferdata.map((row, idx) => (
              <tr key={idx}>
                <td className="bold">{row.EmployeeName}</td>
                <td className="bold">{row.Transferdatainno}</td>
                <td className="bold">{row.Date}</td>
                <td className="bold">{row.Transferby}</td>
                <td className="bold">{row.Totaldata}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teamreport;
