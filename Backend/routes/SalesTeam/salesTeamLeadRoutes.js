import express from "express";

/* 🔴 Controllers import */
import {
  getDashboardData,
  getProspects,
  addProspect,

  getTeamMembers,
  addTeamMember,
  toggleTeamMemberStatus,

  getReportData,
  addReport,
  updateReportStatus,

  transferLeads,
  getTransferHistory,

  updateProspectCall,
  updateProspectStatus, // 🔥 Dashboard Update/View
} from "../../controllers/SalesTeam/salesTeamLeadController.js";


const router = express.Router();

/* ================= DASHBOARD ================= */
router.get("/dashboard", getDashboardData);

/* ================= PROSPECTS ================= */
router.get("/prospects", getProspects);
router.post("/prospects", addProspect);

/* Call history update */
router.patch("/prospects/:id/call-update", updateProspectCall);

/* 🔥 Dashboard status update (IMPORTANT) */
router.put("/update-prospect/:id", updateProspectStatus);

/* ================= TEAM MEMBERS ================= */
router.get("/team-members", getTeamMembers);
router.post("/team-members", addTeamMember);
router.patch("/team-members/:id/status", toggleTeamMemberStatus);

/* ================= REPORT ================= */
router.get("/report", getReportData);
router.post("/report", addReport);
router.patch("/report/:id", updateReportStatus);

/* ================= TRANSFER DATA ================= */
router.post("/transfer", transferLeads);
router.get("/transfer-history", getTransferHistory);

export default router;
