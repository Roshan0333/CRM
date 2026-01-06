// src/utils/normalizeRole.js

const normalizeRole = (role) => {
  const map = {
    "sales executive": "sales executive",
    "sales team": "sales team",
    "sales manager": "salesManager",

    "management tl": "managementTL",
    "management employee": "management employee",
    "management manager ": "management manager",

    "feedback manager": "feedbackmanager",
    "feedback employee": "feedbackemployee",

    "finance employee": "finance employee",
    "accountant": "accountant",
  };

  return map[role?.toLowerCase()] || null;
};

export { normalizeRole };      // ✅ named export
export default normalizeRole;  // ✅ default export