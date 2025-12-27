import {Router} from "express";
import { getToday_CallList, getCustomDate_CallList } from "../../controllers/salesDepartment/employeeCallHistory.controllers.js";

const router = Router();

router.route("/todayCallList").get(getToday_CallList);
router.route("/customDateCallList").get(getCustomDate_CallList);

export default router;
