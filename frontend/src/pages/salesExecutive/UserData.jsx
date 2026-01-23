import React, { useEffect, useState } from "react";
import "../../style/salesExecutive/userData.css";
import "../../App.css";
import LastUpdatePopUp from "./LastupdatePopUp";
import UpdateDataPopUp from "./UpdateDataPopUp";
import { todayReminderListApi, updateClientStatusApi, postSaleApi } from "../../services/salesDepartmentApi";

function UserData() {

  const [todayRemindList, setTodayRemindList] = useState([]);
  const [clientStatusList, setClientStatusList] = useState([]);
  const [selectClient, setSelectClient] = useState();

  const [showLastUpdatePopup, setShowLastUpdatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  let openLastUpdatePopup = () => setShowLastUpdatePopup(true);
  let closeLastUpdatePopup = () => setShowLastUpdatePopup(false);

  let openUpdatePopup = () => setShowUpdatePopup(true);
  let closeUpdatePopup = () => setShowUpdatePopup(false);

  let clientStatus = (index) => {
    setSelectClient(index);
    setClientStatusList(todayRemindList[index].Comments.reverse());
  }


  const updateClientStatus = async (Status, Comments, Reminder_Date, SalesStatus) => {


    let clientData = {
      ClientId: todayRemindList[selectClient]._id,
      Status: Status,
      Comments: Comments,
      Reminder_Date: Reminder_Date,
      SalesStatus: SalesStatus
    }

    let updateClientStatus_Response = await updateClientStatusApi(clientData);

    if (!updateClientStatus_Response.ok || !updateClientStatus_Response.fetchMessage) {
      alert(updateClientStatus_Response.data);
    }
    else {
      alert(updateClientStatus_Response.data);
      setResetFlag(prev => !prev)
    }
  }

  const salesApi = async (Service, Amount) => {

    const salesData = {
      ClientId: todayRemindList[selectClient]._id,
      Service: Service,
      Amount: Amount
    }

    let salesResponse = await postSaleApi(salesData);

    alert(salesResponse.data)

    setResetFlag(prev => !prev)
  }


  useEffect(() => {
    ; (
      async () => {
        let todayRemindApi_Response = await todayReminderListApi();

        if (!todayRemindApi_Response.ok || !todayRemindApi_Response.fetchMessage) {
          alert(todayRemindApi_Response.data)
        } else {
          let list = todayRemindApi_Response.data.filter(client => client.AddedBy === "sales executive");
          setTodayRemindList(list);
        }
      }
    )();
  }, [])


  return (
    <>
      <div className="main">
        <h1>User Data</h1>
        <div className="table-content">
          <table className="table-data">
            <thead id="sales-userData">
              <tr>
                <th>Company Name</th>
                <th>Client Name</th>
                <th>Email_id</th>
                <th>Contact no.</th>
                <th>Remainder date</th>
                <th>Activity</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              {todayRemindList.map((item, index) => {
                return <tr key={index}>
                  <td>{item.CompanyName}</td>
                  <td>{item.ClientName}</td>
                  <td>{item.Email_Id}</td>
                  <td>{item.Contact_No}</td>
                  <td>{new Date(item.Reminder_Date.toString()).toLocaleDateString("en-GB")}</td>
                  <td>
                    <button onClick={() => {
                      openUpdatePopup();
                      clientStatus(index);
                    }}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => {
                      openLastUpdatePopup()
                      clientStatus(index);
                    }}>View</button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

        {showLastUpdatePopup && <LastUpdatePopUp closePopup={closeLastUpdatePopup} statusData={clientStatusList} />}
        {showUpdatePopup && <UpdateDataPopUp closeUpdatePopup={closeUpdatePopup} updateFunction={updateClientStatus} salesFunction={salesApi} />}
      </div>
    </>
  );
}

export default UserData;
