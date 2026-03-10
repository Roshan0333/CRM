import React from "react";

const Salary = () => {
  const data = [
    {
      Name: "Bold text column",
      TLName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      duration: "Bold text column",
      Amount: "4000/- ",
    },
    {
      Name: "Bold text column",
      TLName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      duration: "Bold text column",
      Amount: "4000/- ",
    },
    {
      Name: "Bold text column",
      TLName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      duration: "Bold text column",
      Amount: "4000/- ",
    },
    {
      Name: "Bold text column",
      TLName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      duration: "Bold text column",
      Amount: "4000/- ",
    },
    {
      Name: "Bold text column",
      TLName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      duration: "Bold text column",
      Amount: "4000/- ",
    },
    {
      Name: "Bold text column",
      TLName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      duration: "Bold text column",
      Amount: "4000/- ",
    },
  ];

  return (
    <div
      id="sales-report-container"
      style={{ backgroundColor: "#fff", fontSize: "36px" }}
    >
      {/* Heading */}
      <h3 id="sales-report-heading">Salary</h3>

      {/* Table container */}
      <div id="sales-report-wrapper">
        <div id="sales-report-table-container">
          <table id="sales-report-table" style={{ width: "100%" }}>
            <thead id="sales-report-thead">
              <tr id="sales-report-header-row">
                <th id="th-company">Name</th>
                <th id="th-client">TL Name</th>
                <th id="th-email">Email_id</th>
                <th id="th-contact">Contact no.</th>
                <th id="th-services">Duration</th>
                <th id="th-date">Amount</th>
              </tr>
            </thead>
            <tbody id="sales-report-tbody">
              {data.map((row, index) => (
                <tr id={`sales-report-row-${index}`} key={index}>
                  <td id={`td-company-${index}`}>{row.Name}</td>
                  <td id={`td-client-${index}`}>{row.TLName}</td>
                  <td id={`td-email-${index}`}>{row.email}</td>
                  <td id={`td-contact-${index}`}>{row.contact}</td>
                  <td id={`td-services-${index}`}>{row.duration}</td>
                  <td id={`td-date-${index}`}>{row.Amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salary;
