import express from "express";
import {
  createInvoice,
  getInvoices,
  updateInvoice,
  softDeleteInvoice,
  receivePayment,
  assignInvoice,
 
} from "../../controllers/FinanceDepartment/invoiceController.js";
import upload from "../../middlewares/Finance/upload.js";
import { uploadWorkOrder,viewWorkOrder } from "../../controllers/FinanceDepartment/workorderController.js";

const router = express.Router();

router.post("/", createInvoice);
router.get("/", getInvoices);
router.put("/:id", updateInvoice);
router.delete("/:id", softDeleteInvoice);
router.post("/payment/:id", receivePayment);
router.put("/:id/assign", assignInvoice);
router.post("/:id/upload-workorder", upload.single("file"), uploadWorkOrder);
router.get("/:id/workorder", viewWorkOrder);

export default router;
