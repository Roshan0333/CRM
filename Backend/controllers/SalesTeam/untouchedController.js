import Prospect from "../../models/SalesTeam/Prospect.js";


/* ================= DASHBOARD STATS ================= */
export const getUntouchedStats = async (req, res) => {
  try {
    const totalData = await Prospect.countDocuments();

    const todayCalls = await Prospect.countDocuments({
      lastCall: {
        $gte: new Date().setHours(0, 0, 0, 0),
      },
    });

    const totalProspect = await Prospect.countDocuments({
      status: "prospect",
    });

    // 🔥 pending ko untouched maana gaya
    const totalUntouched = await Prospect.countDocuments({
      status: { $in: ["untouched", "pending"] },
    });

    res.status(200).json({
      totalData,
      todayCalls,
      totalProspect,
      totalUntouched,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= TABLE + FILTER ================= */
export const getUntouchedData = async (req, res) => {
  try {
    const { member, type, date } = req.query;

    let filter = {};

    /* ===== MEMBER FILTER ===== */
    if (member) {
      filter.memberName = member;
    }

    /* ===== STATUS FILTER ===== */
    if (type === "untouched") {
      filter.status = { $in: ["untouched", "pending"] };
    } else if (type) {
      filter.status = type;
    }

    /* ===== DATE FILTER ===== */
    if (date) {
      filter.createdAt = {
        $gte: new Date(date),
        $lte: new Date(date + "T23:59:59"),
      };
    }

    // 🔥🔥 MAIN FIX — populate added
    const data = await Prospect.find(filter)
      .populate("assignedTo", "firstName lastName") // ✅ Sales Executive name
      .sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
