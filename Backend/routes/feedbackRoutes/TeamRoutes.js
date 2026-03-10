import express from "express";
const router = express.Router();

import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from  "../../controllers/feedbackManager/teamMemberController.js";
import isAuth from "../../middlewares/AuthMiddleware.js";
import { isManager }from "../../middlewares/RoleMiddleware.js";


router.get("/",isAuth,isManager, getTeamMembers);
router.post("/",isAuth, isManager, addTeamMember);
router.delete("/:id", isAuth, isManager, deleteTeamMember);
router.put("/:id", isAuth, isManager, updateTeamMember);

export default router;