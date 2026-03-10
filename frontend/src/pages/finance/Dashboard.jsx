"use client";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Rectangle,
} from "recharts";

import React, { useState } from "react";
import "../../style/finance/dashboard.css";

import sales from "../../assets/finance/dashboard/sales.png";
import sellingExpanse from "../../assets/finance/dashboard/sellingExpanse.png";
import ebitda from "../../assets/finance/dashboard/ebitda.png";
import interest from "../../assets/finance/dashboard/interest.png";
import deprecation from "../../assets/finance/dashboard/deprecation.png";
import revenue from "../../assets/finance/dashboard/revenue.png";
import cogs from "../../assets/finance/dashboard/cogs.png";
import grossProfit from "../../assets/finance/dashboard/grossProfit.png";
import expenses from "../../assets/finance/dashboard/expenses.png";
import netProfit from "../../assets/finance/dashboard/netProfit.png";
import earningBeforeTax from "../../assets/finance/dashboard/earningBeforeTax.png";
import tax from "../../assets/finance/dashboard/tax.png";
import equityShares from "../../assets/finance/dashboard/equityShares.png";
import earningPerShare from "../../assets/finance/dashboard/earningPerShare.png";
import dividendPerShare from "../../assets/finance/dashboard/dividendPerShare.png";

import Button from "react-bootstrap/Button";

