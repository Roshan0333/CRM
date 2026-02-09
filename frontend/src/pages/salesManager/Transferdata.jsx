import React, { useState, useEffect } from "react";
import "../../style/salesManager/transferdata.css";
import { getAllEmployee } from "../../services/salesDepartmentApi";
import axios from "axios";

function Teamreport() {
  const [reportType, setReportType] = useState("team");
  const [teamList, setTeamList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [distributionList, setDistribution] = useState([]);
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [leadCounts, setLeadCount] = useState(0);
  const [employeeDetailList, setEmployeeDetailList] = useState(new Map());

  const distribution = () => {
    if (!employeeEmail || leadCounts <= 0) {
      alert("Please select team lead and enter valid lead count");
      return;
    }

    const exists = distributionList.some(
      item => item.employeeEmail === employeeEmail
    );

    if (exists) {
      alert("Team leader already added");
      return;
    }

    const name = employeeDetailList.get(employeeEmail) || "Unknown";

    setDistribution(prev => [
      ...prev,
      {
        employeeEmail,
        leaderName: name,
        leadCount: Number(leadCounts)
      }
    ]);

    setEmployeeEmail("");
    setLeadCount(0);
  };

  const distributionLeadApi = async () => {
    try {
      const apiResponse = await axios.patch(
        reportType === "team"
          ? "http://localhost:5000/api/clientLead/teamAssignedLead"
          : "http://localhost:5000/api/clientLead/assignByManager",
        { distributionList },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert(apiResponse.data.msg);
      setDistribution([]);
      setEmployeeEmail("");
      setLeadCount(0);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let page = 1;
        const limit = 10;
        let totalPages = 1;

        const teamSet = new Set();
        const employeeSet = new Set();
        const detailMap = new Map();

        while (page <= totalPages) {
          const apiResponse = await getAllEmployee(page, limit);

          if (!apiResponse.ok) break;

          const userDetails = apiResponse.data.userDetails;
          const pagination = apiResponse.data.pagination;

          totalPages = pagination.totalPages;

          userDetails.forEach(item => {
            // Manager
            if (item.managerInfo?.email) {
              employeeSet.add(item.managerInfo.email);
              detailMap.set(
                item.managerInfo.email,
                item.managerInfo.firstName
              );
            }

            if (item.TLInfo?.email) {
              teamSet.add(item.TLInfo.email);
              detailMap.set(
                item.TLInfo.email,
                item.TLInfo.firstName
              );
            }

            item.Members?.forEach(member => {
              if (member.MemberInfo?.email) {
                employeeSet.add(member.MemberInfo.email);
                detailMap.set(
                  member.MemberInfo.email,
                  member.MemberInfo.firstName
                );
              }
            });
          });

          page++;
        }

        setTeamList([...teamSet]);
        setEmployeeList([...employeeSet]);
        setEmployeeDetailList(detailMap);

      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);

  useEffect(() => {
    setDistribution([]);
    setEmployeeEmail("");
    setLeadCount(0);
  }, [reportType]);

  return (
    <div className="tdata-container">
      <h2 className="tdata-title">Transfer Data</h2>

      <div className="tdata-radio-group">
        <label className="radio-label">
          <input
            type="radio"
            value="team"
            checked={reportType === "team"}
            onChange={e => setReportType(e.target.value)}
          />
          Team
        </label>

        <label className="radio-label">
          <input
            type="radio"
            value="own"
            checked={reportType === "own"}
            onChange={e => setReportType(e.target.value)}
          />
          Own / Sales Executive
        </label>
      </div>

      <div className="tdata-filters">
        <div>
          <select
            className="tdata-dropdown"
            value={employeeEmail}
            onChange={e => setEmployeeEmail(e.target.value)}
          >
            <option value="">
              {reportType === "team"
                ? "Team Lead Email"
                : "Manager/ Sales Executive Email"}
            </option>

            {(reportType === "team" ? teamList : employeeList).map(
              (item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            )}
          </select>

          <input
            type="number"
            className="lead-input"
            placeholder="Lead Count"
            value={leadCounts}
            onChange={e => setLeadCount(e.target.value)}
          />
        </div>

        <div className="tdata-filter-action">
          <button className="tdata-search-btn" onClick={distribution}>
            Add
          </button>
          <button className="tdata-search-btn" onClick={distributionLeadApi}>
            Transfer
          </button>
        </div>
      </div>

      <div className="tdata-table-container">
        <h2 className="tdata-title">Team Transfer Data</h2>
        <table className="tdata-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Transfer data in no</th>
            </tr>
          </thead>
          <tbody>
            {distributionList.map((item, idx) => (
              <tr key={idx}>
                <td className="bold">{item.leaderName}</td>
                <td className="bold">{item.employeeEmail}</td>
                <td className="bold">{item.leadCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teamreport;
