import Sale from "../../models/SalesTeam/Sale.js"

/* ===== GET ALL SALES ===== */
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===== ADD SALE ===== */
export const addSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
