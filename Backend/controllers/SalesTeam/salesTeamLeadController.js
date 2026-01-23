import Prospect from "../../models/SalesTeam/Prospect.js";
import Report from "../../models/SalesTeam/Report.js";
import TransferHistory from "../../models/SalesTeam/TransferHistory.js";
import User from "../../models/User.js";


/* =========================
   DASHBOARD DATA
========================= */
export const getDashboardData = async (req, res) => {
  try {
    const totalProspects = await Prospect.countDocuments();
    const totalCalls = await Report.countDocuments({ type: "call" });
    const totalTransfers = await Report.countDocuments({ type: "transfer" });

    res.status(200).json({
      totalProspects,
      totalCalls,
      totalSales: 8000,
      totalTransfers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   PROSPECTS  ✅ FIXED
========================= */
export const getProspects = async (req, res) => {
  try {
    const prospects = await Prospect.find()
      .populate("assignedTo", "firstName lastName") // 🔥 SALES EXECUTIVE NAME
      .sort({ createdAt: -1 });

    res.status(200).json(prospects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProspect = async (req, res) => {
  try {
    const prospect = await Prospect.create(req.body);
    res.status(201).json({
      message: "Prospect added successfully",
      prospect,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   TEAM MEMBERS
========================= */
export const getTeamMembers = async (req, res) => {
  try {
    const members = await User.find().select("-password");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addTeamMember = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      location,
      joiningDate,
    } = req.body;

    if (!firstName || !email) {
      return res
        .status(400)
        .json({ message: "First name and Email are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName: lastName || "",
      email,
      contact,
      location,
      joiningDate: joiningDate ? new Date(joiningDate) : null,
      role: "sales executive",
      status: "Active",
      password: "default123",
    });

    res.status(201).json({
      message: "Member added successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleTeamMemberStatus = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    member.status = member.status === "Active" ? "Inactive" : "Active";
    await member.save();

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   REPORT
========================= */
export const getReportData = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json({
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🔥 UPDATE REPORT
========================= */
export const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reminderDate, comment } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      {
        status,
        reminderDate: reminderDate ? new Date(reminderDate) : null,
        comment: comment || "",
      },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Report updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   TRANSFER DATA
========================= */
export const transferLeads = async (req, res) => {
  try {
    const { employeeId, transferCount } = req.body;

    if (!employeeId || !transferCount) {
      return res.status(400).json({ message: "Missing transfer data" });
    }

    const record = await TransferHistory.create({
      employee: employeeId,
      transferCount,
      transferBy: "TL - Sales",
      totalData: "Updated",
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransferHistory = async (req, res) => {
  try {
    const history = await TransferHistory.find()
      .populate("employee", "firstName lastName")
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE PROSPECT CALL
========================= */
export const updateProspectCall = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    if (!status || !comment) {
      return res
        .status(400)
        .json({ message: "Status and comment are required" });
    }

    const prospect = await Prospect.findById(id);
    if (!prospect) {
      return res.status(404).json({ message: "Prospect not found" });
    }

    prospect.callHistory.unshift({
      status: status === "Talk" ? "talk" : "not-talk",
      note: comment,
      updatedAt: new Date(),
    });

    prospect.lastCall = new Date();
    await prospect.save();

    await Report.create({
      companyName: prospect.companyName,
      clientName: prospect.clientName,
      email: prospect.email,
      contact: prospect.contact,
      type: "call",
      status,
    });

    res.status(200).json({
      message: "Prospect call updated & report created",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE PROSPECT STATUS
========================= */
export const updateProspectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment, date } = req.body;

    if (!status || !comment) {
      return res
        .status(400)
        .json({ message: "Status and comment are required" });
    }

    const prospect = await Prospect.findById(id);
    if (!prospect) {
      return res.status(404).json({ message: "Prospect not found" });
    }

    prospect.updateHistory.unshift({
      status,
      comment,
      date: date || new Date(),
    });

    await prospect.save();

    res.status(200).json({
      message: "Prospect status updated successfully",
      updateHistory: prospect.updateHistory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
