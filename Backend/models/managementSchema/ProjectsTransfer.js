import mongoose from "mongoose";

const projectTransferSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    fromTL: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    toTL: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    transferDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default projectTransferSchema
