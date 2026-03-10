import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Clock, CheckCircle } from "lucide-react";
import axios from "axios";

const Feedbacks = () => {
  const [key, setKey] = useState("pending");
  const [openPending, setOpenPending] = useState(null);
  const [openCompleted, setOpenCompleted] = useState(null);
  const [openMsgBox, setOpenMsgBox] = useState(null);
  const [openVideoBox, setOpenVideoBox] = useState(null);
  const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedFeedbacks, setCompletedFeedbacks] = useState([]);

  const toggleDropdownPending = (index) => {
    setOpenPending(openPending === index ? null : index);
  };

  const toggleDropdownCompleted = (index) => {
    setOpenCompleted(openCompleted === index ? null : index);
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const allData = res.data;
        setPendingFeedbacks(allData.filter(f => f.status === "pending"));
        setCompletedFeedbacks(allData.filter(f => f.status === "completed"));
        setLoading(false);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}>Loading Feedbacks...</div>;

  const markAsCompleted = (index) => {
    const completedItem = pendingFeedbacks[index];

    setPendingFeedbacks(prev =>
      prev.filter((_, i) => i !== index)
    );

    setCompletedFeedbacks(prev => [
      completedItem,
      ...prev,
    ]);

    setOpenPending(null);
  };


  const renderStars = (rating) => (
    <div style={{ display: "flex", gap: "3px", justifyContent: "center" }}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color: i < rating ? "#ffc107" : "#ccc",
            fontSize: "18px",
            lineHeight: "1",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );

  const updatePendingField = (index, field, value) => {
    setPendingFeedbacks(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };


  const handleFileUpload = async (feedbackId, serviceIndex, file) => {
    if (!file) return;

    // 1. Check file size (optional but recommended for stability)
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return alert("File is too large. Please upload a file under 5MB.");
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("serviceIndex", serviceIndex); // Critical: tells backend which row to update

    try {
      // Show a temporary "Uploading..." status if you want
      console.log(`Uploading file for service index: ${serviceIndex}`);

      const response = await axios.patch(
        `http://localhost:5000/api/feedback/upload/${feedbackId}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert(`Success: ${file.name} uploaded for this service!`);
        // Optional: Refresh data to show a "File Attached" icon
      }
    } catch (err) {
      console.error("Upload Error:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Upload failed.";
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleSendMail = async (feedbackId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:5000/api/feedback/send-mail/${feedbackId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Mail sent to client successfully!");
    } catch (err) {
      alert("Failed to send mail: " + (err.response?.data?.message || err.message));
    }
  };
  const handleSaveMessage = async (feedbackId, serviceIndex, messageText, type) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/feedback/message/${feedbackId}`, {
        serviceIndex,
        message: messageText,
        type: type
      },
        {
          headers: {
            Authorization: `Bearer ${token}` // This is what your backend expects
          }
        }
      );
      alert(`${type === 'video' ? 'Video link' : 'Message'} saved!`);
    } catch (err) {
      alert("Failed to save message.");
    }
  };

  const handleAssignBadFeedback = async (feedbackItem) => {
    // 1. Client-side check: prevent clicking if we already know it's assigned
    if (feedbackItem.assignedEmployee) {
      alert(`Already assigned to: ${feedbackItem.assignedEmployee.name || feedbackItem.assignedEmployee.email}`);
      return;
    }

    const confirmAction = window.confirm(
      `Are you sure you want to file a complaint for ${feedbackItem.companyName}?`
    );

    if (!confirmAction) return;

    try {
      const token = localStorage.getItem("token");
      const payload = {
        feedbackId: feedbackItem._id,
        companyName: feedbackItem.companyName,
        email_id: feedbackItem.email_id || feedbackItem.email,
        description: feedbackItem.clientComment || "No specific comments provided.",
        subject: `Feedback Complaint - ${feedbackItem.companyName}`,
        priority: "Medium"
      };

      const response = await axios.post(
        "http://localhost:5000/api/complaints/generate-from-feedback",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { assignedTo, assignedName } = response.data;
      setCompletedFeedbacks(prev =>
        prev.map(item =>
          item._id === feedbackItem._id
            ? {
              ...item,
              assignedEmployee: {
                email: assignedTo,
                name: assignedName
              }
            }
            : item
        )
      );

      alert(`Complaint generated and assigned to: ${assignedTo}`);
    } catch (err) {
      // 3. Handle backend "Already Exists" error
      const errorMsg = err.response?.data?.message || err.message;
      alert("Notice: " + errorMsg);

      // If backend says it's already there, we should probably refresh the list
    }
  };
  return (
    <div
      className="main-content-wrapper"
      style={{
        backgroundColor: "#ffffffff",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <style>{`
        * 
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

     
     
          .feedback-page-container {
        width: 100%;
        padding: 40px 16px;
        margin-left: var(--sidebar-width);
  max-width: calc(100% - var(--sidebar-width));
          }

@media (max-width: 1020px) {
  .feedback-page-container {
    margin-left: 0;
    max-width: 100%;
  }
}



        @media (max-width: 1020px) {
            .container {
                /* Reset margin and width when sidebar is hidden */
                margin-left: 0;
                width: 100%;
                /* Reset vertical alignment margin (if needed) */
                margin-top: 0; 
            }
        }


     .tabs-container {
          display: flex;
          gap: 0;
          border-bottom: 1px solid #ddd;
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
          border: 1px solid #aba7a7ff;
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



        .feedback-item {
          margin-bottom: 15px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 100%;
        }

        .feedback-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          gap: 16px;
          flex-wrap: wrap;
          background: #fff;
          cursor: pointer;
          transition: background 0.2s;
        }

        .feedback-header:hover {
          background: #f9f9f9;
        }

        .header-left {
          font-size: 24px;
          font-weight: 700;
          color: rgba(60, 59, 59, 0.92);
        }

        .header-right {
         display: flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;
        font-size: 24px;
          font-weight: 700;
          color: rgba(60, 59, 59, 0.92);
        }

        .feedback-content {
          padding: 30px 35px 40px;
          background: #fff;
          border-top: 1px solid #eee;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 30px;
        }

        .form-group {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom:20px
        }

        .form-label {
          min-width: 110px;
          font-weight: 600;
          color: #000;
          font-size: 14px;

        }

        .form-group .form-input {
          flex: 1;
          height: 35px;
          width: 307px;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
          box-shadow : 0px 1px 4px #9188889d;

        }

        

        .service-title {
          text-align: center;
          font-size: 25px;
          font-weight: 500;
          text-decoration: underline;
          color: #000;
          margin-bottom: 25px;
        }

        .service-table {
          width: 100%;
          border-radius: 2px;
          box-shadow : 0px 2px 15px #9188889d;

        }

        .service-table th,
        .service-table td {
          border-bottom: 1px solid #ddd;
          text-align: center;
          padding: 12px 16px;
          background: #fff;
        }

        .service-table th {
          font-weight: 600;
          color: #000;
        }

        .service-name {
          font-weight: 500;
          color: #000;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn {
          border: none;
          border-radius: 4px;
          width:85px;
          height:21px;
          padding:0px
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          color: white;
          min-width: 82px;
          transition: opacity 0.2s;
        }

        

        .btn-blue { background: #4972E8; }
        .btn-green { background: #027402; }
        .btn-red { background: #E86149; }

         .btn-green:hover{
            background : #043904ff;
            color:white;
         }
         .btn-blue:hover{
            background : #253d85ff;
            color:white;
         }
         .btn-red:hover{
            background : #8f3e30ff;
            color:white;
         }

        .bottom-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 30px;
        }

        .btn-bottom {
          min-width: 90px;
          height: 28px;
          font-size: 13px;
          font-weight: 500;
        }

        @media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-input {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .tab-button {
    font-size: 18px;
    padding: 8px 16px;
  }

  .header-left
   {
    font-size: 16px;
  }
  .header-right{
  font-size: 16px;
    }

  .form-label {
    font-size: 12px;
    min-width: 90px;
  }

  .form-input {
    font-size: 12px;
    height: 32px;
  }

  .service-title {
    font-size: 18px;
  }

  .service-table th,
  .service-table td {
    font-size: 12px;
    padding: 8px;
  }

  .btn {
    font-size: 11px;
    min-width: 70px;
    height: 20px;
  }

  .btn-bottom {
    font-size: 11px;
    height: 24px;
  }
}

      `}</style>

      <div className="feedback-page-container">
        <div className="tabs-container">
          <button
            className={`tab-button ${key === "pending" ? "active" : ""}`}
            onClick={() => setKey("pending")}
          >
            Pending Feedbacks
          </button>
          <button
            className={`tab-button ${key === "completed" ? "active" : ""}`}
            onClick={() => setKey("completed")}
          >
            Completed Feedbacks
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {(key === "pending" ? pendingFeedbacks : completedFeedbacks).map((item, index) => (
            <div key={index} className="feedback-item">
              <div
                className="feedback-header"
                onClick={() =>
                  key === "pending"
                    ? toggleDropdownPending(index)
                    : toggleDropdownCompleted(index)
                }
              >
                <div className="header-left">
                  {item.companyName}
                </div>
                <div className="header-right" >

                  <span >
                    {item.invoiceNo}
                  </span>
                  {/* Status Badge for Completed Tab */}
                  {key === "completed" && (
                    item.assignedEmployee ? (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "#fff4e5",
                        color: "#b05d22",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        border: "1px solid #ffe2b3",
                        marginRight: "15px"
                      }}>
                        <Clock size={14} /> Assigned / In Progress
                      </div>
                    ) : (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "#e7f6ed",
                        color: "#20844a",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        border: "1px solid #c2e7d1",
                        marginRight: "15px"
                      }}>
                        <CheckCircle size={14} /> Good Feedback
                      </div>
                    )
                  )}
                </div>
                <div className="header-right">
                  {key === "pending" ? (
                    openPending === index ? (
                      <ChevronUp size={30} strokeWidth={2.5} />
                    ) : (
                      <ChevronDown size={30} strokeWidth={2.5} />
                    )
                  ) : openCompleted === index ? (
                    <ChevronUp size={30} strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={30} strokeWidth={2.5} />
                  )}
                </div>
              </div>

              {(key === "pending" ? openPending : openCompleted) === index && (
                <div className="feedback-content">
                  {/* //PENDING FEEDBACK */}
                  <div className="form-row">
                    <div>
                      <div className="form-group">
                        <label className="form-label">Client Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={item.clientName || ""}
                          disabled={key === "completed"}
                          onChange={(e) =>
                            updatePendingField(index, "client", e.target.value)
                          }
                        />

                      </div>
                      <div className="form-group">
                        <label className="form-label">Contact no.</label>
                        <input
                          type="text"
                          className="form-input"
                          value={item.contact || ""}
                          disabled={key === "completed"}
                          onChange={(e) =>
                            updatePendingField(index, "contact", e.target.value)
                          }
                        />

                      </div>
                    </div>

                    <div>
                      <div className="form-group">
                        <label className="form-label">Designation</label>
                        <input
                          type="text"
                          className="form-input"
                          value={item.designation || ""}
                          disabled={key === "completed"}
                          onChange={(e) =>
                            updatePendingField(index, "designation", e.target.value)
                          }
                        />

                      </div>
                      <div className="form-group">
                        <label className="form-label">Email_id</label>
                        <input
                          type="email"
                          className="form-input"
                          value={item.email || ""}
                          disabled={key === "completed"}
                          onChange={(e) =>
                            updatePendingField(index, "email", e.target.value)
                          }
                        />

                      </div>
                    </div>
                  </div>

                  <h3 className="service-title">Service List</h3>

                  <table className="service-table">
                    <thead>
                      <tr>
                        <th style={{ width: "30%" }}>Service</th>
                        <th style={{ width: "45%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.services.map((service, i) => (
                        <React.Fragment key={i}>
                          <tr >
                            <td className="service-name">{service.name}</td>

                            <td>
                              {key === "pending" ? (
                                <div className="action-buttons">
                                  <button
                                    className="btn "
                                    style={{
                                      fontSize: "13px",
                                      padding: 0,
                                      backgroundColor: "#4972E8",
                                    }}
                                    onClick={() => setOpenMsgBox(openMsgBox === i ? null : i)}
                                  >
                                    Message
                                  </button>
                                  <button
                                    className="btn "
                                    style={{
                                      fontSize: "12px",
                                      padding: 0,
                                      backgroundColor: "#4972E8",
                                    }}
                                    onClick={() => {
                                      setOpenVideoBox(openVideoBox === i ? null : i);
                                      setOpenMsgBox(null); // Close message box if video is opened
                                    }}
                                  >
                                    Video / Audio
                                  </button>
                                  <button
                                    className="btn"
                                    style={{
                                      fontSize: "13px",
                                      padding: 0,
                                      backgroundColor: "#49E876",
                                    }}
                                    onClick={() => document.getElementById(`file-upload-${index}-${i}`).click()}
                                  >
                                    Upload
                                  </button>
                                  <input
                                    type="file"
                                    id={`file-upload-${index}-${i}`}
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (file) {
                                        handleFileUpload(item._id, i, file);
                                        e.target.value = "";
                                      }
                                    }}
                                  />
                                </div>
                              ) : (
                                <>
                                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    {renderStars(service.rating || 0)}
                                    <span style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                                      ({service.rating || 0} / 5)
                                    </span>
                                  </div>

                                  <div style={{ textAlign: "center" }}>
                                    {service.fileUrl ? (
                                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                                        <img
                                          src={`http://localhost:5000/${service.fileUrl}`}
                                          alt="Logo"
                                          style={{ width: "40px", height: "40px", borderRadius: "4px", border: "1px solid #eee", objectFit: "cover" }}
                                        />
                                        <a
                                          href={`http://localhost:5000/${service.fileUrl}`}
                                          download={`${service.name}_logo`} // This suggests the filename to the browser
                                          target="_blank"
                                          rel="noreferrer"
                                          style={{ fontSize: "10px", color: "#4972E8", textDecoration: "none", fontWeight: "bold" }}
                                        >
                                          Download
                                        </a>
                                      </div>
                                    ) : <span style={{ fontSize: "11px", color: "#ccc" }}>No Logo</span>}
                                  </div>

                                  <div style={{ textAlign: "center" }}>
                                    {service.videoLink ? (
                                      <a
                                        href={service.videoLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: "#4972E8", fontSize: "12px", fontWeight: "600", textDecoration: "underline" }}
                                      >
                                        Watch Video
                                      </a>
                                    ) : <span style={{ fontSize: "11px", color: "#ccc" }}>No Video</span>}
                                  </div>
                                </>)}
                            </td>
                          </tr>
                          {/* NEW VIDEO/AUDIO INPUT ROW */}
                          {openVideoBox === i && (
                            <tr>
                              <td colSpan="3" style={{ padding: "20px 35px", backgroundColor: "#f0f4ff", borderBottom: "1px solid #ddd" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                  <label className="form-label" style={{ fontSize: "12px", color: "#4972E8", fontWeight: "700" }}>
                                    SHARE VIDEO/AUDIO LINK FOR: {service.name.toUpperCase()}
                                  </label>
                                  <input
                                    type="text"
                                    id={`video-input-${index}-${i}`}
                                    className="form-input"
                                    placeholder="Paste Google Drive / Dropbox / Loom link here..."
                                    defaultValue={service.videoLink || ""}
                                    style={{
                                      width: "100%",
                                      height: "40px",
                                      padding: "8px 12px",
                                      backgroundColor: "#fff",
                                      boxShadow: "0px 1px 4px #9188889d",
                                      border: "1px solid #4972E8"
                                    }}
                                  />
                                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                    <button className="btn btn-red"
                                      style={{
                                        height: "25px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        lineHeight: "normal"
                                      }}
                                      onClick={() => setOpenVideoBox(null)}>Cancel</button>
                                    <button
                                      className="btn btn-green"
                                      style={{
                                        height: "25px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        lineHeight: "normal"
                                      }}
                                      onClick={() => {
                                        const val = document.getElementById(`video-input-${index}-${i}`).value;
                                        // You can reuse handleSaveMessage or create handleSaveVideo
                                        handleSaveMessage(item._id, i, val);
                                        setOpenVideoBox(null);
                                      }}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}

                          {/* DESIGNED MESSAGE INPUT ROW */}
                          {openMsgBox === i && (
                            <tr>
                              <td colSpan="3" style={{ padding: "20px 35px", backgroundColor: "#f9f9f9", borderBottom: "1px solid #ddd" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                  <label className="form-label" style={{ fontSize: "12px", color: "#4972E8", fontWeight: "700" }}>
                                    ADMIN NOTE FOR: {service.name.toUpperCase()}
                                  </label>
                                  <textarea
                                    id={`msg-input-${index}-${i}`}
                                    className="form-input"
                                    placeholder="Explain the work done or changes made here..."
                                    defaultValue={service.adminMessage || ""}
                                    style={{
                                      width: "100%",
                                      height: "80px",
                                      padding: "12px",
                                      resize: "none",
                                      backgroundColor: "#fff",
                                      boxShadow: "0px 1px 4px #9188889d",
                                      border: "1px solid #ccc"
                                    }}
                                  />
                                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                    <button
                                      className="btn btn-red"
                                      style={{
                                        height: "25px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        lineHeight: "normal"
                                      }}
                                      onClick={() => setOpenMsgBox(null)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="btn btn-green"
                                      style={{
                                        height: "25px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        lineHeight: "normal"
                                      }}
                                      onClick={() => {
                                        const val = document.getElementById(`msg-input-${index}-${i}`).value;
                                        handleSaveMessage(item._id, i, val);
                                        setOpenMsgBox(null);
                                      }}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>))}
                    </tbody>
                  </table>

                  {/* Add this right below the </table> */}
                  {key === "completed" && item.clientComment && (
                    <div style={{ marginTop: "30px" }}>
                      <label className="form-label" style={{ display: "block", marginBottom: "10px" }}>
                        Detailed Feedback
                      </label>
                      <div
                        className="form-input"
                        style={{
                          width: "100%",
                          height: "auto",
                          minHeight: "60px",
                          backgroundColor: "#f9f9f9",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {item.clientComment}
                      </div>
                    </div>
                  )}

                  <div className="bottom-actions">
                    {key === "completed" && (
                      <button
                        className="btn btn-red btn-bottom"
                        style={{
                          padding: "0 12px",
                          backgroundColor: item.assignedEmployee ? "#575f66" : "#dc3545",
                          color: item.assignedEmployee ? "#fafafb" : "#ffffff",
                          minWidth: "140px",
                          width: "auto",
                          height: "auto",
                          minHeight: "28px",
                          cursor: item.assignedEmployee ? "not-allowed" : "pointer",
                          opacity: item.assignedEmployee ? 0.8 : 1
                        }}
                        onClick={() => handleAssignBadFeedback(item)}
                        disabled={!!item.assignedEmployee}
                      >
                        {item.assignedEmployee ? (
                          `Assigned : ${item.assignedEmployee.email}`
                        ) : (
                          "Assign Complaint"
                        )}
                      </button>
                    )}
                    {key === "pending" && (
                      <button
                        className="btn btn-blue btn-bottom"
                        style={{ padding: 0 }}
                        onClick={() => handleSendMail(item._id)}
                      >
                        Mail
                      </button>)}
                    {key === "pending" && (
                      <button
                        className="btn btn-red btn-bottom"
                        style={{ padding: 0 }}
                        onClick={() => {
                          setOpenMsgBox(null);
                        }}>
                        Save
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
