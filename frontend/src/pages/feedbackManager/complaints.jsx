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
  const [activeTab, setActiveTab] = useState("solved");
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const openView = (item) => {
    setSelectedComplaint(item || null);
    setShowViewPopup(true);
  };

  const openUpdate = (item) => {
    setSelectedComplaint(item);
    setUpdateForm({
      status: item.status,
      priority: item.priority || "Low",
      updateText: ""
    });
    setShowUpdatePopup(true);
  };

  const fetchComplaints = async () => {
    setLoading(true);
    try {

      const statusQuery = activeTab === "solved" ? "Solved" : "Unsolved";

      const response = await axios.get(`http://localhost:5000/api/complaints?status=${statusQuery}`);

      setComplaints(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setComplaints([])
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [activeTab]);

  const [updateForm, setUpdateForm] = useState({
    status: "Unsolved",
    priority: "Low",
    updateText: ""
  });

  const handleUpdateSubmit = async () => {
    if (!selectedComplaint) return;

    try {
      const response = await axios.patch(`http://localhost:5000/api/complaints/${selectedComplaint._id}`, updateForm);

      if (response.status === 200) {
        setShowUpdatePopup(false);
        setUpdateForm({ status: "Unsolved", priority: "Low", updateText: "" }); // Reset
        fetchComplaints(); // Refresh the list
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update complaint");
    }
  };

  // const solvedData = [
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Solved" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Unsolved" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Solved" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Solved" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Unsolved" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Unsolved" },
  // ];

  // const unsolvedData = [
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Unsolved", action: "Follow Up" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Unsolved", action: "Send Reminder" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Solved", action: "Send Reminder" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Unsolved", action: "Send Reminder" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Unsolved", action: "Send Reminder" },
  //   { companyName: "Bold text column", subject: "Bold text column", email_id: "Bold text column", issuedDate: "Bold text column", Discussion: "Bold text column", status: "Solved", action: "Send Reminder" },
  // ];

  const renderTable = (isUnsolved = false) => (
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
        {loading ? (
          <tr><td colSpan={isUnsolved ? 7 : 6}>Loading...</td></tr>
        ) : (Array.isArray(complaints) && complaints.length === 0) ? (
          <tr><td colSpan={isUnsolved ? 7 : 6}>No complaints found.</td></tr>
        ) : (
          complaints.map((item) => (
            <tr key={item._id}>
              <td>{item.companyName}</td>
              <td>{item.subject}</td>
              <td>{item.email_id}</td>
              <td>{item.issuedDate}</td>
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
          background: #f7f8fa;
          min-height: 100vh;
          padding: 40px 30px;
          margin-left: 250px;
          width: calc(100% - 250px);
          transition: margin-left 0.3s ease;
        }

        @media (max-width: 1020px) {
          .complaints-wrapper {
            margin-left: 0;
            width: 100%;
            padding: 20px 15px;
          }
        }

        /* --- TAB DESIGN (from Figma style) --- */
        .tabs-container {
          display: flex;
          gap: 0;
          border-bottom: 1px solid #ddd;
          background: #f7f8fa;
          width: 100%;
          padding: 0 40px;
        }

        .tab-button {
          background: transparent;
          border: 1px solid transparent;
          border-bottom: none;
          padding: 8px 36px;
          font-size: 28px;
          font-weight: 600;
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
          border-radius: 4px;
          padding: 24px;
          min-height: 450px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        
        .client-activity-title {
          font-size: 52px;
          font-weight: 600;
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
          width: 1000px;
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
          font-size: 24px; 
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
        .activity-box {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          background: #f8f9fa;
          height: 260px;
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
            ? renderTable(false)
            : renderTable(true)}
        </div>

        {/* View Popup */}
        <Popup
          show={showViewPopup}
          onClose={() => setShowViewPopup(false)}
          showCloseX={false}
          title={
            <>
              {selectedComplaint?.companyName || "Company Name"}
              <button className="btn btn-close-custom" onClick={() => setShowViewPopup(false)}>Close</button>
            </>
          }
          footer={null}
        >
          <div className="client-activity-box">
            {/* Show previous updates here */}
            <div style={{ width: '100%' }}>
              <h3 className="client-activity-title" style={{ fontSize: '24px', textAlign: 'center' }}>Update History</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {selectedComplaint?.updates?.map((u, i) => (
                  <li key={i} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                    <strong>{new Date(u.date).toLocaleString()}:</strong> {u.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Popup>

        {/* Update Popup */}
        <Popup
          show={showUpdatePopup}
          onClose={() => setShowUpdatePopup(false)}
          showCloseX={false}
          title={
            <>
              {selectedComplaint?.companyName || "Update Complaint"}
              <button className="btn btn-close-custom" onClick={() => setShowUpdatePopup(false)}>Close</button>
            </>

          }
          footer={
            <div style={{ display: 'flex', justifyContent: "flex-start", gap: "10px", width: '100%' }}>
              <button className="btn btn-primary" onClick={handleUpdateSubmit}>Submit</button>
            </div>
          }
        >
          <div className="update-popup-content">
            <div className="update-left">
              <label className="form-label">Select Complaint Status</label>
              <select
                className="form-select"
                value={updateForm.status}
                onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}>
                <option value="Unsolved">Unsolved</option>
                <option value="Solved">Solved</option>
              </select>

              <label className="form-label">Select Priority</label>
              <select
                className="form-select"
                value={updateForm.priority}
                onChange={(e) => setUpdateForm({ ...updateForm, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <textarea
                className="form-control"
                rows="6"
                placeholder="Type Update"
                value={updateForm.updateText}
                onChange={(e) => setUpdateForm({ ...updateForm, updateText: e.target.value })}
              >
                </textarea>           
               </div>
            
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Complaints;