import React, { useState } from "react";
import calender from "../../assets/salesExecutive/report/calander.png";
import "../../style/salesExecutive/report.css";
import { useEffect } from "react";
import {todayCallingListApi} from "../../services/salesDepartmentApi";

const Report = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ callStatus: "", comment: "" });

  const [todayCalls, setTodayCalls] = useState([])

  // const todaysCalls = Array(6)
  //   .fill(null)
  //   .map((_, i) => ({
  //     id: i + 1,
  //     company: "Bold text column",
  //     client: "Bold text column",
  //     email: "Bold text column",
  //     contact: "Bold text column",
  //     reminder: "Bold text column",
  //   }));

  const pastCalls = Array(5)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      reminder: "Bold text column",
      comment: i === 0 ? "Select" : "Bold text column",
    }));

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setShowModal(false);
    setFormData({ callStatus: "", comment: "" });
  };

  useEffect(() => {
    ;(
      async() => {
        let today_CallListResponse = await todayCallingListApi();

        if(!today_CallListResponse.ok || !today_CallListResponse.fetchMessage){
          console.log(todayCallingListApi.data);
        }
        else{
          console.log(today_CallListResponse.data.TodayCallList)
          setTodayCalls(today_CallListResponse.data.TodayCallList)
        }
      }
    )()
  },[])

  return (
    <div
      id="sales-report-container"
      className="min-h-screen"
      style={{ backgroundColor: "#ffffffff" }}
    >
      {/* Report Title */}

      <div
        style={{
          padding: "28px 32px 24px",
          // display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "500",
            color: "#5A5C69",
            margin: 0,
            textAlign: "left",
          }}
        >
          Report
        </h1>
      </div>

      {/* Today's Call List */}
      <div
        style={{
          padding: "32px",
          margin: "0 32px 32px",
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "1rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#000",
            marginBottom: "30px",
          }}
        >
          Today's Call List
        </h2>

        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <table
              style={{
                width: "100%",
                // minWidth: "900px",
                borderCollapse: "collapse",
              }}
            >
              <thead className="report-thead" style={{ color: "#000000" }}>
                <tr
                  style={{
                    backgroundColor: "#ffffffff",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <th style={{ padding: "16px 20px", color: "#000000" }}>#</th>
                  <th style={{ padding: "16px 20px" }}>Company Name</th>
                  <th style={{ padding: "16px 20px" }}>Client Name</th>
                  <th style={{ padding: "16px 20px" }}>Email_id</th>
                  <th style={{ padding: "16px 20px" }}>Contact no.</th>
                  <th style={{ padding: "16px 20px" }}>Reminder date</th>
                  <th style={{ padding: "16px 20px" }}>Activity</th>
                </tr>
              </thead>

              <tbody>
                {todayCalls.map((item, index) => (
                  <tr
                    key={item.clientId}
                    style={{
                      backgroundColor: "white",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ color: "#000000" }}>{index+1}</span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>{item.companyName}</td>
                    <td style={{ padding: "16px 20px" }}>{item.clientName}</td>
                    <td style={{ padding: "16px 20px" }}>{item.email_Id}</td>
                    <td style={{ padding: "16px 20px" }}>{item.contact_No}</td>
                    <td style={{ padding: "16px 20px" }}>{item.reminder_Date}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <button
                        onClick={() => setShowModal(true)}
                        style={{
                          backgroundColor: "#3660DE",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Past Call List */}
      <div
        style={{
          margin: "0 32px 32px",
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "1rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          padding: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "400",
            color: "#000",
            marginBottom: "16px",
          }}
        >
          Past Call List
        </h2>

        {/* Date Filter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "16px",
            marginRight: "160px",
            justifyContent: "space-between",
          }}
        >
          {/* Start Date */}
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <input
              type="text"
              placeholder="Start Date"
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                padding: "0 40px 0 16px",
                fontSize: "20px",
                border: "3px solid #e5e7eb",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <img src={calender} alt="" />
            </span>
          </div>

          {/* End Date */}
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <input
              type="text"
              placeholder="End Date"
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                padding: "0 40px 0 16px",
                fontSize: "20px",
                border: "3px solid #e5e7eb",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <img src={calender} alt="" />
            </span>
          </div>

          <button
            style={{
              padding: "8px 32px",
              backgroundColor: "#4972E8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {/* Past Call Table */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
            padding: "24px",
          }}
        >
          <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <table
              style={{
                width: "100%",
                minWidth: "900px",
                borderCollapse: "collapse",
              }}
            >
              <thead className="report-thead">
                <tr
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <th style={{ padding: "16px 20px" }}></th>
                  <th style={{ padding: "16px 20px" }}>Company Name</th>
                  <th style={{ padding: "16px 20px" }}>Client Name</th>
                  <th style={{ padding: "16px 20px" }}>Email_id</th>
                  <th style={{ padding: "16px 20px" }}>Contact no.</th>
                  <th style={{ padding: "16px 20px" }}>Reminder date</th>
                  <th style={{ padding: "16px 20px" }}>Comment</th>
                </tr>
              </thead>

              <tbody>
                {pastCalls.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{
                      backgroundColor: "white",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ color: "#6b7280" }}>⋮</span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>{row.company}</td>
                    <td style={{ padding: "16px 20px" }}>{row.client}</td>
                    <td style={{ padding: "16px 20px" }}>{row.email}</td>
                    <td style={{ padding: "16px 20px" }}>{row.contact}</td>
                    <td style={{ padding: "16px 20px" }}>{row.reminder}</td>
                    <td
                      style={{
                        padding: "16px 20px",
                        color: i === 0 ? "#000" : "#000",
                      }}
                    >
                      {row.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              maxWidth: "500px",
              width: "90%",
              padding: "32px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#9ca3af",
              }}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: "20px",
                color: "#374151",
                textAlign: "center",
                marginBottom: "24px",
                fontWeight: "600",
              }}
            >
              Update Call Details
            </h2>

            {/* Radio Buttons */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { value: "talk", label: "Talk" },
                  { value: "notTalk", label: "Not Talk" },
                  { value: "delete", label: "Delete Client's Profile" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="callStatus"
                      value={opt.value}
                      checked={formData.callStatus === opt.value}
                      onChange={(e) =>
                        setFormData({ ...formData, callStatus: e.target.value })
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Comment
              </label>

              <textarea
                rows="5"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                placeholder="Enter your comment here..."
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  padding: "12px",
                  backgroundColor: "#f9fafb",
                  resize: "vertical",
                }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "10px 40px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
