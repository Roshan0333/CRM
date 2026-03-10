import React from "react";

import "../../style/salesTeamLead/untouchedData.css";
import Button from "react-bootstrap/esm/Button";

const Report = () => {
  const untouchedData = [
    {
      id: 1,
      name: "Bold text column",
      totalProjects: "Bold text column",
      currentProjects: "Bold text column",
      completedProjects: "Bold text column",
      joiningDate: "Bold text column",
      // salesExecutive: "Bold text column",
      lastMonthProjects: "Bold text column",
    },
    {
      id: 2,
      name: "Bold text column",
      totalProjects: "Bold text column",
      currentProjects: "Bold text column",
      completedProjects: "Bold text column",
      joiningDate: "Bold text column",
      // salesExecutive: "Bold text column",
      lastMonthProjects: "Bold text column",
    },
    {
      id: 3,
      name: "Bold text column",
      totalProjects: "Bold text column",
      currentProjects: "Bold text column",
      completedProjects: "Bold text column",
      joiningDate: "Bold text column",
      // salesExecutive: "Bold text column",
      lastMonthProjects: "Bold text column",
    },
    {
      id: 4,
      name: "Bold text column",
      totalProjects: "Bold text column",
      currentProjects: "Bold text column",
      completedProjects: "Bold text column",
      joiningDate: "Bold text column",
      // salesExecutive: "Bold text column",
      lastMonthProjects: "Bold text column",
    },
    {
      id: 5,
      name: "Bold text column",
      totalProjects: "Bold text column",
      currentProjects: "Bold text column",
      completedProjects: "Bold text column",
      joiningDate: "Bold text column",
      // salesExecutive: "Bold text column",
      lastMonthProjects: "Bold text column",
    },
    {
      id: 6,
      name: "Bold text column",
      totalProjects: "Bold text column",
      currentProjects: "Bold text column",
      completedProjects: "Bold text column",
      joiningDate: "Bold text column",
      // salesExecutive: "Bold text column",
      lastMonthProjects: "Bold text column",
    },
  ];

  //   const statsCards = [
  //     {
  //       title: "TOTAL DATA",
  //       value: "10",
  //       icon: clientData,
  //       color: "#2d4fd7",
  //     },
  //     {
  //       title: "TODAY CALLS",
  //       value: "1600",
  //       icon: call,
  //       color: "#19a974",
  //     },
  //     {
  //       title: "TOTAL PROSPECT",
  //       value: "8000",
  //       icon: totalProspectus,
  //       color: "#00a8e8",
  //     },
  //     {
  //       title: "TOTAL UNTOUCHED DATA",
  //       value: "16",
  //       icon: totalUntouchedData,
  //       color: "#f2b705",
  //     },
  //   ];

  return (
    <div
      id="untouchedData-container"
      className="container-fluid min-vh-100"
      style={{
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      <div className="row g-0">
        {/* Header */}
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3 pt-4 px-3">
            <h1 className="h3 text-dark fw-semibold m-0">Report</h1>
          </div>
        </div>

        {/* Filter Section */}
        <div className="col-12 px-3">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div style={{ minWidth: "250px", flex: "1" }}>
              <select className="form-select">
                <li>
                  <option>Month</option>
                  <option>January</option>
                  <option>Fabuary</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </li>
              </select>
            </div>
            <div style={{ minWidth: "250px", flex: "1" }}>
              <select className="form-select">
                <li>
                  <option>Day</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                  <option>25</option>
                  <option>26</option>
                  <option>27</option>
                  <option>28</option>
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                </li>
              </select>
            </div>
            <div style={{ minWidth: "120px" }}>
              <button
                style={{
                  width: "100%",
                  height: "38px",
                  background: "#4972e8",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}

        {/* Data Table */}
        <div className="col-12 px-3 pb-4">
          <div
            className="card shadow-sm rounded-3 overflow-hidden mt-3"
            style={{ maxWidth: "100%" }}
          >
            <div
              className="table-responsive"
              style={{ overflowX: "auto", width: "100%" }}
            >
              <table className="table m-0 align-middle text-nowrap">
                <thead className="border-bottom">
                  <tr>
                    <th className="small fw-bold p-3">Name</th>
                    <th className="small fw-bold p-3">Total Projects</th>
                    <th className="small fw-bold p-3">Current Projects</th>
                    <th className="small fw-bold p-3">Completed Projects</th>
                    <th className="small fw-bold p-3">Joining Date</th>
                    <th className="small fw-bold p-3">Last Months Projects</th>
                  </tr>
                </thead>
                <tbody>
                  {untouchedData.map((data) => (
                    <tr key={data.id} className="border-top">
                      <td className="small p-3">{data.name}</td>
                      <td className="small p-3">{data.totalProjects}</td>
                      <td className="small p-3">{data.currentProjects}</td>
                      <td className="small p-3">{data.completedProjects}</td>
                      <td className="small p-3">{data.joiningDate}</td>
                      <td className="small p-3">{data.lastMonthProjects}</td>

                      <td
                        className={`small p-3 ${
                          data.transferDate === "Select" ? "text-primary" : ""
                        }`}
                      >
                        {data.transferDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
