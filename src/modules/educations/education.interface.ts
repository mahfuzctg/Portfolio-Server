export interface IEducation {
  _id?: string;
  title: string; // e.g. "Bachelor of Science in Computer Science"
  institution: string; // e.g. "XYZ University"
  degree: string; // e.g. "B.Sc."
  year?: number; // e.g. 2024
  description: string; // Optional description about the education
  image?: string; // e.g., "https://example.com/image.jpg"
  link?: string; // e.g., "https://example.com/education-details"
  certificate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
