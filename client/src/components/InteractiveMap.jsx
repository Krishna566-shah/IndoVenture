import React from 'react';

const InteractiveMap = () => {
  return (
    <section className="py-5" style={{ background: 'var(--bg-gradient)' }}>
      <div className="container my-5">
        <div className="text-center mb-5">
          <span className="badge px-3 py-2 rounded-pill mb-3" style={{ background: 'rgba(255, 107, 53, 0.1)', color: 'var(--primary-color)' }}>Visual Explorer</span>
          <h2 className="display-5 fw-bold" style={{ color: 'var(--secondary-color)' }}>Map of Incredible India</h2>
          <p className="lead text-muted">Navigate through all 28 States and 8 Union Territories to plan your next journey.</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg p-2 rounded-4" style={{ background: 'var(--card-bg)', backdropFilter: 'blur(12px)' }}>
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14695995.12795325!2d71.86812030612662!3d22.996168853754955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Interactive Map of India"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;