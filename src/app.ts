import cors from "cors";
import express from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app = express();

// Define allowed origins
const allowedOrigins = ["http://localhost:5173"];

// Set up CORS to check against allowed origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or CURL requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Use JSON body parser
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Welcome to my portfolio server!😄💖");
});

// Use router for API routes
app.use("/api", router);

// Catch-all route for 404 errors
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not found",
  });
});

// Global error handler
app.use(globalErrorHandler);

export default app;
