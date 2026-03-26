import Complaint from "../../models/FeedbackManager/ComplaintSchema.js";
import Feedback from "../../models/FeedbackManager/FeedbackSchema.js";
import TeamMember from "../../models/FeedbackManager/TeamMemberSchema.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalComplaints,
      unsolvedComplaints,
      totalTeam,
      totalSolved,
      totalFeedbacks,
      remainingFeedbacksCount
    ] = await Promise.all([
      Complaint.countDocuments(),
      Complaint.countDocuments({ status: "Unsolved" }),
      TeamMember.countDocuments({ status: "Active" }),
      Complaint.countDocuments({ status: "Solved" }),
      Feedback.countDocuments(),
      Feedback.countDocuments({ status: "pending" })
    ]);

    const stats = {
      totalData:totalComplaints + totalFeedbacks,
      totalFeedbacks, 
      totalComplaints,
      remainingFeedbacks: remainingFeedbacksCount,
      unsolvedComplaints,
      totalTeam,
      totalIncome: 15000,
      lastMonthIncome: 12000
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};