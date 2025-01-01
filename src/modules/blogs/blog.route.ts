import express from "express";
import * as BlogController from "./blog.controller";

const router = express.Router();

// Only require authentication for create, update, and delete routes
router.post("/create");
router.get("/", BlogController.getBlogs); // Open route (no auth required)
router.get("/:id", BlogController.getBlog); // Open route (no auth required)
router.put("/:id");
router.delete("/:id");

export const BlogRoutes = router;
