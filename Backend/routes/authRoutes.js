// Backend/routes/authRoutes.js
import express from "express";
// <<<<<<< Updated upstream
import { registerUser, loginUser ,updateUser } from "../controllers/userController.js";
// =======
// import { registerUser, loginUser } from "../controllers/userController.js";
import isAuth from "../middlewares/AuthMiddleware.js";
// >>>>>>> Stashed changes

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-profile/:id", updateUser);


// router.get("/auth-check", isAuth, (req, res) => {
//   res.json(req.user);
// });

export default router;
