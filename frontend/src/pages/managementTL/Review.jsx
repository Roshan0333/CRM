import React from "react";

import "../../style/salesTeamLead/untouchedData.css";
import Button from "react-bootstrap/esm/Button";

const Review = () => {
  const untouchedData = [
    {
      id: 1,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
    },
    {
      id: 2,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
    },
    {
      id: 3,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
    },
    {
      id: 4,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
    },
    {
      id: 5,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
    },
    {
      id: 6,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
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
        backgroundColor:"#ffffff"
      }}
    >
      <div className="row g-0">
        {/* Header */}
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3 pt-4 px-3">
            <h1
              style={{ fontSize: "35px" }}
              className="h3 text-dark fw-semibold m-0"
            >
              Review
            </h1>
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
                <option>Month</option>
              </select>
            </div>
            <div style={{ minWidth: "250px", flex: "1" }}>
              <select className="form-select">
                <option>Day</option>
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
                    <th className="small fw-bold p-3">Company Name</th>
                    <th className="small fw-bold p-3">Invoice no.</th>
                    <th className="small fw-bold p-3">Services</th>
                    <th className="small fw-bold p-3">Comment</th>
                    <th className="small fw-bold p-3">Date</th>
                    <th className="small fw-bold p-3">Project File</th>
                  </tr>
                </thead>
                <tbody>
                  {untouchedData.map((data) => (
                    <tr key={data.id} className="border-top">
                      <td className="small p-3">{data.company}</td>
                      <td className="small p-3">{data.client}</td>
                      <td className="small p-3">{data.email}</td>
                      <td className="small p-3">{data.contact}</td>
                      <td className="small p-3">{data.lastCall}</td>
                      <td className="small p-3">
                        <Button
                          variant="primary"
                          size="sm"
                          style={{
                            width: "100%",
                            height: "28px",
                            background: "#4972e8",
                            border: "none",
                            borderRadius: "6px",
                            color: "white",
                            fontSize: "15px",
                            fontWeight: 500,
                            cursor: "pointer",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          View
                        </Button>
                      </td>

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

export default Review;
