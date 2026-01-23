import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    client: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    services: { type: String },
    amount: { type: Number, required: true },
    executive: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
