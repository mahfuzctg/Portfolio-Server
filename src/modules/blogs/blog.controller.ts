/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import mongoose from "mongoose";
import * as BlogService from "./blog.service";

// Extend the Express Request interface to include `user`
interface AuthenticatedRequest extends Request {
  user: { id: string }; // Define the user object with an ID property
}

// Create Blog
export const createBlog = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { title, content, category, link, image, profileImage } = req.body;
  const author = new mongoose.Types.ObjectId(req.user.id);

  try {
    const newBlog = await BlogService.createBlog({
      title,
      content,
      category,
      link,
      image,
      author,
      profileImage,
    });

    res.status(201).json({
      success: true,
      data: newBlog,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};

// Get All Blogs
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await BlogService.getAllBlogs();
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

// Get Single Blog
export const getBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const blog = await BlogService.getBlogById(id);
    if (!blog) {
      res.status(404).json({ success: false, message: "Blog not found" });
      return;
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
};

// Update Blog
export const updateBlog = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const author = req.user.id;
  const data = req.body;

  try {
    const updatedBlog = await BlogService.updateBlog(id, author, data);
    if (!updatedBlog) {
      res
        .status(404)
        .json({ success: false, message: "Blog not found or unauthorized" });
      return;
    }
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update blog" });
  }
};

// Delete Blog
export const deleteBlog = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const author = req.user.id;

  try {
    const deletedBlog = await BlogService.deleteBlog(id, author);
    if (!deletedBlog) {
      res
        .status(404)
        .json({ success: false, message: "Blog not found or unauthorized" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};
