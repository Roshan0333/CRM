import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paidDate: {
      type: Date
    },

    fileUrl: String
  },
  { timestamps: true }
);

export default payoutSchema
