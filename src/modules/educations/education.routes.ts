import express from "express";
import * as EducationController from "../educations/education.controller"; // Adjust the path if necessary

const router = express.Router(); // Create a new router for handling routes

// Define the routes
router.post("/", EducationController.createEducation); // Create new education entry
router.get("/", EducationController.getEducations); // Get all education entries
router.get("/:id", EducationController.getEducation); // Get a specific education entry by id
router.put("/:id", EducationController.updateEducation); // Update an education entry by id
router.delete("/:id", EducationController.deleteEducation); // Delete an education entry by id

// Export the router
export const EducationRoutes = router;
