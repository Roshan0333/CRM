import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

const Feedbacks = () => {
  const [key, setKey] = useState("pending");
  const [openPending, setOpenPending] = useState(null);
  const [openCompleted, setOpenCompleted] = useState(null);
  const [openMsgBox, setOpenMsgBox] = useState(null);
  const [openVideoBox, setOpenVideoBox] = useState(null);
  const toggleDropdownPending = (index) => {
    setOpenPending(openPending === index ? null : index);
  };

  const toggleDropdownCompleted = (index) => {
    setOpenCompleted(openCompleted === index ? null : index);
  };

  const [pendingFeedbacks, setPendingFeedbacks] = useState([
    {
      _id: "65a1b2c3d4e5f6g7h8i9j0",
      id: "1.",
      company: "Company Name",
      invoice: "Invoice no.",
      client: "John Doe",
      contact: "9876543210",
      designation: "Manager",
      email: "john@example.com",
      services: [
        { name: "Logo", rating: 5 },
        { name: "Banner", rating: 4 },
        { name: "Bold text column", rating: 3 },
        { name: "Bold text column", rating: 5 },
      ],
    },
    {
      _id: "65a1b2c3djj5f6g7h8i9j0",
      id: "2.",
      company: "Company Name",
      invoice: "Invoice no.",
      client: "Jane Smith",
      contact: "9876501234",
      designation: "Executive",
      email: "jane@example.com",
      services: [
        { name: "Landing Page", rating: 5 },
        { name: "Poster Design", rating: 4 },
        { name: "Logo", rating: 5 },
      ],
    },
  ]);

  const [completedFeedbacks, setCompletedFeedbacks] = useState([]);

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

  const token = localStorage.getItem("token"); // Verify this key matches your login storage
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("serviceIndex", serviceIndex);

  try {
    await axios.patch(
      `http://localhost:5000/api/feedback/upload/${feedbackId}`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${token}`, // Must match backend expectation
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("File uploaded successfully!");
  } catch (err) {
    console.error("Upload Error Details:", err.response?.data || err.message);
    alert(err.response?.status === 401 ? "Session expired. Please login again." : "Upload failed.");
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
  const handleSaveMessage = async (feedbackId, serviceIndex, messageText) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/feedback/message/${feedbackId}`, {
        serviceIndex,
        message: messageText,
        type : saveType
      },
        {
          headers: {
            Authorization: `Bearer ${token}` // This is what your backend expects
          }
        }
      );
        alert(`${saveType === 'video' ? 'Video link' : 'Message'} saved!`);
    } catch (err) {
      alert("Failed to save message.");
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

     
     
          .container {
        width: 100%;
        padding: 40px 16px;
        margin-left: var(--sidebar-width);
  max-width: calc(100% - var(--sidebar-width));
          }

@media (max-width: 1020px) {
  .container {
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
          font-size: 25px;
          font-weight: 700;
          color: #211f1fff;
        }

        .header-right {
         display: flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;
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

  .header-left,
  .header-right {
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

      <div className="container">
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
                  {item.id} {item.company}
                </div>
                <div className="header-right">
                  <span style={{ fontWeight: "700", fontSize: "25px", color: "#211f1fff" }}>
                    {item.invoice}
                  </span>
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
                          value={item.client || ""}
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
                                  onClick={() => document.getElementById(`file-upload-${i}`).click()}
                                >
                                  Upload
                                </button>
                                <input
                                  type="file"
                                  id={`file-upload-${i}`}
                                  style={{ display: 'none' }}
                                  onChange={(e) => handleFileUpload(item._id, i, e.target.files[0])}
                                />
                              </div>
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
                  {key === "completed" && item.comment && (
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
                        {item.comment}
                      </div>
                    </div>
                  )}

                  <div className="bottom-actions">
                    <button
                      className="btn btn-green btn-bottom"
                      style={{ padding: 0 }}
                    >
                      Assign
                    </button>
                    <button
                      className="btn btn-blue btn-bottom"
                      style={{ padding: 0 }}
                      onClick={() => handleSendMail(item._id)} // Connect mail function
                    >
                      Mail
                    </button>
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
