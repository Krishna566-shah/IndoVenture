import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  excerpt: { type: String, required: true },
  image: { type: String, required: true }, // 🚀 This will hold either the URL or the massive Base64 text!
  link: { type: String, required: true }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;