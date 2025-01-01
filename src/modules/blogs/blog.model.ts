import mongoose, { Document, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

export interface BlogDocument extends IBlog, Document {
  author: mongoose.Types.ObjectId;
}

const BlogSchema: Schema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Define as ObjectId
      ref: "User", // Reference the User model
      required: true,
    },
    category: { type: String, required: false }, // Optional category
    link: { type: String, required: false }, // Optional link
    image: { type: String, required: false }, // Optional blog image URL
    profileImage: { type: String, required: false }, // Optional profile image URL
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Middleware to populate the profile image when the blog is fetched
BlogSchema.pre("findOne", function () {
  this.populate("author", "profileImage"); // Only get the profileImage field from User
});

export const Blog = mongoose.model<BlogDocument>("Blog", BlogSchema);
