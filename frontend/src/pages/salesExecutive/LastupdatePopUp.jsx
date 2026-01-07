import { useState } from "react";
function LastUpdatePopUp({ closePopup, statusData }) {
  console.log('Popup')

  return (
    <div id="popup-overlay" onClick={closePopup}>
      <div id="popup-box" onClick={(e) => e.stopPropagation()}>
        <div id="popup-header">
          <h3>Last Update</h3>
          <button id="close-btn" onClick={closePopup}>
            Close
          </button>
        </div>

        <div id="popup-content">
          {statusData.map(item => {
            return <div className="update-row" key={item.EmployeeId}>
              <p className="date">{`${item.Date} ${item.Time}`}</p>
              <p className="desc">{item.Comment}</p>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default LastUpdatePopUp;