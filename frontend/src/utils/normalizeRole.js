const normalizeRole = (role) => {
  const map = {
    "sales executive": "salesexecutive",
    "sales team lead": "salesTeamLead",
    "sales manager": "salesManager",

    "management tl": "managementTL",
    "management employee": "managementemployee",
    "manager management": "managermanagement",

    "feedback manager": "feedbackmanager",
    "feedback employee": "feedbackemployee",

    "finance": "finance",
    "accountant": "accountant",
  };

  return map[role?.toLowerCase()] || null;
};

export { normalizeRole };      // ✅ named export
export default normalizeRole;  // ✅ default export