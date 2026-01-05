import {Router} from "express";
import {todayReminderCall} from "../../controllers/salesDepartment/todayClientsReminder.controllers.js";

const router = Router();

router.route("/todayReminderCall").get(todayReminderCall);

export default router