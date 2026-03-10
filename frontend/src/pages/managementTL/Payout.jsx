import React from "react";
import "../../style/managementTL/PayOut.css";
import calender from "../../assets/managementTL/PayOut/calender.png";
import money from "../../assets/managementTL/PayOut/money.png";

function Payout() {
  return (
    <>
      <main id="payout-main">
        <h1>Pay Out</h1>
        <div id="tl-payout-container">
          <div id="tl-payout-top">
            <div id="tl-payout-left">
              <div id="tl-payout-select">
                <select id="tl-employee" name="employee">
                  <option value="" disabled selected>
                    Select Employee
                  </option>
                  <option value="emp1">Rahul Sharma</option>
                  <option value="emp2">Ajay Kumar</option>
                  <option value="emp3">Neha Verma</option>
                  <option value="emp4">Suresh Singh</option>
                </select>
              </div>

              <div id="tl-payout-filters">
                <div id="tl-payout-field1">
                  <span>Start Date</span>
                  <span id="tl-payout-icon1">
                    <img src={calender} alt="Calendar Icon" />
                  </span>
                </div>
                <div id="tl-payout-field2">
                  <span>End Date</span>
                  <span id="tl-payout-icon2">
                    <img src={calender} alt="Calendar Icon" />
                  </span>
                </div>
                <div id="tl-payout-actions">
                  <button id="tl-payout-field-btn">Search</button>
                </div>
              </div>
            </div>

            <aside id="tl-payout-stats">
              <div id="tl-payout-stat-card-blue">
                <div id="tl-payout-stat-title-blue">TOTAL PAY OUT</div>
                <div id="tl-payout-stat-body-blue">
                  <div id="tl-payout-stat-number-blue">400000</div>
                  <div id="tl-payout-rupee-blue">
                    <img src={money} alt="" />
                  </div>
                </div>
              </div>

              <div id="tl-payout-stat-card-green">
                <div id="tl-payout-stat-title-green">LAST MONTH PAY OUT</div>
                <div id="tl-payout-stat-body-green">
                  <div id="tl-payout-stat-number-green">500000</div>
                  <div id="tl-payout-rupee-green">
                    <img src={money} alt="" />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div id="tl-payout-table-card">
            <table id="mtl-payout-table">
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
                {[1, 2, 3, 4, 5, 6].map((row, index) => (
                  <tr key={index}>
                    <td>Bold Text Columns</td>
                    <td>Bold Text Columns</td>
                    <td>Bold Text Columns</td>
                    <td>Bold Text Columns</td>
                    <td>Bold Text Columns</td>
                    <td>
                      <button>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Payout;
