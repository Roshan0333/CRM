// import React, { useState } from "react";
import clientData from "../../assets/salesExecutive/Dashboard/clientData.png";
import payout from "../../assets/salesExecutive/Dashboard/payout.png";
import prospectNumber from "../../assets/salesExecutive/Dashboard/prospectNumber.png";
import totalSales from "../../assets/salesExecutive/Dashboard/totalSales.png";
import "../../style/managementTL/dashboard.css";
// import { Button } from "bootstrap";

const Dashboard = () => {
  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1 style={{fontSize: "36px"}}>Dashboard</h1>
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
                  <p>7</p>
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
                  <p>16</p>
                  <img src={prospectNumber} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>Upcomming Projects</h1>
                <div id="client-list" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  <table id="management-table">
                    <thead>
                      <th> </th>
                      <th>Company Name</th>
                      <th>Invoice No.</th>
                      <th>Services</th>
                      <th>Date</th>
                      <th>Deadline</th>
                      <th>Activity</th>
                    </thead>
                    <tr>
                      <td>1</td>
                      <td>Graphura India</td>
                      <td>123456789</td>
                      <td>wev dev</td>
                      <td>10/10/25</td>
                      <td>30/11/25</td>
                      <td>
                        <button>Update</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Graphura India</td>
                      <td>123456789</td>
                      <td>wev dev</td>
                      <td>10/10/25</td>
                      <td>30/11/25</td>
                      <td>
                        <button>Update</button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Graphura India</td>
                      <td>123456789</td>
                      <td>wev dev</td>
                      <td>10/10/25</td>
                      <td>30/11/25</td>
                      <td>
                        <button>Update</button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Graphura India</td>
                      <td>123456789</td>
                      <td>wev dev</td>
                      <td>10/10/25</td>
                      <td>30/11/25</td>
                      <td>
                        <button>Update</button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Graphura India</td>
                      <td>123456789</td>
                      <td>wev dev</td>
                      <td>10/10/25</td>
                      <td>30/11/25</td>
                      <td>
                        <button>Update</button>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Graphura India</td>
                      <td>123456789</td>
                      <td>wev dev</td>
                      <td>10/10/25</td>
                      <td>30/11/25</td>
                      <td>
                        <button>Update</button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
