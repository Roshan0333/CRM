import Invoice from "../../models/FinanceDepartment/Invoice.js";

// Auto Invoice No Generator
const generateInvoiceNo = async () => {
  const last = await Invoice.findOne().sort({ createdAt: -1 });

  if (!last || !last.invoiceNo) return "INV-2026-001";

  const parts = last.invoiceNo.split("-");
  const lastNumber = parseInt(parts[2]);

  const nextNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;

  return `INV-2026-${nextNumber.toString().padStart(3, "0")}`;
};


// Create Invoice
export const createInvoice = async (req, res) => {
  try {
    const invoiceNo = await generateInvoiceNo();
    const { items, receivedAmount = 0, dueDate } = req.body;

    let subtotal = 0;
    // const updatedItems = items.map(i => {
    //   const total = i.unitPrice * i.quantity;
    //   subtotal += total;
    //   return { ...i, total };
    // });
    const updatedItems = items.map(i => {
  const total = i.unitPrice * i.quantity;
  subtotal += total;

  return {
    ...i,
    department: getDepartmentByService(i.serviceName), // 🔥 auto department
    total
  };
});

    const tax = subtotal * 0.10;
    const totalAmount = subtotal + tax;
    const pendingAmount = totalAmount - receivedAmount;

    let status = "Pending";
    if (pendingAmount === 0) status = "Paid";
    else if (receivedAmount > 0) status = "Partially Paid";
    if (new Date(dueDate) < new Date() && pendingAmount > 0) status = "Overdue";

    const invoice = new Invoice({
  ...req.body,
  invoiceNo,
  items: updatedItems,
  summary: { subtotal, tax, total: totalAmount },
  totalAmount,
  receivedAmount,
  pendingAmount,
  status
});


    const saved = await invoice.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All
// export const getInvoices = async (req, res) => {
//   try {
// const invoices = await Invoice.find().sort({ createdAt: -1 });
//     res.json(invoices);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const getInvoices = async (req, res) => {
  try {
    const { assignedTo } = req.query;

    let filter = { isDeleted: false };   

    if (assignedTo) {
      filter.assignedTo = assignedTo;   
    }

    const invoices = await Invoice.find(filter).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateInvoice = async (req, res) => {
  try {
    const { items, receivedAmount = 0, dueDate } = req.body;

    let subtotal = 0;
   const updatedItems = items.map(i => {
  const total = i.unitPrice * i.quantity;
  subtotal += total;

  return {
    ...i,
    department: getDepartmentByService(i.serviceName), // 🔥 auto department
    total
  };
});


    const tax = subtotal * 0.10;
    const totalAmount = subtotal + tax;

    // 🔥 MAIN FIX
    const pendingAmount = totalAmount - receivedAmount;

    let status = "Pending";
    if (pendingAmount <= 0) status = "Paid";
    else if (receivedAmount > 0) status = "Partially Paid";
    if (new Date(dueDate) < new Date() && pendingAmount > 0) status = "Overdue";

    const updated = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        items: updatedItems,
        summary: { subtotal, tax, total: totalAmount },
        totalAmount,
        pendingAmount,
        status
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Receive Payment
export const receivePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    // Add received amount (Number मध्ये convert)
    invoice.receivedAmount = Number(invoice.receivedAmount) + Number(amount);

    // Recalculate pending with rounding
    invoice.pendingAmount = Number(
      (invoice.totalAmount - invoice.receivedAmount).toFixed(2)
    );

    // Auto status update
    if (invoice.pendingAmount <= 0) {
      invoice.pendingAmount = 0;
      invoice.status = "Paid";
    } else {
      invoice.status = "Partially Paid";
    }

    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Soft Delete
export const softDeleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "Invoice Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDepartmentByService = (serviceName = "") => {
  const s = serviceName.toLowerCase();

  if (s.includes("payment") || s.includes("invoice") || s.includes("gst"))
    return "finance department";

  if (s.includes("complaint") || s.includes("support") || s.includes("feedback"))
    return "feedback department";

  if (s.includes("lead") || s.includes("call") || s.includes("follow"))
    return "sales department";

  return "management department";
};


export const assignInvoice = async (req, res) => {
  try {
    const { assignedTo, assignedUser } = req.body;

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { assignedTo, assignedUser },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({ message: "Invoice assigned successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





