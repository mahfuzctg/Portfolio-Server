import express from "express";

const router = express.Router();

// CRUD operations for certificates
router.post("/"); // Create a certificate
router.get("/"); // Get all certificates
router.get("/:id"); // Get a single certificate
router.put("/:id"); // Update a certificate
router.delete("/:id"); // Delete a certificate

export const CertificateRoutes = router;
