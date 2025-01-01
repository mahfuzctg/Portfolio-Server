import express from "express";
const router = express.Router(); // Create a new router for handling routes

// Define the routes
router.post("/"); // Create new education entry
router.get("/"); // Get all education entries
router.get("/:id"); // Get a specific education entry by id
router.put("/:id"); // Update an education entry by id
router.delete("/:id"); // Delete an education entry by id

// Export the router
export const EducationRoutes = router;
