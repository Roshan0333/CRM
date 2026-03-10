import {Router} from "express";
import { getToday_CallList, getCustomDate_CallList } from "../../controllers/salesDepartment/employeeCallHistory.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

router.route("/todayCallList").get(isAuth, getToday_CallList);
router.route("/customDateCallList").get(isAuth, getCustomDate_CallList);

export default router;
