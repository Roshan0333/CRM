// import React, { useState } from "react";
import growth from "../../assets/salesManager/Dashboard/growth.png";
import transferData from "../../assets/salesManager/Dashboard/transferData.png";
import totalEmployee from "../../assets/salesManager/Dashboard/totalEmployee.png";
import data from "../../assets/salesManager/Dashboard/data.png";
import income from "../../assets/salesManager/Dashboard/income.png";
import prospect from "../../assets/salesManager/Dashboard/prospect.png";
import "../../style/salesExecutive/dashboard.css";
import { useEffect, useState } from "react";
import { currentYearSales } from "../../services/salesDepartmentApi";
// import { Button } from "bootstrap";

const Dashboard = () => {


  const [totalSales, setTotalSales] = useState() 
  useEffect(() => {
    ; (
      async () => {
        const apiResponse = await currentYearSales();

        if (!apiResponse.fetchMessage) {
          console.log(apiResponse.data)
          return
        }
        else if (!apiResponse.ok) {
          alert(apiResponse.data || "No Sales")
          return
        }
        else {
          setTotalSales(apiResponse.data.TotalSales.length)
        }
      }
    )()
  })

  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1>Dashboard</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL SALES</h3>
                <div id="num-vector">
                  <p>{totalSales}</p>
                  <img src={growth} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH SALES</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={growth} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>THIS MONTH SALES</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={growth} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TODAY'S SALES</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={growth} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="dashboard-data">
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL TRANSFER DATA</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={transferData} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL EMPLOYEE</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={totalEmployee} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL TLS</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={data} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TODAY'S PROSPECT</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={prospect} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="dashboard-data">
            <div id="data-wrap">
              <div id="data">
                <h3>MONTHLY INCOME</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={income} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH INCOME</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={income} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL INCOME</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={income} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL IMPORT DATA</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={data} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="dashboard-data">
            <h1>FINANCE DEPT.</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL DATA</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={data} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH INCOME</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={income} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL INCOME</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={income} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL IMPORT DATA</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={data} alt="" />
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
