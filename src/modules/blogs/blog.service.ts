import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

export const createBlog = async (data: IBlog) => {
  const blog = await Blog.create(data);
  return blog;
};

export const getUserBlogs = async (authorId: string) => {
  const blogs = await Blog.find({ author: authorId });
  return blogs;
};

export const getBlogById = async (id: string, authorId: string) => {
  const blog = await Blog.findOne({ _id: id, author: authorId });
  return blog;
};

export const updateBlog = async (
  id: string,
  authorId: string,
  data: Partial<IBlog>
) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: id, author: authorId },
    data,
    {
      new: true,
    }
  );
  return updatedBlog;
};

export const deleteBlog = async (id: string, authorId: string) => {
  const deletedBlog = await Blog.findOneAndDelete({
    _id: id,
    author: authorId,
  });
  return deletedBlog;
};
