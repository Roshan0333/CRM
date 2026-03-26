import React, { useEffect, useState } from "react";
import axios from "axios";


const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [paymentValue, setPaymentValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
  try {
    const token = localStorage.getItem("token");

   const res = await axios.get(
  "http://localhost:5000/api/finance/all-sales",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

    setSales(res.data);
  } catch (err) {
    console.log("Fetch error", err);
  }
};


  // payment status
  const getStatus = (s) => {
    if (!s.PayAmount || s.PayAmount === 0) return "Pending";
    if (s.PayAmount >= s.Amount) return "Paid";
    return "Partial";
  };

  // summary
  const totalSales = sales.reduce((t,s)=>t+s.Amount,0);
  const totalPaid = sales.reduce((t,s)=>t+(s.PayAmount||0),0);
  const pending = totalSales - totalPaid;

  const openModal = (sale) => {
    setSelectedSale(sale);
    setPaymentValue(sale.PayAmount || "");
    setShowModal(true);
  };

  // ✅ FILTER LOGIC
const filteredSales = sales.filter((s) => {
  if (filter === "paid") return s.Confirm === true;
  if (filter === "pending") return s.Confirm === false;
  return true;
});


 const updatePayment = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/finance/confirm/${selectedSale._id}`,
      { PayAmount: parseFloat(paymentValue || 0) },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchSales();
    setShowModal(false);

  } catch (err) {
    console.log("Update error 👉", err);
  }
};



  return (
    <div style={{
  marginLeft: "280px",   // sidebar width
  padding: "30px",
  background: "#f5f7fb",
  minHeight: "100vh"
}}>

      <h1 style={{
        fontSize: "36px",
        fontWeight: "600",
        marginBottom: "24px"
      }}>
        Sales Dashboard
      </h1>

      {/* Summary Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginBottom: "30px"
      }}>
        <Card title="Total Sales" value={totalSales}/>
        <Card title="Total Paid" value={totalPaid}/>
        <Card title="Pending" value={pending}/>
      </div>

      {/* ✅ FILTER BUTTONS */}
<div style={{ marginBottom: "15px" }}>
  <button onClick={() => setFilter("all")} style={filterBtn}>
    All
  </button>

  <button onClick={() => setFilter("paid")} style={filterBtn}>
    Confirmed
  </button>

  <button onClick={() => setFilter("pending")} style={filterBtn}>
    Pending
  </button>
</div>

      {/* Table */}
      <div style={{
        background: "white",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f1f3f9", textAlign: "left" }}>
              <th style={th}>Client</th>
              <th style={th}>Company</th>
              <th style={th}>Date</th>
              <th style={th}>Executive</th>
              <th style={th}>Service</th>
              <th style={th}>Amount</th>
              {/* <th style={th}>Paid</th>
              <th style={th}>Due</th> */}
              <th style={th}>Status</th>
              <th style={th}>Update</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((s,i)=>{
                 const due = s.Amount - (s.PayAmount||0);

              return (
                <tr key={s._id}
                  style={{
                    background: i%2 ? "#fafbff" : "white",
                    borderBottom: "1px solid #eee"
                  }}>
                  <td style={td}>{s.ClientId?.ClientName}</td>
                  <td style={td}>{s.ClientId?.CompanyName}</td>
                  <td style={td}>{new Date(s.Date).toLocaleDateString()}</td>
                  <td style={td}> {s.SalesExecutiveId ? `${s.SalesExecutiveId.firstName} ${s.SalesExecutiveId.lastName}` : "N/A"}</td>
                  <td style={td}>{s.Service || "N/A"}</td>

                  <td style={td}>₹{s.Amount}</td>
                  {/* <td style={td}>₹{s.PayAmount||0}</td>
                  <td style={td}>₹{due}</td> */}

                  {/* <td style={td}>
                    <span style={{
                      padding:"4px 10px",
                      borderRadius:"6px",
                      fontSize:"12px",
                      color:"white",
                      background:
                        getStatus(s)==="Paid" ? "#16a34a" :
                        getStatus(s)==="Partial" ? "#f59e0b" :
                        "#41dc26"
                    }}>
                      {s.Confirm ? "Confirmed" : getStatus(s)}
                    </span>
                  </td> */}
                  <td style={td}>
                  <span style={{
                       padding:"4px 10px",
                borderRadius:"6px",
       fontSize:"12px",
       color:"white",
    background: s.Confirm ? "#16a34a" : "#dc2626"
  }}>
    {s.Confirm ? "Confirmed" : "Pending"}
  </span>
</td>


                  <td style={td}>
                 {s.Confirm === false && (
                    <button onClick={()=>openModal(s)} style={btn}>
                         Update
                         </button>
                         )}
                          </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h2>Update Payment</h2>

            <input
              type="number"
              value={paymentValue}
              onChange={(e)=>setPaymentValue(e.target.value)}
              style={{
                width:"100%",
                padding:"10px",
                margin:"10px 0"
              }}
            />

            <button onClick={updatePayment} style={saveBtn}>Save</button>
            <button onClick={()=>setShowModal(false)} style={cancelBtn}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReport;

/* ---------- UI Components ---------- */

const Card = ({title, value}) => (
  <div style={{
    background:"white",
    padding:"22px",
    borderRadius:"12px",
    boxShadow:"0 6px 16px rgba(0,0,0,0.06)",
    display:"flex",
    flexDirection:"column",
    gap:"6px"
  }}>
    <span style={{fontSize:"14px", color:"#6b7280"}}>
      {title}
    </span>
    <span style={{
      fontSize:"26px",
      fontWeight:"bold",
      color:"#111827"
    }}>
      ₹{value}
    </span>
  </div>
);

const th = {
  padding:"14px",
  fontSize:"13px",
  fontWeight:"600",
  color:"#374151"
};

const td = {
  padding:"14px",
  fontSize:"13px",
  color:"#111827"
};

const btn = {
  background:"#3D68E7",
  color:"white",
  border:"none",
  padding:"6px 12px",
  borderRadius:"6px",
  cursor:"pointer"
};

const modalBg = {
  position:"fixed",
  inset:0,
  background:"rgba(0,0,0,0.5)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
};

const modalBox = {
  background:"white",
  padding:"30px",
  borderRadius:"8px",
  width:"350px",
  textAlign:"center"
};

const saveBtn = {
  background:"#16a34a",
  color:"white",
  padding:"10px 20px",
  border:"none",
  marginRight:"10px",
  cursor:"pointer"
};

const cancelBtn = {
  background:"#dc2626",
  color:"white",
  padding:"10px 20px",
  border:"none",
  cursor:"pointer"
};
const filterBtn = {
  marginRight: "10px",
  padding: "6px 12px",
  background: "#3D68E7",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
