import clientData from "../../assets/salesManager/untouchedData/clientData.png";
import totalProspectus from "../../assets/salesManager/untouchedData/totalProspect.png";
import totalUntouchedData from "../../assets/salesManager/untouchedData/totalUntouchedData.png";
import call from "../../assets/salesManager/untouchedData/call.png";
import dropbox from "../../assets/salesManager/untouchedData/dropbox.png";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const UntouchedData = () => {

  const [untouchedData, setUntouchedData] = useState([]);
  const [notAssignData, setNotAssignData] = useState([]);

  const [untouchPage, setUntouchPage] = useState(1);
  const [unAssignPage, setUnAssignPage] = useState(1);
  const [limit] = useState(10);

  const [untouchTotalPages, setUntouchTotalPages] = useState(1);
  const [unAssignTotalPages, setUnAssignTotalPages] = useState(1);

  const [totalUntouchData, setUntouchData] = useState(0);

  const [employeeEmail, setEmployeeEmail] = useState("");

  const [searchFlag, setSearchFlag] = useState(false);

  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const ext = selectedFile.name.split(".").pop().toLowerCase();
    if (!["xlsx", "csv"].includes(ext)) {
      alert("Only excel or csv files allowed.");
      return;
    }

    leadUpload(selectedFile, ext);
  };

  const leadUpload = async (file, ext) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const url =
        ext === "xlsx"
          ? "http://localhost:5000/api/clientLead/excelFileLead"
          : "http://localhost:5000/api/clientLead/csvFileLead";

      const apiResponse = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert(apiResponse.data.msg);
    } catch (err) {
      console.error(err.message);
    }
  };

  const searchByEmail = async (page = untouchPage) => {
    try {
      if (!employeeEmail) {
        alert("Please select employee email");
        return;
      }

      const apiResponse = await axios.get(
        `http://localhost:5000/api/clientLead/search?email=${employeeEmail}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(apiResponse.data)

      setUntouchedData(apiResponse.data.untouchLead.data);
      setUntouchTotalPages(apiResponse.data.untouchLead.totalPages);
      return
    }
    catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert("Failed");
          console.error(`Error: ${err.response.data.error}`);
          return
        }
        else {
          alert(err.response.data.msg || "Failed");
          console.error(`Error: ${err.response.data.msg}`);
          return
        }
      }
      else {
        console.error(`Error: ${err.message}`);
        return
      }
    }
  }

  const fetchUntouchData = async () => {
    try {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/clientLead/untouchLead?` +
        `page=${untouchPage}&unAssignPage=${unAssignPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUntouchData(apiResponse.data.untouchLead.totalRecords + apiResponse.data.unAssignData.totalRecords)

      setUntouchedData(apiResponse.data.untouchLead.data);
      setNotAssignData(apiResponse.data.unAssignData.data);

      setUntouchTotalPages(apiResponse.data.untouchLead.totalPages);
      setUnAssignTotalPages(apiResponse.data.unAssignData.totalPages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (searchFlag) {
      searchByEmail(untouchPage)
      return
    }

    fetchUntouchData();

  }, [untouchPage, unAssignPage, searchFlag]);

  const statsCards = [
    { title: "TOTAL DATA", value: "10", icon: clientData, color: "#2d4fd7" },
    { title: "TODAY CALLS", value: "1600", icon: call, color: "#19a974" },
    { title: "TOTAL PROSPECT", value: "8000", icon: totalProspectus, color: "#00a8e8" },
    { title: "TOTAL UNTOUCHED DATA", value: totalUntouchData, icon: totalUntouchedData, color: "#f2b705" },
  ];

  return (
    <div
      id="untouchedData-container"
      className="container-fluid min-vh-100"
      style={{
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      <div className="row g-0">

        {/* Header */}
        <div
          className="col-12"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4vw",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3 pt-4 px-3">
            <h1
              className="h3 fw-semibold m-0"
              style={{ color: "#5A5C69" }}
            >
              Untouched Data
            </h1>
          </div>

          <div className="importBtn tracking-wider">
            <button
              onClick={openFilePicker}
              style={{
                backgroundColor: "#4972E8",
                color: "#FFFFFF",
                fontSize: "16px",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
                letterSpacing: "0.01em",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Import Data

              <img
                src={dropbox}
                alt="import"
                style={{
                  width: "18px",
                  height: "18px",
                  display: "block",
                }}
              />

              <input
                type="file"
                ref={fileInputRef}
                accept=".xlsx, .csv"
                onChange={handleFileChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "18px",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
        </div>


        <div className="col-12 px-3">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {/* <div style={{ minWidth: "250px", flex: "1" }}>
              <select className="form-select">
                <option>Member Name</option>
              </select>
            </div> */}

            <div style={{ minWidth: "250px", flex: "1" }}>
              <input
                type="email"
                placeholder="Member Email"
                value={employeeEmail}
                onChange={e => setEmployeeEmail(e.target.value)}
              />
            </div>

            {/* <div style={{ minWidth: "250px", flex: "1" }}>
              <select className="form-select">
                <option>Select Date</option>
              </select>
            </div> */}

            <div style={{ minWidth: "120px" }}>
              <button
                style={{
                  width: "100%",
                  height: "38px",
                  background: "#4972e8",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (searchFlag) {
                    setSearchFlag(false);
                    setUntouchPage(1);
                  } else {  
                    if (!employeeEmail) {
                      alert("Please select employee email");
                      return;
                    }
                    setSearchFlag(true);
                    setUntouchPage(1);
                  }
                }}
              >
                {searchFlag ? "Clear" : "Search"}
              </button>

            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="col-12 px-3">
          <div
            style={{
              margin: "16px 0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {statsCards.map((card, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(44, 62, 80, 0.07)",
                  padding: "16px 18px",
                  borderLeft: `4px solid ${card.color}`, // ✅ fixed
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: card.color,
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                  }}
                >
                  {card.title}
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      color: "#7c7979",
                      fontWeight: 500,
                    }}
                  >
                    {card.value}
                  </p>

                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                  >
                    <img
                      src={card.icon}
                      alt={card.title}
                      style={{
                        width: "55px",
                        height: "53px",
                        backgroundColor: "#fff",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h1 className="TeamMemberContainerHeading mt-4">Un-Touch Assigned Data</h1>

        <table className="table align-middle">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Client Name</th>
              <th>Email ID</th>
              <th>Contact No.</th>
              <th>Role</th>
              <th>Transfer Date</th>
            </tr>
          </thead>
          <tbody>
            {untouchedData.map((d, i) => (
              <tr key={i}>
                <td>{d.CompanyName}</td>
                <td>{d.ClientName}</td>
                <td>{d.Email}</td>
                <td>{d.Contact_No}</td>
                <td>{d.Role}</td>
                <td>{new Date(d.TransferDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center">
          <button disabled={untouchPage === 1} onClick={() => setUntouchPage(p => p - 1)}>Prev</button>
          <span className="mx-3">Page {untouchPage} of {untouchTotalPages}</span>
          <button disabled={untouchPage === untouchTotalPages} onClick={() => setUntouchPage(p => p + 1)}>Next</button>
        </div>

        <h1 className="TeamMemberContainerHeading mt-4">Un-Assigned Data</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Client Name</th>
              <th>Email ID</th>
              <th>Contact No.</th>
            </tr>
          </thead>
          <tbody>
            {notAssignData.map((d, i) => (
              <tr key={i}>
                <td>{d.company_name}</td>
                <td>{d.client_name}</td>
                <td>{d.email}</td>
                <td>{d.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center mb-4">
          <button disabled={unAssignPage === 1} onClick={() => setUnAssignPage(p => p - 1)}>Prev</button>
          <span className="mx-3">Page {unAssignPage} of {unAssignTotalPages}</span>
          <button disabled={unAssignPage === unAssignTotalPages} onClick={() => setUnAssignPage(p => p + 1)}>Next</button>
        </div>

      </div>
    </div>
  );
};

export default UntouchedData;
