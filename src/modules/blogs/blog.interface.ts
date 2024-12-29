export interface IBlog {
  _id?: string;
  title: string;
  content: string;
  author: string; // User ID
  category?: string; // Optional category
  link?: string; // Optional link to the blog
  image?: string; // Optional blog image URL
  profileImage?: string; // Optional profile image URL for the author
  createdAt?: Date;
  updatedAt?: Date;
}
