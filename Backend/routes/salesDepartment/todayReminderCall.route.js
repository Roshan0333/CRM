import {Router} from "express";
import {todayReminderCall} from "../../controllers/salesDepartment/todayClientsReminder.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

router.route("/todayReminderCall").get(isAuth, todayReminderCall);

export default router