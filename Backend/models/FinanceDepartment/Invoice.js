import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  department: { type: String },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: Number
});

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, unique: true },
  clientName: { type: String, required: true },
  companyName: { type: String, required: true },
  salesExecutiveName: {
  type: String,
  required: true
},
  email: String,
  companyAddress: String,
  transactionId: String,
  invoiceDate: Date,
  dueDate: Date,

  assignedTo: {
  type: String,
  enum: ["finance", "accountant", "manager"],
  default: "finance"
},
assignedUser: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},


  items: [itemSchema],

  summary: {
    subtotal: Number,
    tax: Number,
    total: Number
  },

  totalAmount: Number,
  receivedAmount: { type: Number, default: 0 },
  pendingAmount: Number,

  status: {
    type: String,
    enum: ["Pending", "Partially Paid", "Paid", "Overdue"],
    default: "Pending"
  },

  isDeleted: { type: Boolean, default: false },
  workOrderFile: { type: String },

}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);
