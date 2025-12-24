import mongoose from 'mongoose'

const teamHierarchySchema = new mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

export default teamHierarchySchema
