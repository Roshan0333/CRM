import React from "react";
import "../../style/Finance/Employeemanagement.css";
import "../../style/Finance/Payout.css";
// assest icons
import totalpayroll from "../../assets/finance/payout/totalpayroll.png";
import employeesPaid from "../../assets/finance/payout/employeesPaid.png";
import pendingPayments from "../../assets/finance/payout/pendingPayments.png";
import averageSalary from "../../assets/finance/payout/averageSalary.png";
import transferData from "../../assets/finance/payout/transferData.png";

export default function Payout() {
  return (
    <div className="emploeemanagementcontainer">
      <div className="header-row">
        <h1 className="page-title">Payout</h1>
      </div>
      <div id="dashboard-cards" style={{ marginBottom: "30px" }}>
        <div id="card" style={{ borderLeft: "5px solid #35CC7B" }}>
          <div id="text">
            <h6 style={{ color: "#35CC7B" }}>TOTAL PAYROLE THIS MONTH</h6>
            <h3>50</h3>
          </div>
          <img id="cards-img" src={totalpayroll} alt="" />
        </div>

        <div id="card" style={{ borderLeft: "5px solid #FF893F" }}>
          <div id="text">
            <h6 style={{ color: "#FF893F" }}>EMPLOYEES PAID</h6>
            <h3>237</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={employeesPaid} alt="" />
          </div>
        </div>

        <div id="card" style={{ borderLeft: "5px solid #B256FF" }}>
          <div id="text">
            <h6 style={{ color: "#B256FF" }}>PENDING PAYMENTS</h6>
            <h3>237</h3>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={pendingPayments} alt="" />
          </div>
        </div>

        <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
          <div id="text">
            <h6 style={{ color: "#FB57A1" }}>AVERAGE SALARY</h6>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={averageSalary} alt="" />
          </div>
        </div>
        <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
          <div id="text">
            <h6 style={{ color: "#FB57A1" }}>TRANSFER DATA TO ACCOUNTANT</h6>
          </div>
          <div id="vector-img">
            <img id="cards-img" src={transferData} alt="" />
          </div>
        </div>
      </div>

      {/* Place holders */}
      <div id="payout-placeholders">
        <input type="text" placeholder="Search (Employee Name or ID 🔍︎)" />

        <select className="select">
          <option>Month</option>
          <option>January</option>
          <option>February</option>
        </select>

        <button className="btn btn-primary" id="add-new-member-button">
          Filter Status
        </button>
      </div>

      <section id="hot-clients">
        <div id="container">
          <h1>Client Management</h1>
          <div id="client-list">
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              <table style={{ width: "100%" }}>
                <thead>
                  <th> </th>
                  <th>Employee Id</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Base Pay</th>
                  <th>Net Pay</th>
                  <th>Payment Status</th>
                  <th>Pay Now</th>
                </thead>
                <tr>
                  <td>1</td>
                  <td>Graphura India</td>
                  <td>Vivek Kumar</td>
                  <td>vivek@gmail.com</td>
                  <td>0123456789</td>
                  <td>Bold text column</td>
                  <button
                    id="td-btn"
                    style={{
                      backgroundColor: "#D41A1A",
                      color: "#ffffff",
                      borderRadius: "5px",
                      border: "none",
                      fontSize: "13px",
                      width: "68px",
                      height: "21px",
                      marginTop: "10px",
                      marginLeft: "45px",
                    }}
                  >
                    Pending
                  </button>
                  <td>
                    <button style={{ backgroundColor: "#008000" }}>
                      40,000
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Graphura India</td>
                  <td>Vivek Kumar</td>
                  <td>vivek@gmail.com</td>
                  <td>0123456789</td>
                  <td>Bold text column</td>
                  <button
                    id="td-btn"
                    style={{
                      backgroundColor: "#D41A1A",
                      color: "#ffffff",
                      borderRadius: "5px",
                      border: "none",
                      fontSize: "13px",
                      width: "68px",
                      height: "21px",
                      marginTop: "10px",
                      marginLeft: "45px",
                    }}
                  >
                    Pending
                  </button>
                  <td>
                    <button style={{ backgroundColor: "#008000" }}>
                      40,000
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Graphura India</td>
                  <td>Vivek Kumar</td>
                  <td>vivek@gmail.com</td>
                  <td>0123456789</td>
                  <td>Bold text column</td>
                  <button
                    id="td-btn"
                    style={{
                      backgroundColor: "#008000",
                      color: "#ffffff",
                      borderRadius: "5px",
                      border: "none",
                      fontSize: "13px",
                      width: "68px",
                      height: "21px",
                      marginTop: "10px",
                      marginLeft: "45px",
                    }}
                  >
                    Paid
                  </button>
                  <td>
                    <button style={{ backgroundColor: "#008000" }}>
                      40,000
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Graphura India</td>
                  <td>Vivek Kumar</td>
                  <td>vivek@gmail.com</td>
                  <td>0123456789</td>
                  <td>Bold text column</td>
                  <button
                    id="td-btn"
                    style={{
                      backgroundColor: "#008000",
                      color: "#ffffff",
                      borderRadius: "5px",
                      border: "none",
                      fontSize: "13px",
                      width: "68px",
                      height: "21px",
                      marginTop: "10px",
                      marginLeft: "45px",
                    }}
                  >
                    Paid
                  </button>
                  <td>
                    <button style={{ backgroundColor: "#008000" }}>
                      40,000
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Graphura India</td>
                  <td>Vivek Kumar</td>
                  <td>vivek@gmail.com</td>
                  <td>0123456789</td>
                  <td>Bold text column</td>
                  <button
                    id="td-btn"
                    style={{
                      backgroundColor: "#D41A1A",
                      color: "#ffffff",
                      borderRadius: "5px",
                      border: "none",
                      fontSize: "13px",
                      width: "68px",
                      height: "21px",
                      marginTop: "10px",
                      marginLeft: "45px",
                    }}
                  >
                    Pending
                  </button>
                  <td>
                    <button style={{ backgroundColor: "#008000" }}>
                      40,000
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Graphura India</td>
                  <td>Vivek Kumar</td>
                  <td>vivek@gmail.com</td>
                  <td>0123456789</td>
                  <td>Bold text column</td>
                  <button
                    id="td-btn"
                    style={{
                      backgroundColor: "#D41A1A",
                      color: "#ffffff",
                      borderRadius: "5px",
                      border: "none",
                      fontSize: "13px",
                      width: "68px",
                      height: "21px",
                      marginTop: "10px",
                      marginLeft: "45px",
                    }}
                  >
                    Pending
                  </button>
                  <td>
                    <button style={{ backgroundColor: "#008000" }}>
                      40,000
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
