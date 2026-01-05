import Report from "../../models/SalesTeam/Report.js";


/* ===== GET ALL REPORT DATA ===== */
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===== UPDATE STATUS ===== */
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
