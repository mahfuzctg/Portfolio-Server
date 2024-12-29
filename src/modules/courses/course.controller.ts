/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Course } from "./courses.model";

// Create a new course
export const createCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      title,
      description,
      duration,
      instructor,
      image,
      link,
      certificate,
    } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const newCourse = new Course({
      title,
      description,
      duration,
      instructor,
      image,
      link,
      certificate, // Optional field
    });

    await newCourse.save();
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Error creating course entry" });
  }
};

// Get all courses
export const getCourses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching course entries" });
  }
};

// Get a specific course by ID
export const getCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching course entry" });
  }
};

// Update a course by ID
export const updateCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, description } = req.body;

    // Validate required fields for update
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required for update" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(500).json({ error: "Error updating course entry" });
  }
};

// Delete a course by ID
export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting course entry" });
  }
};
