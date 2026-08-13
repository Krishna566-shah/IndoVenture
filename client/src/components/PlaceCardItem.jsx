import React from 'react';
// 🚀 1. Import the Phosphor Icons
import { MapPin, SunHorizon, ArrowRight } from '@phosphor-icons/react';

const PlaceCard = ({ title, state, category, image, time, description, hashtags }) => {
  
  // Dynamically creates the Wikipedia link based on the card's title!
  const wikiLink = title ? `https://en.wikipedia.org/wiki/${title.replace(/\s+/g, '_')}` : '#';

  return (
    <div className="card-custom h-100 p-2 pb-4 shadow-sm" style={{ backgroundColor: '#fff', borderRadius: '24px' }}>
      
      {/* Soft rounded image */}
      <div className="position-relative">
        <img 
          src={image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da"} 
          className="w-100" 
          alt={title}
          style={{ height: '220px', objectFit: 'cover', borderRadius: '20px' }}
        />
        {/* Pill category tag sitting on the image */}
        <span className="position-absolute top-0 end-0 m-3 px-3 py-1 bg-white fw-bold rounded-pill shadow-sm" style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>
          {category}
        </span>
      </div>
      
      {/* Changed to a flex column so the bottom links always align perfectly */}
      <div className="px-3 pt-4 d-flex flex-column" style={{ height: 'calc(100% - 220px)' }}>
        <h5 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>{title}</h5>
        
        {/* 🚀 2. Replaced the Map Pin Emoji */}
        <p className="small fw-semibold mb-2 d-flex align-items-center gap-1" style={{ color: 'var(--text-muted)' }}>
          <MapPin size={18} weight="fill" color="var(--primary-color)" /> {state}
        </p>
        
        {/* The Description */}
        {description && (
          <p className="text-secondary mb-2" style={{ fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {description}
          </p>
        )}

        {/* The Hashtags */}
        {hashtags && (
          <p className="small mb-3 mt-auto" style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.8rem' }}>
            {hashtags}
          </p>
        )}
        
        <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-auto">
          
          {/* 🚀 3. Replaced the Sun/Weather Emoji */}
          <span className="small fw-semibold text-muted d-flex align-items-center gap-1">
            <SunHorizon size={18} weight="duotone" color="#ffb703" /> {time || "Year Round"}
          </span>
          
          {/* 🚀 4. Replaced the Text Arrow with an Icon */}
          <a 
            href={wikiLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="fw-bold text-decoration-none d-flex align-items-center gap-1" 
            style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}
          >
            Explore <ArrowRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;