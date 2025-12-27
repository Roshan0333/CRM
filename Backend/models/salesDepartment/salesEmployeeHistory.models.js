import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const employeeHistorySchema = new mongoose.Schema(
  {
    employeeId: {
      type: ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    clientId: {
      type: ObjectId,
      ref: "Client",
      required: true,
      index: true
    },

    handledDate: {
      type: Date,
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

const employee_Model = mongoose.model("Sales_Employee_History",employeeHistorySchema);

export default employee_Model;
