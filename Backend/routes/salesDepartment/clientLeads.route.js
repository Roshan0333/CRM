import { Router } from "express";
import multer from "multer";
import {
    csvFile,
    excelFile,
    teamAssignLeads,
    assignLeadsByTeamLead,
    getAssignedLeadList,
    updateClient,
    managerUntouchClient,
    employeeUntouchClient,
    deleteClient,
    employeeHistory,
    untouchDataHIstory,
    assignLeadsByManager,
    untouchData,
    searchUntouchDataByEmail
} from "../../controllers/salesDepartment/clientLeads.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

const upload = multer({
    dest: "uploads",
    // limits: {
    //     fileSize: 100*1024*1024
    // }
})


router.route("/excelFileLead").post(isAuth, upload.single("file"), excelFile);
router.route("/csvFileLead").post(isAuth, upload.single("file"), csvFile);
router.route("/teamAssignedLead").patch(isAuth, teamAssignLeads)
router.route("/assignLead").patch(isAuth, assignLeadsByTeamLead);
router.route("/getAssignedLeadList").get(isAuth, getAssignedLeadList);
router.route("/updateClient").patch(isAuth, updateClient);
router.route("/managerUntouchClient").get(isAuth, managerUntouchClient);
router.route("/employeeUntouchClient").get(isAuth, employeeUntouchClient);
router.route("/deleteClient").delete(isAuth, deleteClient);
router.route("/employeeHistory").get(isAuth, employeeHistory);
router.route("/untouchLeadHistory").get(isAuth, untouchDataHIstory);
router.route("/untouchLead").get(isAuth, untouchData)
router.route("/assignByManager").patch(isAuth, assignLeadsByManager);
router.route("/search").get(isAuth, searchUntouchDataByEmail)

export default router;