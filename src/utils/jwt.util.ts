import jwt from "jsonwebtoken";

// Use environment variable for JWT_SECRET
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "fqyrozHSjqnpoP94FtGUqxR7XLK8cI7mJDpIzW6EAZ8ehywxpLd+vMGFIQWIP0A/jRifgLc7g6XLww+2iSGENQ"; // Default value is for fallback only

// Function to generate a JWT token
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
