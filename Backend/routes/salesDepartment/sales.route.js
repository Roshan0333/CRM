import { Router } from "express";
import { post_Sale, salesExecutive_TotalSales, teamLeader_TotalSales } from "../../controllers/salesDepartment/employeeSales.controllers.js";
const router = Router();

router.route("/saleDone").post(post_Sale);
router.route("/SE_totalSales").get(salesExecutive_TotalSales);
router.route("TL_totalSales").get(teamLeader_TotalSales);

export default router;