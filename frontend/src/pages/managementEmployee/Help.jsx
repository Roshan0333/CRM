import React from 'react'
import "../../style/managementEmployee/help.css"

function Help() {
const helpdata=[
     ...Array(6).fill({
      designation: "Bold text column",
      name: "Bold text column",
      contact: "Bold text column",
      email: "Bold text column",
      department: "Bold text column",
    }),
  ];


  return (
    <div className="memployee-container">
        <div className="memployee-table-container">
        <h1 className="memployee-help">Help</h1>
        <table className="memployee-table">
          <thead>
            <tr>
              <th>Designation</th>
              <th>Name</th>
              <th>Contact no.</th>
              <th>Email ID</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {helpdata.map((row, idx) => (
                <tr key={idx}>
                  <td className="bold">{row.designation}</td>
                  <td className="bold">{row.name}</td>
                  <td className="bold">{row.contact}</td>
                  <td className="bold">{row.email}</td>
                  <td className="bold">{row.department}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Help
