import express from "express";
import {getComplaints, getComplaintById, updateComplaint} from "../../controllers/feedbackManager/complaintController.js";
const router = express.Router();

router.get('/', getComplaints);
router.get('/:id', getComplaintById);
router.patch('/:id', updateComplaint);

export default router;