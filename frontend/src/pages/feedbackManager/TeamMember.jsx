import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/ManagerManagement/TeamMember.css";

const API = "http://localhost:5000/api/team-members";

function TeamMember() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});

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
    upi_id: ""
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        setTeamMembers(res.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(API, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Member Added!");
      setFormData({ name: "", position: "", contact_no: "", email_id: "", location: "", bank_name: "", account_no: "", joining_date: "", ifsc_code: "", upi_id: "" }); // Reset
      fetchMembers();
    } catch (err) {
      alert("Failed to add member");
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setViewModal(false);
      fetchMembers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleUpdateClick = (member) => {
    setSelectedMember(member);
    setEditData(member);
    setViewModal(true);
  };

  // Send the PUT request to Backend
  const handleSaveUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API}/${editData._id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Profile Updated Successfully!");
        setViewModal(false);
        fetchMembers();
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile");
    }
  };

  // const teamMembers = [
  //   {
  //     Name: "Bold text column",
  //     Location: "Bold text column",
  //     Email_id: "Bold text column",
  //     Contact_no: "Bold text column",
  //     Joining: "Bold text column",
  //     Status: "Active",
  //   },
  //   {
  //     Name: "Bold text column",
  //     Location: "Bold text column",
  //     Email_id: "Bold text column",
  //     Contact_no: "Bold text column",
  //     Joining: "Bold text column",
  //     Status: "Inactive",
  //   },
  //   {
  //     Name: "Bold text column",
  //     Location: "Bold text column",
  //     Email_id: "Bold text column",
  //     Contact_no: "Bold text column",
  //     Joining: "Bold text column",
  //     Status: "Active",
  //   },
  //   {
  //     Name: "Bold text column",
  //     Location: "Bold text column",
  //     Email_id: "Bold text column",
  //     Contact_no: "Bold text column",
  //     Joining: "Bold text column",
  //     Status: "Active",
  //   },
  //   {
  //     Name: "Bold text column",
  //     Location: "Bold text column",
  //     Email_id: "Bold text column",
  //     Contact_no: "Bold text column",
  //     Joining: "Bold text column",
  //     Status: "Inactive",
  //   },
  //   {
  //     Name: "Bold text column",
  //     Location: "Bold text column",
  //     Email_id: "Bold text column",
  //     Contact_no: "Bold text column",
  //     Joining: "Bold text column",
  //     Status: "Inactive",
  //   },
  // ];

  return (
    <>
      <div className="SalesManagerTeamMemberContainer">
        <h1 className="TeamMemberContainerHeading">Team Member</h1>
        <section className="team-card">
          <section className="tableContainer">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Email ID</th>
                  <th>Contact No.</th>
                  <th>Joinning Date</th>
                  <th>Status</th>
                  <th>More</th>
                </tr>
              </thead>
              {teamMembers.map((member) => (
                <tbody key={member._id}>
                  <tr>
                    <td>{member.name}</td>
                    <td>{member.location}</td>
                    <td>{member.email_id}</td>
                    <td>{member.contact_no}</td>
                    <td>{member.joining_date}</td>
                    <td
                      className={
                        member.status.toLowerCase() === "active"
                          ? "badge badge-success"
                          : "badge badge-danger"
                      }
                      style={{ marginTop: 15, cursor: "pointer" }}
                    >
                      {member.status}
                    </td>
                    <td>
                      <button
                        className="viewbtn"
                        onClick={() => handleUpdateClick(member)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </section>
        </section>

        <section className="team-card form-card">
          <section className="teamMemberForm">
            <form className="user-data-form" onSubmit={handleAddMember}>
              <div className="form-grid">
                <div className="form-group">
                  <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <select name="position" id="position" value={formData.position} onChange={handleChange}>
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
                    value={formData.contact_no}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="bank-name"
                    name="bank_name"
                    placeholder="Bank Name"
                    value={formData.bank_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email-id"
                    name="email_id"
                    placeholder="Email_id"
                    value={formData.email_id}
                    onChange={handleChange}

                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="account-no"
                    name="account_no"
                    placeholder="Account No."
                    value={formData.account_no}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="ifsc-code"
                    name="ifsc_code"
                    placeholder="IFSC code"
                    value={formData.ifsc_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="joining-date"
                    name="joining_date"
                    placeholder="Joining date"
                    value={formData.joining_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="upi-id"
                    name="upi_id"
                    placeholder="UPI Id"
                    value={formData.upi_id}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="add-button">
                  ADD
                </button>
              </div>

            </form>
          </section>
        </section>

        {viewModal && selectedMember && (
          <div id="popupoverlay" onClick={() => setViewModal(false)}>
            <div id="popupbox" onClick={(e) => e.stopPropagation()}>
              <div id="popupheader">
                <h3 id="popuptitle">{selectedMember.name}</h3>
              </div>
              <div id="popupbody">
                <div className="modal-content-wrapper">
                  {/* Left Side - Bank Details */}
                  <div className="bank-details-section">
                    <h3 className="section-title">Bank Details</h3>
                    <div className="form-field">
                      <label htmlFor="bank-name">Bank Name</label>
                      <input type="text" id="bank-name" name="bank_name" value={editData.bank_name || ""} onChange={handleEditChange} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="ifsc-code">IFSC code</label>
                      <input type="text" id="ifsc-code" name="ifsc_code" value={editData.ifsc_code || ""} onChange={handleEditChange} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="account-no">Account no.</label>
                      <input type="text" id="account-no" name="account_no" value={editData.account_no || ""} onChange={handleEditChange} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="upi-id">UPI Id</label>
                      <input type="text" id="upi-id" name="upi_id" value={editData.upi_id || ""} onChange={handleEditChange} />
                    </div>
                  </div>

                  {/* Right Side - Payout & Status Details */}
                  <div className="user-details-section">
                    <div className="detail-item">
                      <span className="detail-label">Current Month Payout</span>
                      <span className="detail-value">:2000/-</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Payout</span>
                      <span className="detail-value detail-value2">
                        :2000/-
                      </span>
                    </div>

                    <div className="status-item">
                      <span className="status-label">Status</span>
                      <select
                        name="status"
                        className="status-select-dropdown"
                        value={editData.status || "Active"}
                        onChange={handleEditChange}
                        style={{
                          marginLeft: '10px',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="modal-actions">
                      <button className="update-btn" onClick={handleSaveUpdate}>Update Profile</button>
                      <button
                        className="close-btn"
                        onClick={() => setViewModal(false)}
                      >
                        Close
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteMember(selectedMember._id)}>Delete Profile</button>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TeamMember;
