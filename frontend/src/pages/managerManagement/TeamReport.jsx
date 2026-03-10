import React, { useState }  from 'react'
import "../../style/managerManagement/Mgmtteamreport.css"
// import { FaDownload } from "react-icons/fa";
import download from "../../assets/managerManagement/managerteamreport/Download.png"


function TeamReport() {

  const managerdata = [
    ...Array(6).fill({
      name: "Bold text column",
      currentproject: "Bold text column",
      completedproject: "Bold text column",
      date: "Bold text column",
      deadline: "Bold text column",
      projectlist: "Bold text column",
      activity:"Veiw",
    }),
  ];

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="managermgmt-container">
      <div>
        <h2 className="managermgmt-title">Team Report</h2>
      </div>
      <div className="managermgmt-filters">
        <select className="managermgmt-dropdown">
          <option value="">Day</option>
          <option value="TD1">TD1</option>
          <option value="TD2">TD2</option>
          {/* Add real team leader names as needed */}
        </select>
         
        <select className="managermgmt-dropdown">
          <option value="">TL/Member Name </option>
          <option value="Monday">Team 1</option>
          <option value="Tuesday">Team 2</option>
          {/* Add more days as needed */}
        </select>
      </div>
        <div className="managermgmt-search"><button className="managermgmt-search-btn">Search</button></div>
      <div className="managermgmt-table-container">
        <table className="managermgmt-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Projects</th>
              <th>Completed projects</th>
              <th>Date</th>
              <th>DeadLine</th>
              <th>Project List</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {managerdata.map((row, idx) => (
                <tr key={idx}>
                  <td className="bold">{row.name}</td>
                  <td className="bold">{row.currentproject}</td>
                  <td className="bold">{row.completedproject}</td>
                  <td className="bold">{row.date}</td>
                  <td className="bold">{row.deadline}</td>
                  <td className="bold">{row.projectlist}</td>
                  <td className="bold"><button className='teamReport-veiw' onClick={() => setShowPopup(true)}>{row.activity}</button></td>
                                    
                </tr>
              ))}
          </tbody>
        </table>

        {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2 className="popup-title">Company Name</h2>

            <div className="popup-grid">
              <button className="popup-btn">
                Download Logo <img src={download} alt="download"  className="popup-icon" />
              </button>
              <button className="popup-btn">
                Client References <img src={download} alt="download"  className="popup-icon" />
              </button>
              <button className="popup-btn">
                Download Brochure <img src={download} alt="download"  className="popup-icon" />
              </button>
              <button className="popup-btn">
                Download Content <img src={download} alt="download"  className="popup-icon" />
              </button>
              <button className="popup-btn">
                Download Client Images <img src={download} alt="download"  className="popup-icon" />
              </button>
              <button className="popup-btn">
                Download Client Videos <img src={download} alt="download"  className="popup-icon" />
              </button>
              <button className="popup-btn">
                Download Company Details <img src={download} alt="download"  className="popup-icon" />
              </button>
              <button className="popup-btn">
                Other Details <img src={download} alt="download"  className="popup-icon" />
              </button>
            </div>

            {/* Close Button */}
            <button
              className="popup-close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default TeamReport
