import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    comment: {
      type: String,
      required: true
    },

    fileUrl: String
  },
  { timestamps: true }
);

export default reviewSchema
