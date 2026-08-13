import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

// Import the Router tools!
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all components
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import InteractiveMap from './components/InteractiveMap'; 
import Destinations from './components/Destinations';
import VideoSection from './components/VideoSection';
import BlogSection from './components/BlogSection';     
import ReviewSection from './components/ReviewSection'; 
import ContactUs from './components/ContactUs';       
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard'; 

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <main>
              <Home /> 
              <AboutUs />
              <InteractiveMap />
              <Destinations />
              <VideoSection />
              <BlogSection />   
              <ReviewSection /> 
              <ContactUs />         
            </main>
          } />

          
          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;