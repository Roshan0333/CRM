import React, { useEffect, useState } from "react";
import clientData from "../../assets/salesExecutive/Dashboard/clientData.png";
import payout from "../../assets/salesExecutive/Dashboard/payout.png";
import prospectIcon from "../../assets/salesExecutive/Dashboard/prospectNumber.png";
import totalSales from "../../assets/salesExecutive/Dashboard/totalSales.png";
import "../../style/salesExecutive/dashboard.css";
// import Sidebar from "../../components/salesExecutive/Sidebar";
import LastUpdatePopUp from "./LastupdatePopUp";
import UpdataDataPopUp from "./UpdateDataPopUp";
import { TotalSale, prospectList, hotClient, updateClientStatusApi } from "../../services/salesDepartmentApi";


const Dashboard = () => {
  const [showLastUpdatePopup, setShowLastUpdatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatepopup] = useState(false);

  const openPopup = () => setShowLastUpdatePopup(true);
  const closePopup = () => setShowLastUpdatePopup(false);

  const openUpdatePopup = () => setShowUpdatepopup(true);
  const closeUpdatePopup = () => setShowUpdatepopup(false);

  const [totalSalesNumber, setTotalSalesNumber] = useState(0);
  const [prospectNumber, setProspectNumber] = useState(0);
  const [hotClientList, setHotClientList] = useState([]);
  const [clientStatusList, setClientStatusList] = useState([]);
  const [selectClient, setSelectClient] = useState();

  let clientStatus = (index) => {
    setSelectClient(index);
    setClientStatusList(hotClientList[index].Comments);
  }


  const updateClientStatus = async (Status, Comments, Reminder_Date, SalesStatus) => {


    let clientData ={
      ClientId: hotClientList[selectClient]._id,
      Status: Status,
      Comments: Comments,
      Reminder_Date: Reminder_Date,
      SalesStatus: SalesStatus
    }

    let updateClientStatus_Response = await updateClientStatusApi(clientData);

    if (!updateClientStatus_Response.ok || !updateClientStatus_Response.fetchMessage) {
      console.log(updateClientStatus_Response.data);
    }
    else {
        alert(updateClientStatus_Response.data);
    }
  }


  useEffect(() => {
    ; (
      async () => {
        let totalSaleResponse = await TotalSale();
        let totalProspectResponse = await prospectList();
        let todayReminderList = await hotClient();
        // let totalClientResponse = await cutomerCallingList();


        if (!totalProspectResponse.ok || !totalProspectResponse.fetchMessage) {
          console.log(totalProspectResponse.data);
        }
        else {
          let totalProspect = totalProspectResponse.data.ProspectList.length;
          setProspectNumber(totalProspect)
        }

        if (!totalSaleResponse.ok || !totalSaleResponse.fetchMessage) {
          console.log(totalSaleResponse.data);
        }
        else {
          let totalSales = totalSaleResponse.data.TotalSales.length
          setTotalSalesNumber(totalSales);
        }

        if (!todayReminderList.ok || !todayReminderList.fetchMessage) {
          console.log(todayReminderList.data)
        }
        else {
          let list = todayReminderList.data
          setHotClientList(list);
        }

      }
    )()
  }, [])

  return (
    <main>

      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1>Dashboard</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL CLIENT'S DATA</h3>
                <div id="num-vector">
                  <p>300</p>
                  <img src={clientData} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL SALES</h3>
                <div id="num-vector">
                  <p>{totalSalesNumber}</p>
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
                  <p>{prospectNumber}</p>
                  <img src={prospectIcon} alt="" />
                </div>
              </div>
            </div>
          </section>

          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>Hot Clients</h1>

                <div
                  id="client-list"
                  style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  <table id="se-table">
                    <thead id="sales-exe-thead">
                      <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Client Name</th>
                        <th>Email ID</th>
                        <th>Contact No.</th>
                        <th>Reminder Date</th>
                        <th>Activity</th>
                        <th>Last Update</th>
                      </tr>
                    </thead>

                    <tbody>
                      {hotClientList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.CompanyName}</td>
                          <td>{item.ClientName}</td>
                          <td>{item.Email_Id}</td>
                          <td>{item.Contact_No}</td>
                          <td>{item.Reminder_Date}</td>
                          <td>
                            {/* <button onClick={openPopup}>Update</button> */}
                            <button onClick={() => {
                              openUpdatePopup();
                              clientStatus(index);
                            }}>Update</button>
                          </td>
                          <td>
                            <button onClick={() => {
                              openPopup(),
                                clientStatus(index)
                            }}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {showLastUpdatePopup && <LastUpdatePopUp closePopup={closePopup} statusData={clientStatusList} />}
      {showUpdatePopup && <UpdataDataPopUp closeUpdatePopup={closeUpdatePopup} updateFunction={updateClientStatus}/>}
    </main>
  );
};

export default Dashboard;
