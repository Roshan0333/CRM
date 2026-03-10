import React, { useState } from "react";
import "../../style/managementEmployee/CompleteProjects.css";

function CompleteProjects() {
  const [completedProjects, setCompletedProjects] = useState("")
  return (
    <>
      <main id="completeProject-main">
        <div id="main-content">
          <p>Completed Projects</p>

          <div id="table-content">
            <table style={{ width: "100%" }}>
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

              <tbody>
                {completedProjects.length > 0 ? (
                  completedProjects.map((project) => (
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
                      No completed projects found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </>
  );
}

export default CompleteProjects;
