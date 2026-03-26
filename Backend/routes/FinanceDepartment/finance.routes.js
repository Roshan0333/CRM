import { Router } from "express";
import { financePending, financeConfirm,getPendingSales,getSalesConfirmedBySales,getAllFinanceSales} from "../../controllers/FinanceDepartment/finance.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

router.get("/pending-payments", isAuth, financePending);
router.put("/confirm/:id", isAuth, financeConfirm);
router.get("/pending-sales", isAuth, getPendingSales);
router.get("/confirmed-sales", isAuth, getSalesConfirmedBySales);
router.get("/all-sales", isAuth, getAllFinanceSales);

export default router;
