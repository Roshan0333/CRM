import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const employeeHistorySchema = new mongoose.Schema(
  {
    employeeId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: ObjectId,
      ref: "Client",
      required: true,
    },
    companyName: {
        type: String,
    },
    clientName: {
        type: String,
    },
    email_Id: {
        type: String,
    },
    contact_No: {
        type: Number,
    },
    reminder_Date: {
        type: String,
    },
    comment:{
      type: String
    },
    handledDate: {
      type: Date,
      required: true,
      index: true
    }
  },
);

const employee_Model = mongoose.model("Sales_Employee_History",employeeHistorySchema);

export default employee_Model;
