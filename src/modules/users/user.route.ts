import express from "express";
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("User route is working!");
});

export const UserRoutes = router;
