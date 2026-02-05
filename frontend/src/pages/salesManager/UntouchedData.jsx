import clientData from "../../assets/salesManager/untouchedData/clientData.png";
import totalProspectus from "../../assets/salesManager/untouchedData/totalProspect.png";
import totalUntouchedData from "../../assets/salesManager/untouchedData/totalUntouchedData.png";
import call from "../../assets/salesManager/untouchedData/call.png";
import dropbox from "../../assets/salesManager/untouchedData/dropbox.png";
import { useRef, useState } from "react";
import axios from "axios";

const UntouchedData = () => {
  const untouchedData = [
    {
      id: 1,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
      transferDate: "Select",
    },
    {
      id: 2,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
      transferDate: "Bold text column",
    },
    {
      id: 3,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
      transferDate: "Bold text column",
    },
    {
      id: 4,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
      transferDate: "Bold text column",
    },
    {
      id: 5,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
      transferDate: "Bold text column",
    },
    {
      id: 6,
      company: "Bold text column",
      client: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      lastCall: "Bold text column",
      salesExecutive: "Bold text column",
      transferDate: "Bold text column",
    },
  ];

  // const [file, setFile] = useState(null);
  // const [fileExt, setFileExt] = useState("");
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const ext = selectedFile.name.split(".").pop().toLowerCase();
    const allowExt = ["xlsx", "csv"];

    if (!allowExt.includes(ext)) {
      alert("Only excel or csv files allowed.");
      return
    }

    // setFileExt(ext);
    // setFile(e.target.files[0]);

    leadUpload(selectedFile, ext);
  }

  const leadUpload = async (selectedFile, ext) => {
    try {
      if (!selectedFile) {
        alert("Please select a file");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      let url;

      if (ext === "xlsx") {
        url = "http://localhost:5000/api/clientLead/excelFileLead"
      }
      else {
        url = "http://localhost:5000/api/clientLead/csvFileLead"
      }

      const apiResponse = await axios.post(
        url,
        formData,
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      console.log(apiResponse)

      if (apiResponse.status === 500) {
        console.error(apiResponse.data.error)
        return
      }
      else {
        alert(apiResponse.data.msg);
        return
      }

    }
    catch (err) {
      return console.error(err.message);
    }
  }

  const statsCards = [
    {
      title: "TOTAL DATA",
      value: "10",
      icon: clientData,
      color: "#2d4fd7",
    },
    {
      title: "TODAY CALLS",
      value: "1600",
      icon: call,
      color: "#19a974",
    },
    {
      title: "TOTAL PROSPECT",
      value: "8000",
      icon: totalProspectus,
      color: "#00a8e8",
    },
    {
      title: "TOTAL UNTOUCHED DATA",
      value: "16",
      icon: totalUntouchedData,
      color: "#f2b705",
    },
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
            <h1 className="h3  fw-semibold m-0" style={{ color: "#5A5C69" }}>
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
                // hidden
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

        {/* Filter Section */}
        <div className="col-12 px-3">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div style={{ minWidth: "250px", flex: "1" }}>
              <select className="form-select">
                <option>Member Name</option>
              </select>
            </div>
            <div style={{ minWidth: "250px", flex: "1" }}>
              <select className="form-select">
                <option>Select Date</option>
              </select>
            </div>
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
              >
                Search
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
                  borderLeft: `4px solid ${card.color}`,
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
                      style={{ width: "55px", height: "53px", backgroundColor: "#fff" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="col-12 px-3 pb-4">
          <div
            className="card shadow-lg rounded-3 overflow-hidden mt-3"
            style={{ maxWidth: "100%" }}
          >
            <div
              className="table-responsive"
              style={{ overflowX: "auto", width: "100%" }}
            >
              <table className="table m-0 align-middle text-nowrap">
                <thead className="border-bottom">
                  <tr>
                    <th className="small fw-bold p-3">Company Name</th>
                    <th className="small fw-bold p-3">Client Name</th>
                    <th className="small fw-bold p-3">Email ID</th>
                    <th className="small fw-bold p-3">Contact No.</th>
                    <th className="small fw-bold p-3">Last Call</th>
                    <th className="small fw-bold p-3">Sales Executive Name</th>
                    <th className="small fw-bold p-3">Transfer Date</th>
                  </tr>
                </thead>
                <tbody>
                  {untouchedData.map((data) => (
                    <tr key={data.id} className="border-top">
                      <td className="small p-3">{data.company}</td>
                      <td className="small p-3">{data.client}</td>
                      <td className="small p-3">{data.email}</td>
                      <td className="small p-3">{data.contact}</td>
                      <td className="small p-3">{data.lastCall}</td>
                      <td className="small p-3">{data.salesExecutive}</td>
                      <td className="small p-3"> {data.transferDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UntouchedData;
