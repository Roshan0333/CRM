import express from "express";
import {getComplaints, getComplaintById, updateComplaint, createComplaintFromFeedback, getMyAssignedTasks} from "../../controllers/feedbackManager/complaintController.js";
import isAuth  from "../../middlewares/AuthMiddleware.js"; 
import { isEmployee } from "../../middlewares/RoleMiddleware.js";

const router = express.Router();

router.get('/', getComplaints);


//-----------------------------------------FEEDBACK EMPLOYEE
router.get("/my-tasks", isAuth, isEmployee, getMyAssignedTasks);

router.post('/generate-from-feedback',createComplaintFromFeedback);
router.get('/:id', getComplaintById);
router.patch('/:id', updateComplaint);

//-----------------------------------------FEEDBACK EMPLOYEE
router.put("/update/:id", updateComplaint);
export default router;