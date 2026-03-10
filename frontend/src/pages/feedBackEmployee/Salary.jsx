import React from "react";
import "../../style/FeedbackEmployee/FeedbackEmployeeSalary.css";

function Salary() {
  const datai = [
    {
      Month: "Bold text column",
      TotalComplaints: "Bold text column",
      TotalFeedbacks: "Bold text column",
      Amount: "4000/-",
    },
    {
      Month: "Bold text column",
      TotalComplaints: "Bold text column",
      TotalFeedbacks: "Bold text column",
      Amount: "5000/-",
    },
    {
      Month: "Bold text column",
      TotalComplaints: "Bold text column",
      TotalFeedbacks: "Bold text column",
      Amount: "5000/-",
    },
    {
      Month: "Bold text column",
      TotalComplaints: "Bold text column",
      TotalFeedbacks: "Bold text column",
      Amount: "7000/-",
    },
    {
      Month: "Bold text column",
      TotalComplaints: "Bold text column",
      TotalFeedbacks: "Bold text column",
      Amount: "8000/-",
    },
    {
      Month: "Bold text column",
      TotalComplaints: "Bold text column",
      TotalFeedbacks: "Bold text column",
      Amount: "9000/-",
    },
  ];

  return (
    <>
      <div className="feedbackemployee-salary-container">
        <section class="salary-section">
          <h2
            style={{ fontSize: "36px", color: "#5A5C69" }}
            class="section-title"
          >
            Salary
          </h2>

          <div class="filters">
            <div class="filter-group">
              <select id="monthFilter">
                <option value="">Month</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
              </select>
              <i class="fas fa-chevron-down dropdown-arrow"></i>
            </div>
            <button class="search-btn">Search</button>
          </div>

          <div class="table-container">
            <table class="salary-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Complaints</th>
                  <th>Total Feedbacks</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {datai.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Month}</td>
                    <td>{item.TotalComplaints}</td>
                    <td>{item.TotalFeedbacks}</td>
                    <td>{item.Amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default Salary;
