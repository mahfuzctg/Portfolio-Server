export interface IBlog {
  _id?: string;
  title: string;
  content: string;
  author: string; // User ID
  createdAt?: Date;
  updatedAt?: Date;
}
