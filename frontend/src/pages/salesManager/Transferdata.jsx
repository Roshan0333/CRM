import React, { useState, useEffect } from "react";
import "../../style/salesManager/transferdata.css";
import { getAllTeam } from "../../services/salesDepartmentApi";
import axios from "axios";

function Teamreport() {
  // const [day, setDay] = useState("");
  // const [teamLeader, setTeamLeader] = useState("");

  // const handleDayChange = (e) => setDay(e.target.value);
  // const handleTeamLeaderChange = (e) => setTeamLeader(e.target.value);

  const [teamList, setTeamList] = useState([]);
  const [distributionList, setDistribution] = useState([]);
  const [teamLeadEmail, setTeamLeadEmail] = useState("");
  const [leadCounts, setLeadCount] = useState(0);
  const [teamLeaderList, setTeamLeaderList] = useState(new Map());

  // const transferdata = [
  //   ...Array(6).fill({
  //     EmployeeName: "Bold text column",
  //     Transferdatainno: "Bold text column",
  //     Date: "Bold text column",
  //     Transferby: "Bold text column",
  //     Totaldata: "Bold text column",
  //   }),
  // ];

  const distribution = () => {
    try {

      if (!teamLeadEmail || leadCounts <= 0) {
        alert("Please select team lead and enter valid lead count");
        return;
      }

      const exists = distributionList.some(
        item => item.teamLeaderEmail === teamLeadEmail
      );

      if (exists) {
        alert("Team leader already added");
        return;
      }

      let name = teamLeaderList.get(teamLeadEmail)

      const obj = {
        teamLeaderEmail: teamLeadEmail,
        leaderName: name,
        leadCount: parseInt(leadCounts)
      };

      const list = [...distributionList, obj];

      setLeadCount(0);
      setTeamLeadEmail("");
      setDistribution(list);
    }
    catch (err) {
      return console.error(err.message);
    }
  }


  const distributionLeadApi = async () => {
    try {
      const apiResponse = await axios.put(
        "http://localhost:5000/api/clientLead/teamAssignedLead",
        {distributionList:distributionList},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      if (apiResponse.status === 500) {
        return console.error(`Error: ${apiResponse.data.error} Name: ${apiResponse.data.name}`);
      }
      else {
        return alert(apiResponse.data.msg)
      }
    }
    catch (err) {
      return console.error(`Error;: ${err.message}  ${err.name}`)
    }
  }

  useEffect(() => {
    ; (
      async () => {
        try {
          let apiResponse = await getAllTeam();

          if (!apiResponse.fetchMessage) {
            console.log(apiResponse.data);
            return
          }

          if (!apiResponse.ok && apiResponse.fetchMessage) {
            alert(apiResponse.data);
            return
          }

          setTeamList(apiResponse.data);

          const teamLeaderList = new Map(
            apiResponse.data.map(item => [item.TLEmail_Id, item.TLName])
          )

          setTeamLeaderList(teamLeaderList);
        }
        catch (err) {
          console.log(err.message);
          return
        }
      }
    )()
  }, [])

  return (
    <div className="tdata-container">
      <div>
        <h2 className="tdata-title">Transfer Data</h2>
      </div>
      <div className="tdata-filters">

        <div>
          <select className="tdata-dropdown" onChange={(e) => setTeamLeadEmail(e.target.value)}>
            <option value="">Team Lead Email</option>
            {teamList.map((item, index) => { return <option value={item.TLEmail_Id} key={index}>{item.TLEmail_Id}</option> }
            )}
            {/* Add more days as needed */}
          </select>

          <input type="number" onChange={(e) => setLeadCount(e.target.value)} className="lead-input" />
        </div>
        <div className="tdata-filter-action">

          <button className="tdata-search-btn" onClick={distribution}>Add</button>

          <button className="tdata-search-btn" onClick={distributionLeadApi}>Transfer</button>
        </div>
      </div>

      <div className="tdata-table-container">
        <div>
          <h2 className="tdata-title">Team Transfer Data</h2>
        </div>
        <table className="tdata-table">
          <thead>
            <tr>
              <th>Team Leader Name</th>
              <th>Email</th>
              <th>Transfer data in no</th>
            </tr>
          </thead>
          <tbody>
            {distributionList.map((item, idx) => (
              <tr key={idx}>
                <td className="bold">{item.leaderName}</td>
                <td className="bold">{item.teamLeaderEmail}</td>
                <td className="bold">{item.leadCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          {/* <tbody>
            {teamList.map((row, idx) => (
              <tr key={idx}>
                <td className="bold">{row.EmployeeName}</td>
                <td className="bold">{row.Transferdatainno}</td>
                <td className="bold">{row.Date}</td>
                <td className="bold">{row.Transferby}</td>
                <td className="bold">{row.Totaldata}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}

export default Teamreport;
