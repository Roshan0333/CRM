import {Router} from "express";
import multer from "multer";
import {csvFile, excelFile,teamAssignLeads, assignLeads, getAssignedLeadList, updateClient, managerUntouchClient, employeeUntouchClient, deleteClient, employeeHistory} from "../../controllers/salesDepartment/clientLeads.controllers.js";
import isAuth from "../../middlewares/AuthMiddleware.js";

const router = Router();

const upload = multer({
    dest: "uploads",
    // limits: {
    //     fileSize: 100*1024*1024
    // }
})


router.route("/excelFileLead").post(isAuth,upload.single("file"), excelFile);
router.route("/csvFileLead").post(isAuth,upload.single("file"), csvFile);
router.route("/teamAssignedLead").put(isAuth, teamAssignLeads)
router.route("/assignLead").patch(isAuth, assignLeads);
router.route("/getAssignedLeadList").get(isAuth, getAssignedLeadList);
router.route("/updateClient").patch(isAuth, updateClient);
router.route("/managerUntouchClient").get(isAuth, managerUntouchClient);
router.route("/employeeUntouchClient").get(isAuth, employeeUntouchClient);
router.route("/deleteClient").delete(isAuth, deleteClient);
router.route("/employeeHistory").get(isAuth, employeeHistory);

export default router;