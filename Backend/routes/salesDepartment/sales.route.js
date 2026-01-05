import { Router } from "express";
import { post_Sale, salesExecutive_TotalSales, teamLeader_TotalSales } from "../../controllers/salesDepartment/employeeSales.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

router.route("/saleDone").post(isAuth, post_Sale);
router.route("/SE_totalSales").get(isAuth, salesExecutive_TotalSales);
router.route("TL_totalSales").get(isAuth, teamLeader_TotalSales);

export default router;