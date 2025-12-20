// src/utils/normalizeRole.js

const normalizeRole = (role) => {
  const map = {
    "sales executive": "salesExecutive",
    "sales team lead": "salesTeamLead",
    "sales manager": "salesManager",

    "management tl": "managementTL",
    "management employee": "managementEmployee",
    "manager management": "managerManagement",

    "feedback manager": "feedbackManager",
    "feedback employee": "feedbackEmployee",

    "finance": "finance",
    "accountant": "accountant",
  };

  return map[role?.toLowerCase()] || null;
};

export { normalizeRole };      // ✅ named export
export default normalizeRole;  // ✅ default export
