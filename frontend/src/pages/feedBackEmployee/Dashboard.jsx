import React from "react";
import solvedComplaints from "../../assets/feedbackEmployee/Dashboard/solvedComplaints.png";
import unsolvedComplaints from "../../assets/feedbackEmployee/Dashboard/unsolvedComplaints.png";
import totalFeedback from "../../assets/feedbackEmployee/Dashboard/totalFeedback.png";
import remainingFeedback from "../../assets/feedbackEmployee/Dashboard/remainingFeedback.png";
import "../../style/salesExecutive/dashboard.css";
import "../../style/managementEmployee/dashboard.css";
// import { Button } from "bootstrap";

const Dashboard = () => {
  return (
    <main>
      <div id="dashboard">
        <div id="dashboard-container">
          <section id="dashboard-data">
            <h1>Dashboard</h1>
            <div id="data-wrap">
              <div id="data">
                <h3>SOLVED COMPLAINTS</h3>
                <div id="num-vector">
                  <p>10</p>
                  <img src={solvedComplaints} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>UNSOLVED COMPLAINTS</h3>
                <div id="num-vector">
                  <p>1600</p>
                  <img src={unsolvedComplaints} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>TOTAL FEEDBACK</h3>
                <div id="num-vector">
                  <p>8000</p>
                  <img src={totalFeedback} alt="" />
                </div>
              </div>
              <div id="data">
                <h3>REMAINING FEEDBACK</h3>
                <div id="num-vector">
                  <p>16</p>
                  <img src={remainingFeedback} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section id="hot-clients">
            <div id="container">
              <div id="clients">
                <h1>Total Complaints</h1>
                <div id="client-list">
                  <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                    <table style={{width:"100%"}}>
                      <thead>
                        <th> </th>
                        <th>Company Name</th>
                        <th>Subject</th>
                        <th>Email_Id</th>
                        <th>Isseud Date</th>
                        <th>Discussion</th>
                        <th>Status</th>
                      </thead>
                      <tr>
                        <td>1</td>
                        <td>Graphura India</td>
                        <td>Vivek Kumar</td>
                        <td>vivek@gmail.com</td>
                        <td>10/10/25</td>
                        <td>
                          <button>View</button>
                        </td>
                        <td>
                          <button style={{ backgroundColor: "#11CE4D" }}>
                            Solved
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Graphura India</td>
                        <td>Vivek Kumar</td>
                        <td>vivek@gmail.com</td>
                        <td>10/10/25</td>
                        <td>
                          <button>View</button>
                        </td>
                        <td>
                          <button style={{ backgroundColor: "#D41A1A" }}>
                            Unsolved
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Graphura India</td>
                        <td>Vivek Kumar</td>
                        <td>vivek@gmail.com</td>
                        <td>10/10/25</td>
                        <td>
                          <button>View</button>
                        </td>
                        <td>
                          <button style={{ backgroundColor: "#11CE4D" }}>
                            Solved
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Graphura India</td>
                        <td>Vivek Kumar</td>
                        <td>vivek@gmail.com</td>
                        <td>10/10/25</td>
                        <td>
                          <button>View</button>
                        </td>
                        <td>
                          <button style={{ backgroundColor: "#11CE4D" }}>
                            Solved
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Graphura India</td>
                        <td>Vivek Kumar</td>
                        <td>vivek@gmail.com</td>
                        <td>10/10/25</td>
                        <td>
                          <button>View</button>
                        </td>
                        <td>
                          <button style={{ backgroundColor: "#D41A1A" }}>
                            Unsolved
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Graphura India</td>
                        <td>Vivek Kumar</td>
                        <td>vivek@gmail.com</td>
                        <td>10/10/25</td>
                        <td>
                          <button>View</button>
                        </td>
                        <td>
                          <button style={{ backgroundColor: "#D41A1A" }}>
                            Unsolved
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
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
