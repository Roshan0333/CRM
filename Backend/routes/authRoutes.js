// Backend/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser ,updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-profile/:id", updateUser);


export default router;
