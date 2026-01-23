import express from "express";
import { updateAdminMessage, getClientFeedbackDetails , sendFeedbackMail} from "../../controllers/feedbackManager/feedbackManageController.js";
const router = express.Router();

// Route for Admin to save a message to a service
router.patch("/message/:id", updateAdminMessage);

// Route for Client to fetch details using their unique token
router.get("/details/:token", getClientFeedbackDetails);

router.post('/send-mail/:id', sendFeedbackMail);
export default router;