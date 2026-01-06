import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/salesTeamLead/TeamMember.css";

const API = "http://localhost:5000/api/salesTeamLead/team-members";

function TeamMember() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    contact: "",
    email: "",
    location: "",
    joiningDate: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  /* ================= FETCH MEMBERS (FINAL FIX) ================= */
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // 🔥 TOKEN NOT FOUND → STOP REQUEST
      if (!token) {
        console.warn("Token missing – please login again");
        setTeamMembers([]);
        return;
      }

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 SAFETY CHECK
      if (!Array.isArray(res.data)) {
        console.error("Expected array but got:", res.data);
        setTeamMembers([]);
        return;
      }

      const mapped = res.data.map((u) => ({
        id: u._id,
        name: u.firstName || "-",
        location: u.location || "-",
        email: u.email || "-",
        contact: u.contact || "-",
        joiningDate: u.joiningDate
          ? new Date(u.joiningDate).toLocaleDateString()
          : "-",
        status: u.status || "Active",
      }));

      setTeamMembers(mapped);
    } catch (err) {
      console.error(
        "Error fetching team members:",
        err.response?.data || err.message
      );
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddMember = async () => {
    if (!formData.firstName || !formData.email) {
      alert("Name and Email required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFormData({
        firstName: "",
        contact: "",
        email: "",
        location: "",
        joiningDate: "",
      });

      fetchMembers();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add member");
    }
  };

  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      const res = await axios.patch(
        `${API}/${id}/status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTeamMembers((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, status: res.data.status } : m
        )
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Status update failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="containerMember">
      <h1 className="main-title">Team Member</h1>

      <div className="text-area-view">
        {loading ? (
          <p>Loading team members...</p>
        ) : teamMembers.length === 0 ? (
          <p>No team members found</p>
        ) : (
          <table className="team-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Joining Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.location}</td>
                  <td>{m.email}</td>
                  <td>{m.contact}</td>
                  <td>{m.joiningDate}</td>
                  <td>
                    <button
                      className={`status-pill ${m.status.toLowerCase()}`}
                      onClick={() => toggleStatus(m.id)}
                    >
                      {m.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="text-area-add">
        <div className="compact-form">
          <div className="input-row">
            <label>Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <label>Contact</label>
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="button-row">
            <button className="add-submit-btn" onClick={handleAddMember}>
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
