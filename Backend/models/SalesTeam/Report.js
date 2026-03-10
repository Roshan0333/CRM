import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
    },

    // ✅ FIXED
    reminderDate: {
      type: Date,
      default: null,
    },

    comment: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      enum: ["call", "sales", "transfer"],
      default: "call",
    },

    status: {
      type: String,
      default: "No Update",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
