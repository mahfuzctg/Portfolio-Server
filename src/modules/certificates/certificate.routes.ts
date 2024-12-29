import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as CertificateController from "../certificates/certificate.controller";

const router = express.Router();

// CRUD operations for certificates
router.post("/", authMiddleware, CertificateController.createCertificate); // Create a certificate
router.get("/", authMiddleware, CertificateController.getCertificates); // Get all certificates
router.get("/:id", authMiddleware, CertificateController.getCertificate); // Get a single certificate
router.put("/:id", authMiddleware, CertificateController.updateCertificate); // Update a certificate
router.delete("/:id", authMiddleware, CertificateController.deleteCertificate); // Delete a certificate

export const CertificateRoutes = router;
