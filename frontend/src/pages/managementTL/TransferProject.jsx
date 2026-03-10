import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Plus } from "lucide-react";
// import arrow from "../../assets/managementTL/main/arrow.png";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function TransferProjects() {
  const [openInvoice, setOpenInvoice] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const historyData = [
    {
      company: "Bold text column",
      invoice: "Bold text column",
      services: "Bold text column",
      assigned: "Bold text column",
      deadline: "Bold text column",
      action: "Update",
    },
    {
      company: "Bold text column",
      invoice: "Bold text column",
      services: "Bold text column",
      assigned: "Bold text column",
      deadline: "Bold text column",
      action: "Update",
    },
    {
      company: "Bold text column",
      invoice: "Bold text column",
      services: "Bold text column",
      assigned: "Bold text column",
      deadline: "Bold text column",
      action: "Update",
    },
    {
      company: "Bold text column",
      invoice: "Bold text column",
      services: "Bold text column",
      assigned: "Bold text column",
      deadline: "Bold text column",
      action: "Update",
    },
    {
      company: "Bold text column",
      invoice: "Bold text column",
      services: "Bold text column",
      assigned: "Bold text column",
      deadline: "Bold text column",
      action: "Update",
    },
    {
      company: "Bold text column",
      invoice: "Bold text column",
      services: "Bold text column",
      assigned: "Bold text column",
      deadline: "Bold text column",
      action: "Update",
    },
  ];
  const services = ["Logo Design", "Content Writing", "Video Editing"];
  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "30px 40px",
        marginLeft: windowWidth > 1020 ? "280px" : "0",
      }}
    >
      {/* Page Title */}
      <h2
        style={{
          color: "#5A5C69",
          fontWeight: "600",
          fontSize: "35px",
          letterSpacing: "1px",
          marginBottom: "30px",
        }}
      >
        TRANSFER PROJECTS
      </h2>

      {/* Transfer Project Card */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "30px",
          marginBottom: "40px",
          // boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            paddingBottom: openInvoice === 1 ? "0" : "0",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h5 style={{ fontWeight: "800", fontSize: "18px", color: "#212529" }}>
            <span style={{ marginRight: "10px" }}>1.</span> Company Name
          </h5>

          <div
            onClick={() => setOpenInvoice(openInvoice === 1 ? null : 1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "400px",
              cursor: "pointer",
              padding: "8px 15px",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f8f9fa")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <span
              style={{
                marginRight: "10px",
                fontWeight: "800",
                fontSize: "18px",
                color: "#212529",
              }}
            >
              Invoice no.
            </span>

            {openInvoice === 1 ? (
              <ChevronDown size={25} />
            ) : (
              <ChevronUp size={25} />
            )}
            
          </div>
        </div>

        {/* Service Details - Collapsible */}
        {openInvoice === 1 && (
          <div
            style={{
              marginTop: "25px",
              padding: "30px 0",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex" }}>
              <h5
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "25px",
                  color: "#000000",
                  borderBottom: "3px solid #212529", // display: "inline-block" , paddingBottom: "6px" ,
                  margin: "0 auto 10px",
                }}
              >
                Service Details
              </h5>
            </div>

            {/* Table Header */}
            <div
              className="row text-secondary mb-3"
              style={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              <div className="col-4 text-center text-dark">Service Name</div>
              <div className="col-4 text-center text-dark">Assigned to</div>
              <div className="col-4 text-center text-dark">Action</div>
            </div>

            {/* Service Rows */}
            {services.map((service, index) => (
              <div
                key={index}
                className="row align-items-center text-center py-3"
                style={{
                  borderBottom:
                    index < services.length - 1 ? "1px solid #f1f3f5" : "none",
                }}
              >
                {/* Service Name */}
                <div className="col-4 d-flex justify-content-center align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <span style={{ fontSize: "14px", color: "#212529" }}>
                    {service}
                  </span>
                </div>

                {/* Assigned to */}
                <div className="col-4 d-flex justify-content-center align-items-center gap-2">
                  <select
                    className="form-select"
                    style={{ width: "70%", fontSize: "14px", color: "#6c757d" }}
                  >
                    <option>Select Employee</option>
                  </select>
                  <button
                    className="btn  d-flex align-items-center justify-content-center"
                    style={{ width: "34px", height: "34px", padding: 0 }}
                  >
                    +
                  </button>
                </div>

                {/* Action */}
                <div className="col-4">
                  <button
                    className={`btn ${
                      index === 0 ? "btn-primary {}" : "btn-secondary"
                    }`}
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      width: "85px",
                      height: "21px",
                      padding: 0,
                      border: "none",
                      backgroundColor: index === 0 ? "#4972E8" : "#6c757d",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}

            {/* Send to Review Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-primary "
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  width: "134px",
                  height: "33px",
                  padding: "0px",
                  backgroundColor: "#4972E8",
                }}
              >
                Send to Review
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transfer History */}
      <h3
        style={{
          color: "#5A5C69",
          fontWeight: "600",
          fontSize: "35px",
          letterSpacing: "1px",
          marginBottom: "25px",
        }}
      >
        TRANSFER HISTORY
      </h3>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th
                style={{
                  padding: "18px 25px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "#212529",
                  borderBottom: "1px solid #e9ecef",
                }}
              >
                Company Name
              </th>
              <th
                style={{
                  padding: "18px 25px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "#212529",
                  borderBottom: "1px solid #e9ecef",
                }}
              >
                Invoice No.
              </th>
              <th
                style={{
                  padding: "18px 25px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "#212529",
                  borderBottom: "1px solid #e9ecef",
                }}
              >
                Services
              </th>
              <th
                style={{
                  padding: "18px 25px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "#212529",
                  borderBottom: "1px solid #e9ecef",
                }}
              >
                Assigned to
              </th>
              <th
                style={{
                  padding: "18px 25px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "#212529",
                  borderBottom: "1px solid #e9ecef",
                }}
              >
                Dead line
              </th>
              <th
                style={{
                  padding: "18px 25px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "15px",
                  color: "#212529",
                  borderBottom: "1px solid #e9ecef",
                }}
              >
                Activity
              </th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((row, idx) => (
              <tr
                key={idx}
                style={{ transition: "background 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td
                  style={{
                    padding: "18px 25px",
                    fontWeight: "500",
                    fontSize: "13px",
                    color: "#212529",
                    borderBottom:
                      idx < historyData.length - 1
                        ? "1px solid #f0f2f5"
                        : "none",
                  }}
                >
                  {row.company}
                </td>
                <td
                  style={{
                    padding: "18px 25px",
                    fontWeight: "500",
                    fontSize: "13px",
                    color: "#212529",
                    borderBottom:
                      idx < historyData.length - 1
                        ? "1px solid #f0f2f5"
                        : "none",
                  }}
                >
                  {row.invoice}
                </td>
                <td
                  style={{
                    padding: "18px 25px",
                    fontWeight: "500",
                    fontSize: "13px",
                    color: "#212529",
                    borderBottom:
                      idx < historyData.length - 1
                        ? "1px solid #f0f2f5"
                        : "none",
                  }}
                >
                  {row.services}
                </td>
                <td
                  style={{
                    padding: "18px 25px",
                    fontWeight: "500",
                    fontSize: "13px",
                    color: "#212529",
                    borderBottom:
                      idx < historyData.length - 1
                        ? "1px solid #f0f2f5"
                        : "none",
                  }}
                >
                  {row.assigned}
                </td>
                <td
                  style={{
                    padding: "18px 25px",
                    fontWeight: "500",
                    fontSize: "13px",
                    color: "#212529",
                    borderBottom:
                      idx < historyData.length - 1
                        ? "1px solid #f0f2f5"
                        : "none",
                  }}
                >
                  {row.deadline}
                </td>
                <td
                  style={{
                    padding: "18px 25px",
                    borderBottom:
                      idx < historyData.length - 1
                        ? "1px solid #f0f2f5"
                        : "none",
                  }}
                >
                  <button
                    style={{
                      width: "64px",
                      height: "21px",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontWeight: "500",
                      cursor: "pointer",
                      backgroundColor: "#5875f5",
                      color: "#fff",
                      minWidth: "75px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#4361ee";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#5875f5";
                    }}
                  >
                    {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
