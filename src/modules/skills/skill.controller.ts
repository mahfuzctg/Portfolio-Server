/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Skill } from "./skill.model";

// Create a new skill entry
export const createSkill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, level, description, image } = req.body;

    // Validate required fields
    if (!name || !level || !image) {
      return res
        .status(400)
        .json({ error: "Name, level, and image are required" });
    }

    const newSkill = new Skill({
      name,
      level,
      description,
      image, // Include image in the new skill creation
    });

    await newSkill.save();
    return res.status(201).json(newSkill);
  } catch (error) {
    return res.status(500).json({ error: "Error creating skill entry" });
  }
};

// Get all skill entries
export const getSkills = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const skills = await Skill.find();
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching skill entries" });
  }
};

// Get a specific skill entry by id
export const getSkill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    return res.status(200).json(skill);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching skill entry" });
  }
};

// Update a skill entry by id
export const updateSkill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, level, description, image } = req.body;

    // Ensure image is provided when updating
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, level, description, image }, // Update with the new data
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    return res.status(200).json(updatedSkill);
  } catch (error) {
    return res.status(500).json({ error: "Error updating skill entry" });
  }
};

// Delete a skill entry by id
export const deleteSkill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    return res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting skill entry" });
  }
};
