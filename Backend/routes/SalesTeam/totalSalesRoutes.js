import express from "express";
const router = express.Router();

/* 🔥 SAME DATA SOURCE FOR GET & POST */
let totalSalesData = [
  {
    company: "WIPRO",
    client: "Lalbabu",
    email: "anandk19570@gmail.com",
    contact: "9113382362",
    services: "DIGITAL MARKETING",
    amount: 100000,
    executive: "ABCD",
    date: "2025-12-29",
  },
];

/* ================= GET ================= */
router.get("/", (req, res) => {
  res.status(200).json(totalSalesData);
});

/* ================= POST ================= */
router.post("/", (req, res) => {
  const newSale = req.body;

  // 🔥 YAHI MAIN LINE HAI
  totalSalesData.unshift(newSale);

  res.status(201).json({
    message: "Sale added successfully",
    sale: newSale,
  });
});

export default router;
