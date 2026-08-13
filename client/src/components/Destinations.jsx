import React, { useState, useEffect } from 'react';
import PlaceCard from './PlaceCardItem.jsx';
import IndiaMap from './IndiaMap'; // 🗺️ Your interactive map

const Destinations = () => {
  const [places, setPlaces] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeState, setActiveState] = useState('All');

  useEffect(() => {
    // FIXED URL HERE
    fetch(`${import.meta.env.VITE_API_URL}/api/destinations`)
      .then(res => res.json())
      .then(data => setPlaces(data))
      .catch(err => console.error("Error fetching places:", err));
  }, []);

  const categories = ['All', 'Heritage', 'Nature', 'Adventure', 'Religious', 'Offbeat'];

  const filteredPlaces = places.filter(place => {
    const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
    const matchesState = activeState === 'All' || place.state === activeState;
    return matchesCategory && matchesState;
  });

  return (
    <section id="destinations" className="py-5" style={{ background: 'var(--bg-main)' }}>
      <div className="container my-5">
        
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text-dark)' }}>
            Choose The Perfect Destination
          </h2>
          <p className="lead mx-auto" style={{ color: 'var(--text-muted)', maxWidth: '600px' }}>
            Click on the map to filter by state, or choose a category below.
          </p>
        </div>

        <div className="row g-5 mb-5 align-items-center">
          
          {/* LEFT SIDE: The Interactive Map */}
          <div className="col-lg-5">
            <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
              <IndiaMap activeState={activeState} setActiveState={setActiveState} />
            </div>
          </div>

          {/* RIGHT SIDE: Category Tags & Results count */}
          <div className="col-lg-7">
            <div className="d-flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`btn filter-tag ${activeCategory === category ? 'active' : ''}`}
                  style={{ padding: '10px 24px', fontSize: '1rem' }}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Quick action to clear all filters */}
            {(activeState !== 'All' || activeCategory !== 'All') && (
               <button 
                 onClick={() => { setActiveState('All'); setActiveCategory('All'); }} 
                 className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold"
               >
                 ✖ Clear Filters
               </button>
            )}
            
            <h4 className="mt-4 fw-bold" style={{ color: 'var(--text-dark)' }}>
              Found {filteredPlaces.length} places {activeState !== 'All' ? `in ${activeState}` : ''}
            </h4>
          </div>

        </div>

        {/* --- THE DATA GRID --- */}
        <div className="row g-4">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(place => (
              <div className="col-lg-4 col-md-6" key={place._id}>
                <PlaceCard 
                  title={place.title} 
                  state={place.state} 
                  category={place.category} 
                  image={place.img}       

                  
                  time={place.time}
                  
                  // 🚀 1. PASSING THE NEW DATA DOWN TO THE CARD!
                  description={place.description} 
                  hashtags={place.hashtags}       
                />
              </div>
            ))
          ) : (
            <div className="text-center py-5 w-100 bg-white rounded-4 shadow-sm border border-light">
              <h4 className="text-muted fw-bold">No places match this exact filter! 🕵️‍♂️</h4>
              <p className="m-0">Try clearing your filters or selecting a different state on the map.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Destinations;