import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as ProjectController from "../projects/project.controller";

const router = express.Router();

// CRUD operations
router.post("/", authMiddleware, ProjectController.createProject);
router.get("/", authMiddleware, ProjectController.getProjects);
router.get("/:id", authMiddleware, ProjectController.getProject);
router.put("/:id", authMiddleware, ProjectController.updateProject);
router.delete("/:id", authMiddleware, ProjectController.deleteProject);

export const ProjectRoutes = router;
