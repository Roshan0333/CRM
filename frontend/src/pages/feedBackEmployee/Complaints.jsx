import React, { useState, useEffect } from "react";
import axios from "axios";

const Popup = ({ show, onClose, title, children, footer, showCloseX = true }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h5 className="popup-title">{title}</h5>
          {showCloseX && (
            <button className="popup-close" onClick={onClose}>
              ×
            </button>
          )}
        </div>
        <div className="popup-body">{children}</div>
        {footer && <div className="popup-footer">{footer}</div>}
      </div>
    </div>
  );
};



const Complaints = () => {
  const [activeTab, setActiveTab] = useState("unsolved");
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentStatus, setCurrentStatus] = useState("");
  const [currentPriority, setCurrentPriority] = useState("Low");
  const [updateText, setUpdateText] = useState("");

  const openView = (item) => {
    setSelectedComplaint(item || null);
    setShowViewPopup(true);
  };

  const openUpdate = (item) => {
    setSelectedComplaint(item);
    setCurrentStatus(item.status);
    setCurrentPriority(item.priority || "Low");
    setUpdateText(""); 
    setShowUpdatePopup(true);
  };

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/complaints/my-tasks", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = response.data;
      setComplaints(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee complaints:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComplaints();
  }, []);


  const handleUpdateSubmit = async () => {
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await axios.put(
        `http://localhost:5000/api/complaints/update/${selectedComplaint._id}`,
        {
          status: currentStatus,
          priority: currentPriority,
          note: updateText
        },
        { headers: { "Authorization": `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setUpdateText("");
        setSelectedComplaint(response.data);
        setShowUpdatePopup(false);
        fetchMyComplaints();
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };


  const renderDiscussion = (text) => {
    if (!text) return <p className="no-data">No history available.</p>;

    return text.split("------------------").map((entry, i) => {
      if (!entry.trim()) return null;

      const dateMatch = entry.match(/\[(.*?)\]/);
      const timestamp = dateMatch ? dateMatch[1] : "Earlier";
      const content = entry.replace(/\[.*?\]/, "").replace("UPDATE:", "").trim();

      return (
        <div key={i} className="update-row">
          <div className="update-date">{timestamp}</div>
          <div className="update-text">{content}</div>
        </div>
      );
    });
  };

  const solvedData = complaints.filter(c => c.status === "Solved");
  const unsolvedData = complaints.filter(c => c.status !== "Solved");

  const renderTable = (data, isUnsolved = false) => (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Subject</th>
          <th>Email_id</th>
          <th>Issued Date</th>
          <th>Discussion</th>
          <th>Status</th>
          {isUnsolved && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={item._id || index}>
              <td>{item.companyName}</td>
              <td>{item.subject}</td>
              <td>{item.email_id}</td>
              <td>{new Date(item.issuedDate || item.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-view" onClick={() => openView(item)}>View</button>
              </td>
              <td>
                <span className={`badge ${item.status === "Solved" ? "badge-success" : "badge-danger"}`}>
                  {item.status}
                </span>
              </td>
              {isUnsolved && (
                <td>
                  <button className="btn btn-update" onClick={() => openUpdate(item)}>
                    Update
                  </button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={isUnsolved ? 7 : 6} style={{ padding: "20px" }}>
              {loading ? "Loading complaints..." : "No complaints found."}
            </td>
          </tr>
        )}
      </tbody>

    </table>
  );

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        /* Sidebar + Responsive Layout */
        .complaints-wrapper {
          background: #ffffffff;
          min-height: 100vh;
          padding: 40px 30px;
          margin-left: 250px;
          width: calc(100% - 250px);
          transition: margin-left 0.3s ease;
        }
          /* Discussion UI */
        .discussion-container {
          background: #ffffff;
          border: 1px solid #e3e6f0;
          border-radius: 8px;
          height: 350px;
          display: flex;
          flex-direction: column;
        }
        .discussion-header {
          padding: 10px;
          background: #f8f9fc;
          border-bottom: 1px solid #e3e6f0;
          text-align: center;
          font-weight: bold;
          color: #4e73df;
        }
    .discussion-body {
          flex: 1;
          overflow-y: auto;
          padding: 10px 20px;
          background: #ffffff;
        }
      .update-row {
          display: flex;
          padding: 15px 0;
          border-bottom: 1px solid #f0f0f0;
          gap: 30px;
        }
        .update-date {
          min-width: 160px;
          font-size: 14px;
          font-weight: 800;
          color: #333;
        }
        .update-text {
          flex: 1;
          font-size: 18px;
          line-height: 1.5;
          color: #161616;
          white-space: pre-wrap;
        }

        .view-header-wrapper { width: 100%; text-align: center; }
        .last-update-title { font-size: 24px; font-weight: bold; margin: 0; }
        .client-info-subrow { color: #353434; margin-top: 5px; font-weight: 500; font-size: 18px; }
        
        .view-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 20px;
        }

        .last-update-title {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          flex-grow: 1;
        }
        @media (max-width: 1020px) {
          .complaints-wrapper {
            margin-left: 0;
            width: 100%;
            padding: 20px 15px;
            
          }
            .update-popup-content { grid-template-columns: 1fr; }
        }

        /* --- TAB DESIGN (from Figma style) --- */
        .tabs-container {
          display: flex;
          gap: 0;
          border-bottom: 1px solid #ddd;
          background: #ffffffff;
          width: 100%;
          padding: 0 40px;
        }

        .tab-button {
          background: transparent;
          border: 1px solid transparent;
          border-bottom: none;
          padding: 8px 36px;
          font-size: 28px;
          font-weight: 500;
          color: #5A5C69;
          cursor: pointer;
          transition: all 0.3s ease;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .tab-button.active {
          background: #fff;
          border: 1px solid #ddd;
          border-bottom: none;
          box-shadow: 0 -2px 6px rgba(0,0,0,0.05);
          transform: translateY(1px);
        }

        .tab-content {
          background: #fff;
          padding: 30px 40px;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.04);
        }

        /* --- Table & Popup (unchanged from your version) --- */
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }
        .custom-table th,
        .custom-table td {
          padding: 12px;
          text-align: center;
          border: 1px solid #dee2e6;
          color: #6c757d;
        }
        .custom-table th { background: #f8f9fa; font-weight: 600; }

        .btn { 
          border: none; 
          cursor: pointer; 
          font-size: 13px; 
          border-radius: 4px; 
          font-weight: 500; 
        }
        .btn-view, .btn-update { 
          width: 68px;
          height: 21px;
          padding: 0;
          font-size: 13px;
          font-weight: 400;
          background-color: #3D68E7; 
          color: white; 
        }
        .btn-view:hover, .btn-update:hover { 
          background-color: #2a4bb8; 
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }
        .btn-primary {
          background-color: #3D68E7;
          color: white;
          padding: 10px 40px;
          font-size: 15px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-primary:hover {
          background-color: #2a4bb8;
        }
        .btn-close-custom {
          background-color: #3D68E7;
          color: white;
          border: none;
          padding: 6px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          position: absolute;
          right: 24px;
        }
        .btn-close-custom:hover {
          background-color: #2a4bb8;
        }
        
        .client-activity-box {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 24px;
          min-height: 450px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        
        .client-activity-title {
          font-size: 22px;
          font-weight: 500;
          color: #1f2937;
          margin: 0;
        }

        .badge { 
          width: 68px;
          height: 21px;
          padding: 0;
          font-size: 13px;
          font-weight: 400;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .badge-success { background-color: #11CE4D; color: white; }
        .badge-danger { background-color: #D41A1A; color: white; }

        .popup-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(6px);
          z-index: 1200;
        }
        .popup-box {
          width: 900px;
          max-width: calc(100% - 48px);
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.25);
        }
        .popup-header {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
        }
        .popup-title-wrapper {
          display: block;
          width: 100%;
          text-align: center;
          position: relative;
        }
        .popup-title { 
          font-size: 20px; 
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          text-align: center;
        }
        .popup-close { 
          background: transparent; 
          border: 0; 
          font-size: 28px; 
          cursor: pointer; 
          color: #666; 
          line-height: 1;
        }
        .popup-body { 
          padding: 24px; 
          max-height: 70vh; 
          overflow: auto; 
        }
        .popup-footer { 
          padding: 12px 20px; 
          border-top: 1px solid #f0f0f0; 
          text-align: right; 
          display: flex; 
          gap: 10px; 
          justify-content: flex-end; 
        }

        .form-label { 
          font-weight: 600; 
          margin-bottom: 0.5rem; 
          display: block; 
          color: #1f2937;
          font-size: 15px;
        }
        .form-select, .form-control {
          width: 100%; 
          padding: 10px 12px; 
          border: 1px solid #d1d5db; 
          border-radius: 6px;
          font-size: 14px;
          color: #6b7280;
        }
        .form-select {
          margin-bottom: 1rem;
        }
          .activity-box p,
          .client-activity-box p {
            word-wrap: break-word;
            text-align: left;
            line-height: 1.5;
            padding: 10px;
            white-space: pre-wrap;
            color: #4a5568;
}
        .activity-box {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          background: #f8f9fa;
          height: 260px;
          overflow-y: auto;
        }
        .row { display: flex; gap: 1rem; }
        .col-md-6 { flex: 1; }
        
        .update-popup-content {
          display: flex;
          gap: 1.5rem;
        }
        .update-left {
          flex: 1;
          max-width: 45%;
        }
        .update-right {
          flex: 1;
        }
        
        @media (max-width: 600px) { 
          .row { flex-direction: column; } 
          .popup-box { width: calc(100% - 24px); }
          .update-popup-content {
            flex-direction: column;
          }
          .update-left {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="complaints-wrapper">
        {/* Tabs */}
        <div className="tabs-container">
          <button className={`tab-button ${activeTab === "solved" ? "active" : ""}`} onClick={() => setActiveTab("solved")}>
            Solved Complaints
          </button>
          <button className={`tab-button ${activeTab === "unsolved" ? "active" : ""}`} onClick={() => setActiveTab("unsolved")}>
            Unsolved Complaints
          </button>
        </div>

        {/* Table Content */}
        <div className="tab-content">
          {activeTab === "solved"
            ? renderTable(solvedData)
            : renderTable(unsolvedData, true)}
        </div>

        {/* View Popup */}
        <Popup
          show={showViewPopup}
          onClose={() => setShowViewPopup(false)}
          showCloseX={false}
          title={
            <div className="view-header-wrapper" style={{ width: '100%' }}>
              <div className="view-header-row">
                <div style={{ width: '80px' }}></div> 
                <h2 className="last-update-title">{selectedComplaint?.companyName}</h2>
              </div>

              
              <div className="client-info-subrow">
                <span>Client Activity</span>
              </div>
            </div>
          }
        >
          <div className="discussion-body" style={{ maxHeight: '60vh' }}>
            {renderDiscussion(selectedComplaint?.discussion)}
          </div>
        </Popup>

        {/* Update Popup */}
        <Popup
          show={showUpdatePopup}
          onClose={() => setShowUpdatePopup(false)}
          title={` ${selectedComplaint?.companyName}`}
           showCloseX={false}
          footer={<button className="btn btn-primary" onClick={handleUpdateSubmit}>Send Update</button>}
        >
          <div className="update-popup-content">
            <div className="update-left">
              <label className="form-label">Status</label>
              <select className="form-select" value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                <option value="Unsolved">Unsolved</option>
                <option value="Solved">Solved</option>
              </select>

              <label className="form-label">Priority</label>
              <select className="form-select" value={currentPriority} onChange={(e) => setCurrentPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <label className="form-label">New Message</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Type your reply here..."
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
              ></textarea>
            </div>

            <div className="update-right">
              <div className="discussion-container">
                <div className="discussion-header">Client Activity</div>
                <div className="discussion-body">
                  {renderDiscussion(selectedComplaint?.discussion)}
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </>


  );
};

export default Complaints;