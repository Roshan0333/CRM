import React, { useCallback, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// icons
import searchIcon from "../../assets/finance/invoice/searchIcon.png";
import createinvoice from "../../assets/finance/invoice/createinvoice.png";
import editinvoice from "../../assets/finance/invoice/editinvoice.png";
import viewinvoice from "../../assets/finance/invoice/viewinvoice.png";
import totalinvoice from "../../assets/finance/invoice/totalinvoice.png";
import pendingpayment from "../../assets/finance/invoice/pendingpayment.png";
import duesoon from "../../assets/finance/invoice/duesoon.png";
import overdue from "../../assets/finance/invoice/overdue.png";
import ontrack from "../../assets/finance/invoice/ontrack.png";

export default function InvoiceUI() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const items = [
    { description: "Brand consultation", qty: 1, rate: 100, total: 100 },
    { description: "Logo design", qty: 1, rate: 100, total: 100 },
    { description: "Website design", qty: 1, rate: 100, total: 100 },
    { description: "Social media templates", qty: 1, rate: 100, total: 100 },
    { description: "Brand photography", qty: 1, rate: 100, total: 100 },
    { description: "Brand guide", qty: 1, rate: 100, total: 100 },
  ];

  const subtotal = items.reduce((s, it) => s + it.total, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const initialNewItem = { serviceName: "", unitPrice: 0, quantity: 1 };
  const [newInvoiceItems, setNewInvoiceItems] = useState([initialNewItem]);

  const handleItemChange = useCallback(
    (index, field, value) => {
      const updatedItems = [...newInvoiceItems];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === "serviceName" ? value : parseFloat(value) || 0,
      };
      setNewInvoiceItems(updatedItems);
    },
    [newInvoiceItems]
  );

  // Calculations for the new invoice modal
  const newInvoiceSummary = useMemo(() => {
    const s = newInvoiceItems.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0
    );
    const t = s * 0.1;
    const tt = s + t;
    return { subtotal: s, tax: t, total: tt };
  }, [newInvoiceItems]);

  const inputStyle = {
    padding: "10px 12px",
    border: "1px solid #000",
    borderRadius: "6px",
    fontSize: "20px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const invoices = [
    {
      empId: "Bold text column",
      transId: "Bold text column",
      dateTime: "Bold text column",
      invoiceNo: "Bold text column",
      company: "Bold text column",
      email: "Bold text column",
      totalAmount: "Bold text column",
      receivedPayment: "Bold text column",
      pendingPayment: "Bold text column",
      status: "Completed",
    },
    {
      empId: "Bold text column",
      transId: "Bold text column",
      dateTime: "Bold text column",
      invoiceNo: "Bold text column",
      company: "Bold text column",
      email: "Bold text column",
      totalAmount: "Bold text column",
      receivedPayment: "Bold text column",
      pendingPayment: "Bold text column",
      status: "Processing",
    },
    {
      empId: "Bold text column",
      transId: "Bold text column",
      dateTime: "Bold text column",
      invoiceNo: "Bold text column",
      company: "Bold text column",
      email: "Bold text column",
      totalAmount: "Bold text column",
      receivedPayment: "Bold text column",
      pendingPayment: "Bold text column",
      status: "Completed",
    },
    {
      empId: "Bold text column",
      transId: "Bold text column",
      dateTime: "Bold text column",
      invoiceNo: "Bold text column",
      company: "Bold text column",
      email: "Bold text column",
      totalAmount: "Bold text column",
      receivedPayment: "Bold text column",
      pendingPayment: "Bold text column",
      status: "Processing",
    },
    {
      empId: "Bold text column",
      transId: "Bold text column",
      dateTime: "Bold text column",
      invoiceNo: "Bold text column",
      company: "Bold text column",
      email: "Bold text column",
      totalAmount: "Bold text column",
      receivedPayment: "Bold text column",
      pendingPayment: "Bold text column",
      status: "Processing",
    },
    {
      empId: "Bold text column",
      transId: "Bold text column",
      dateTime: "Bold text column",
      invoiceNo: "Bold text column",
      company: "Bold text column",
      email: "Bold text column",
      totalAmount: "Bold text column",
      receivedPayment: "Bold text column",
      pendingPayment: "Bold text column",
      status: "Processing",
    },
    {
      empId: "Bold text column",
      transId: "Bold text column",
      dateTime: "Bold text column",
      invoiceNo: "Bold text column",
      company: "Bold text column",
      email: "Bold text column",
      totalAmount: "Bold text column",
      receivedPayment: "Bold text column",
      pendingPayment: "Bold text column",
      status: "Processing",
    },
  ];

  const service = [
    {
      srno: 1,
      service: "Bold text column",
      unitprice: "Bold text column",
      quantity: "Bold text column",
      total: "Bold text column",
    },
    {
      srno: 2,
      service: "Bold text column",
      unitprice: "Bold text column",
      quantity: "Bold text column",
      total: "Bold text column",
    },
    {
      srno: 3,
      service: "Bold text column",
      unitprice: "Bold text column",
      quantity: "Bold text column",
      total: "Bold text column",
    },
  ];

  const Card = ({ color, bg, img, text, onClick }) => (
    <div
      onClick={onClick}
      style={{
        borderLeft: `4px solid ${color}`,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        backgroundColor: bg,
        padding: "12px 18px",
        borderRadius: "12px",
        cursor: onClick ? "pointer" : "default",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
        flex: "1 1 calc(20% - 16px)",
        minWidth: "150px",
        maxWidth: "350px",
        height: "100px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-1px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0px)")
      }
    >
      {img && (
        <img src={img} alt="" style={{ width: "36px", height: "36px" }} />
      )}

      <h6 style={{ color, fontSize: "15px", margin: 0, fontWeight: 600 }}>
        {text}
      </h6>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "1.5rem 2rem 2rem 300px",
      }}
    >
      {/* Title */}
      <div
        style={{
          marginLeft: "1rem",
          marginBottom: "1.5rem",
          marginTop: "1rem",
        }}
      >
        <h2
          style={{
            fontSize: "36 px",
            color: "#222",
            fontWeight: 600,
          }}
        >
          INVOICE
        </h2>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // gap: "100px",
        }}
        id="invoice-wrap"
      >
        <div style={{ marginBottom: "1.5rem", marginLeft: "2rem" }}>
          <p style={{ fontSize: "16px", marginBottom: "8px", fontWeight: 500 }}>
            Search
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "280px",
              height: "42px",
              backgroundColor: "#fff",
            }}
          >
            <input
              style={{
                flex: 1,
                height: "100%",
                border: "none",
                paddingLeft: "12px",
                outline: "none",
                fontSize: "14px",
                borderRadius: "8px 0 0 8px",
              }}
              placeholder="Search invoice..."
            />
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                width: "42px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={searchIcon}
                alt=""
                style={{ width: "18px", height: "18px" }}
              />
            </button>
          </div>
        </div>
        <div style={{ width: "343px", margintop:"50px" }}>
          <select className="form-select">
            <li>
              <option>Employee Name</option>
              <option>Dheeraj</option>
              <option>Vivek Kumar</option>
            </li>
          </select>
        </div>
      </div>
      {/* Cards */}
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Card
          height="200px"
          color="#35CC7B"
          img={createinvoice}
          text="Create Invoice"
          onClick={() => setShowAddModal(true)}
        />
        <Card color="#FF893F" img={editinvoice} text="Edit Invoice" />
        <Card
          color="#B256FF"
          img={viewinvoice}
          text="View Invoice"
          onClick={() => setShowViewModal(true)}
        />
        <Card color="#FB57A1" img={totalinvoice} text="Total Invoice" />
        <Card color="#42B3E9" img={pendingpayment} text="Pending Payment" />
      </div>

      {/* Cards 2 */}
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Card color="#35CC7B" img={duesoon} text="Due Soon" />
        <Card color="#FF893F" img={overdue} text="Overdue" />
        <Card color="#B256FF" img={ontrack} text="On Track" />
        <Card color="#FB57A1" />
        <Card color="#42B3E9" />
      </div>

      {/* Table Section */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: "0rem",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "1200px",
            borderCollapse: "collapse",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "14px",
          }}
        >
          <thead
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
            }}
          >
            <tr>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Employee ID
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Transaction ID
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Date & Time
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Invoice No.
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Company Name
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Email
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Total Amount
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Received
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Pending
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Invoice
              </th>
              <th
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #e9ecef" }}>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.empId}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.transId}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.dateTime}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.invoiceNo}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.company}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.email}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.totalAmount}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.receivedPayment}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {invoice.pendingPayment}
                </td>
                <td style={{ padding: "12px 8px", textAlign: "center" }}>
                  <button
                    onClick={() => setShowViewModal(true)}
                    style={{
                      fontSize: "11px",
                      width: "68px",
                      height: "21px",
                      backgroundColor: "#3D68E7",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 500,
                    }}
                  >
                    View
                  </button>
                </td>
                <td style={{ padding: "12px 8px", textAlign: "center" }}>
                  <button
                    style={{
                      fontSize: "11px",
                      width: "68px",
                      height: "21px",
                      backgroundColor:
                        invoice.status === "Completed" ? "#11CE4D" : "#D41A1A",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "default",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 500,
                    }}
                  >
                    {invoice.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Invoice Modal */}
      {showViewModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
          onClick={() => setShowViewModal(false)}
        >
          <div
            style={{
              width: "90%",
              maxWidth: 1000,
              background: "#fff",
              borderRadius: 10,
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              maxHeight: "90vh",
              overflowY: "auto",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: 500,
                  marginLeft: "6rem",
                  marginBottom: "-4.5rem",
                  color: "#333",
                }}
              >
                Invoice
              </h2>
            </div>

            {/* Action Buttons Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                margintop: "1rem",
                marginBottom: "4rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#4972E8",
                  color: "#fff",
                  padding: "6px 16px",
                  width: "218px",
                  height: "33px",
                  borderRadius: "5px",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Sales Executive Name : Het Patel
              </div>
              <button
                style={{
                  padding: "6px 16px",
                  width: "108px",
                  height: "33px",
                  backgroundColor: "#008000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Print
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                style={{
                  padding: "6px 16px",
                  width: "108px",
                  height: "33px",
                  backgroundColor: "#FF0000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Close
              </button>
            </div>

            {/* Invoice Details Section */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginBottom: "2rem",
                padding: "0 8rem",
              }}
            >
              {/* Left Column */}
              <div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#666",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                      letterSpacing: ".5px",
                    }}
                  >
                    ISSUED TO:
                  </p>
                  <p
                    style={{ fontSize: "14px", margin: "2px 0", color: "#333" }}
                  >
                    Richard Sanchez
                  </p>
                  <p
                    style={{ fontSize: "14px", margin: "2px 0", color: "#333" }}
                  >
                    Thynk Unlimited
                  </p>
                  <p
                    style={{ fontSize: "14px", margin: "2px 0", color: "#333" }}
                  >
                    123 Anywhere St., Any City
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#666",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                      letterSpacing: ".5px",
                    }}
                  >
                    PAY TO:
                  </p>
                  <p
                    style={{ fontSize: "14px", margin: "2px 0", color: "#333" }}
                  >
                    Borcele Bank
                  </p>
                  <p
                    style={{ fontSize: "14px", margin: "2px 0", color: "#333" }}
                  >
                    Account Name: Adeline Palmerston
                  </p>
                  <p
                    style={{ fontSize: "14px", margin: "2px 0", color: "#333" }}
                  >
                    Account No.: 0123 4567 8901
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "3.6rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#666",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    INVOICE NO:{" "}
                  </span>
                  <span
                    style={{ fontSize: "14px", color: "#666", fontWeight: 700 }}
                  >
                    01234
                  </span>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#666",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    DATE:{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      letterSpacing: "2px",
                    }}
                  >
                    11.02.2030
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#666",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    DUE DATE:{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      letterSpacing: "2px",
                    }}
                  >
                    11.03.2030
                  </span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div style={{ marginBottom: "2rem", padding: "0 1rem 0 1rem" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                  borderBottom: "1.5px solid #000",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1.5px solid #000" }}>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#333",
                        textTransform: "uppercase",
                        letterSpacing: ".5px",
                        backgroundColor: "white",
                      }}
                    >
                      DESCRIPTION
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#333",
                        textTransform: "uppercase",
                        letterSpacing: ".5px",
                        backgroundColor: "white",
                      }}
                    >
                      UNIT PRICE
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#333",
                        textTransform: "uppercase",
                        letterSpacing: ".5px",
                        backgroundColor: "white",
                      }}
                    >
                      QTY
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#333",
                        textTransform: "uppercase",
                        letterSpacing: ".5px",
                        backgroundColor: "white",
                      }}
                    >
                      TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={i}>
                      <td
                        style={{
                          padding: "12px 8px",
                          fontSize: "12px",
                          color: "#333",
                          fontWeight: 400,
                          letterSpacing: ".5px",
                          border: "none",
                        }}
                      >
                        {it.description}
                      </td>
                      <td
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: "#333",
                          fontWeight: 400,
                          border: "none",
                        }}
                      >
                        {it.rate}
                      </td>
                      <td
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: "#333",
                          fontWeight: 400,
                          border: "none",
                        }}
                      >
                        {it.qty}
                      </td>
                      <td
                        style={{
                          padding: "12px 8px",
                          textAlign: "right",
                          fontSize: "12px",
                          color: "#333",
                          fontWeight: 400,
                          border: "none",
                        }}
                      >
                        ${it.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                  SUBTOTAL
                </span>
                <span>$400</span>
              </div>
              <div
                style={{
                  width: "",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "8px 0",
                    fontSize: "12px",
                    color: "#333",
                    gap: "4rem",
                    fontWeight: 400,
                  }}
                >
                  <span style={{ fontWeight: 500 }}>Tax</span>
                  <span>10%</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "12px 0",
                    fontSize: "14 px",
                    fontWeight: 600,
                    color: "#333",
                    gap: "3rem",
                  }}
                >
                  <span style={{ textTransform: "uppercase" }}>TOTAL</span>
                  <span>$440</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              width: "95%",
              maxWidth: 1000,
              background: "#fff",
              borderRadius: 10,
              padding: "1.5rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              maxHeight: "90vh",
              overflowY: "auto",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {/* Header and Close Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h5 style={{ fontSize: "32px", fontWeight: 400, margin: 0 }}>
                Add Invoice
              </h5>
            </div>
            {/* Sales Executive Badge */}
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#4972E8",
                  color: "#fff",
                  width: "218px",
                  height: "33px",
                  padding: "5px 5px",
                  borderRadius: "5px",
                  fontWeight: 600,
                  fontSize: "13px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                Sales Executive Name : Het Patel
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  fontSize: "13px",
                  padding: "6px 14px",
                  width: "108px",
                  height: "33px",
                  backgroundColor: "#FF0000",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
            <div style={{ padding: "1rem" }}>
              {/* Company/Invoice Inputs (Two-Column Layout) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                <input style={inputStyle} placeholder="Company Name" />
                <input style={inputStyle} placeholder="Invoice no." />
              </div>

              {/* Company Address (Textarea) */}

              <textarea
                style={{
                  ...inputStyle,
                  height: "80px",
                  resize: "none",
                  marginBottom: "1.5rem",
                }}
                placeholder="Company Address"
              />

              {/* Itemized Services Table */}
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  padding: "0rem",
                  overflowX: "auto",
                  marginBottom: "2.5rem",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderBottom: "2px solid #dee2e6",
                      tableLayout: "fixed",
                      width: "100%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          fontSize: "15px",
                          fontWeight: 500,
                          padding: "12px 0px",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          color: "#000",
                        }}
                      >
                        Sr no.
                      </th>
                      <th
                        style={{
                          fontSize: "15px",
                          fontWeight: 500,
                          padding: "12px 0px",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          color: "#000",
                        }}
                      >
                        Service Name
                      </th>
                      <th
                        style={{
                          fontSize: "15px",
                          fontWeight: 500,
                          padding: "12px 0px",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          color: "#000",
                        }}
                      >
                        Unit Price
                      </th>
                      <th
                        style={{
                          fontSize: "15px",
                          fontWeight: 500,
                          padding: "12px 0px",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          color: "#000",
                        }}
                      >
                        Quantity
                      </th>
                      <th
                        style={{
                          fontSize: "15px",
                          fontWeight: 500,
                          padding: "12px 0px",
                          textAlign: "center",
                          color: "#000",
                        }}
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.map((service, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid #e9ecef" }}
                      >
                        <td
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "12px 0px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {service.srno}
                        </td>
                        <td
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "12px 0px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {service.service}
                        </td>
                        <td
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "12px 0px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {service.unitprice}
                        </td>
                        <td
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "12px 0px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {service.quantity}
                        </td>
                        <td
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "12px 0px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {service.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ width: "100%", marginTop: "3rem" }}>
                  {/* Summary Table */}
                  <div
                    style={{
                      minWidth: "200px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 20px",
                        fontSize: "14px",
                        color: "#000",
                      }}
                    >
                      <span>Subtotal</span>
                      <span>400/-</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 20px",
                        fontSize: "14px",
                        color: "#000",
                      }}
                    >
                      <span>Tax</span>
                      <span>10 %</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        fontSize: "14px",
                        fontWeight: 500,
                        backgroundColor: "#4972E8",
                        color: "#fff",
                      }}
                    >
                      <span>Total</span>
                      <span>440/-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
