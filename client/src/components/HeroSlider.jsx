import React from 'react';

const HeroSlider = () => {
  return (
    <div className="container overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="row align-items-center">
        
        {/* Left Side: Bold Typography (Like the 3rd image) */}
        <div className="col-lg-5 position-relative z-3">
          <div className="d-flex align-items-center gap-2 mb-3">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png" alt="Emblem" style={{ width: '30px' }} />
             <span className="fw-bold small" style={{ color: 'var(--text-muted)' }}>Ministry of Tourism</span>
          </div>
          <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: '1.1', color: 'var(--text-dark)' }}>
            Explore India <br/> Outside <br/> The Book
          </h1>
          <p className="lead mb-5" style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            To get the best of your adventure in India, you just need to leave and come where you explore diversity. We are waiting for you.
          </p>
          <a href="#destinations" className="btn-primary-custom text-decoration-none">
            Explore Now
          </a>
        </div>

        {/* Right Side: The overlapping visual */}
        <div className="col-lg-7 position-relative mt-5 mt-lg-0">
           {/* Main Hero Image */}
           <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80" 
            alt="India Heritage" 
            className="img-fluid rounded-4 shadow-lg w-100"
            style={{ objectFit: 'cover', height: '500px', borderRadius: '40px !important' }}
          />
          {/* Floating badge like Image 2 */}
          <div className="position-absolute bottom-0 start-0 bg-white p-3 shadow-lg rounded-4 d-flex align-items-center gap-3" style={{ transform: 'translate(-30px, 30px)' }}>
            <div className="bg-light rounded-circle p-3 fs-4">🐪</div>
            <div>
              <p className="m-0 fw-bold">Desert Safari</p>
              <p className="m-0 small text-muted">Rajasthan</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSlider;