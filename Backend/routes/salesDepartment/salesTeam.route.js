import {Router} from "express";
import {addTeam_SalesTeamLead, 
    addTeam_SalesExcutive, 
    addTeam_ExistsTL,
    addSalesExcutiveByManager,
    getAllEmployee, 
updateEmployeeDetail,
updateEmployeeStatus,
deleteEmployeeDetail,
employeePermotion} from "../../controllers/salesDepartment/salesTeam.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

console.log("Enter")
router.route('/addTL').post(isAuth, addTeam_SalesTeamLead);
router.route("/addSE").put(isAuth, addTeam_SalesExcutive);
router.route("/addExisitsTL").put(isAuth, addTeam_ExistsTL);
router.route("/getAllEmployee").get(isAuth, getAllEmployee);
router.route("/addEmployee").post(isAuth, addSalesExcutiveByManager);
router.route("/bankDetail").put(isAuth, updateEmployeeDetail);
router.route("/status").patch(isAuth, updateEmployeeStatus);
router.route("/delete").delete(isAuth, deleteEmployeeDetail);
router.route("/premotion").put(isAuth, employeePermotion);

export default router;