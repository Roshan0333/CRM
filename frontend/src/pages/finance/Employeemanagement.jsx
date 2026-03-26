import React, { useState, useEffect } from "react";
import "../../style/Finance/Employeemanagement.css";
import { NavLink } from "react-router-dom";
// assest icons
import totalemployee from "../../assets/Finance/Employeemanagement/totalemployee.png";
import TOTALCLIENTS from "../../assets/Finance/Employeemanagement/TOTALCLIENTS.png";
import CURRENTCLIENTS from "../../assets/Finance/Employeemanagement/CURRENTCLIENTS.png";
import ADDNEWEMPLOYEE from "../../assets/Finance/Employeemanagement/ADDNEWEMPLOYEE.png";
import TRANSFERDATATOACCOUNTANT from "../../assets/Finance/Employeemanagement/TRANSFERDATATOACCOUNTANT.png";
import search from "../../assets/Finance/Employeemanagement/search.png";
import axios from "axios";

export default function Employeemanagement() {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [selectedDept, setSelectedDept] = useState("Finance");
  const [selectedMonth, setSelectedMonth] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    contact_no: "",
    bank_name: "",
    email_id: "",
    account_no: "",
    location: "",
    ifsc_code: "",
    joining_date: "",
    upi_id: "",
  });

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/all-users?department=${selectedDept}`);
      setEmployees(res.data);

      const resAll = await axios.get(`http://localhost:5000/api/auth/all-users`);
      setTotalEmployees(resAll.data);

    } catch (err) {
      console.error("Data fetch karne mein error:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [selectedDept]);


  const getFilteredData = (dataList) => {
    return dataList.filter((e) =>
      (e.firstName + " " + e.lastName).toLowerCase().includes(appliedSearch.toLowerCase()) ||
      e._id.toLowerCase().includes(appliedSearch.toLowerCase())
    );
  };

  const filteredDeptEmployees = employees.filter((e) => {
    if (!selectedMonth || selectedMonth === "Month") return true;

    if (e.joiningDate) {
      const date = new Date(e.joiningDate);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return month === selectedMonth;
    }

    return false;
  });

  const filteredTotalEmployees = totalEmployees.filter((e) => {

    const fullName = (e.firstName + " " + e.lastName).toLowerCase();
    const searchLower = searchInput.toLowerCase();
    const matchesSearch = fullName.includes(searchLower) || e._id.toLowerCase().includes(searchLower);

    return matchesSearch;
  });

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstName: formData.name.split(" ")[0],
        lastName: formData.name.split(" ")[1] || "",
        role: formData.position,
        email: formData.email_id,
        contact: formData.contact_no,
        joiningDate: formData.joining_date,
        department: selectedDept,
        bankName: formData.bank_name,
        accountNo: formData.account_no,
        ifscCode: formData.ifsc_code,
        location: formData.location,
        upiId: formData.upi_id
      });

      if (res.status === 201 || res.status === 200) {
        alert("Employee added successfully!");
        setIsModalOpen(false);
        fetchEmployees();
        setFormData({
          name: "", position: "", contact_no: "", bank_name: "",
          email_id: "", account_no: "", location: "",
          ifsc_code: "", joining_date: "", upi_id: ""
        });
      }
    } catch (err) {
      console.error("Error adding member:", err);
      alert(err.response?.data?.message || "Failed to add member");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <h6 style={{ color: "#35CC7B" }}>TOTAL EMPLOYEE</h6>
            <h3>{employees.length}</h3>
          </div>
          <img id="cards-img" src={totalemployee} alt="" />
        </div>

        <div id="card" style={{ borderLeft: "5px solid #FF893F" }}>
          <div id="text">
            <h6 style={{ color: "#FF893F" }}>TOTAL CLIENTS</h6>
            <h3>237</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={TOTALCLIENTS} alt="" />
          </div>
        </div>

        <div id="card" style={{ borderLeft: "5px solid #B256FF" }}>
          <div id="text">
            <h6 style={{ color: "#B256FF" }}>CURRENT CLIENTS</h6>
            <h3>237</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={CURRENTCLIENTS} alt="" />
          </div>
        </div>

        <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
          <div id="text">
            <h6 style={{ color: "#FB57A1" }}>ADD NEW EMPLOYEE</h6>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={ADDNEWEMPLOYEE} alt="" />
          </div>
        </div>
        <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
          <div id="text">
            <NavLink
              to="/transfer-data-to-accountant"
              style={{ cursor: "pointer" }}
            >
              <h6 style={{ color: "#FB57A1" }}>TRANSFER DATA TO ACCOUNTANT</h6>
            </NavLink>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={TRANSFERDATATOACCOUNTANT} alt="" />
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
            <select className="select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option>Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select className="select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
              <option value="">Department</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Management">Management</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>

          <div className="table-wrap">
            <table className="table ">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeptEmployees.map((row) => (
                  <tr key={row._id}>
                    <td className="strong">{row._id.slice(-6).toUpperCase()}</td>
                    <td>{`${row.firstName} ${row.lastName}`}</td>
                    <td>{row.role}</td>
                    <td>{row.joiningDate
                      ? new Date(row.joiningDate).toLocaleDateString('en-GB')
                      : "N/A"}</td>
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
                  <th>Date of Joining</th>
                </tr>
              </thead>
              <tbody>
                {filteredTotalEmployees.map((row) => (
                  <tr key={row._id}>
                    <td className="strong">{`${row.firstName} ${row.lastName}`}</td>
                    <td>₹ 0</td>
                    <td>
                      {row.payoutDate
                        ? new Date(row.payoutDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{row.joiningDate
                      ? new Date(row.joiningDate).toLocaleDateString('en-GB')
                      : "N/A"}</td>
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
              <form className="user-data-form" onSubmit={handleAddMember}>
                <div className="form-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <select id="position" name="position" value={formData.position} onChange={handleInputChange} required>
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
                      value={formData.contact_no}
                      onChange={handleInputChange}
                      placeholder="Contact no."
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="bank-name"
                      name="bank_name"
                      value={formData.bank_name}
                      onChange={handleInputChange}
                      placeholder="Bank Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email-id"
                      name="email_id"
                      value={formData.email_id}
                      onChange={handleInputChange}
                      placeholder="Email_id"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="account-no"
                      name="account_no"
                      value={formData.account_no}
                      onChange={handleInputChange}
                      placeholder="Account No."
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="ifsc-code"
                      name="ifsc_code"
                      value={formData.ifsc_code}
                      onChange={handleInputChange}
                      placeholder="IFSC code"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      id="joining-date"
                      name="joining_date"
                      value={formData.joining_date}
                      onChange={handleInputChange}
                      placeholder="Joining date"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="upi-id"
                      name="upi_id"
                      value={formData.upi_id}
                      onChange={handleInputChange}
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
