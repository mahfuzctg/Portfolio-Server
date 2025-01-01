/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";

// Extend the Express module to include custom types globally
declare global {
  namespace Express {
    interface Request {
      // Add any custom properties you need on the Request object
      user?: any; // Example: If you have a user object attached to the request (e.g., from authentication)
    }
  }

  // Extend other types if necessary
  type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}
