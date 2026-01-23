import React from "react";
import "../../style/feedbackManager/salary.css"; // Using your correct CSS file

function FeedbackSalary() {
  const fsalarydata = [
    ...Array(6).fill({
      name: "Bold text column",
      tlname: "Bold text column",
      emailid: "Bold text column",
      contactno: "Bold text column",
      duration: "Bold text column",
      amount: "4500/-",
    }),
  ];

  return (
    <div>
      <div className="fsalary-container">
        <div className="fsalary-head">Salary</div>

        <div className="fsalary-filter-row">
          <select className="fsalary-dropdown">
            <option value="">Month</option>
            <option value="">Jan</option>
            <option value="">Mar</option>
            <option value="">Apr</option>
            <option value="">May</option>
            <option value="">Jun</option>
            <option value="">Jul</option>
            <option value="">Aug</option>
            <option value="">Sep</option>
            <option value="">Oct</option>
            <option value="">Nov</option>
            <option value="">Dec</option>
          </select>

          <button className="fsalary-search-btn">Search</button>
        </div>



        <div className="fsalary-table-container">
          <table className="fsalary-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Manager Name</th>
                <th>Email_id</th>
                <th>Contact no.</th>
                <th>Duration</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {fsalarydata.map((row, idx) => (
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
    </div>
  );
}

export default FeedbackSalary;
