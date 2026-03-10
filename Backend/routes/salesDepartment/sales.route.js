import { Router } from "express";
import { post_Sale, TotalSalesBy_Id, currentYearSales} from "../../controllers/salesDepartment/employeeSales.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

router.route("/saleDone").post(isAuth, post_Sale);
router.route("/totalSales").get(isAuth, TotalSalesBy_Id);
// router.route("TL_totalSales").get(isAuth, teamLeader_TotalSales);
router.route("/yearSales").get(isAuth, currentYearSales)

export default router;