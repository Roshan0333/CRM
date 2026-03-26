import Sales_Model from "../../models/salesDepartment/sales.models.js";
import client_Model from "../../models/salesDepartment/client.models.js";

// GET pending deals (Confirm:false)
export const financePending = async (req, res) => {
  try {
    const list = await Sales_Model.find({ Confirm: false })
      .populate("ClientId");

    res.json(list);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT confirm deal + payment
// export const financeConfirm = async (req, res) => {
//   try {
    
//      if (req.user.role !== "finance") {
//       return res.status(403).json({ msg: "Only finance allowed" });
//     }
       
//     const { PayAmount } = req.body;
//     const { id } = req.params;

//     const sale = await Sales_Model.findById(id);

//     if (!sale)
//       return res.status(404).json({ msg: "Sale not found" });

//     if (PayAmount < 0)
//       return res.status(400).json({ msg: "Invalid payment" });

//     if (PayAmount > sale.Amount)
//       return res.status(400).json({
//         msg: "Payment exceeds deal amount"
//       });

//     sale.PayAmount = PayAmount;
//     sale.Confirm = true;

//     await sale.save();

//     await client_Model.findByIdAndUpdate(
//   sale.ClientId,
//   {
//     SalesStatus: "Sold",
//     CurrentStatus: "Closed"
//   }
//   );
//     res.json({ msg: "Finance confirmed", sale });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
export const financeConfirm = async (req, res) => {
  try {
    

    const { PayAmount } = req.body;
    const { id } = req.params;

    const sale = await Sales_Model.findById(id);

    if (!sale)
      return res.status(404).json({ msg: "Sale not found" });

    const pay = Number(PayAmount);

    if (isNaN(pay))
      return res.status(400).json({ msg: "Invalid payment amount" });

    if (pay < 0)
      return res.status(400).json({ msg: "Payment cannot be negative" });

    if (pay > sale.Amount)
      return res.status(400).json({
        msg: "Payment exceeds deal amount"
      });

    sale.PayAmount = pay;
    sale.Confirm = true;

    await sale.save();

    res.json({
      msg: "Finance confirmed",
      sale
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getPendingSales = async (req, res) => {
  try {
    const sales = await Sales_Model.find({ Confirm: false })
      .populate("ClientId")
      .populate("SalerId", "firstName lastName")
      .sort({ Date: -1 });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getSalesConfirmedBySales = async (req, res) => {
  try {
    const sales = await Sales_Model.find({ Confirm: true })
      .populate({
        path: "ClientId",
        model: "Client"
      })
      .populate({
        path: "SalesExecutiveId",
        model: "User"
      });

    console.log("POPULATED 👉", sales);

    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getAllFinanceSales = async (req, res) => {
  try {
    const sales = await Sales_Model.find()
      .populate("ClientId")
      .populate("SalesExecutiveId", "firstName lastName")
      .sort({ Date: -1 });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
