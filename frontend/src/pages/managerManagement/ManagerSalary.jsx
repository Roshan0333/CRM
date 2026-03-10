import React from "react";
import "../../style/managerManagement/managersalary.css";

function ManagerSalary() {
     const salarydata = [
    ...Array(6).fill({
      name: "Bold text column",
      tlname: "Bold text column",
      emailid: "Bold text column",
      contactno: "Bold text column",
      duration: "Bold text column",
      amount:"4500/-",
    }),
  ];


  return (
    <div className="salary-container">
      <div className="salary-head">Salary</div>
      <div className="salary-filter">
        <select className="salary-dropdown">
            <option value="">Month</option>
            <option value="">Jan</option>
            <option value="">Feb</option>
        </select>
        <select className="salary-dropdown">
            <option value="">TL Name</option>
            <option value="">TL1</option>
            <option value="">TL2</option>
        </select>
      </div>
      <div className="salary-search"><button className="salary-search-btn">Search</button></div>
      <div className="salary-table-container">
        <table className="salary-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>TL_Name</th>
              <th>Email_id</th>
              <th>Contact no.</th>
              <th>Duration</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {salarydata.map((row, idx) => (
                <tr key={idx}>
                  <td className="bold">{row.name}</td>
                  <td className="bold">{row.tlname}</td>
                  <td className="bold">{row.emailid}</td>
                  <td className="bold">{row.contactno}</td>
                  <td className="bold">{row.duration}</td>
                  <td className="bold">{row.amount}</td>
                                    
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
   

export default ManagerSalary;
