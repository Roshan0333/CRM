import React, { useState } from "react";
import "../../style/Finance/Employeemanagement.css";
// assest icons
import totalTransferData from "../../assets/Finance/Employeemanagement/transferDatatoAccountant/totalTransferData.png";
import totalClients from "../../assets/Finance/Employeemanagement/transferDatatoAccountant/totalClients.png";
import currentClients from "../../assets/Finance/Employeemanagement/transferDatatoAccountant/currentClients.png";
import addemployeePayout from "../../assets/Finance/Employeemanagement/transferDatatoAccountant/addemployeePayout.png";
import employeeManagement from "../../assets/Finance/Employeemanagement/transferDatatoAccountant/employeeManagement.png";
import search from "../../assets/Finance/Employeemanagement/search.png";
import { NavLink } from "react-router-dom";

// const metrics = [
//   {
//     id: 1,
//     title: "TOTAL EMPLOYEE",
//     value: 50,
//     colorClass: "metric--green",
//     iconClass: totalemployee,
//   },
//   {
//     id: 2,
//     title: "TOTAL CLIENTS",
//     value: 237,
//     colorClass: "metric--orange",
//     iconClass: TOTALCLIENTS,
//   },
//   {
//     id: 3,
//     title: "CURRENT CLIENTS",
//     value: 237,
//     colorClass: "metric--purple",
//     iconClass: CURRENTCLIENTS,
//   },
//   {
//     id: 4,
//     title: "ADD NEW EMPLOYEE",
//     value: null,
//     colorClass: "metric--pink",
//     iconClass: ADDNEWEMPLOYEE,
//     isButton: true,
//   },
//   {
//     id: 5,
//     title: "TRANSFER DATA TO ACCOUNTANT",
//     value: null,
//     colorClass: "metric--blue",
//     iconClass: TRANSFERDATATOACCOUNTANT,
//     isButton: true,
//   },
// ];

const sampleEmployees = new Array(8).fill(0).map((_, i) => ({
  id: `EMP00${i + 1}`,
  tlName: `TL Name ${i + 1}`,
  manager: `Manager ${i + 1}`,
  joining: `2023-0${(i % 9) + 1}-0${(i % 9) + 1}`,
}));

export default function TransferDataToAccountant() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // input text
  const [appliedSearch, setAppliedSearch] = useState(""); // applied search filter

  const filteredEmployees = sampleEmployees.filter((e) =>
    e.id.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setAppliedSearch(searchInput.trim());
  };

  return (
    <div className="emploeemanagementcontainer">
      <div className="header-row">
        <h1 className="page-title">Employee Management</h1>
        <button
          className="btn btn-primary"
          id="add-new-member-button"
          onClick={() => setIsModalOpen(true)}
        >
          ADD NEW MEMBER
        </button>
      </div>
      <div id="dashboard-cards" style={{ marginBottom: "30px" }}>
        {/* KEEPING YOUR ORIGINAL 15 CARDS */}
        {/* -------------------------------- */}
        <div id="card" style={{ borderLeft: "5px solid #35CC7B" }}>
          <div id="text">
            <h6 style={{ color: "#35CC7B" }}>TOTAL TRANSFER DATA</h6>
            <h3>50</h3>
          </div>
          <img id="cards-img" src={totalTransferData} alt="" />
        </div>

        <div id="card" style={{ borderLeft: "5px solid #FF893F" }}>
          <div id="text">
            <h6 style={{ color: "#FF893F" }}>TOTAL CLIENTS</h6>
            <h3>237</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={totalClients} alt="" />
          </div>
        </div>

        <div id="card" style={{ borderLeft: "5px solid #B256FF" }}>
          <div id="text">
            <h6 style={{ color: "#B256FF" }}>CURRENT CLIENTS</h6>
            <h3>237</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={currentClients} alt="" />
          </div>
        </div>

        <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
          <div id="text">
            <h6 style={{ color: "#FB57A1" }}>ADD NEW EMPLOYEE</h6>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={addemployeePayout} alt="" />
          </div>
        </div>
        <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
          <div id="text">
            <NavLink to="/employee-management" style={{cursor:"pointer"}}>
              <h6 style={{ color: "#FB57A1" }}>BACK TO EMPLOYEE MANAGEMENT</h6>
            </NavLink>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={employeeManagement} alt="" />
          </div>
        </div>
      </div>
      {/* <section className="metrics-grid">
        {metrics.map((m) =>
          m.isButton ? (
            <button key={m.id} className={`metric-card ${m.colorClass}`}>
              <div className="metric-icon">
                <img src={m.iconClass} alt={m.title} className="metric-img" />
              </div>
              <div className="metric-body">
                <p className="metric-sub">{m.title}</p>
              </div>
            </button>
          ) : (
            <div key={m.id} className={`metric-card ${m.colorClass}`}>
              <div className="metric-icon">
                <img src={m.iconClass} alt={m.title} className="metric-img" />
              </div>
              <div className="metric-body">
                <p className="metric-sub">{m.title}</p>
                <p className="metric-value">{m.value}</p>
              </div>
            </div>
          )
        )}
      </section> */}

      <div className="two-column-grid">
        <section className="card card--scroll">
          <h2 className="card-title">Employee Details</h2>

          <div className="controls-row">
            <select className="select">
              <option>Month</option>
              <option>January</option>
              <option>February</option>
            </select>
            <select className="select">
              <option>Department</option>
              <option>Finance</option>
              <option>Sales</option>
            </select>
          </div>

          <div className="table-wrap">
            <table className="table ">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>TL Name</th>
                  <th>Manager Name</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {sampleEmployees.map((row) => (
                  <tr key={row.id}>
                    <td className="strong">{row.id}</td>
                    <td>{row.tlName}</td>
                    <td>{row.manager}</td>
                    <td>{row.joining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card card--scroll">
          <h2 className="card-title">Total Employee List</h2>

          <div className="search-wrap">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search Employee"
                className="input-search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="search-button"
                aria-label="Search employees"
                onClick={handleSearchSubmit}
              >
                <img src={search} alt="search" />
              </button>
            </form>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last Payout</th>
                  <th>Date of Payout</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((row) => (
                  <tr key={row.id}>
                    <td className="strong">{row.id}</td>
                    <td>₹ 0</td>
                    <td>{row.joining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div id="popupoverlay" onClick={() => setIsModalOpen(false)}>
          <div id="popupbox" onClick={(e) => e.stopPropagation()}>
            <section className="teamMemberForm">
              <form className="user-data-form">
                <div className="form-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <select id="position" name="position">
                      <option value="">Position</option>
                      <option value="sales-executive">Sales Executive</option>
                      <option value="team-leader">Team Leader</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="contact-no"
                      name="contact_no"
                      placeholder="Contact no."
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="bank-name"
                      name="bank_name"
                      placeholder="Bank Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email-id"
                      name="email_id"
                      placeholder="Email_id"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="account-no"
                      name="account_no"
                      placeholder="Account No."
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Location"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="ifsc-code"
                      name="ifsc_code"
                      placeholder="IFSC code"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="joining-date"
                      name="joining_date"
                      placeholder="Joining date"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="upi-id"
                      name="upi_id"
                      placeholder="UPI Id"
                    />
                  </div>
                </div>
                <div
                  className="form-actions"
                  style={{ justifyContent: "center" }}
                >
                  <button type="submit" className="add-button">
                    ADD
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