const Dashboard = () => {
  // ✅ FULL DATA WITH ALL FIELDS
  const [data] = useState([
    {
      name: "Jan",
      Revenue: 1000000,
      y2025: 2200000,
      y2026: 500000,

      // FULL FINANCIAL LIST
      salesGrowth: "12%",
      cogs: 500000,
      cogsPercent: "45%",
      grossProfit: 500000,
      grossMargins: "55%",
      sellingExp: 200000,
      sellingExpPercent: "20%",
      ebitda: 300000,
      ebitdaMargins: "30%",
      interest: 20000,
      interestPercent: "2%",
      depreciation: 15000,
      depreciationPercent: "1.5%",
      ebt: 265000,
      ebtPercent: "26%",
      tax: 26000,
      effectiveTaxRate: "10%",
      netProfit: 239000,
      netMargins: "23%",
      equityShares: 1200,
      earningsPerShare: 199,
      epsGrowth: "6%",
      dividendPerShare: 18,
    },

    // 👉 Duplicate for every month (use same values for now)
    {
      name: "Feb",
      Revenue: 2000000,
      y2025: 2400000,
      y2026: 1200000,
      salesGrowth: "15%",
      cogs: 900000,
      cogsPercent: "42%",
      grossProfit: 1100000,
      grossMargins: "58%",
      sellingExp: 240000,
      sellingExpPercent: "18%",
      ebitda: 820000,
      ebitdaMargins: "32%",
      interest: 30000,
      interestPercent: "1.5%",
      depreciation: 20000,
      depreciationPercent: "1%",
      ebt: 770000,
      ebtPercent: "28%",
      tax: 70000,
      effectiveTaxRate: "9%",
      netProfit: 700000,
      netMargins: "29%",
      equityShares: 1300,
      earningsPerShare: 210,
      epsGrowth: "7%",
      dividendPerShare: 22,
    },
    {
      name: "Mar",
      Revenue: 1500000,
      y2025: 2000000,
      y2026: 1000000,
    },
    {
      name: "Apr",
      Revenue: 2500000,
      y2025: 1500000,
      y2026: 1000000,
    },
    {
      name: "May",
      Revenue: 1590860,
      y2025: 2400000,
      y2026: 1200000,
    },
    {
      name: "Jun",
      Revenue: 2500000,
      y2025: 1000000,
      y2026: 100000,
    },
    {
      name: "Jul",
      Revenue: 100000,
      y2025: 2100000,
      y2026: 1900000,
    },
    {
      name: "Aug",
      Revenue: 2800000,
      y2025: 3400000,
      y2026: 1000000,
    },
    {
      name: "Sep",
      Revenue: 5000000,
      y2025: 2400000,
      y2026: 1200000,
    },
    {
      name: "Oct",
      Revenue: 3500000,
      y2025: 2400000,
      y2026: 1200000,
    },
    {
      name: "Nov",
      Revenue: 4500000,
      y2025: 2400000,
      y2026: 1200000,
    },
    {
      name: "Dec",
      Revenue: 6000000,
      y2025: 2400000,
      y2026: 1200000,
    },

    // ADD MORE MONTHS (copy above block)
    // For demo, all months can reuse Feb data
  ]);

  // Month Conversion
  const fullMonths = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  // Bar highlight
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (_, index) => setActiveIndex(index);

  const activeItem = data[activeIndex];

  // ✅ FULL CUSTOM TOOLTIP WITH ALL 24 LINES
  const FinanceFullTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const d = payload[0].payload;

    const row = (title, value, italic = false) => (
      <p
        style={{
          margin: "2px 0",
          fontSize: "13px",
          fontStyle: italic ? "italic" : "normal",
          fontWeight: italic ? 400 : 600,
          color: italic ? "#777" : "#222",
        }}
      >
        {title}: <span style={{ fontWeight: 400 }}>{value}</span>
      </p>
    );

    return (
      <div
        style={{
          background: "#fff",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0px 4px 18px rgba(0,0,0,0.2)",
          width: "260px",
        }}
      >
        <h4 style={{ marginTop: 0, marginBottom: 10 }}>
          {fullMonths[label]} — Details
        </h4>

        {row("Sales", d.Revenue)}
        {row("Sales Growth", d.salesGrowth, true)}

        {row("COGS", d.cogs)}
        {row("COGS % Sales", d.cogsPercent, true)}

        {row("Gross Profit", d.grossProfit)}
        {row("Gross Margins", d.grossMargins, true)}

        {row("Selling & General Expenses", d.sellingExp)}
        {row("S&G Exp % Sales", d.sellingExpPercent, true)}

        {row("EBITDA", d.ebitda)}
        {row("EBITDA Margins", d.ebitdaMargins, true)}

        {row("Interest", d.interest)}
        {row("Interest % Sales", d.interestPercent, true)}

        {row("Depreciation/Amortization", d.depreciation)}
        {row("Depreciation % Sales", d.depreciationPercent, true)}

        {row("Earnings Before Tax", d.ebt)}
        {row("EBT % Sales", d.ebtPercent, true)}

        {row("Tax", d.tax)}
        {row("Effective Tax Rate", d.effectiveTaxRate, true)}

        {row("Net Profit", d.netProfit)}
        {row("Net Margins", d.netMargins, true)}

        {row("No. of Equity Shares", d.equityShares)}
        {row("Earnings per Share", d.earningsPerShare)}
        {row("EPS Growth %", d.epsGrowth, true)}

        {row("Dividend per Share", d.dividendPerShare)}
      </div>
    );
  };

  return (
    <div>
      <main id="finance-main-content">
        {/* --------------------------------------------------- */}
        {/* FINANCE DASHBOARD UI */}
        {/* --------------------------------------------------- */}

        <section id="finance-dashboard">
          <div id="finance-container">
            <h1>Dashboard</h1>

            {/* DROPDOWNS */}
            <div id="dropdowns">
              <select className="form-select">
                <option>Year</option>
              </select>
              <select className="form-select">
                <option>Month</option>
              </select>
              <select className="form-select">
                <option>Department</option>
              </select>
              <Button id="btn">Submit</Button>
            </div>

            {/* CARDS */}
            <div id="dashboard-cards">
              {/* KEEPING YOUR ORIGINAL 15 CARDS */}
              {/* -------------------------------- */}
              <div id="card" style={{ borderLeft: "5px solid #35CC7B" }}>
                <div id="text">
                  <h6 style={{ color: "#35CC7B" }}>SALES</h6>
                  <h3>2.37M</h3>
                </div>
                <img id="cards-img" src={sales} alt="" />
              </div>

              <div id="card" style={{ borderLeft: "5px solid #FF893F" }}>
                <div id="text">
                  <h6 style={{ color: "#FF893F" }}>
                    SELLING & GENERAL EXPENSE
                  </h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={sellingExpanse} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #B256FF" }}>
                <div id="text">
                  <h6 style={{ color: "#B256FF" }}>EBDITA</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={ebitda} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
                <div id="text">
                  <h6 style={{ color: "#FB57A1" }}>INTEREST</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={interest} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #42B3E9" }}>
                <div id="text">
                  <h6 style={{ color: "#42B3E9" }}>
                    DEPRECIATION / AMORTIZATION
                  </h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={deprecation} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #35CC7B" }}>
                <div id="text">
                  <h6 style={{ color: "#35CC7B" }}>REVENUE</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={revenue} alt="" />
                </div>
              </div>

              {/* Continue rest of cards */}
              <div id="card" style={{ borderLeft: "5px solid #FF893F" }}>
                <div id="text">
                  <h6 style={{ color: "#FF893F" }}>COGS</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={cogs} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #B256FF" }}>
                <div id="text">
                  <h6 style={{ color: "#B256FF" }}>GROSS PROFIT</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={grossProfit} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
                <div id="text">
                  <h6 style={{ color: "#FB57A1" }}>EXPENSES</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={expenses} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #42B3E9" }}>
                <div id="text">
                  <h6 style={{ color: "#42B3E9" }}>NET PROFIT</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={netProfit} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #35CC7B" }}>
                <div id="text">
                  <h6 style={{ color: "#35CC7B" }}>EARNINGS BEFORE TAX</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={earningBeforeTax} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #FF893F" }}>
                <div id="text">
                  <h6 style={{ color: "#FF893F" }}>TAX</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={tax} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #B256FF" }}>
                <div id="text">
                  <h6 style={{ color: "#B256FF" }}>NO. OF EQUITY SHARES</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={equityShares} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #FB57A1" }}>
                <div id="text">
                  <h6 style={{ color: "#FB57A1" }}>EARNING PER SHARE</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={earningPerShare} alt="" />
                </div>
              </div>

              <div id="card" style={{ borderLeft: "5px solid #42B3E9" }}>
                <div id="text">
                  <h6 style={{ color: "#42B3E9" }}>DIVIDEND PER SHARE</h6>
                  <h3>2.37M</h3>
                </div>
                <div id="vector-img">
                  <img id="cards-img" src={dividendPerShare} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- */}
        {/* FINANCE TEXTS */}
        {/* --------------------------------------------------- */}

        <section id="texts">
          <div id="texts-container">
            <div id="point-text">
              <h3>Transaction</h3>
              <ul>
                <li>XYZ company paid 4000/- on 29th June.</li>
                <li>XYZ company paid 4000/- on 29th June.</li>
              </ul>
            </div>

            <div id="point-text">
              <h3>Pending Payment</h3>
              <ul>
                <li>XYZ company’s 4000/- is pending.</li>
                <li>XYZ company’s 4000/- is pending.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- */}
        {/* REVENUE COMPARISON CHART — with full tooltip */}
        {/* --------------------------------------------------- */}

        <section id="charts">
          <div id="charts-container">
            <h3>Revenue Comparison by Month</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <YAxis
                  orientation="left"
                  tickFormatter={(v) => (v / 1000000).toFixed(1) + "M"}
                />

                <XAxis dataKey="name" />

                {/* FULL CUSTOM TOOLTIP */}
                <Tooltip content={<FinanceFullTooltip />} />

                <Bar dataKey="Revenue" onClick={handleClick}>
                  {data.map((_entry, index) => (
                    <Cell
                      key={index}
                      cursor="pointer"
                      fill={index === activeIndex ? "#CECCCF" : "#31D076"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <p className="content">
              {`Revenue of "${activeItem.name}": $${activeItem.Revenue}`}
            </p>
          </div>
        </section>

        {/* --------------------------------------------------- */}
        {/* SECOND CHART REMAINS SAME */}
        {/* --------------------------------------------------- */}

        <section id="charts">
          <div id="charts-container">
            <h3>Retained Earnings Comparison (2025 vs 2026)</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => (v / 1000000).toFixed(1) + "M"} />

                <Tooltip
                  formatter={(v) => `${(v / 1000000).toFixed(2)}M`}
                  labelFormatter={(label) => fullMonths[label]}
                />

                <Legend />

                <Bar dataKey="y2025" name="2025" fill="#2F80ED" barSize={40} />
                <Bar dataKey="y2026" name="2026" fill="#EB5757" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
