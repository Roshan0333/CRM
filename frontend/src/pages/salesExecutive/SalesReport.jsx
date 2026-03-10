import React, { useEffect, useState } from "react";
import "../../style/salesExecutive/salesReport.css";
import {TotalSale} from "../../services/salesDepartmentApi";

const SalesReport = () => {
  const data = [
    {
      companyName: "Bold text column",
      clientName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      services: "Bold text column",
      date: "Select",
    },
    {
      companyName: "Bold text column",
      clientName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      services: "Bold text column",
      date: "Bold text column",
    },
    {
      companyName: "Bold text column",
      clientName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      services: "Bold text column",
      date: "Bold text column",
    },
    {
      companyName: "Bold text column",
      clientName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      services: "Bold text column",
      date: "Bold text column",
    },
    {
      companyName: "Bold text column",
      clientName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      services: "Bold text column",
      date: "Bold text column",
    },
    {
      companyName: "Bold text column",
      clientName: "Bold text column",
      email: "Bold text column",
      contact: "Bold text column",
      services: "Bold text column",
      date: "Bold text column",
    },
  ];

  const [totalSalesList, setTotalSalesList] = useState([]);

  useEffect(() => {
    ;(
      async () => {
        let salesApi_Response = await TotalSale();

        if(!salesApi_Response.ok || !salesApi_Response.fetchMessage){
          alert(salesApi_Response.data)
        }
        else{
          setTotalSalesList(salesApi_Response.data.TotalSales[0].sales)
        
        }
      }
    )()
  },[])

  return (
    <div id="sales-report-container" style={{ backgroundColor: "#fff" }}>
      {/* Heading */}
      <h3 id="sales-report-heading" style={{color:"#5A5C69"}}>Sales Report</h3>

      {/* Table container */}
      <div id="sales-report-wrapper">
        <div id="sales-report-table-container">
          <table id="sales-report-table" style={{width:"100%"}}>
            <thead id="sales-report-thead">
              <tr id="sales-report-header-row">
                <th id="th-company">Company Name</th>
                <th id="th-client">Client Name</th>
                <th id="th-email">Email_id</th>
                <th id="th-contact">Contact no.</th>
                <th id="th-services">Services</th>
                <th id="th-date">Date</th>
              </tr>
            </thead>
            <tbody id="sales-report-tbody">
              {totalSalesList.map((item, index) => (
                <tr id={`sales-report-row-${index}`} key={index}>
                  <td id={`td-company-${index}`}>{item.ClientDetails.CompanyName}</td>
                  <td id={`td-client-${index}`}>{item.ClientDetails.ClientName}</td>
                  <td id={`td-email-${index}`}>{item.ClientDetails.Email_Id}</td>
                  <td id={`td-contact-${index}`}>{item.ClientDetails.Contact_No}</td>
                  <td id={`td-services-${index}`}>{item.Service}</td>
                  <td id={`td-date-${index}`}>{new Date(item.Date.toString()).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
