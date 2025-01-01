/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express's Request type to include the `user` property
interface AuthenticatedRequest extends Request {
  user: JwtPayload; // Strictly type as JwtPayload to avoid the mismatch
}

// Secret key from environment variables (ensure it's correct)
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key"; // Ensure this matches your JWT secret

// Middleware to authenticate the token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, token missing" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Add the user property to the request object
    (req as AuthenticatedRequest).user = decoded; // Cast `req` to `AuthenticatedRequest`
    next(); // Call the next middleware or route handler
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
