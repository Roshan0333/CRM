import express from "express";
import {
  getUntouchedStats,
  getUntouchedData
} from "../../controllers/SalesTeam/untouchedController.js";
  

const router = express.Router();

router.get("/", getUntouchedData);
router.get("/stats", getUntouchedStats);


export default router;
