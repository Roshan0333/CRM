import mongoose from "mongoose";

const transferHistorySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transferCount: {
      type: Number,
      required: true,
    },
    transferBy: {
      type: String,
      default: "TL - Sales",
    },
    totalData: {
      type: String,
      default: "Updated",
    },
  },
  { timestamps: true }
);

export default mongoose.model("TransferHistory", transferHistorySchema);
