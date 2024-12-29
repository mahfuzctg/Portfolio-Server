import express from "express";
import * as SkillController from "../skills/skill.controller";

const router = express.Router(); // Create a new router for handling routes

// Define your routes
router.post("/", SkillController.createSkill); // Add a new skill
router.get("/", SkillController.getSkills); // Get all skills
router.get("/:id", SkillController.getSkill); // Get a specific skill by id
router.put("/:id", SkillController.updateSkill); // Update a skill by id
router.delete("/:id", SkillController.deleteSkill); // Delete a skill by id

// Export the router
export const SkillRoutes = router;
