import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

// Create a new blog
export const createBlog = async (data: IBlog) => {
  const blog = await Blog.create(data);
  return blog;
};

// Fetch all blogs (open to everyone)
export const getAllBlogs = async () => {
  const blogs = await Blog.find(); // Fetch all blogs
  return blogs;
};

// Fetch a single blog by ID (open to everyone)
export const getBlogById = async (id: string) => {
  const blog = await Blog.findById(id); // Fetch blog by ID without filtering by author
  return blog;
};

// Update a blog (only by the author)
export const updateBlog = async (
  id: string,
  authorId: string,
  data: Partial<IBlog>
) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: id, author: authorId },
    data,
    {
      new: true, // Return the updated blog
    }
  );
  return updatedBlog;
};

// Delete a blog (only by the author)
export const deleteBlog = async (id: string, authorId: string) => {
  const deletedBlog = await Blog.findOneAndDelete({
    _id: id,
    author: authorId, // Ensure only the author can delete their own blog
  });
  return deletedBlog;
};
