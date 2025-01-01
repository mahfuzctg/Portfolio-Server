import mongoose, { Document, Schema } from "mongoose";

// Interface for certificate data (without _id field)
export interface ICertificate {
  title: string;
  issuedBy: string;
  issuedTo: string;
  issueDate: Date;
  expirationDate?: Date;
  description?: string;
  link: string;
}

// Certificate document extends both the ICertificate interface and Mongoose Document
interface CertificateDocument extends Document, ICertificate {}

const CertificateSchema: Schema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    issuedBy: { type: String, required: true },
    issuedTo: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expirationDate: { type: Date, required: false },
    description: { type: String, required: false },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Certificate = mongoose.model<CertificateDocument>(
  "Certificate",
  CertificateSchema
);
