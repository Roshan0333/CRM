import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";




const ClientManagement = () => {
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [clients, setClients] = useState([]);
  const [accountants, setAccountants] = useState([]);
  const [transferRole, setTransferRole] = useState(""); // 'accountant' | 'manager'
const [selectedUser, setSelectedUser] = useState("");
useEffect(() => {
  fetchClients();
}, []);

const fetchClients = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/invoice");

    // फक्त non-deleted invoices
    const activeClients = res.data.filter(inv => inv.isDeleted !== true);

    setClients(activeClients);
  } catch (error) {
    console.log("Error fetching clients", error);
  }
};

useEffect(() => {
  fetchAccountants();
}, []);

const fetchAccountants = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/auth/accountants");
    setAccountants(res.data);
  } catch (error) {
    console.log("Error fetching accountants", error);
  }
};

useEffect(() => {
  if (transferRole) {
    fetchUsersByRole(transferRole);
  }
}, [transferRole]);

const [users, setUsers] = useState([]);

const fetchUsersByRole = async (role) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/auth/users-by-role/${role}`);
    setUsers(res.data);
  } catch (err) {
    console.log("Role fetch error", err);
  }
};

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openTrackModal = (client) => {
    setSelectedClient(client);
    setSelectedTrack({
      payment: { status: "Done", date: "26-Jan-2025" },
      finance: "Approved",
      management: "Approved",
      employee: "Approved",
      hosting: "Pending",
    });
    setShowTrackModal(true);
  };

  const openCompanyModal = (client) => {
    setSelectedClient(client);
    setShowCompanyModal(true);
  };

  return (
    <div
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "white" }}
    >
      {/* Main Content */}
      <div
        style={{
          marginLeft: screenWidth > 1020 ? "280px" : "0",
          padding: "24px",
          backgroundColor: "white",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            fontWeight: 400,
            textAlign: "left",
            marginBottom: "32px",
            fontFamily: "Jost, sans-serif",
          }}
        >
          Client Management
        </h1>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e5e7eb" }}>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000",
                    borderBottom: "1px solid #d1d5db",
                    backgroundColor: "#FCFCFD",
                  }}
                >
                  Company Name
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000",
                    borderBottom: "1px solid #d1d5db",
                    backgroundColor: "#FCFCFD",
                  }}
                >
                  Client Name
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000",
                    borderBottom: "1px solid #d1d5db",
                    backgroundColor: "#FCFCFD",
                  }}
                >
                  Starting date
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000",
                    borderBottom: "1px solid #d1d5db",
                    backgroundColor: "#FCFCFD",
                  }}
                >
                  Ending date
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000",
                    borderBottom: "1px solid #d1d5db",
                    backgroundColor: "#FCFCFD",
                  }}
                >
                  Track
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "center",
                    backgroundColor: "#FCFCFD",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000",
                    borderBottom: "1px solid #d1d5db",
                  }}
                >
                  Work Order
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "center",
                    backgroundColor: "#FCFCFD",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000",
                    borderBottom: "1px solid #d1d5db",
                  }}
                >
                  Invoice
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "center",
                    backgroundColor: "#FCFCFD",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000",
                    borderBottom: "1px solid #d1d5db",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr
                  key={client._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f9fafb",
                    transition: "background-color 0.2s",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#101828",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {client.companyName}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#101828",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {client.clientName}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#101828",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {client.invoiceDate?.slice(0,10)}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#101828",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {client.dueDate?.slice(0,10)}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <button
                      onClick={() => openTrackModal(client)}
                      style={{
                        backgroundColor: "#3D68E7",
                        color: "white",
                        width: "68px",
                        height: "21px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "400",
                        border: "none",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                      }}
                    >
                       <button
                 onClick={() =>
                  
                window.open(
                      `http://localhost:5000/api/invoice/${client._id}/workorder`,
                       "_blank"
                       )
                        }
                        style={{
                          backgroundColor: "#3D68E7",
                          color: "white",
                          width: "68px",
                          height: "21px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "400",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        View
                      </button>
                        <label style={{
  backgroundColor: "#3D68E7",
  color: "white",
  width: "68px",
  height: "21px",
  borderRadius: "4px",
  fontSize: "12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}}>
  Upload
  <input
    type="file"
    hidden
    onChange={async (e) => {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      await axios.post(
        `http://localhost:5000/api/invoice/${client._id}/upload-workorder`,
        formData
      );

      alert("Work order uploaded");
    }}
  />
</label>


                    </div>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <button
                      onClick={() => openCompanyModal(client)}
                      style={{
                        backgroundColor: "#3D68E7",
                        color: "white",
                        width: "68px",
                        height: "21px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "400",
                        border: "none",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                     <span style={{
             backgroundColor: client.status === "Paid" ? "#11CE4D" : "#D41A1A",
               color: "white",
                padding: "4px 10px",
                   borderRadius: "4px"
                  }}>
                {client.status}
                            </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Track Progress Modal */}
      {showTrackModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              width: "95%",
              maxWidth: "1200px",
              padding: "32px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <button
                onClick={() => setShowTrackModal(false)}
                style={{
                  backgroundColor: "#D41A1A",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>

            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              Client Management
            </h2>

            {/* Progress Tracker */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: "0 16px",
                position: "relative",
              }}
            >
              {/* Step 1 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <CheckCircle
                  style={{
                    width: "64px",
                    height: "64px",
                    color: "#11CE4D",
                    marginBottom: "8px",
                    backgroundColor: "white",
                  }}
                  strokeWidth={2}
                />
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginBottom: "4px",
                    textAlign: "center",
                  }}
                >
                  Payment Done
                </p>
                <small style={{ color: "#6b7280", fontSize: "12px" }}>
                  {selectedTrack?.payment.date}
                </small>
              </div>

              {/* Connecting Line 1-2 */}
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "calc(10% + 32px)",
                  width: "calc(20% - 64px)",
                  height: "4px",
                  backgroundColor: "#11CE4D",
                  zIndex: 0,
                }}
              ></div>

              {/* Step 2 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <CheckCircle
                  style={{
                    width: "64px",
                    height: "64px",
                    color: "#11CE4D",
                    marginBottom: "8px",
                    backgroundColor: "white",
                  }}
                  strokeWidth={2}
                />
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginBottom: "4px",
                    textAlign: "center",
                  }}
                >
                  Financial Status
                </p>
                <small style={{ color: "#6b7280", fontSize: "12px" }}>
                  {selectedTrack?.finance}
                </small>
              </div>

              {/* Connecting Line 2-3 */}
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "calc(30% + 32px)",
                  width: "calc(20% - 64px)",
                  height: "4px",
                  backgroundColor: "#11CE4D",
                  zIndex: 0,
                }}
              ></div>

              {/* Step 3 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <CheckCircle
                  style={{
                    width: "64px",
                    height: "64px",
                    color: "#11CE4D",
                    marginBottom: "8px",
                    backgroundColor: "white",
                  }}
                  strokeWidth={2}
                />
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginBottom: "4px",
                    textAlign: "center",
                  }}
                >
                  Management Status
                </p>
                <small style={{ color: "#6b7280", fontSize: "12px" }}>
                  {selectedTrack?.management}
                </small>
              </div>

              {/* Connecting Line 3-4 */}
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "calc(50% + 32px)",
                  width: "calc(20% - 64px)",
                  height: "4px",
                  backgroundColor: "#11CE4D",
                  zIndex: 0,
                }}
              ></div>

              {/* Step 4 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <CheckCircle
                  style={{
                    width: "64px",
                    height: "64px",
                    color: "#11CE4D",
                    marginBottom: "8px",
                    backgroundColor: "white",
                  }}
                  strokeWidth={2}
                />
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginBottom: "4px",
                    textAlign: "center",
                  }}
                >
                  Employee Update
                </p>
                <small style={{ color: "#6b7280", fontSize: "12px" }}>
                  {selectedTrack?.employee}
                </small>
              </div>

              {/* Connecting Line 4-5 */}
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "calc(70% + 32px)",
                  width: "calc(20% - 64px)",
                  height: "4px",
                  backgroundColor: "#D41A1A",
                  zIndex: 0,
                }}
              ></div>

              {/* Step 5 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <XCircle
                  style={{
                    width: "64px",
                    height: "64px",
                    color: "#D41A1A",
                    marginBottom: "8px",
                    backgroundColor: "white",
                  }}
                  strokeWidth={2}
                />
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginBottom: "4px",
                    textAlign: "center",
                  }}
                >
                  Hosting Status
                </p>
                <small style={{ color: "#6b7280", fontSize: "12px" }}>
                  {selectedTrack?.hosting}
                </small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Details Modal */}
      {showCompanyModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              width: "95%",
              maxWidth: "1000px",
              padding: "32px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <button
                onClick={() => setShowCompanyModal(false)}
                style={{
                  backgroundColor: "#D41A1A",
                  color: "white",
                  padding: 0,
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                  height: "21px",
                  width: "68px",
                }}
              >
                Close
              </button>
            </div>

            <h2
              style={{
                fontSize: "32px",
                fontWeight: 400,
                textAlign: "center",
                marginBottom: "5rem",
                marginTop: "-3rem",
              }}
            >
              Company Name
            </h2>

            {/* Services Table */}
            <div
              style={{
                marginBottom: "24px",
                display: "flex",
                gap: "5rem",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {/* Services List Table */}
              <table
                style={{
                  width: "auto",
                  minWidth: "300px",
                  maxWidth: "500px",
                  borderCollapse: "collapse",
                  borderSpacing: "0",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  overflow: "hidden",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "16px 20px",
                        textAlign: "center",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1f2937",
                        backgroundColor: "#fff",
                        borderBottom: "1px solid #e5e7eb",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Services List
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedClient?.items.map((service, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "14px 20px",
                          fontSize: "14px",
                          color: "#374151",
                          backgroundColor: "white",
                          fontWeight: 500,
                        }}
                      >
                        {service.serviceName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Department + Employee Table */}
              <table
                style={{
                  width: "auto",
                  minWidth: "500px",
                  maxWidth: "500px",
                  borderCollapse: "collapse",
                  borderSpacing: "0",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  overflow: "hidden",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "16px 20px",
                        textAlign: "center",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1f2937",
                        backgroundColor: "#FCFCFD",
                        borderBottom: "1px solid #e5e7eb",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Department
                    </th>
                    {/* <th
                      style={{
                        padding: "16px 20px",
                        textAlign: "center",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1f2937",
                        backgroundColor: "#FCFCFD",
                        borderBottom: "1px solid #e5e7eb",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Employee Name
                    </th> */}
                  </tr>
                </thead>
                <tbody>
  {selectedClient?.items.map((service, index) => (
    <tr key={index}>
      <td
        style={{
          padding: "14px 20px",
          fontSize: "13px",
          color: "#000",
          backgroundColor: "white",
          fontWeight: 400,
        }}
      >
        {service.department}
      </td>
      {/* <td
        style={{
          padding: "14px 20px",
          fontSize: "14px",
          color: "#374151",
          backgroundColor: "white",
          fontWeight: 400,
        }}
      >
        {service.assignedTo || "Not Assigned"}
      </td> */}
    </tr>
  ))}
</tbody>

              </table>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <button
              onClick={() => setTransferRole("accountant")}
                style={{
                  backgroundColor: "#3D68E7",
                  color: "white",
                  width: "136px",
                  height: "48px",
                  padding: "0",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Transfer data to accountant
              </button>
              <button
              onClick={() => setTransferRole("manager")}
                style={{
                  backgroundColor: "#3D68E7",
                  color: "white",
                  width: "136px",
                  height: "48px",
                  padding: "0",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Transfer data to management
              </button>
            </div>

            {/* Account Dropdown */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "16px",
              }}
            >
              <select
                value={selectedUser}
               onChange={(e) => setSelectedUser(e.target.value)}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  outline: "none",
                  cursor: "pointer",
                  height: "52px",
                  width: "353px",
                }}
              >
                  <option value="">
    {transferRole === "accountant" ? "Select Accountant" : "Select Manager"}
  </option>

  {users.map((u) => (
    <option key={u._id} value={u._id}>
      {u.firstName} {u.lastName}
    </option>
  ))}


              </select>
              <button
  onClick={async () => {
    if (!selectedClient || !selectedUser || !transferRole) {
      alert("Accountant / Manager select करा");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/invoice/${selectedClient._id}/assign`,
        {
          assignedTo: transferRole,   // "accountant" किंवा "manager"
          assignedUser: selectedUser // user id
        }
      );

      alert("Data transferred successfully");
      setShowCompanyModal(false);
    } catch (err) {
      console.log("Transfer error", err);
      alert("Transfer failed");
    }
  }}
  style={{
    backgroundColor: "#3D68E7",
    color: "white",
    padding: "0px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    height: "32px",
    width: "89px",
  }}
>
  Submit
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;