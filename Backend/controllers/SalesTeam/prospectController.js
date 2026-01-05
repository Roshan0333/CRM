import User from "../../models/User.js";
import Prospect from "../../models/SalesTeam/Prospect.js";


/* ================= CREATE PROSPECT ================= */
export const createProspect = async (req, res) => {
  try {
    const {
      memberName,
      companyName,
      clientName,
      email,
      contact,
      reminderDate,
      comment,
    } = req.body;

    // 🔴 BASIC VALIDATION
    if (!companyName || !clientName || !contact || !reminderDate) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // ✅ AUTO ASSIGN: koi ek Active Sales Executive uthao
    const salesExecutive = await User.findOne({
      role: "sales executive",
      status: "Active",
    }).select("_id firstName lastName");

    // ⚠️ OPTIONAL SAFETY (recommended)
    if (!salesExecutive) {
      return res.status(400).json({
        message: "No active Sales Executive found",
      });
    }

    // ✅ CREATE PROSPECT
    const prospect = await Prospect.create({
      memberName,
      companyName,
      clientName,
      email,
      contact,
      reminderDate,

      // 🔥 AUTO ASSIGNED SALES EXECUTIVE
      assignedTo: salesExecutive._id,

      // 🔹 INITIAL CALL HISTORY (OPTIONAL)
      callHistory: comment
        ? [
            {
              status: "talk",
              note: comment,
            },
          ]
        : [],

      status: "pending",
    });

    res.status(201).json({
      message: "Prospect created & auto-assigned successfully",
      data: prospect,
    });
  } catch (error) {
    console.error("Create Prospect Error:", error);
    res.status(500).json({ message: error.message });
  }
};
