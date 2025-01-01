import express from "express";

const router = express.Router();

// Define routes for CRUD operations
router.post("/");
router.get("/");
router.get("/:id");
router.put("/:id");
router.delete("/:id");

export const CoursesRoutes = router;
