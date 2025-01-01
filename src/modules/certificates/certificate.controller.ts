/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Certificate } from "./certificate.model";

// Create a new certificate
export const createCertificate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    return res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to create certificate",
      details: error.message,
    });
  }
};

// Get all certificates
export const getCertificates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const certificates = await Certificate.find();
    return res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch certificates",
      details: error.message,
    });
  }
};

// Get a single certificate by ID
export const getCertificate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid ID format" });
    }

    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res
        .status(404)
        .json({ success: false, error: "Certificate not found" });
    }

    return res.status(200).json({ success: true, data: certificate });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch certificate",
      details: error.message,
    });
  }
};

// Update a certificate by ID
export const updateCertificate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid ID format" });
    }

    const certificate = await Certificate.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!certificate) {
      return res
        .status(404)
        .json({ success: false, error: "Certificate not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to update certificate",
      details: error.message,
    });
  }
};

// Delete a certificate by ID
export const deleteCertificate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid ID format" });
    }

    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) {
      return res
        .status(404)
        .json({ success: false, error: "Certificate not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete certificate",
      details: error.message,
    });
  }
};
