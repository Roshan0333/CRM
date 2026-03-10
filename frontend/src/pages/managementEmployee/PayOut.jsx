import React, { useState } from 'react';
import "../../style/managementEmployee/PayOut.css";
import calender from "../../assets/managementEmployee/PayOut/calender.png";
import money from "../../assets/managementEmployee/PayOut/money.png";

function PayOut() {

  const [payout,setPayout] = useState("")
  return (
    <>
      <main id='payout-main'>
        <div id="payout-container">
          <div id="payout-top">
            <div id="payout-left">
              <h1>Pay Out</h1>

              <div id="payout-filters">
                <div id="payout-field">
                  <span>Start Date</span>
                  <span id="payout-icon"><img src={calender} alt="Calendar Icon" /></span>
                </div>
                <div id="payout-field2">
                  <span>End Date</span>
                  <span id="payout-icon2"><img src={calender} alt="Calendar Icon" /></span>
                </div>
                <div id="payout-actions">
                  <button id="payout-field-btn">Search</button>
                </div>
              </div>
            </div>

            <aside id="payout-stats">
              <div id="payout-stat-card-blue">
                <div id="payout-stat-title-blue">TOTAL PAY OUT</div>
                <div id="payout-stat-body-blue">
                  <div id="payout-stat-number-blue">4</div>
                  <div id="payout-rupee-blue"><img src={money} alt="" /></div>
                </div>
              </div>

              <div id="payout-stat-card-green">
                <div id="payout-stat-title-green">LAST MONTH PAY OUT</div>
                <div id="payout-stat-body-green">
                  <div id="payout-stat-number-green">5</div>
                  <div id="payout-rupee-green"><img src={money} alt="" /></div>
                </div>
              </div>
            </aside>
          </div>

          <div id="payout-table-card">
            <table id="payout-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Invoice No.</th>
                  <th>Services</th>
                  <th>Total Amount</th>
                  <th>Completed Date</th>
                  <th>Project File</th>
                </tr>
              </thead>

              <tbody id="payout-tbody">
                {payout.length > 0 ? (
                  payout.map((project) => (
                    <tr key={project.id}>
                      <td>{project.companyName}</td>
                      <td>{project.invoiceNo}</td>
                      <td>{project.services}</td>
                      <td>{project.totalAmount}</td>
                      <td>{project.completedDate}</td>
                      <td>
                        <button
                          onClick={() => window.open(project.fileUrl, "_blank")}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No payout data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default PayOut;
