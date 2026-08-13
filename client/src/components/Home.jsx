import React, { useState, useEffect } from 'react';
// 🚀 1. Import the Phosphor Icons
import { AirplaneTilt, ArrowRight } from '@phosphor-icons/react';

const Home = () => {
  // 1. Array of beautiful travel images
  const heroImages = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SW5kaWElMjB0cmF2ZWx8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1601618613229-ec7645fad6fa?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1571536802807-3cab46e1c667?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80"  ]

  // 2. State to track which image is currently showing
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // 3. The Automatic Timer (Changes image every 4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); // 4000 milliseconds = 4 seconds

    // Cleanup timer if the user leaves the page
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row align-items-center g-5">
          
          {/* Left Text Column */}
          <div className="col-lg-6">
            
            {/* 🚀 2. Replaced Emoji with AirplaneTilt Icon */}
            <span className="badge bg-white text-danger mb-3 px-3 py-2 rounded-pill shadow-sm fw-bold border border-light d-inline-flex align-items-center gap-2">
              <AirplaneTilt size={20} weight="fill" /> Your Ultimate Travel Guide
            </span>
            
            <h1 className="display-3 fw-bold mb-4" style={{ color: 'var(--text-dark)', lineHeight: '1.2' }}>
              Discover the <br />
              <span style={{ color: 'var(--primary-color)' }}>Unseen Beauty</span> <br />
              of India.
            </h1>
            <p className="lead text-muted mb-5" style={{ maxWidth: '500px' }}>
              From the snow-capped Himalayas to the tropical beaches of Kerala. Plan your perfect journey with our interactive guides.
            </p>
            <div className="d-flex gap-3">
              
              {/* 🚀 3. Added ArrowRight Icon to the button */}
              <a href="#destinations" className="btn-primary-custom text-decoration-none d-inline-flex align-items-center gap-2">
                Explore Destinations <ArrowRight size={20} weight="bold" />
              </a>
              
            </div>
          </div>

          {/* Right Image Slider Column */}
          <div className="col-lg-6 position-relative" style={{ height: '500px' }}>
            {heroImages.map((imgSrc, index) => (
              <img 
                key={index}
                src={imgSrc} 
                alt="India Travel" 
                className="img-fluid position-absolute top-0 end-0"
                style={{ 
                  borderRadius: '30px', 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  width: '90%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: currentImgIndex === index ? 1 : 0,
                  transition: 'opacity 1.5s ease-in-out',
                  zIndex: currentImgIndex === index ? 1 : 0
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;