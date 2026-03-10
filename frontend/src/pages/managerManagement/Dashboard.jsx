// import React, { useState } from "react";
import totalProjects from "../../assets/managerManagement/Dashboard/totalProjects.png";
import currentProjects from "../../assets/managerManagement/Dashboard/currentProjects.png";
import completedProjects from "../../assets/managerManagement/Dashboard/completedProjects.png";
import remainingProjects from "../../assets/managerManagement/Dashboard/remainingProjects.png";
import totalEmployee from "../../assets/managerManagement/Dashboard/totalEmployee.png";
import income from "../../assets/managerManagement/Dashboard/income.png";
import importData from "../../assets/managerManagement/Dashboard/importData.png";
import "../../style/salesExecutive/dashboard.css";
import { axiosInstance } from "../../api/managementApi/axiosInstance";
import { useState } from "react";
import { useEffect } from "react";
// import { Button } from "bootstrap";

const Dashboard = () => {

   const [counts, setCounts] = useState({ tls: 0, members: 0 });
   useEffect(() => {
    const fetchCounts = async () => {
      const res = await axiosInstance.get("/management");
      setCounts(res.data);
    };

    fetchCounts();
  }, []);
  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1 style={{fontSize:"36px"}}>Dashboard</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL PROJECTS</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={totalProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>CURRENT PROJECTS</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={currentProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>COMPLETED PROJECTS</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={completedProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>REMAINING PROJECTS</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={remainingProjects} alt="" />
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
                  <img src={totalEmployee} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL EMPLOYEE</h3>
                <div id="num-vector">
                  <p>{counts.members}</p>
                  <img src={totalProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL TLS</h3>
                <div id="num-vector">
                  <p>{counts.tls}</p>
                  <img src={income} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TODAY'S PROSPECT</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={income} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="dashboard-data">
            <h1 style={{fontSize:"36px"}}>Feedback Department</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL DATA</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={totalProjects} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH INCOME</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={remainingProjects} alt="" />
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
                  <img src={importData} alt="" />
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
