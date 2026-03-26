import React from "react";
import "../../style/feedbackManager/feedbackManagerDashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";
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


  const [hotComplaints, setHotComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalData: 0,
    totalFeedbacks: 0,
    totalComplaints: 0,
    remainingFeedbacks: 0,
    unsolvedComplaints: 0,
    totalTeam: 0,
    totalIncome: 0,
    lastMonthIncome: 0
  });

useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const complaintsRes = await axios.get(`http://localhost:5000/api/complaints?status=Unsolved`);
        
        const statsRes = await axios.get(`http://localhost:5000/api/feedback/stats`);

        if (Array.isArray(complaintsRes.data)) {
          const sorted = complaintsRes.data.sort((a, b) => {
            if (a.priority === 'High' && b.priority !== 'High') return -1;
            return 0;
          });
          setHotComplaints(sorted.slice(0, 2));
        }

        if (statsRes.data) {
          setStats(statsRes.data);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="feedbackManagerDashboardMainContainer">
        <h1>Dashboard</h1>
        <div className="grid">
          <div className="left">
            <ManagerDashboardChart chartData={stats} />
          </div>

          <div className="right">
            <div className="hot-header">
              <h3 className="complaints">Hot Complaints</h3>
              <span className="live-indicator">Live</span>
            </div>

            <div className="hot-complaints-list">
              {loading ? (
                <div className="loading-shimmer">Loading...</div>
              ) : hotComplaints.length > 0 ? (
                hotComplaints.map((item) => (
                  <div key={item._id} className="complaint-card-mini">
                    <div className={`status-line ${item.priority.toLowerCase()}`}></div>

                    <div className="card-content">
                      <div className="card-top">
                        <span className={`priority-badge-new ${item.priority.toLowerCase()}`}>
                          {item.priority}
                        </span>
                        <span className="complaint-date">{item.issuedDate}</span>
                      </div>

                      <h4 className="company-name">{item.companyName}</h4>
                      <p className="subject-text">{item.subject}</p>

                      <div className="card-bottom">
                        <div className="assignee">
                          <div className="avatar-circle">
                            {item.assignedEmployee?.name?.charAt(0) || "U"}
                          </div>
                          <span>{item.assignedEmployee?.name || "Unassigned"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No urgent complaints found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bottom">
          {/* <h1>Complaints</h1> */}
          <section id="manager-dashboard-data">
            <div id="data-wrap">
              <div id="data">
                <h3>TOTAL DATA</h3>
                <div id="num-vector">
                  <p>{stats.totalData}</p>
                  <img src={totalData} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL FEEDBACKS</h3>
                <div id="num-vector">
                  <p>{stats.totalFeedbacks}</p>
                  <img src={TOTALFEEDBACKs} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL COMPLAINTS</h3>
                <div id="num-vector">
                  <p>{stats.totalComplaints}</p>
                  <img src={TOTALCOMPLAINTS} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>REMAINING FEEDBACKS</h3>
                <div id="num-vector">
                  <p>{stats.remainingFeedbacks}</p>
                  <img src={REMAININGFEEDBACKS} alt="" />
                </div>
              </div>
            </div>

            <div id="data-wrap">
              <div id="data">
                <h3>UNSOLVED COMPLAINTS</h3>
                <div id="num-vector">
                  <p>{stats.unsolvedComplaints}</p>
                  <img src={UNSOLVEDCOMPLAINTS} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL TEAM</h3>
                <div id="num-vector">
                  <p>{stats.totalTeam}</p>
                  <img src={TOTALTEAM} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL INCOME</h3>
                <div id="num-vector">
                  <p>{stats.totalIncome}</p>
                  <img src={TOTALINCOME} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>LAST MONTH INCOME</h3>
                <div id="num-vector">
                  <p>{stats.lastMonthIncome}</p>
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
