import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Feedbacks = () => {
  const [key, setKey] = useState("pending");
  const [openPending, setOpenPending] = useState(null);
  const [openCompleted, setOpenCompleted] = useState(null);

  const toggleDropdownPending = (index) => {
    setOpenPending(openPending === index ? null : index);
  };

  const toggleDropdownCompleted = (index) => {
    setOpenCompleted(openCompleted === index ? null : index);
  };

  const feedbacks = [
    {
      id: "1.",
      company: "Company Name",
      invoice: "Invoice no.",
      client: "John Doe",
      contact: "9876543210",
      designation: "Manager",
      email: "john@example.com",
      services: [
        { name: "Logo", rating: 0 },
        { name: "Banner", rating: 0 },
        { name: "Bold text column", rating: 0 },
        { name: "Bold text column", rating: 0 },
      ],
    },
    {
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
  ];

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

  return (
    <div
      className="main-content-wrapper"
      style={{ backgroundColor: "#ffffffff", minHeight: "100vh", width: "100%" }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .main-content-wrapper {
            /* The overall wrapper for your component's content */
            padding-top: 60px; /* Assuming your top navbar is around 60px tall */
        }

        .container {
          width: 100%;
          padding: 40px 10px;
          margin: 0 auto;
          margin-left: 250px; 
          width: calc(100% - 250px);
          margin-right: 0;
          margin-top: -60px;
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
          background: #ffffffff;
          width: 100%;
          padding:0px 50px
        }
        
        
        .tab-button {
          background: transparent;
          border: 1px solid transparent;
          border-bottom: none;
          padding: 1px 34px;
          font-size: 32px;
          font-weight: 400;
          color: #5A5C69;
          cursor: pointer;
          transition: all 0.3s ease;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .tab-button.active {
          background: #fff;
          border: 1px solid #ddd;
          border-bottom:none;
          box-shadow: 0 -2px 6px rgba(0,0,0,0.05);
          transform: translateY(1px);
        }

        .tab-content {
          background: #fff;
          padding: 25px 80px 40px;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.04);
          width: 100%;
        }

        .feedback-item {
          margin-bottom: 15px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          width:1015px;
        }

        .feedback-header {
          display: flex;
          justify-content: space-between;
          gap:1000px
          align-items: center;
          padding: 16px 80px 16px 40px;
          background: #fff;
          cursor: pointer;
          transition: background 0.2s;
        }

        .feedback-header:hover {
          background: #f9f9f9;
        }

        .header-left {
          font-size: 25px;
          font-weight: 500;
          color: #000;
        }

        .header-right {
        font-size: 25px;
          font-weight: 500;
          color: #000;
          display: flex;
          align-items: center;
          gap: 10px;
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

        .form-input {
          flex: 1;
          height: 35px;
          width: 307px;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;

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
          border-collapse: none;
          border: 1px solid #ddd;
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
          {(key === "pending" ? feedbacks : feedbacks).map((item, index) => (
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
                  <span style={{ fontWeight: "500", fontSize: "25px" }}>
                    {item.invoice}
                  </span>
                </div>
                <div className="header-right">
                  {key === "pending" ? (
                    openPending === index ? (
                      <ChevronDown size={30} strokeWidth={2.5} />
                    ) : (
                      <ChevronUp size={30} strokeWidth={2.5} />
                    )
                  ) : openCompleted === index ? (
                    <ChevronUp size={22} strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={22} strokeWidth={2.5} />
                  )}
                </div>
              </div>

              {(key === "pending" ? openPending : openCompleted) === index && (
                <div className="feedback-content">
                  <div className="form-row">
                    <div>
                      <div className="form-group">
                        <label className="form-label">Client Name</label>
                        <input type="text" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Contact no.</label>
                        <input type="text" className="form-input" />
                      </div>
                    </div>

                    <div>
                      <div className="form-group">
                        <label className="form-label">Designation</label>
                        <input type="text" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email_id</label>
                        <input type="email" className="form-input mb-10" />
                      </div>
                    </div>
                  </div>

                  <h3 className="service-title">Service List</h3>

                  <table className="service-table">
                    <thead>
                      <tr>
                        <th style={{ width: "30%" }}>Service</th>
                        <th style={{ width: "25%" }}>Rate</th>
                        <th style={{ width: "45%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.services.map((service, i) => (
                        <tr key={i}>
                          <td className="service-name">{service.name}</td>
                          <td>{renderStars(service.rating)}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn "
                                style={{
                                  fontSize: "13px",
                                  padding: 0,
                                  backgroundColor: "#4972E8",
                                }}
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
                              >
                                Upload
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

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
                    >
                      Mail
                    </button>
                    <button
                      className="btn btn-red btn-bottom"
                      style={{ padding: 0 }}
                    >
                      Close
                    </button>
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
