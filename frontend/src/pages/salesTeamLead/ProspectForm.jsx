import React, { useState } from "react";
import axios from "axios";
import "../../style/SalesTeamLead/ProspectForm.css";

const API = "http://localhost:5000/api/salesTeamLead";

function ProspectForm() {
  const [formData, setFormData] = useState({
    company: "",
    client: "",
    email: "",
    contact: "",
    reminder: "",
    comment: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT (API) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // 🔹 Backend ke schema ke hisaab se payload
      const payload = {
        memberName: "Nova", // later login se aayega
        companyName: formData.company,
        clientName: formData.client,
        email: formData.email,
        contact: formData.contact,
        reminderDate: formData.reminder,
        comment: formData.comment
      };

      await axios.post(`${API}/prospects`, payload);

      setSuccess("Prospect added successfully!");

      setFormData({
        company: "",
        client: "",
        email: "",
        contact: "",
        reminder: "",
        comment: ""
      });
    } catch (err) {
      console.error(err);
      setError("Failed to submit prospect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div id="prospect-container">
        <div id="card">
          <h1>Prospect</h1>

          <form id="prospect-form" onSubmit={handleSubmit}>
            <div id="form-row">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div id="form-row">
              <label>Client Name</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                required
              />
            </div>

            <div id="form-row">
              <label>Email_id</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div id="form-row">
              <label>Contact no.</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div id="form-row">
              <label>Reminder Date</label>
              <input
                type="date"
                name="reminder"
                value={formData.reminder}
                onChange={handleChange}
                required
              />
            </div>

            <div id="form-row">
              <label>Comment</label>
              <textarea
                name="comment"
                rows="4"
                value={formData.comment}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* ===== STATUS ===== */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <div id="form-row" style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit" id="update-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}

export default ProspectForm;
