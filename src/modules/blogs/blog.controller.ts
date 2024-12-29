/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import * as BlogService from "./blog.service";

// Ensure each function returns Promise<void>
export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, content, category, link, image, profileImage } = req.body;
  const author = req.user.id; // Get the authenticated user ID

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

    // Return all fields in the response
    res.status(201).json({
      success: true,
      data: newBlog,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  // If you want to make it open, remove author and return all blogs
  try {
    const blogs = await BlogService.getAllBlogs(); // Fetch all blogs
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

export const getBlog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const blog = await BlogService.getBlogById(id); // Fetch blog by ID without author check
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
};

export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const author = req.user.id; // Get the authenticated user ID
  const data = req.body;

  try {
    const updatedBlog = await BlogService.updateBlog(id, author, data);
    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update blog" });
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const author = req.user.id; // Get the authenticated user ID

  try {
    const deletedBlog = await BlogService.deleteBlog(id, author);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};
