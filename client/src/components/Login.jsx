import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Travel2026') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin'); 
    } else {
      setError('❌ Incorrect username or password');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', background: 'var(--bg-main)' }}>
      <div className="card-custom p-5 shadow-lg" style={{ maxWidth: '400px', width: '90%' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold" style={{ color: 'var(--text-dark)' }}>Admin Login</h3>
          <p className="small text-muted m-0">Please verify your identity, Boss.</p>
        </div>
        {error && <div className="alert alert-danger py-2 small text-center fw-bold rounded-3">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Username</label>
            <input type="text" className="form-control rounded-3 bg-light border-0 py-2" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Password</label>
            <input type="password" className="form-control rounded-3 bg-light border-0 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary-custom w-100 fw-bold py-3">Unlock Dashboard 🔓</button>
        </form>
      </div>
    </div>
  );
};

export default Login;