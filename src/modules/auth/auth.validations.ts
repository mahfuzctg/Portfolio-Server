import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Define the schema using zod
const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Middleware for validation
export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    authSchema.parse(req.body); // Validate the request body
    next(); // If valid, proceed to the next middleware
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Pass validation errors to the global error handler
      return next({
        status: 400,
        message: error.errors[0].message, // Send the first error message
      });
    }
    next(error); // Pass other errors to the global error handler
  }
};
