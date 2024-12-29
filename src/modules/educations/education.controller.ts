/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Education } from "./education.model";

// Create a new education entry
export const createEducation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      title,
      institution,
      degree,
      description,
      image,
      link,
      certificate,
    } = req.body;

    const newEducation = new Education({
      title,
      institution,
      degree,
      description,
      image,
      link,
      certificate,
    });

    await newEducation.save();
    return res.status(201).json(newEducation);
  } catch (error) {
    return res.status(500).json({ error: "Error creating education entry" });
  }
};

// Get all education entries
export const getEducations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const educations = await Education.find();
    return res.status(200).json(educations);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching education entries" });
  }
};

// Get a specific education entry by id
export const getEducation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    return res.status(200).json(education);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching education entry" });
  }
};

// Update an education entry by id
export const updateEducation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEducation) {
      return res.status(404).json({ error: "Education not found" });
    }

    return res.status(200).json(updatedEducation);
  } catch (error) {
    return res.status(500).json({ error: "Error updating education entry" });
  }
};

// Delete an education entry by id
export const deleteEducation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) {
      return res.status(404).json({ error: "Education not found" });
    }
    return res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting education entry" });
  }
};
