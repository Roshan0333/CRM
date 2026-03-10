import React, { useState, useEffect } from "react";
import "../../style/salesManager/SalesManagerTeamMember.css";
import axios from "axios";
import { getAllEmployee } from "../../services/salesDepartmentApi";

function TeamMember() {
  const [viewModal, setViewModal] = useState(false);

  const [currentFormType, setCurrentFormType] = useState("addNewEmployee");

  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeRole, setEmployeeRole] = useState("sales team lead");
  const [currentRole, setCurrentRole] = useState();
  const [teamLeaderEmail, setTeamLeaderEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [location, setLocation] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [upiId, setUpiId] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  let [teamMembers, setTeamMembers] = useState([]);

  const [selectEmployeeIndex, setSelectEmployeeIndex] = useState();

  const addEmployeeApi = async (e) => {
    try {
      if (currentFormType === "addNewEmployee") {
        addNewEmployee(e);
        return
      }
      else if (currentFormType === "member") {
        addExistsEmployee(e);
        return
      }
      else {
        premotionedEmployee(e);
        return
      }
    }
    catch (err) {
      return console.error(`Error: ${err.message}`);
    }
  }

  const addNewEmployee = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: employeeName,
        bankName,
        ifsc,
        bankAccount: accountNo,
        email: employeeEmail,
        password,
        department: "sales department",
        role: employeeRole,
        contact,
        location,
        upiId,
        joiningDate,
        teamLeadEmail: teamLeaderEmail,
      };

      const apiResponse = await axios.post(
        employeeRole === "sales team lead"
          ? "http://localhost:5000/api/salesTeam/addTL"
          : "http://localhost:5000/api/salesTeam/addEmployee",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(apiResponse.data.msg || "Successful");

      setEmployeeName("");
      setEmployeeEmail("");
      setEmployeeRole("sales team lead");
      setTeamLeaderEmail("");
      setPassword("");
      setContact("");
      setBankName("");
      setAccountNo("");
      setLocation("");
      setIfsc("");
      setJoiningDate("");
      setUpiId("");

      fetchTeamMembers();

    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert("Failed");
          console.error(err.response.data.error);
        } else {
          alert(err.response.data.msg || "Failed");
        }
      } else {
        console.error(err.message);
      }
    }
  };

  const addExistsEmployee = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        name: employeeName,
        email: employeeEmail,
        department: "sales department",
        contact,
        location,
        joiningDate,
        teamLeaderEmail: teamLeaderEmail,
      };

      const apiResponse = await axios.put(
        employeeRole === "sales team lead"
          ? "http://localhost:5000/api/salesTeam/addExisitsTL"
          : "http://localhost:5000/api/salesTeam/addSE",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert(apiResponse.data.msg || "Successful");

      setEmployeeName("");
      setEmployeeEmail("");
      setEmployeeRole("sales team lead");
      setTeamLeaderEmail("");
      setPassword("");
      setContact("");
      setBankName("");
      setAccountNo("");
      setLocation("");
      setIfsc("");
      setJoiningDate("");
      setUpiId("");

      fetchTeamMembers()
      return
    }
    catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert("Failed");
          console.error(err.response)
          console.error(`Error: ${err.response.data.error}`);
          return
        }
        else {
          alert(err.response.data.msg || "Failed");
          console.error(`Error: ${err.response.data.msg}`);
          return
        }
      }
      else {
        console.error(`Error: ${err.message}`);
      }
    }
  }

  const premotionedEmployee = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        currentPosition: currentRole,
        premotedPostion: employeeRole,
        employeeEmail: employeeEmail
      }

      const apiResponse = await axios.put(
        "http://localhost:5000/api/salesTeam/premotion",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      alert(apiResponse.data.msg || "Successful");
      setEmployeeList(apiResponse.data.teamDetail);

      setEmployeeEmail("");
      setCurrentRole("");
      setEmployeeRole("");

      fetchTeamMembers();
      return
    }
    catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert("Failed");
          console.error(`Error: ${err.response.data.error}`);
          return
        } else {
          alert(err.response.data.msg || "Failed");
          console.error(`Error: ${err.response.data.msg}`);
          return
        }
      }
      else {
        alert("Failed");
        console.error(`Error: ${err.message}`);
        return
      }
    }
  }

  const fetchTeamMembers = async () => {
    try {
      let page = 1;
      const limit = 10;
      let totalPages = 1;

      const rows = [];

      while (page <= totalPages) {
        const apiResponse = await getAllEmployee(page, limit);
        if (!apiResponse.ok) break;

        const { userDetails, pagination } = apiResponse.data;
        totalPages = pagination.totalPages;

        console.log(userDetails)

        userDetails.forEach(item => {

          if (item.TLInfo) {
            rows.push({
              id: item.TLInfo._id,
              Name: `${item.TLInfo.firstName} ${item.TLInfo.lastName || ""}`,
              Location: item.TLLocation || "-",
              Email_id: item.TLInfo.email,
              Status: item.TLStatus,
              Contact_no: item.TLContact_No || "-",
              Joining: item.TLJoiningDate || "-",
              BankName: item.TLInfo.bankName,
              BankAccount: item.TLInfo.bankAccount,
              IFSC: item.TLInfo.ifsc,
              UpiId: item.TLInfo.upiId,
              role: "sales team lead"
            });
          }

          item.Members?.forEach(member => {
            if (member.MemberInfo) {
              rows.push({
                id: member.MemberInfo._id,
                Name: `${member.MemberInfo.firstName} ${member.MemberInfo.lastName || ""}`,
                Location: member.Location || "-",
                Email_id: member.MemberInfo.email,
                Status: member.Status,
                Contact_no: member.MemberInfo.contact || "-",
                Joining: member.TeamJoiningDate || "-",
                BankName: member.MemberInfo.bankName,
                BankAccount: member.MemberInfo.bankAccount,
                IFSC: member.MemberInfo.ifsc,
                UpiId: member.MemberInfo.upiId,
                role: "sales executive"
              });
            }
          });
        });

        page++;
      }

      setTeamMembers(rows);

    } catch (err) {
      console.error("Failed to load team members:", err.message);
    }
  };

  const employeeBankDetail = (index) => {
    try {
      const employeeDetail = teamMembers[index];

      setBankName(employeeDetail.BankName);
      setAccountNo(employeeDetail.BankAccount);
      setIfsc(employeeDetail.IFSC);
      setUpiId(employeeDetail.UpiId)
      setEmployeeStatus(employeeDetail.Status);

    }
    catch (err) {
      console.error(`Error: ${err.message}`);
      return
    }
  }

  const updateEmployeeStatus = async () => {
    try {

      let status = null;

      if (employeeStatus === "Active") {
        status = "InActive";
        setEmployeeStatus("InActive")
      } else {
        status = "Active";
        setEmployeeStatus("Active")
      }


      const role = teamMembers[selectEmployeeIndex].role
      const employeeId = teamMembers[selectEmployeeIndex].id

      let statusApiResponse = await axios.patch(
        "http://localhost:5000/api/salesTeam/status",
        { employeeId, status, role },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )


      alert(statusApiResponse.data.msg);

      teamMembers[selectEmployeeIndex].Status = status;

      setEmployeeStatus(status);
    }
    catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert("Failed Update Employee Status");
          console.error(`Error: ${err.response.data.error}`)
          return
        }
        else {
          alert(err.response.data.msg || "Failed Update Employee Status");
          return
        }
      }
      else {
        console.error(`Error: ${err.message}`);
        return
      }
    }
  }

  const deleteEmployee = async () => {
    try {
      const role = teamMembers[selectEmployeeIndex].role;
      const employeeId = teamMembers[selectEmployeeIndex].id;

      const apiResponse = await axios.delete(
        "http://localhost:5000/api/salesTeam/delete",
        {
          data: { employeeId, role },
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      alert(apiResponse.data.msg || "Employee Delete Successfully.");

      setEmployeeList(apiResponse.data.teamDetail)

      setTeamMembers(prev =>
        prev.filter((_, index) => index !== selectEmployeeIndex)
      );

      setBankName("");
      setAccountNo("");
      setIfsc("");
      setUpiId("");

      setViewModal(false);
      return
    }
    catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert("Failed")
          console.error(`Error: ${err.response.data.error}`);
          return
        }
        else {
          alert(err.response.data.msg || "Failed")
          return
        }
      }
      else {
        console.log(`Error: ${err.message}`);
        return
      }
    }
  }

  const updateUserDetail = async () => {
    try {

      console.log(teamMembers[selectEmployeeIndex].id)
      const newBanDetail = {
        employeeId: teamMembers[selectEmployeeIndex].id,
        bankName: bankName,
        ifsc: ifsc,
        bankAccount: accountNo,
        upiId: upiId
      }

      let apiResponse = await axios.put(
        "http://localhost:5000/api/salesTeam/bankDetail",
        newBanDetail,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert(apiResponse.data.msg || "Successfully");

      setBankName("");
      setAccountNo("");
      setIfsc("");
      setUpiId("");
      setViewModal(false)
      setSelectEmployeeIndex(0)

      teamMembers[selectEmployeeIndex].BankName = bankName;
      teamMembers[selectEmployeeIndex].BankAccount = accountNo;
      teamMembers[selectEmployeeIndex].IFSC = ifsc;
      teamMembers[selectEmployeeIndex].UpiId = upiId;

    }
    catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert("Failed");
          console.error(err.response.data.error);
          return
        }
        else {
          alert(err.response.data.msg || "Failed");
          return
        }
      } else {
        console.error(err.message);
      }
    }
  }

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
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
                <th>Joining Date</th>
                <th>More</th>
              </tr>
            </thead>

            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.Name}</td>
                  <td>{member.Location}</td>
                  <td>{member.Email_id}</td>
                  <td>{member.Contact_no}</td>
                  <td>{new Date(member.Joining).toLocaleDateString("en-GB")}</td>
                  <td>
                    <button onClick={() => {
                      setSelectEmployeeIndex(index)
                      setViewModal(true);
                      employeeBankDetail(index);
                    }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>

      <h1 className="TeamMemberContainerHeading" style={{ marginTop: "20px" }}>Employee Without Team Leader</h1>
      <section className="team-card">
        <section className="tableContainer">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Email ID</th>
                <th>Contact No.</th>
              </tr>
            </thead>

            <tbody>
              {employeeList.map((member, index) => (
                <tr key={index}>
                  <td>{member.Name}</td>
                  <td>{member.Location}</td>
                  <td>{member.Email_Id}</td>
                  <td>{member.Contact_No}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>

      <section className="team-card form-card">
        <section className="teamMemberForm">
          <form className="user-data-form" onSubmit={addEmployeeApi}>
            <div>
              <label>
                <input type="radio"
                  name="formType"
                  checked={currentFormType === "addNewEmployee"}
                  onChange={() => setCurrentFormType("addNewEmployee")} />
                Add New Employee
              </label>

              <label>
                <input type="radio"
                  name="formType"
                  checked={currentFormType === "member"}
                  onChange={() => setCurrentFormType("member")} />
                Add Member
              </label>

              <label>
                <input type="radio"
                  name="formType"
                  checked={currentFormType === "premotion"}
                  onChange={() => setCurrentFormType("premotion")} />
                Premotion
              </label>
            </div>
            <div className="form-grid">
              {currentFormType !== "premotion" && <input placeholder="Name" value={employeeName} onChange={e => setEmployeeName(e.target.value)} />}

              {currentFormType === "premotion" && <select value={currentRole} onChange={e => setCurrentRole(e.target.value)}>
                <option value="sales executive">Sales Executive</option>
                <option value="sales team lead">Team Leader</option>
              </select>}

              <select value={employeeRole} onChange={e => setEmployeeRole(e.target.value)}>
                <option value="sales executive">Sales Executive</option>
                <option value="sales team lead">Team Leader</option>
                {currentFormType === "premotion" && <option value="sales manager">Sale Manager</option>}
              </select>

              {(employeeRole === "sales executive" && currentFormType !== "premotion") && (
                <input
                  placeholder="Team Leader Email"
                  value={teamLeaderEmail}
                  onChange={e => setTeamLeaderEmail(e.target.value)}
                />
              )}

              <input placeholder="Email" value={employeeEmail} onChange={e => setEmployeeEmail(e.target.value)} />
              {currentFormType === "addNewEmployee" && <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />}
              {(currentFormType) !== "premotion" && <input placeholder="Contact" maxLength={10} value={contact} onChange={e => setContact(e.target.value)} />}
              {currentFormType === "addNewEmployee" && <input placeholder="Bank Name" value={bankName} onChange={e => setBankName(e.target.value)} />}
              {currentFormType === "addNewEmployee" && <input placeholder="Account No" value={accountNo} onChange={e => setAccountNo(e.target.value)} />}
              {currentFormType !== "premotion" && <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />}
              {currentFormType === "addNewEmployee" && <input placeholder="IFSC" value={ifsc} onChange={e => setIfsc(e.target.value)} />}
              {currentFormType !== "premotion" && <input type="date" value={joiningDate} onChange={e => setJoiningDate(e.target.value)} />}
              {currentFormType === "addNewEmployee" && <input placeholder="UPI Id" value={upiId} onChange={e => setUpiId(e.target.value)} />}
            </div>

            <div className="form-actions">
              <button type="submit" className="add-button">ADD</button>
            </div>
          </form>
        </section>
      </section>

      {viewModal && (
        <div id="popupoverlay" onClick={() => setViewModal(false)}>
          <div
            id="popupbox"
            onClick={(e) => e.stopPropagation()}
          >

            <div id="popupheader">
              <h3 id="popuptitle">User Name</h3>
            </div>


            <div id="popupbody">
              <div className="modal-content-wrapper">


                <div className="bank-details-section">
                  <h3 className="section-title">Bank Details</h3>

                  <div className="form-field">
                    <label htmlFor="bank-name">Bank Name</label>
                    <input type="text" id="bank-name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                  </div>

                  <div className="form-field">
                    <label htmlFor="ifsc-code">IFSC code</label>
                    <input type="text" id="ifsc-code" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
                  </div>

                  <div className="form-field">
                    <label htmlFor="account-no">Account no.</label>
                    <input type="text" id="account-no" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} />
                  </div>

                  <div className="form-field">
                    <label htmlFor="upi-id">UPI Id</label>
                    <input type="text" id="upi-id" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                  </div>
                </div>


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
                    <button className={employeeStatus === "Active" ? "status-active-btn" : "status-deactive-btn"} onClick={updateEmployeeStatus
                    }>{employeeStatus}</button>
                  </div>

                  <div className="modal-actions">
                    <button className="update-btn" onClick={updateUserDetail}>Update Profile</button>

                    <button
                      className="close-btn"
                      onClick={() => setViewModal(false)}
                    >
                      Close
                    </button>

                    <button className="delete-btn" onClick={deleteEmployee}>Delete Profile</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default TeamMember;
