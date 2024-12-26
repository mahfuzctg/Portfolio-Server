import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import * as BlogController from "./blog.controller";

const router = express.Router();

router.post("/", authMiddleware, BlogController.createBlog);
router.get("/", authMiddleware, BlogController.getBlogs);
router.get("/:id", authMiddleware, BlogController.getBlog);
router.put("/:id", authMiddleware, BlogController.updateBlog);
router.delete("/:id", authMiddleware, BlogController.deleteBlog);

export const BlogRoutes = router;
