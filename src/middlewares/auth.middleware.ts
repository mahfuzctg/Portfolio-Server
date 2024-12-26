import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Secret key from environment variables (ensure it's correct)
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key"; // Make sure this matches your JWT secret

// Middleware to authenticate the token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, token missing" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Store decoded user info in the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
