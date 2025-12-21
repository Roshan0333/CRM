import { useState } from "react";
function LastUpdatePopUp({closePopup}){
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
              <div className="update-row">
                <p className="date">25/06/2025 07:04 PM</p>
                <p className="desc">
                  I cannot directly generate HTML and CSS from an image of a
                  dashboard. My capabilities do not extend to converting visual
                  layouts into code.
                </p>
              </div>

              <div className="update-row">
                <p className="date">25/06/2025 07:04 PM</p>
                <p className="desc">
                  I cannot directly generate HTML and CSS from an image of a
                  dashboard. My capabilities do not extend to converting visual
                  layouts into code.
                </p>
              </div>

              <div className="update-row">
                <p className="date">25/06/2025 07:04 PM</p>
                <p className="desc">
                  I cannot directly generate HTML and CSS from an image of a
                  dashboard. My capabilities do not extend to converting visual
                  layouts into code.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
}

export default LastUpdatePopUp;