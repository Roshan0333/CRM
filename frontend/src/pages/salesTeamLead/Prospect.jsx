import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/salesTeamLead/SalesTeamLeadProspect.css";
import dot from "../../assets/salesTeamLead/dot.svg";

const API = "http://localhost:5000/api/salesTeamLead";

function Prospect() {
  const [prospects, setProspects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchClient, setSearchClient] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [callOutcome, setCallOutcome] = useState("Talk");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/prospects`);

        const mapped = res.data.map(item => ({
          id: item._id,
          company: item.companyName,
          client: item.clientName,
          email: item.email,
          contact: item.contact,
          reminder: item.reminderDate
            ? item.reminderDate.slice(0, 10)
            : "",
          history: item.callHistory || [],
        }));

        setProspects(mapped);
        setFilteredData(mapped);
        setError("");
      } catch (err) {
        setError("Failed to load prospects");
      } finally {
        setLoading(false);
      }
    };

    fetchProspects();
  }, []);

  const handleSearch = () => {
    let temp = [...prospects];

    if (searchClient.trim()) {
      temp = temp.filter(p =>
        p.client &&
        p.client.toLowerCase().includes(searchClient.toLowerCase())
      );
    }

    if (selectedDate) {
      temp = temp.filter(p => p.reminder && p.reminder.includes(selectedDate));
    }

    setFilteredData(temp);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please add a comment");
      return;
    }

    try {
      await axios.patch(
        `${API}/prospects/${selectedItem.id}/call-update`,
        { status: callOutcome, comment }
      );

      const res = await axios.get(`${API}/prospects`);
      const mapped = res.data.map(item => ({
        id: item._id,
        company: item.companyName,
        client: item.clientName,
        email: item.email,
        contact: item.contact,
        reminder: item.reminderDate
          ? item.reminderDate.slice(0, 10)
          : "",
        history: item.callHistory || [],
      }));

      setProspects(mapped);
      setFilteredData(mapped);

      setUpdateModal(false);
      setComment("");
      setCallOutcome("Talk");
    } catch (error) {
      alert("Failed to update call");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading prospects...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div className="containerMember">
      {/* HEADER + SEARCH */}
      <div className="page-header">
        <h1>Prospect</h1>

        <div className="search-box">
          <input
            placeholder="Search Client"
            value={searchClient}
            onChange={(e) => setSearchClient(e.target.value)}
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="table-card"
        style={{ position: "relative", zIndex: 1 }}   // 🔥 UI FIX
      >
        <table className="team-table">
          <thead>
            <tr>
              <th></th>
              <th>Company Name</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Reminder</th>
              <th>Activity</th>
              <th>Last Update</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length ? (
              filteredData.map(item => (
                <tr key={item.id}>
                  <td style={{ position: "relative", zIndex: 1 }}>
                    <img src={dot} alt="dot" />
                  </td>
                  <td>{item.company}</td>
                  <td>{item.client}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.reminder}</td>
                  <td>
                    <button
                      className="update-link-btn"
                      style={{
                        position: "relative",
                        zIndex: 10,
                        pointerEvents: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedItem(item);
                        setUpdateModal(true);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="view-link-btn"
                      style={{
                        position: "relative",
                        zIndex: 10,
                        pointerEvents: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedItem(item);
                        setViewModal(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* UPDATE MODAL */}
      {updateModal && (
        <div id="popup-overlay" onClick={() => setUpdateModal(false)}>
          <div id="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>Update Call Details</h2>

            <form onSubmit={handleUpdate}>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="Talk"
                    checked={callOutcome === "Talk"}
                    onChange={(e) => setCallOutcome(e.target.value)}
                  /> Talk
                </label>

                <label>
                  <input
                    type="radio"
                    value="Not Talk"
                    checked={callOutcome === "Not Talk"}
                    onChange={(e) => setCallOutcome(e.target.value)}
                  /> Not Talk
                </label>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
              />

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewModal && selectedItem && (
        <div id="popup-overlay" onClick={() => setViewModal(false)}>
          <div id="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Call History – {selectedItem.client}</h3>

            {selectedItem.history.length ? (
              selectedItem.history.map((h, i) => (
                <div key={i}>
                  <p>
                    <b>{new Date(h.updatedAt).toLocaleString()}</b> – {h.status}
                  </p>
                  <p>{h.note}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No updates found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Prospect;
