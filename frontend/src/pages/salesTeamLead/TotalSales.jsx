import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/salesTeamLead/totalSales.css";

const API_URL = "http://localhost:5000/api/total-sales";

const TotalSales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    client: "",
    email: "",
    contact: "",
    services: "",
    amount: "",
    executive: "",
    date: "",
  });

  /* ================= GET SALES ================= */
  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      const mapped = res.data.map((item) => ({
        _id: item._id,
        company: item.company || item.companyName,
        client: item.client || item.clientName,
        email: item.email,
        contact: item.contact,
        services: item.services,
        amount: item.amount,
        executive: item.executive || item.salesExecutive,
        date: item.date,
      }));

      setSalesData(mapped);
      setError("");
    } catch (err) {
      setError("Failed to load sales data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* 🔥 ADD SALE (RELOAD ISSUE FIXED) */
  const handleAddSale = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, formData);

      // 🔥 BEST FIX: always refetch from backend
      await fetchSales();

      setIsModalOpen(false);
      setFormData({
        company: "",
        client: "",
        email: "",
        contact: "",
        services: "",
        amount: "",
        executive: "",
        date: "",
      });

      alert("Sale added successfully!");
    } catch (err) {
      alert("Failed to add sale");
    }
  };

  return (
    <main id="totalSales-main">
      <div id="totalSales-main-content">
        <div id="totalSales-heading-btn">
          <h1>Total Sales Overview</h1>
          <button onClick={() => setIsModalOpen(true)}>+ Add New Sale</button>
        </div>

        <div className="table-wrapper">
          {loading && <p className="msg">Loading...</p>}
          {error && <p className="error">{error}</p>}

          <table id="stl-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Client</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Services</th>
                <th>Amount</th>
                <th>Executive</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="bold">{item.company}</td>
                  <td>{item.client}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                    <span className="tag">{item.services}</span>
                  </td>
                  <td className="amount">₹{item.amount}</td>
                  <td>{item.executive}</td>
                  <td>
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Enter Sale Details</h2>

            <form className="sale-form" onSubmit={handleAddSale}>
              {[
                ["company", "Company"],
                ["client", "Client"],
                ["email", "Email"],
                ["contact", "Contact"],
                ["services", "Service"],
                ["amount", "Amount"],
                ["executive", "Executive"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label>{label}</label>
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save">
                  Save Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default TotalSales;
