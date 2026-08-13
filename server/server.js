import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Destination from './models/Destination.js'; 
import Blog from './models/Blog.js';
import Review from './models/Review.js';

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


app.get('/api/destinations', async (req, res) => {
  try {
    const places = await Destination.find().sort({ _id: -1 });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

app.post('/api/destinations', async (req, res) => {
  try {
    // 🚀 THE FIX: Added description and hashtags to the VIP list!
    const { title, state, category, img, time, description, hashtags } = req.body;
    
    // 🚀 Pass all 7 pieces of data into the new Destination
    const newPlace = new Destination({ title, state, category, img, time, description, hashtags });
    
    const savedPlace = await newPlace.save(); 
    res.status(201).json(savedPlace);
  } catch (err) {
    console.error("Error saving:", err);
    res.status(500).json({ error: 'Failed to save destination' });
  }
});

app.delete('/api/destinations/:id', async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete destination' });
  }
});

// 🚀 GET ROUTE: Fetch all blogs to display on the website
app.get('/api/blogs', async (req, res) => {
  try {
    // .sort({ _id: -1 }) ensures the newest blogs show up first!
    const blogs = await Blog.find().sort({ _id: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// 🚀 POST ROUTE: Receive and save a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, author, date, excerpt, image, link } = req.body;
    
    const newBlog = new Blog({ title, author, date, excerpt, image, link });
    const savedBlog = await newBlog.save();
    
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("Error saving blog:", err);
    res.status(500).json({ error: 'Failed to save blog' });
  }
});

// 🚀 GET ROUTE: Send all blogs to the frontend
app.get('/api/blogs', async (req, res) => {
  try {
    // .sort({ _id: -1 }) ensures the newest blogs show up at the top!
    const blogs = await Blog.find().sort({ _id: -1 });
    res.json(blogs);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// 🚀 POST ROUTE: Receive the blog (and the large image string) and save it
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, author, date, excerpt, image, link } = req.body;
    
    const newBlog = new Blog({ title, author, date, excerpt, image, link });
    const savedBlog = await newBlog.save();
    
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("Error saving blog:", err);
    res.status(500).json({ error: 'Failed to save blog' });
  }
});
// 🚀 GET ROUTE: Fetch all reviews to display on the website
app.get('/api/reviews', async (req, res) => {
  try {
    // .sort({ createdAt: -1 }) ensures the newest reviews show up first!
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// 🚀 POST ROUTE: Receive and save a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, location, rating, comment } = req.body;
    
    const newReview = new Review({ name, location, rating, comment });
    const savedReview = await newReview.save();
    
    res.status(201).json(savedReview);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is listening for requests on port ${PORT}`));