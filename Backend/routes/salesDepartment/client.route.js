import { Router } from "express";
import { add_Client, update_ClientData, delete_Client, get_HotClient } from "../../controllers/salesDepartment/client.controllers.js";

const router =Router();

router.route("/createClient").post(add_Client);
router.route("/updateclientData").put(update_ClientData);
router.route("/hotClient").get(get_HotClient);
router.route("/deleteUserReport").delete(delete_Client);

export default router;