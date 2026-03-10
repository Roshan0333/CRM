import React from "react";
import "../../style/finance/report.css";
import "../../style/finance/dashboard.css";
import cogs from "../../assets/finance/reports/cogs.png"
import expenses from "../../assets/finance/reports/expenses.png"
import grossProfit from "../../assets/finance/reports/grossProfit.png"
import revenue from "../../assets/finance/reports/revenue.png"

const Reports = () => {
  return (
    <div id="reports-container">
      <h1>Reports</h1>
      {/* FILTERS */}
      <div id="filters-wrapper">
        <div id="filter-year">
          <label id="label-year">Year</label>
          <select id="select-year">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        <div id="filter-month">
          <label id="label-month">Month</label>
          <select id="select-month">
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
        </div>
      </div>

      {/* STAT CARDS */}
      <div id="report-cards">
        {/* KEEPING YOUR ORIGINAL 15 CARDS */}
        {/* -------------------------------- */}
        <div id="report-card" style={{ borderLeft: "5px solid #35CC7B" }}>
          <div id="text">
            <h6 style={{ color: "#35CC7B" }}>REVENUE</h6>
            <h3>2.37M</h3>
          </div>
          <img id="cards-img" src={revenue} alt="" />
        </div>

        <div id="report-card" style={{ borderLeft: "5px solid #FF893F" }}>
          <div id="text">
            <h6 style={{ color: "#FF893F" }}>COGS</h6>
            <h3>2.37M</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={cogs} alt="" />
          </div>
        </div>

        <div id="report-card" style={{ borderLeft: "5px solid #B256FF" }}>
          <div id="text">
            <h6 style={{ color: "#B256FF" }}>GROSS PROFIT</h6>
            <h3>2.37M</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={grossProfit} alt="" />
          </div>
        </div>

        <div id="report-card" style={{ borderLeft: "5px solid #FB57A1" }}>
          <div id="text">
            <h6 style={{ color: "#FB57A1" }}>EXPENSES</h6>
            <h3>2.37M</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={expenses} alt="" />
          </div>
        </div>
      </div>

      <div id="top-box">
        {/* TOP TEAM */}
        <div id="top-team-box">
          <h2 id="top-team-title">Top Team</h2>
          <table id="top-team-table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Departments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Bold text column</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bold text column</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Bold text column</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bold text column</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Bold text column</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TOP SERVICES */}
        <div id="top-services-box">
          <h2 id="top-services-title">Top Services</h2>
          <table id="top-services-table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Services</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Bold text column</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bold text column</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Bold text column</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bold text column</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Bold text column</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* TOP SALES EXECUTIVE */}
        <div id="top-sales-box">
          <h2 id="top-sales-title">Top Sales Executive</h2>
          <table id="top-sales-table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Bold</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bold</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Bold</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bold</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Bold</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* MONTHLY REPORT TABLE */}
      <div id="monthly-box">
        <h2 id="monthly-title">Monthly Report</h2>
        <table id="monthly-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Net Profit</th>
              <th>Gross Profit</th>
              <th>Expenses</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <tr key={i}>
                <td>Bold text column</td>
                <td>Bold text column</td>
                <td>Bold text column</td>
                <td>Bold text column</td>
                <td>Bold text column</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
