import express from "express";
import * as CourseController from "../courses/course.controller";

const router = express.Router();

// Define routes for CRUD operations
router.post("/", CourseController.createCourse);
router.get("/", CourseController.getCourses);
router.get("/:id", CourseController.getCourse);
router.put("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);

export const CoursesRoutes = router;
