import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as BlogController from "./blog.controller";

const router = express.Router();

// Only require authentication for create, update, and delete routes
router.post("/create", authMiddleware, BlogController.createBlog);
router.get("/", BlogController.getBlogs); // Open route (no auth required)
router.get("/:id", BlogController.getBlog); // Open route (no auth required)
router.put("/:id", authMiddleware, BlogController.updateBlog);
router.delete("/:id", authMiddleware, BlogController.deleteBlog);

export const BlogRoutes = router;
