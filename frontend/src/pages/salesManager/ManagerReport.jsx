import React, { useState } from "react";
import clientData from "../../assets/salesManager/managerReport/clientData.png";
import payout from "../../assets/salesManager/managerReport/payout.png";
import prospectNum from "../../assets/salesManager/managerReport/prospectNum.png";
import totalSales from "../../assets/salesManager/managerReport/totalSales.png";
import "../../style/salesManager/managerReport.css";
import { todayCallingListApi, TotalSale, prospectList, cutomerCallingListApi } from "../../services/salesDepartmentApi";
import { useEffect } from "react";
// import { Button } from "bootstrap";

const ManagerReport = () => {
  const [showUpdatePopup, setShowUpdatepopup] = useState(false);
  const [showViewPopup, setShowViewpopup] = useState(false);

  const openUpdatePopup = () => setShowUpdatepopup(true);
  const openViewPopup = () => setShowViewpopup(true);
  const closeUpdatePopup = () => setShowUpdatepopup(false);
  const closeViewPopup = () => setShowViewpopup(false);

  const [todayCallList, setTodayCallList] = useState([]);
  const [totalSalesLength, setTotalSalesLength] = useState(0);
  const [prospectLength, setProspectLength] = useState(0);
  const [totalClientLength, setTotalClientLength] = useState(0);

  useEffect(() => {
    ; (
      async () => {

        let startDate = new Date();
        startDate.setDate(1)
        let endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(1)


        const prospectApiResponse = await prospectList();
        const apiResponse = await todayCallingListApi();
        const salesApiResponse = await TotalSale();
        const clientApiResponse = await cutomerCallingListApi(startDate, endDate);

        if (!prospectApiResponse.ok) {
          alert(prospectApiResponse.data || "Failed");
        } else {
          setProspectLength(prospectApiResponse.data.ProspectList.length);
        }

        if (!salesApiResponse.ok) {
          alert(salesApiResponse.data || "Failed");
        }
        else {
          setTotalSalesLength(salesApiResponse.data.TotalSales.length);
        }

        if (!apiResponse.ok) {
          alert(apiResponse.data || "Failed");
        }
        else {
          setTodayCallList(apiResponse.data.TodayCallList);
        }

        if (!clientApiResponse.ok) {
          alert(clientApiResponse.data || "Failed");
        }
        else{
          const clientList = clientApiResponse.data;
          const ClientArray = clientList.map((item) => item._id);

          setTotalClientLength(new Set(ClientArray).size)
        }
      }
    )()
  }, [])

  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1>Manager Report</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL CLIENT'S DATA</h3>
                <div id="num-vector">
                  <p>{totalClientLength}</p>
                  <img src={clientData} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL SALES</h3>
                <div id="num-vector">
                  <p>{totalSalesLength}</p>
                  <img src={totalSales} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH PAYOUT</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={payout} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>PROSPECT NUMBER</h3>
                <div id="num-vector">
                  <p>{prospectLength}</p>
                  <img src={prospectNum} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>Call Logs</h1>
                <div id="client-list">
                  <table id="mr-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Client Name</th>
                        <th>Email_id</th>
                        <th>Contact no.</th>
                        <th>Reminder Date</th>
                        <th>Activity</th>
                        <th>Last Update</th>
                      </tr>
                    </thead>

                    <tbody>
                      {todayCallList.length > 0 ? (
                        todayCallList.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.companyName}</td>
                            <td>{item.clientName}</td>
                            <td>{item.email_Id}</td>
                            <td>{item.contact_No}</td>
                            <td>{new Date(item.reminder_Date).toLocaleDateString()}</td>
                            <td>
                              <button onClick={openUpdatePopup}>Update</button>
                            </td>
                            <td>
                              <button onClick={openViewPopup}>View</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
                            No Records Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {showUpdatePopup && (
                    <div id="popup-overlay" onClick={closeUpdatePopup}>
                      <div id="popup-box" onClick={(e) => e.stopPropagation()}>
                        <div id="popup-header">
                          <h3>Update Call Details</h3>
                          <button id="close-btn" onClick={closeUpdatePopup}>
                            Close
                          </button>
                        </div>

                        <div id="popup-content">
                          <div className="radio-group">
                            <label>
                              <input type="radio" name="status" value="talk" />{" "}
                              Talk
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="status"
                                value="not-talk"
                              />{" "}
                              Not Talk
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="status"
                                value="delete"
                              />{" "}
                              Delete Client’s Profile
                            </label>
                          </div>

                          <div className="comment-section">
                            <span className="comment-label">Comment</span>
                            <textarea
                              id="comment"
                              className="comment-box"
                            ></textarea>
                          </div>


                          <button id="update-btn">Update</button>
                        </div>
                      </div>
                    </div>
                  )}
                  {showViewPopup && (
                    <div id="popup-overlay" onClick={closeViewPopup}>
                      <div id="popup-box" onClick={(e) => e.stopPropagation()}>
                        <div id="popup-header">
                          <h3>Last Update</h3>
                          <button id="close-btn" onClick={closeViewPopup}>
                            Close
                          </button>
                        </div>

                        <div id="popup-content">
                          <div className="update-row">
                            <p className="date">25/06/2025 07:04 PM</p>
                            <p className="desc">
                              I cannot directly generate HTML and CSS from an
                              image of a dashboard. My capabilities do not
                              extend to converting visual layouts into code.
                            </p>
                          </div>

                          <div className="update-row">
                            <p className="date">25/06/2025 07:04 PM</p>
                            <p className="desc">
                              I cannot directly generate HTML and CSS from an
                              image of a dashboard. My capabilities do not
                              extend to converting visual layouts into code.
                            </p>
                          </div>

                          <div className="update-row">
                            <p className="date">25/06/2025 07:04 PM</p>
                            <p className="desc">
                              I cannot directly generate HTML and CSS from an
                              image of a dashboard. My capabilities do not
                              extend to converting visual layouts into code.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ManagerReport;
