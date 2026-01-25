import express from "express";
import { updateAdminMessage, getClientFeedbackDetails , sendFeedbackMail, getAllFeedbacks, submitClientFeedback, uploadServiceFile} from "../../controllers/feedbackManager/feedbackManageController.js";
import Feedback from "../../models/FeedbackManager/FeedbackSchema.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });
router.get('/', getAllFeedbacks);
router.get("/details/:token", getClientFeedbackDetails);

router.patch("/message/:id", updateAdminMessage);

router.post('/send-mail/:id', sendFeedbackMail);
router.patch('/upload/:id', upload.single("file"), uploadServiceFile);

router.patch("/client-submit/:token", submitClientFeedback);
export default router;