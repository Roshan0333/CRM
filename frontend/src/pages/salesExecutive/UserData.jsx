import React, { useState } from "react";
import "../../style/salesExecutive/userData.css";
import "../../App.css";
import LastUpdatePopUp from "./LastupdatePopUp";
import UpdateDataPopUp from "./UpdateDataPopUp";

function UserData() {

  const [showLastUpdatePopup, setShowLastUpdatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  let openLastUpdatePopup = () => setShowLastUpdatePopup(true);
  let closeLastUpdatePopup = () => setShowLastUpdatePopup(false);

  let openUpdatePopup = () => setShowUpdatePopup(true);
  let closeUpdatePopup = () => setShowUpdatePopup(false);
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
              <tr>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>
                 <button onClick={openUpdatePopup}>Update</button>
                </td>
                <td>
                  <button onClick={openLastUpdatePopup}>View</button>
                </td>
              </tr>
              <tr>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>
                  <button onClick={openUpdatePopup}>Update</button>
                </td>
                <td>
                  <button onClick={openLastUpdatePopup}>View</button>
                </td>
              </tr>
              <tr>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>
                  <button onClick={openUpdatePopup}>Update</button>
                </td>
                <td>
                  <button onClick={openLastUpdatePopup}>View</button>
                </td>
              </tr>
              <tr>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>
                  <button onClick={openUpdatePopup}>Update</button>
                </td>
                <td>
                  <button onClick={openLastUpdatePopup}>View</button>
                </td>
              </tr>
              <tr>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>
                  <button onClick={openUpdatePopup}>Update</button>
                </td>
                <td>
                  <button onClick={openLastUpdatePopup}>View</button>
                </td>
              </tr>
              <tr>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>Bold text columns</td>
                <td>
                  <button onClick={openUpdatePopup}>Update</button>
                </td>
                <td>
                  <button onClick={openLastUpdatePopup}>View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {showLastUpdatePopup && <LastUpdatePopUp closePopup ={closeLastUpdatePopup}/>}
        {showUpdatePopup && <UpdateDataPopUp closeUpdatePopup={closeUpdatePopup}/>}
      </div>
    </>
  );
}

export default UserData;
