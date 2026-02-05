import {Router} from "express";
import {addTeam_SalesTeamLead, addTeam_SalesExcutive, getAllTeam} from "../../controllers/salesDepartment/salesTeam.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

router.route('/addTL').post(isAuth, addTeam_SalesTeamLead);
router.route("/addSE").put(isAuth, addTeam_SalesExcutive);
router.route("/getAllTeam").get(isAuth, getAllTeam);

export default router;