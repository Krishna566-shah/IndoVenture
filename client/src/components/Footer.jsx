import React from 'react';
// 🚀 1. Import the Phosphor Icons
import { Compass, Heart, InstagramLogo, TwitterLogo, FacebookLogo } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer className="py-5 mt-auto" style={{ backgroundColor: 'var(--text-dark)', color: 'white' }}>
      <div className="container text-center">
        
        {/* 🚀 2. Added a Compass icon to the brand name */}
        <h4 className="fw-bold mb-3 d-flex justify-content-center align-items-center gap-2" style={{ color: 'var(--primary-color)' }}>
          <Compass size={32} weight="duotone" /> IndoVenture
        </h4>
        
        <p className="mb-4 text-light" style={{ opacity: 0.9 }}>
          Explore India State by State. The Ultimate Digital Travel Encyclopedia.
        </p>
        
        {/* 🚀 3. Added some sleek social media icons! */}
        <div className="d-flex justify-content-center gap-4 mb-4">
          <a href="#" className="text-white transition-all" style={{ opacity: 0.7 }}>
            <InstagramLogo size={28} weight="duotone" />
          </a>
          <a href="#" className="text-white transition-all" style={{ opacity: 0.7 }}>
            <TwitterLogo size={28} weight="duotone" />
          </a>
          <a href="#" className="text-white transition-all" style={{ opacity: 0.7 }}>
            <FacebookLogo size={28} weight="duotone" />
          </a>
        </div>

        <hr className="bg-light mx-auto" style={{ opacity: 0.2, maxWidth: '600px', marginBottom: '1.5rem' }} />
        
        {/* 🚀 4. Added a tiny heart icon for that "crafted with love" touch */}
        <p className="small mb-0 d-flex justify-content-center align-items-center gap-1 text-light" style={{ opacity: 0.7 }}>
          © 2026 IndoVenture - India's States Venture. Built with <Heart size={16} weight="fill" color="var(--primary-color)" /> for explorers.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;