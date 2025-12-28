import React, { useState } from "react";
import "../../style/salesManager/SalesManagerTeamMember.css";

function TeamMember() {
  const [viewModal, setViewModal] = useState(false);

  const teamMemberData = [
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
    },
  ];

  return (
    <>
      <div className="SalesManagerTeamMemberContainer">
        <h1 className="TeamMemberContainerHeading">Team Member</h1>
    {/* LEFT: TABLE CARD */}
    <section className="team-card">
        <section className="tableContainer">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Email ID</th>
                <th>Contact No.</th>
                <th>Joining Date</th>
                <th>More</th>
              </tr>
            </thead>

            {teamMemberData.map((member, index) => (
              <tbody key={index}>
                <tr>
                  <td>{member.Name}</td>
                  <td>{member.Location}</td>
                  <td>{member.Email_id}</td>
                  <td>{member.Contact_no}</td>
                  <td>{member.Joining}</td>
                  <td>
                    <button onClick={() => setViewModal(true)}>View</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </section>
        </section>

         {/* RIGHT: FORM CARD */}
    <section className="team-card form-card">
      

        <section className="teamMemberForm">
          <form className="user-data-form">
            <div className="form-grid">
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder="Name" />
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

            <div className="form-actions">
              <button type="submit" className="add-button">
                ADD
              </button>
            </div>
          </form>
        </section>
          
    </section>
    
    

        {/* ------------------ VIEW MODAL ------------------ */}
        {viewModal && (
          <div id="popupoverlay" onClick={() => setViewModal(false)}>
            <div id="popupbox" onClick={(e) => e.stopPropagation()}>
              <div id="popupheader">
                <h3 id="popuptitle">User Name</h3>
              </div>

              <div id="popupbody">
                <div className="modal-content-wrapper">
                  {/* Left Side - Bank Details */}
                  <div className="bank-details-section">
                    <h3 className="section-title">Bank Details</h3>

                    <div className="form-field">
                      <label htmlFor="bank-name">Bank Name</label>
                      <input type="text" id="bank-name" />
                    </div>

                    <div className="form-field">
                      <label htmlFor="ifsc-code">IFSC code</label>
                      <input type="text" id="ifsc-code" />
                    </div>

                    <div className="form-field">
                      <label htmlFor="account-no">Account no.</label>
                      <input type="text" id="account-no" />
                    </div>

                    <div className="form-field">
                      <label htmlFor="upi-id">UPI Id</label>
                      <input type="text" id="upi-id" />
                    </div>
                  </div>

                  {/* Right Side - Payout & Status */}
                  <div className="user-details-section">
                    <div className="detail-item">
                      <span className="detail-label">Current Month Payout</span>
                      <span className="detail-value">:2000/-</span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Total Payout</span>
                      <span className="detail-value detail-value2">:2000/-</span>
                    </div>

                    <div className="status-item">
                      <span className="status-label">Status</span>
                      <button className="status-active-btn">Active</button>
                    </div>

                    <div className="modal-actions">
                      <button className="update-btn">Update Profile</button>
                      <button
                        className="close-btn"
                        onClick={() => setViewModal(false)}
                      >
                        Close
                      </button>
                      <button className="delete-btn">Delete Profile</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TeamMember;
