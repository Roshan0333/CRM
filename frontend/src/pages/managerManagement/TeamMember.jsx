import React, { useState } from "react";
import "../../style/managerManagement/TeamMember.css"
import { useEffect } from "react";
import { axiosInstance } from "../../api/managementApi/axiosInstance";
// import { useNavigate } from "react-router-dom";
import UpdateMember from "./UpdateMember";

function TeamMember() {
  const [viewModal, setViewModal] = useState(false);
  const [loading, setLoading] = useState(true)
  const [teamMember, setTeamMember] = useState([]);

  const [selectedMember, setSelectedMember] = useState(null);
  const [designation, setDesignation] = useState("ALL")
  // const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    contact: "",
    bankName: "",
    email: "",
    accountNo: "",
    location: "",
    ifsc: "",
    joinDate: "",
    upiId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMemberHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication required");
        return;
      }

      const res = await axiosInstance.post(
        "/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      // add new member instantly to table

      // reset form
      setFormData({
        name: "",
        position: "",
        contact: "",
        bankName: "",
        email: "",
        accountNo: "",
        location: "",
        ifsc: "",
        joinDate: "",
        upiId: "",
      });

      alert("Team member added successfully ✅");
      await fetchTeamMembers()

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to add team member"
      );
    }
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axiosInstance.get(`/getTeamMembers?designation=${designation}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)

      setTeamMember(res.data);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers()
  }, [designation])

  //   const addMemberHandler =async(e)=> {
  //     e.preventDefault()


  //     const addMember = axiosInstance.post("/create",
  //       formData,
  //       {
  //         headers:{
  //           Authorization: `Bearer ${token}`,
  //         }
  //       }
  //     )
  // setTeamMember((prev)=> [res.data.teamMember, ...prev])

  // setFormData({
  //     name: "",
  //       position: "",
  //       contact: "",
  //       bankName: "",
  //       email: "",
  //       bankName,
  //       accountNo: "",
  //       location: "",
  //       ifscCode: "",
  //       joinDate: "",
  //       upiId: "",
  // })
  // alert("Team added successfully")

  //   }



  return (
    <>
      <div className="SalesManagerTeamMemberContainer">
        <h1 className="TeamMemberContainerHeading">Team Member</h1>
        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="form-select"
          style={{ marginBottom: "8px", width: "40%" }}
        >
          <option value="ALL">All</option>
          <option value="Management TL">Management TL</option>
          <option value="Management Employee">Management Employee</option>
        </select>

        <section className="tableContainer">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Email ID</th>
                <th>Contact No.</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>More</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Loading team members...
                  </td>
                </tr>
              ) : teamMember?.length > 0 ? (
                teamMember.map((member) => (
                  <tr key={member._id}>
                    <td>{member.name || "-"}</td>
                    <td>{member.position || "-"}</td>
                    <td>{member.email || "-"}</td>
                    <td>{member.contact || "-"}</td>
                    <td>
                      {member.joinDate
                        ? new Date(member.joinDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        className={`status-badge ${member.status?.toLowerCase() === "active"
                            ? "status-active"
                            : "status-inactive"
                          }`}
                      >
                        {member.status || "Inactive"}
                      </span>
                    </td>


                    <td>
                      <button
                        className="viewbtn"
                        onClick={() => {
                          setSelectedMember(member);
                          setViewModal(true);
                        }}
                      >
                        Update
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No team members available
                  </td>
                </tr>
              )}
            </tbody>


          </table>
        </section>


        <section className="teamMemberForm">
          <form className="user-data-form">
            <div className="form-grid">
              <div className="form-group">
                <input type="text" id="name" name="name" value={formData.name} placeholder="Name" onChange={handleChange} />
              </div>
              <div className="form-group">
                <select id="position" name="position" value={formData.position} onChange={handleChange}>
                  <option value="">Position</option>
                  <option value="Management TL">Management TL</option>
                  <option value="Management Employee">Management Employee</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="contact-no"
                  name="contact"
                  value={formData.contact}
                  placeholder="Contact no."
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="bank-name"
                  name="bankName"
                  value={formData.bankName}
                  placeholder="Bank Name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email-id"
                  name="email"
                  value={formData.email}
                  placeholder="Email_id"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="account-no"
                  name="accountNo"
                  value={formData.accountNo}
                  placeholder="Account No."
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  placeholder="Location"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="ifsc-code"
                  name="ifsc"
                  value={formData.ifsc}
                  placeholder="IFSC code"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="joining-date"
                  name="joinDate"
                  value={formData.joinDate}
                  placeholder="Joining date"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="upi-id"
                  name="upiId"
                  value={formData.upiId}
                  placeholder="UPI Id"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" onClick={addMemberHandler} className="add-button">
                ADD
              </button>
            </div>
          </form>
        </section>
        <UpdateMember
          isOpen={viewModal}
          onClose={() => setViewModal(false)}
          member={selectedMember}
          refreshMembers={fetchTeamMembers}
        />
      </div>

    </>
  );
}

export default TeamMember;
