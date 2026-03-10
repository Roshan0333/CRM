import React from "react";
import "../../style/feedbackManager/feedbackManagerDashboard.css";
import ManagerDashboardChart from "./ManagerDashboardChart";

// Assets
import totalData from "../../assets/feedbackManager/dashboard/totalData.png";
import TOTALFEEDBACKs from "../../assets/feedbackManager/dashboard/totalFeedback.svg";
import TOTALCOMPLAINTS from "../../assets/feedbackManager/dashboard/TOTALCOMPLAINTS.svg";
import REMAININGFEEDBACKS from "../../assets/feedbackManager/dashboard/REMAININGFEEDBACKS.png";
import UNSOLVEDCOMPLAINTS from "../../assets/feedbackManager/dashboard/UNSOLVEDCOMPLAINTS.png";
import TOTALTEAM from "../../assets/feedbackManager/dashboard/TOTALTEAM.png";
import TOTALINCOME from "../../assets/feedbackManager/dashboard/TOTALINCOME.png";

function Dashboard() {
  return (
    <>
      <div className="feedbackManagerDashboardMainContainer">
        <h1>Dashboard</h1>
        <div className="grid">
          <div className="left">
            <ManagerDashboardChart />
          </div>

          <div className="right">
            <h3 className="complaints">Hot complaints </h3>
          </div>
        </div>

        <div className="bottom">
          {/* <h1>Complaints</h1> */}
          <section id="manager-dashboard-data">
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL DATA</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={totalData} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL FEEDBACKS</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={TOTALFEEDBACKs} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL COMPLAINTS</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={TOTALCOMPLAINTS} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>REMAINING FEEDBACKS</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={REMAININGFEEDBACKS} alt="" />
                </div>
              </div>
            </div>

            <div id="data-wrap">
              <div id="data">
                <h3>UNSOLVED COMPLAINTS</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={UNSOLVEDCOMPLAINTS} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL TEAM</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={TOTALTEAM} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL INCOME</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={TOTALINCOME} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH INCOME</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={TOTALINCOME} alt="" />
                </div>
              </div>
            </div>
          </section>

          <section id="dashboard-data"></section>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
