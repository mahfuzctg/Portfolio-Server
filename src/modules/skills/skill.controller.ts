/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Skill } from "./skill.model";

// Create a new skill entry
export const createSkill = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { name, level, description, image } = req.body;
    const newSkill = new Skill({
      name,
      level,
      description,
      image,
    });
    await newSkill.save();
    return res.status(201).json(newSkill); // Return the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).json({ error: "Error creating skill entry" }); // Return the response
  }
};

// Get all skill entries
export const getSkills = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const skills = await Skill.find();
    return res.status(200).json(skills); // Return the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).json({ error: "Error fetching skill entries" }); // Return the response
  }
};

// Get a specific skill entry by ID
export const getSkill = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" }); // Return the response
    }
    return res.status(200).json(skill); // Return the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).json({ error: "Error fetching skill entry" }); // Return the response
  }
};

// Update a skill entry by ID
export const updateSkill = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { name, level, description, image } = req.body;
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, level, description, image },
      { new: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ error: "Skill not found" }); // Return the response
    }
    return res.status(200).json(updatedSkill); // Return the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).json({ error: "Error updating skill entry" }); // Return the response
  }
};

// Delete a skill entry by ID
export const deleteSkill = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ error: "Skill not found" }); // Return the response
    }
    return res.status(200).json({ message: "Skill deleted successfully" }); // Return the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).json({ error: "Error deleting skill entry" }); // Return the response
  }
};
