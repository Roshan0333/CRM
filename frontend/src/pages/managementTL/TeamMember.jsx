import React from "react";
import "../../style/SalesTeamLead/TeamMember.css";

function TeamMember() {
  const teamMemberData = [
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
      Status: "Active",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
      Status: "inactive",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
      Status: "Active",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
      Status: "Active",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
      Status: "inactive",
    },
    {
      Name: "Bold text column",
      Location: "Bold text column",
      Email_id: "Bold text column",
      Contact_no: "Bold text column",
      Joining: "Bold text column",
      Status: "inactive",
    },
  ];

  return (
    <>
      <div className="containerMember">
        <h1>Team Member</h1>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Email_id</th>
                <th>Contact no.</th>
                <th>Joining date</th>
                <th>Status</th>
              </tr>
            </thead>
            {teamMemberData.map((member, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <b>{member.Name}</b>
                  </td>
                  <td>
                    <b>{member.Location}</b>
                  </td>
                  <td>
                    <b>{member.Email_id}</b>
                  </td>
                  <td>
                    <b>{member.Contact_no}</b>
                  </td>
                  <td>
                    <b>{member.Joining}</b>
                  </td>
                  <td
                    className={
                      member.Status.toLowerCase() === "active"
                        ? "badge badge-success"
                        : "badge badge-danger"
                    }
                  >
                    {member.Status}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      <div className="formContainer">
        <div className="card">
          <form className="team-form">
            <div className="team-form-row">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="team-form-row">
              <label htmlFor="contact">Contact no.</label>
              <input type="text" id="contact" name="contact" />
            </div>
            <div className="team-form-row">
              <label htmlFor="email">Email_id</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="team-form-row">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" name="location" />
            </div>
            <div className="team-form-row">
              <label htmlFor="joining">Joining date</label>
              <input type="text" id="joining" name="joining" />
            </div>
            <div className="team-form-row">
              <button type="submit" className="add-btn">
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default TeamMember;
