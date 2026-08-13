import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-5 bg-white">
      <div className="container my-5">
        <div className="row align-items-center gap-5 gap-lg-0">
          <div className="col-lg-6">
            <div className="position-relative">
              <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80" alt="India Culture" className="img-fluid rounded-4 shadow-lg" />
              <div className="position-absolute bottom-0 end-0 bg-white p-4 rounded-4 shadow-lg" style={{ transform: 'translate(-20px, 20px)' }}>
                <h3 className="fw-bold mb-0" style={{ color: '#ff6b35' }}>15+</h3>
                <p className="text-muted fw-semibold mb-0">States Covered</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 px-lg-5">
            <span className="badge px-3 py-2 rounded-pill mb-3" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#ff6b35' }}>About Our Journey</span>
            
            {/* 🖍️ THE MARKER HIGHLIGHT IS HERE! */}
            <h2 className="display-5 fw-bold mb-4" style={{ color: '#004e89' }}>
              Discover the <span className="marker-highlight text-dark">Soul of</span> Incredible India
            </h2>
            
            <p className="lead text-muted mb-4">We are more than just a travel platform. We are your digital compass to uncovering the hidden gems, rich heritage, and breathtaking landscapes of every Indian state.</p>
            <ul className="list-unstyled mb-4">
              <li className="mb-2">✅ Curated, authentic travel guides</li>
              <li className="mb-2">✅ Real reviews from real explorers</li>
              <li className="mb-2">✅ Seamless filtering by your travel vibe</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;