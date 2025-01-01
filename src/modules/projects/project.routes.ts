import express from "express";

const router = express.Router();

// CRUD operations
router.post("");
router.get("/");
router.get("/:id");
router.put("/:id");
router.delete("/:id");

export const ProjectRoutes = router;
