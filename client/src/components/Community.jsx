import React from 'react';

const Community = () => {
  return (
    <div className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '80vh', background: 'var(--bg-main)' }}>
      <div>
        <h1 className="display-4 fw-bold" style={{ color: 'var(--text-dark)' }}>🌍 Community Forum</h1>
        <p className="lead text-muted mt-3">Traveler stories and reviews are launching next month!</p>
        <span className="badge bg-warning text-dark px-4 py-2 mt-3 rounded-pill fw-bold">Coming Soon</span>
      </div>
    </div>
  );
};

export default Community;