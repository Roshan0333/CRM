import { Router } from "express";
import { add_Client, update_ClientData, delete_Client, get_HotClient, get_CurrentMonthProspect, get_CurrentMonthProspectManager } from "../../controllers/salesDepartment/client.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router =Router();

console.log("Enter")
router.route("/addClient").post(isAuth, add_Client);
router.route("/updateClientData").put(isAuth, update_ClientData);
router.route("/prospectList").get(isAuth, get_CurrentMonthProspect);
router.route("/allProspectList").get(isAuth, get_CurrentMonthProspectManager)
router.route("/hotClient").get(isAuth, get_HotClient);
router.route("/deleteUserReport").delete(isAuth, delete_Client);

export default router;