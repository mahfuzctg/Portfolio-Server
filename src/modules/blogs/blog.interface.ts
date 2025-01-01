import mongoose from "mongoose";

export interface IBlog {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  category?: string; // Optional category
  link?: string; // Optional link to the blog
  image?: string; // Optional blog image URL
  profileImage?: string; // Optional profile image URL for the author
  createdAt?: Date;
  updatedAt?: Date;
}
