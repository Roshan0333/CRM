import mongoose from "mongoose";

/* =========================
   CALL HISTORY SCHEMA
========================= */
const callHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["talk", "not-talk"],
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

/* =========================
   DASHBOARD UPDATE HISTORY
========================= */
const updateHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Interested", "Follow Up", "Not Interested", "Converted"],
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

/* =========================
   PROSPECT SCHEMA (FINAL)
========================= */
const prospectSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
    },

    companyName: {
      type: String,
      required: true,
    },

    clientName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    contact: {
      type: String,
      required: true,
    },

    reminderDate: {
      type: Date,
      required: true,
    },

    /* 🔥 AUTO / MANUAL ASSIGNMENT */
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    /* ========= STATUS ========= */
    status: {
      type: String,
      enum: ["pending", "prospect", "calls", "untouched"],
      default: "pending",
    },

    /* ========= CALL INFO ========= */
    lastCall: {
      type: Date,
      default: null,
    },

    transferredAt: {
      type: Date,
      default: null,
    },

    /* ========= HISTORIES ========= */
    callHistory: [callHistorySchema],
    updateHistory: [updateHistorySchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Prospect", prospectSchema);
