import mongoose from 'mongoose'

const teamHierarchySchema = new mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
      }
    ]
  },
  { timestamps: true }
);

const TeamHierarchy = mongoose.model("TeamHierarchy", teamHierarchySchema);

export default TeamHierarchy
