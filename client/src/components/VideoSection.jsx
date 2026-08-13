import React from 'react';

const VideoSection = () => {
  return (
    <section className="py-5" style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="container mt-4 mb-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5" style={{ color: 'var(--secondary-color)' }}>Experience Incredible India</h2>
          <p className="lead text-muted">Take a visual journey through breathtaking landscapes and rich culture.</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* 16:9 Aspect Ratio for YouTube Video */}
            <div className="ratio ratio-16x9 rounded-4 shadow-lg overflow-hidden">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/rTDaZoDDW5g?si=-y7Wr42VMB_ut69I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;