import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  markProjectCompleted,
  changeProjectStatus,
  deleteProject
} from "../controllers/projectController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { isTL } from "../../middlewares/RoleMiddleware.js";

const router = express.Router();

/**
 * CREATE PROJECT
 */
router.post( "/", protect, createProject);

/**
 * GET ALL PROJECTS
 */
router.get("/", protect, getProjects);

/**
 * GET SINGLE PROJECT
 */
router.get("/:id", protect, getProjectById);

/**
 * UPDATE PROJECT
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "MANAGER"),
  updateProject
);

/**
 * MARK COMPLETED
 */
router.patch(
  "/:id/complete",
  protect,
  authorizeRoles("ADMIN", "MANAGER"),
  markProjectCompleted
);

/**
 * CHANGE STATUS
 */
router.patch( "/:id/status", protect,isTL("Team Leader", "MANAGER"),
  changeProjectStatus
);

/**
 * DELETE PROJECT
 */
router.delete("/:id",protect,isTL("Team Leader"),
  deleteProject
);

export default router;
