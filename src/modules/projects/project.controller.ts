/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Project } from "./project.model";

// Create a new project
export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, image, category, description, link, details } = req.body;
    const newProject = new Project({
      title,
      image,
      category,
      description,
      link,
      details,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: "Error creating project" });
  }
};

// Get all projects
export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: "Error fetching projects" });
  }
};

// Get a single project by ID
export const getProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: "Error fetching project" });
  }
};

// Update a project by ID
export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, image, category, description, link, details } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, image, category, description, link, details },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: "Error updating project" });
  }
};

// Delete a project by ID
export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting project" });
  }
};
