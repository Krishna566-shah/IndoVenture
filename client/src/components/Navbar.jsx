import React, { useState, useEffect } from 'react';
// 🚀 1. Import the Phosphor Icons
import { List, House, MapTrifold, Users, EnvelopeSimple, ShieldCheck, AirplaneTilt } from '@phosphor-icons/react';

const Navbar = () => {
  // Adds a shadow only when you scroll down
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50));
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg sticky-top custom-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" href="/" style={{ color: 'var(--text-dark)' }}>
          {/* THE NEW ROUND LOGO */}
          <img 
            src="/Favicon.png" 
            alt="IndoVenture Logo" 
            style={{ 
              width: '35px', 
              height: '35px', 
              objectFit: 'cover', 
              borderRadius: '50%',
              border: '2px solid var(--primary-color)'
            }} 
          />
          <span style={{ color: '#ff804a' }}>I</span><span style={{ color: '#ff804a' }}>N</span><span style={{ color: '#ff804a' }}>D</span><span style={{ color: '#ff804a' }}>O</span><span style={{ color: '#1a9b0be8' }}>Venture</span>
        </a>
        
        {/* 🚀 2. Replaced default Bootstrap toggler with Phosphor List icon */}
        <button className="navbar-toggler border-0 shadow-none px-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <List size={32} weight="bold" color="var(--primary-color)" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-4">
            
            {/* 🚀 3. Added icons to all navigation links */}
            <li className="nav-item">
              <a className="nav-link fw-semibold d-flex align-items-center gap-1" href="/" style={{ color: 'var(--text-dark)' }}>
                <House size={18} weight="bold" /> Home
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link fw-semibold d-flex align-items-center gap-1" href="/#destinations" style={{ color: 'var(--text-muted)' }}>
                <MapTrifold size={18} weight="bold" /> Destinations
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link fw-semibold d-flex align-items-center gap-1" href="/#blogs" style={{ color: 'var(--text-muted)' }}>
                <Users size={18} weight="bold" /> Community
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link fw-semibold d-flex align-items-center gap-1" href="/#contact" style={{ color: 'var(--text-muted)' }}>
                <EnvelopeSimple size={18} weight="bold" /> Contact
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link fw-semibold d-flex align-items-center gap-1" href="/admin" style={{ color: 'var(--text-muted)' }}>
                <ShieldCheck size={18} weight="bold" /> Admin
              </a>
            </li>
          </ul>
          
          <div className="d-flex mt-3 mt-lg-0">
            {/* 🚀 4. Added Airplane icon to the main CTA button */}
            <a href="/#contact" className="btn-primary-custom text-decoration-none d-flex align-items-center gap-2">
              Plan your Trip <AirplaneTilt size={20} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;