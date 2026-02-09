import React, { useEffect, useState } from "react";
import clientData from "../../assets/salesManager/managerReport/clientData.png";
import payout from "../../assets/salesManager/managerReport/payout.png";
import prospectNum from "../../assets/salesManager/managerReport/prospectNum.png";
import totalSales from "../../assets/salesManager/managerReport/totalSales.png";
import "../../style/salesManager/managerReport.css";
import axios from "axios";
import UpdateDataPopUp from "./UpdateClientPopUp";
import LastUpdatePopUp from "../salesExecutive/LastupdatePopUp";

const ManagerReport = () => {
  const [showUpdatePopup, setShowUpdatepopup] = useState(false);
  const [showViewPopup, setShowViewpopup] = useState(false);

  const [todayCallList, setTodayCallList] = useState([]);
  const [totalSalesLength, setTotalSalesLength] = useState(0);
  const [prospectLength, setProspectLength] = useState(0);
  const [totalClientLength, setTotalClientLength] = useState(0);

  const [clientIndex, setClientIndex] = useState();

  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const openUpdatePopup = () => setShowUpdatepopup(true);
  const openViewPopup = () => setShowViewpopup(true);
  const closeUpdatePopup = () => setShowUpdatepopup(false);
  const closeViewPopup = () => setShowViewpopup(false);

  const updateClient = async (clientStatus, comments, reminderDate) => {
    try {

      const formdata = {
        clientId: todayCallList[clientIndex]._id,
        clientStatus: clientStatus,
        comment: comments,
        reminderDate: reminderDate
      }

      const apiResponse = await axios.patch(
        "http://localhost:5000/api/clientLead/updateClient",
        formdata,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      if (apiResponse.status === 500) {
        console.log(apiResponse.data.error);
        alert("Client Data Update Failed");
        return
      }
      else if (apiResponse.status !== 200) {
        alert(apiResponse.data.msg || "Failed");
        return
      }
      else {
        alert(apiResponse.data.msg || "Successfully");

        closeUpdatePopup();
        setClientIndex(null);

        setLastId(null);
        setHasMore(true);

        fetchCallLogs(false); // ← THIS is the key

        return;
      }

    }
    catch (err) {
      return console.log(err.message)
    }
  }

  const fetchCallLogs = async (loadMore = false) => {
    if (loading || (!hasMore && loadMore)) return;

    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/clientLead/getAssignedLeadList",
        {
          params: {
            limit: 10,
            lastId: loadMore ? lastId : undefined,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { clientList, nextCursor, hasMore } = response.data;

      setTodayCallList(prev =>
        loadMore ? [...prev, ...clientList] : clientList
      );

      setTotalClientLength(prev =>
        loadMore ? prev + clientList.length : clientList.length
      );

      setLastId(nextCursor);
      setHasMore(hasMore);
    } catch (err) {
      console.error("API ERROR:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs(false);
  }, []);

  useEffect(() => {
    console.log("RENDER LIST:", todayCallList.map(i => i._id));
  }, [todayCallList]);

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

                <table id="mr-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company Name</th>
                      <th>Client Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Reminder Date</th>
                      <th>Activity</th>
                      <th>Last Update</th>
                    </tr>
                  </thead>

                  <tbody>
                    {todayCallList.length > 0 ? (
                      todayCallList.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.company_name|| "-"}</td>
                          <td>{item.client_name || "-"}</td>
                          <td>{item.email || "-"}</td>
                          <td>{item.contact || "-"}</td>
                          <td>
                            {item.reminderDate
                              ? new Date(item.reminderDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            <button onClick={() => {
                              openUpdatePopup();
                              setClientIndex(index)
                            }}>Update</button>
                          </td>
                          <td>
                            <button onClick={() => {
                              openViewPopup();
                              setClientIndex(index)
                            }}>View</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" style={{ textAlign: "center" }}>
                          No Records Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {hasMore && (
                  <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <button onClick={() => fetchCallLogs(true)} disabled={loading}>
                      {loading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>

      {showUpdatePopup && <UpdateDataPopUp closeUpdatePopup={closeUpdatePopup} updateFunction={updateClient} />}
    </main>
  );
};

export default ManagerReport;
