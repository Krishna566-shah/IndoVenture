import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  state: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String, default: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80' }, 
  time: { type: String, default: 'Year Round' },
  description: { type: String, default: 'Discover the beauty, history, and culture of this amazing destination.' },
  // 🚀 NEW: Added hashtags to the database!
  hashtags: { type: String, default: '#IncredibleIndia #TravelGoals #Wanderlust' }
}, { timestamps: true }); 

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;