import Invoice from "../../models/FinanceDepartment/Invoice.js";
import path from "path";
import fs from "fs";

export const uploadWorkOrder = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const invoiceId = req.params.id;

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // save file path in invoice
    invoice.workOrderFile = req.file.filename;
    await invoice.save();

    res.json({
      message: "Work order uploaded successfully",
      file: req.file.filename,
    });
  } catch (error) {
    console.log("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
};
export const viewWorkOrder = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      console.log("Invoice not found in DB");
      return res.status(404).json({ message: "Invoice not found" });
    }

    console.log("DB file name:", invoice.workOrderFile);

    const filePath = path.join(
      process.cwd(),
      "uploads",
      invoice.workOrderFile
    );

    console.log("Full path:", filePath);

    if (!fs.existsSync(filePath)) {
      console.log("FILE NOT FOUND ON DISK ❌");
      return res.status(404).json({ message: "File missing on disk" });
    }

    console.log("FILE FOUND ✅ sending...");
    res.sendFile(filePath);

  } catch (error) {
    console.log("VIEW ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
