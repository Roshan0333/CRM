import express from "express";
import { createProspect } from "../../controllers/SalesTeam/prospectController.js";

const router = express.Router();

router.post("/prospects", createProspect);

export default router;
