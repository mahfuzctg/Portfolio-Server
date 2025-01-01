import express from "express";

const router = express.Router(); // Create a new router for handling routes

// Define your routes
router.post("/"); // Add a new skill
router.get("/"); // Get all skills
router.get("/:id"); // Get a specific skill by id
router.put("/:id"); // Update a skill by id
router.delete("/:id"); // Delete a skill by id

// Export the router
export const SkillRoutes = router;
