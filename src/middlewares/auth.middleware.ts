import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Define the type of the decoded token payload (adjust this based on your JWT structure)
interface DecodedToken {
  userId: string;
  email: string;
  // Add any other properties you expect in the token
}

// Secret key from environment variables (you should set it in .env)
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";

// Middleware to authenticate the token
export const authMiddleware = (
  req: Request & { user?: DecodedToken }, // Augmenting the Request type
  res: Response,
  next: NextFunction
): void => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided
  if (!token) {
    res.status(401).json({ error: "Unauthorized" }); // Return response and stop further execution
    return; // Ensures that next() isn't called after the response
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken; // Casting to the correct type
    req.user = decoded; // Store decoded user info in the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    // Token is invalid or expired
    console.error("Token verification failed:", error); // Log the error for debugging
    res.status(401).json({ error: "Invalid token" }); // Return response and stop further execution
  }
};
