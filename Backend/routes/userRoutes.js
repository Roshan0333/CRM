import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.put("/fix-name", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { email, firstName, lastName } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { firstName, lastName },
      { new: true }
    );

    console.log("UPDATED USER:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated",
      name: `${user.firstName} ${user.lastName}`
    });
  } catch (error) {
    console.error("FIX-NAME ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
