import { Request, Response } from "express";
import { Certificate } from "./certificate.model";

// Create a new certificate
export const createCertificate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res
      .status(201)
      .json({ message: "Certificate created successfully", certificate });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create certificate", details: error.message });
  }
};

// Get all certificates
export const getCertificates = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch certificates", details: error.message });
  }
};

// Get a single certificate by ID
export const getCertificate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      res.status(404).json({ error: "Certificate not found" });
      return;
    }
    res.status(200).json(certificate);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch certificate", details: error.message });
  }
};

// Update a certificate by ID
export const updateCertificate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!certificate) {
      res.status(404).json({ error: "Certificate not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Certificate updated successfully", certificate });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update certificate", details: error.message });
  }
};

// Delete a certificate by ID
export const deleteCertificate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      res.status(404).json({ error: "Certificate not found" });
      return;
    }
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete certificate", details: error.message });
  }
};
