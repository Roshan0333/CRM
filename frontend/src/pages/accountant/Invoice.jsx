import React, { useState } from "react";

import "../../style/accountant/Invoice.css";

const Invoice = () => {
  const data = Array(8).fill({
    company: "Bold text column",
    client: "Bold text column",
    email: "Bold text column",
    contact: "Bold text column",
    payment: "Bold text column",
    date: "Bold text column",
  });
  const [showPopup, setShowpopup] = useState(false);

  const openPopup = () => setShowpopup(true);
  const closePopup = () => setShowpopup(false);

  return (
    <div className="invoice-container">
      <h1 className="invoice-title">Invoice</h1>

      <div className="table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Client Name</th>
              <th>Email_id</th>
              <th>Contact No.</th>
              <th>Total Payment</th>
              <th>Starting Date</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.company}</td>
                <td>{row.client}</td>
                <td>{row.email}</td>
                <td>{row.contact}</td>
                <td>{row.payment}</td>
                <td>{row.date}</td>
                <td>
                  <button className="view-btn" onClick={openPopup}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <div className="invoice-popup-overlay" onClick={closePopup}>
            <div className="invoice-popup" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="invoice-popup-header">
                <h2>Invoice</h2>
                <div className="invoice-btn-group">
                  <button className="print-btn">Print</button>
                  <button className="close-btn" onClick={closePopup}>
                    Close
                  </button>
                </div>
              </div>

              {/* Issued & Pay To */}
              <div className="invoice-info-section">
                <div>
                  <h4>ISSUED TO:</h4>
                  <p>Richard Sanchez</p>
                  <p>Thynk Unlimited</p>
                  <p>123 Anywhere St., Any City</p>
                </div>

                <div className="invoice-right-info">
                  <p>
                    <strong>INVOICE NO:</strong> 01234
                  </p>
                  <p>
                    <strong>DATE:</strong> 11.02.2030
                  </p>
                  <p>
                    <strong>DUE DATE:</strong> 11.03.2030
                  </p>
                </div>
              </div>

              <div className="invoice-info-section">
                <div>
                  <h4>PAY TO:</h4>
                  <p>Borcelle Bank</p>
                  <p>Account Name: Adeline Palmerston</p>
                  <p>Account No.: 0123 4567 8901</p>
                </div>
              </div>

              {/* Table */}
              <table className="invoice-detail-table">
                <thead>
                  <tr>
                    <th>DESCRIPTION</th>
                    <th>UNIT PRICE</th>
                    <th>QTY</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Brand consultation</td>
                    <td>100</td>
                    <td>1</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Logo design</td>
                    <td>100</td>
                    <td>1</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Website design</td>
                    <td>100</td>
                    <td>1</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Social media templates</td>
                    <td>100</td>
                    <td>1</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Brand photography</td>
                    <td>100</td>
                    <td>1</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Brand guide</td>
                    <td>100</td>
                    <td>1</td>
                    <td>$100</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals */}
              <div className="invoice-total-box">
                <p>
                  SUBTOTAL: <strong>$400</strong>
                </p>
                <p>Tax &nbsp;10%</p>
                <h3>
                  TOTAL: <strong>$440</strong>
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
