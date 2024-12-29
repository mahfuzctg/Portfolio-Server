import mongoose, { Document, Schema } from "mongoose";

export interface ICertificate {
  _id?: string;
  title: string;
  issuedBy: string;
  issuedTo: string;
  issueDate: Date;
  expirationDate?: Date;
  description?: string;
  link: string;
}

interface CertificateDocument extends ICertificate, Document {}

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
