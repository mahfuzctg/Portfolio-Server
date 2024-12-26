/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import * as BlogService from "./blog.service";

export const createBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const author = req.user.id; // Authenticated user ID

  try {
    const blog = await BlogService.createBlog({ title, content, author });
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  const author = req.user.id;

  try {
    const blogs = await BlogService.getUserBlogs(author);
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = req.user.id;

  try {
    const blog = await BlogService.getBlogById(id, author);
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

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = req.user.id;
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

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = req.user.id;

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
