import React, { useMemo, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const API = "http://localhost:5000/api/invoice";


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
const initialNewItem = { serviceName: "", unitPrice: 0, quantity: 1 };
const [newInvoiceItems, setNewInvoiceItems] = useState([initialNewItem]);
const [companyName, setCompanyName] = useState("");
const [invoiceNo, setInvoiceNo] = useState("");
const [companyAddress, setCompanyAddress] = useState("");
const [invoiceDate, setInvoiceDate] = useState("");
const [dueDate, setDueDate] = useState("");
const [selectedInvoice, setSelectedInvoice] = useState(null);
const [invoices, setInvoices] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("ALL");
const [selectedEmployee, setSelectedEmployee] = useState("");
const [transactionId, setTransactionId] = useState("");
const [email, setEmail] = useState("");
const [clientName, setClientName] = useState("");

 useEffect(() => {
  fetchInvoices();
}, []);

const fetchInvoices = async () => {
  try {
    const res = await axios.get(API);
    setInvoices(res.data);
  } catch (err) {
    console.log("Fetch error", err);
  }
};



const saveInvoiceToDB = async () => {
  if (!selectedEmployee) {
    alert("Employee select kara");
    return;
  }

  if (!companyName) {
    alert("Company name bhar");
    return;
  }

  if (!newInvoiceItems[0].serviceName) {
    alert("Service name bhar");
    return;
  }

  try {
    const totalAmount = newInvoiceSummary.total;
    const receivedAmount = 0;
    const pendingAmount = totalAmount - receivedAmount;

    const payload = {
       clientName,
      companyName,
       salesExecutiveName: selectedEmployee,
       email,
      invoiceNo,
      transactionId,
      companyAddress,
      invoiceDate,
      dueDate,
      items: newInvoiceItems,
      summary: newInvoiceSummary,
      totalAmount,
      receivedAmount,
      pendingAmount,
      status: pendingAmount === 0 ? "Completed" : "Processing",
    };

    await axios.post(API, payload);
    await fetchInvoices();
    setShowAddModal(false);
    resetForm();
  } catch (error) {
    console.log("Error saving invoice:", error.response?.data || error);
  }
};



const toggleStatus = async (id) => {
  try {
    await axios.patch(`${API}/status/${id}`);
    await fetchInvoices();
  } catch (error) {
    console.log("Status update error:", error);
  }
};

const deleteInvoice = async (id) => {
  if (!window.confirm("Delete invoice?")) return;

  try {
    await axios.delete(`${API}/${id}`);
    await fetchInvoices();   // refresh list
  } catch (error) {
    console.log("Delete error:", error);
  }
};

const updateInvoiceInDB = async () => {
  try {
    const payload = {
      clientName,  
      companyName,
      salesExecutiveName: selectedEmployee,
      email,
      transactionId,
      companyAddress,
      invoiceDate,
      dueDate,
      items: newInvoiceItems,
      receivedAmount: selectedInvoice.receivedAmount // 🔥 important
    };

    await axios.put(`${API}/${selectedInvoice._id}`, payload);
    await fetchInvoices();
    setShowAddModal(false);
    resetForm();
  } catch (error) {
    console.log("Update error:", error);
  }
};


const receivePayment = async (id, amount) => {
  try {
    await axios.post(`${API}/payment/${id}`, { amount });
    await fetchInvoices();   // refresh
  } catch (error) {
    console.log("Payment error:", error);
  }
};

const filteredInvoices = invoices.filter((inv) => {
  const companyMatch = inv.companyName
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const employeeMatch = selectedEmployee
    ? inv.employeeName === selectedEmployee
    : true;

  const today = new Date();
  const due = new Date(inv.dueDate);
  const diff = (due - today) / (1000 * 60 * 60 * 24);

  let statusMatch = true;

  if (statusFilter === "PENDING") {statusMatch = inv.pendingAmount > 0;}
if (statusFilter === "COMPLETED") {statusMatch = inv.pendingAmount === 0;}
  if (statusFilter === "DUE_SOON") statusMatch = diff >= 0 && diff <= 3;
  if (statusFilter === "OVERDUE") statusMatch = due < today;
  if (statusFilter === "ONTRACK") statusMatch = diff > 3;
if (statusFilter === "DELETED") {statusMatch = inv.isDeleted === true;}

  return companyMatch && employeeMatch && statusMatch;
});
const deletedCount = invoices.filter(inv => inv.isDeleted).length;
const visibleInvoices =
  statusFilter === "DELETED"
    ? filteredInvoices.filter(inv => inv.isDeleted)
    : filteredInvoices.filter(inv => !inv.isDeleted);

const addRow = () => {
  setNewInvoiceItems([...newInvoiceItems, initialNewItem]);
};

const removeRow = (index) => {
  const updated = newInvoiceItems.filter((_, i) => i !== index);
  setNewInvoiceItems(updated);
};

const handleItemChange = (index, field, value) => {
  const updated = [...newInvoiceItems];
  updated[index][field] = field === "serviceName" ? value : Number(value);
  setNewInvoiceItems(updated);
};
const resetForm = () => {
  setClientName("");
  setCompanyName("");
  setInvoiceNo("");
  setTransactionId("");
  setSelectedEmployee("");
  setCompanyAddress("");
  setInvoiceDate("");
  setDueDate("");
  setNewInvoiceItems([{ serviceName: "", unitPrice: 0, quantity: 1 }]);
  setSelectedInvoice(null);
};

const today = new Date();

const totalCount = invoices.length;

const pendingCount = invoices.filter(inv => inv.status === "Pending" || inv.status === "Partially Paid").length;
const completedCount = invoices.filter(inv => inv.status === "Paid").length;


const dueSoonCount = invoices.filter((inv) => {
  const due = new Date(inv.dueDate);
  const diff = (due - today) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 3;
}).length;

const overdueCount = invoices.filter((inv) => {
  const due = new Date(inv.dueDate);
  return due < today;
}).length;

const onTrackCount = invoices.filter((inv) => {
  const due = new Date(inv.dueDate);
  const diff = (due - today) / (1000 * 60 * 60 * 24);
  return diff > 3;
}).length;
const handleDelete = () => {
  if (!selectedInvoice) return;

  const updated = invoices.map(inv =>
    inv.id === selectedInvoice.id
      ? { ...inv, isDeleted: true }
      : inv
  );

  setInvoices(updated);
  setSelectedInvoice(null);
};


 

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
            fontSize: "36px",
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
  placeholder="Search by company name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
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
        <div style={{ width: "343px", marginTop:"50px" }}>
        {/* <select
  className="form-select"
  value={selectedEmployee}
  onChange={(e) => setSelectedEmployee(e.target.value)}
>
  <option value="">Employee Name</option>
  <option value="Het Patel">Het Patel</option>
  <option value="Dheeraj">Dheeraj</option>
  <option value="Vivek Kumar">Vivek Kumar</option>
</select> */}


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
        <Card
  color="#FF893F"
  img={editinvoice}
  text="Edit Invoice"
  onClick={() => {
    if (!selectedInvoice) {
      alert("Select Invoice first");
      return;
    }

    // Selected invoice ची values form मध्ये टाक
    setClientName(selectedInvoice.clientName); 
    setCompanyName(selectedInvoice.companyName);
    setInvoiceNo(selectedInvoice.invoiceNo);
    setSelectedEmployee(selectedInvoice.salesExecutiveName);
setEmail(selectedInvoice.email);
    setTransactionId(selectedInvoice.transactionId);
    setCompanyAddress(selectedInvoice.companyAddress);
    setInvoiceDate(selectedInvoice.invoiceDate);
    setDueDate(selectedInvoice.dueDate);
    setNewInvoiceItems(selectedInvoice.items);

    // Add/Edit modal उघड
    setShowAddModal(true);
  }}
/>

        <Card
  color="#B256FF"
  img={viewinvoice}
  text="View Invoice"
  onClick={() => {
    if (!selectedInvoice) {
      alert("Select Invoice first");
      return;
    }
    setShowViewModal(true);
  }}
/>

       <Card
  color="#FB57A1"
  img={totalinvoice}
  text={`Total Invoice (${totalCount})`}
  onClick={() => setStatusFilter("ALL")}
/>


       <Card
  color="#42B3E9"
  img={pendingpayment}
  text={`Pending Payment (${pendingCount})`}
  onClick={() => setStatusFilter("PENDING")}
/>


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
    <Card
  color="#35CC7B"
  img={duesoon}
  text={`Due Soon (${dueSoonCount})`}
  onClick={() => setStatusFilter("DUE_SOON")}
/>


      <Card
  color="#FF893F"
  img={overdue}
  text={`Overdue (${overdueCount})`}
  onClick={() => setStatusFilter("OVERDUE")}
/>

       <Card
  color="#B256FF"
  img={ontrack}
  text={`On Track (${onTrackCount})`}
  onClick={() => setStatusFilter("ONTRACK")}
/>


      <Card
  color="#FB57A1"
  img={overdue}   // आत्ता जो icon आहे तोच ठेऊ
  text={`Deleted Invoices (${deletedCount})`}
  onClick={() => setStatusFilter("DELETED")}
/>



        <Card
  color="#42B3E9"
  img={pendingpayment}   // हवे तर वेगळा icon वापर
  text={`Completed Payment (${completedCount})`}
  onClick={() => setStatusFilter("COMPLETED")}
/>

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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
  {visibleInvoices.map((invoice, index) => (
    <tr
      key={invoice._id}
      onClick={() => setSelectedInvoice(invoice)}
      style={{ borderBottom: "1px solid #e9ecef", cursor: "pointer" }}
    >
      {/* Employee ID */}
      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        {index + 1}
      </td>

      {/* Transaction ID */}
      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        {invoice.transactionId || "-"}
      </td>

      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        {invoice.createdAt ? (
    <>
      {new Date(invoice.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      })}
      {" | "}
      {new Date(invoice.createdAt).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })}
    </>
  ) : (
    "N/A"
  )}
      </td>

      {/* Invoice No */}
      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        {invoice.invoiceNo}
      </td>

      {/* Company Name */}
      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        {invoice.companyName}
      </td>

      {/* Email */}
      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        {invoice.email || "-"}
      </td>

      {/* Total Amount */}
      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        ₹{invoice.totalAmount}
      </td>

      {/* Received */}
      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        ₹{invoice.receivedAmount}
      </td>


      {/* Pending */}
      <td style={{ padding: "12px 8px", fontSize: "12px", textAlign: "center" }}>
        ₹{invoice.pendingAmount}
      </td>

      {/* View */}
      <td style={{ padding: "12px 8px", textAlign: "center" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedInvoice(invoice);
            setShowViewModal(true);
          }}
          style={{
            fontSize: "11px",
            width: "68px",
            height: "21px",
            backgroundColor: "#3D68E7",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View
        </button>
      </td>

      {/* Status */}
       <td style={{ padding: "12px 8px", textAlign: "center" }}>
     <span
  style={{
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "4px",
    backgroundColor:
  invoice.status === "Completed" ? "#11CE4D" : "#D41A1A",
    color: "#fff",
    cursor: "pointer",
  }}
>
  {invoice.status}
</span>

      </td>
     <td style={{ textAlign: "center" }}>
<td style={{ textAlign: "center", display: "flex", gap: "8px", justifyContent: "center" }}>
  <button
    onClick={(e) => {
      e.stopPropagation();
      deleteInvoice(invoice._id);
    }}
    style={{
      fontSize: "11px",
      backgroundColor: "#FF3B3B",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "4px 8px",
    }}
  >
    Delete
  </button>

  <button
    disabled={invoice.pendingAmount === 0}
    onClick={(e) => {
      e.stopPropagation();
      const amt = prompt("Enter received amount:");
      if (amt) receivePayment(invoice._id, Number(amt));
    }}
    style={{
      fontSize: "11px",
      backgroundColor: invoice.pendingAmount === 0 ? "#ccc" : "#4972E8",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "4px 8px",
      cursor: invoice.pendingAmount === 0 ? "not-allowed" : "pointer",
    }}
  >
    +Pay
  </button>
</td>


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
              Sales Executive Name : {selectedInvoice?.salesExecutiveName}

              </div>
              <button
               onClick={() => window.print()}
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
                  <p><b>Client Name:</b> {selectedInvoice?.clientName}</p>   
                <p>{selectedInvoice.companyName}</p>
    <p>{selectedInvoice.companyAddress}</p>

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
                    {selectedInvoice?.invoiceNo}
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
                   {selectedInvoice?.invoiceDate}
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
                    {selectedInvoice?.dueDate}
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
                  {selectedInvoice?.items.map((it, i) => (


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
                        {it.serviceName}
                      </td>
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
                       {it.department}
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
                        {it.unitPrice}
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
                        {it.quantity}

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
                        ₹{it.unitPrice * it.quantity}

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
                ₹{selectedInvoice?.summary.subtotal}



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
                  ₹{selectedInvoice?.summary.total}



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
              <input
  style={{
    padding: "10px 12px",
    border: "1px solid #000",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
    width: "260px",
  }}
  placeholder="SalesExecutive Name"
  value={selectedEmployee}
  onChange={(e) => setSelectedEmployee(e.target.value)}
/>

              <button
                 onClick={() => {
                 resetForm();
                   setShowAddModal(false);
                  }}
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
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "1rem",
    marginBottom: "1rem",
    marginTop: "1rem",
  }}
>
   {/* <input
    style={inputStyle}
    placeholder="Employee Name"
    value={selectedEmployee}
    onChange={(e) => setSelectedEmployee(e.target.value)}
  /> */}
  <input
    style={inputStyle}
    placeholder="Company Name"
    value={companyName}
    onChange={(e) => setCompanyName(e.target.value)}
  />
  <input
  style={inputStyle}
  placeholder="Client Name"
  value={clientName}
  onChange={(e) => setClientName(e.target.value)}
/>

  <input
  style={inputStyle}
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>


  <input
    style={inputStyle}
    placeholder="Transaction ID"
    value={transactionId}
    onChange={(e) => setTransactionId(e.target.value)}
  />


</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "1rem",
  }}
>
  <input
    type="date"
    style={inputStyle}
    value={invoiceDate}
    onChange={(e) => setInvoiceDate(e.target.value)}
  />

  <input
    type="date"
    style={inputStyle}
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
  />
</div>

<textarea
  style={{ ...inputStyle, height: "80px", resize: "none", marginBottom: "1.5rem" }}
  placeholder="Company Address"
  value={companyAddress}
  onChange={(e) => setCompanyAddress(e.target.value)}
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
                 <div style={{ textAlign: "right", marginBottom: "10px" }}>
                  <button
  onClick={addRow}
  style={{
    backgroundColor: "#4972E8",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
  }}
>
  + Add Service
</button>

            </div>

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
                     <th style={{ width: "8%", textAlign: "center" }}>Sr no.</th>
<th style={{ width: "32%", textAlign: "center" }}>Service Name</th>
<th style={{ width: "32%", textAlign: "center" }}>Department</th>
<th style={{ width: "15%", textAlign: "center" }}>Unit Price</th>
<th style={{ width: "15%", textAlign: "center" }}>Quantity</th>
<th style={{ width: "15%", textAlign: "center" }}>Total</th>
<th style={{ width: "15%", textAlign: "center" }}>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {newInvoiceItems.map((item, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>
      <input
        value={item.serviceName}
        onChange={(e) =>
          handleItemChange(index, "serviceName", e.target.value)
        }
      />
    </td>
    <td style={{ textAlign: "center", fontWeight: "500" }}>
  {item.department || "Auto"}
</td>

    <td>
      <input
        type="number"
        value={item.unitPrice}
        onChange={(e) =>
          handleItemChange(index, "unitPrice", e.target.value)
        }
      />
    </td>
    <td>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) =>
          handleItemChange(index, "quantity", e.target.value)
        }
      />
    </td>
    <td>{item.unitPrice * item.quantity}</td>
    <td>
      <button onClick={() => removeRow(index)}>❌</button>
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
                      <span>{newInvoiceSummary.subtotal}/-</span>

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
                      <span>{newInvoiceSummary.total}/-</span>

                    </div>
                  </div>
                 <div style={{ textAlign: "center", marginTop: "20px" }}>
  <button
  onClick={() => {
    if (selectedInvoice) {
      updateInvoiceInDB();   // EDIT case
    } else {
      saveInvoiceToDB();     // NEW case
    }
  }}
  style={{
    backgroundColor: "#4972E8",
    color: "#fff",
    padding: "10px 30px",
    borderRadius: "6px",
    border: "none",
    fontSize: "14px",
    cursor: "pointer"
  }}
>
  Save Invoice
</button>


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
