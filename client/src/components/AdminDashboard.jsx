import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isAdminLoggedIn') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [places, setPlaces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [newPlace, setNewPlace] = useState({ 
    title: '', 
    state: '', 
    category: 'Heritage', 
    img: '',
    description: '',
    time: '',
    hashtags: ''
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${import.meta.env.VITE_API_URL}/api/places`)
        .then(res => res.json())
        .then(data => setPlaces(data))
        .catch(err => console.error("Error fetching places:", err));
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Travel2006') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('❌ Incorrect username or password');
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to lock the dashboard?");
    if (confirmLogout) {
      localStorage.removeItem('isAdminLoggedIn');
      setIsLoggedIn(false); 
      navigate('/'); 
    }
  };

  const handleDelete = async (idToRemove) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this destination?");
    if (confirmDelete) {
      try {
        // FIXED URL HERE
        await fetch(`${import.meta.env.VITE_API_URL}/api/destinations/${idToRemove}`, { method: 'DELETE' });
        setPlaces(places.filter(place => place._id !== idToRemove));
      } catch (err) {
        console.error("Error deleting place:", err);
      }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newPlace.title || !newPlace.state) return;

    try {
      // FIXED URL HERE
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/destinations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlace)
      });
      
      const savedPlace = await response.json();
      setPlaces([savedPlace, ...places]); 
      
      setNewPlace({ title: '', state: '', category: 'Heritage', img: '', description: '', time: '', hashtags: '' }); 
      setShowForm(false); 
    } catch (err) {
      console.error("Error saving place:", err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', background: 'var(--bg-main)' }}>
        <div className="card border-0 shadow-lg p-5 rounded-4" style={{ maxWidth: '400px', width: '90%', background: 'var(--card-bg)' }}>
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
            <button type="submit" className="w-100 fw-bold py-3 text-white" style={{ background: 'var(--primary-color)', border: 'none', borderRadius: '12px' }}>
              Unlock Dashboard 🔓
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5" style={{ background: 'var(--bg-gradient)', minHeight: '80vh' }}>
      <div className="container my-5">
        
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
          <div>
            <h2 className="display-6 fw-bold m-0" style={{ color: 'var(--secondary-color)' }}>🔐 Admin Dashboard</h2>
            <p className="text-muted m-0 mt-2">Welcome back, Boss. Here is your live database feed.</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-danger fw-bold rounded-pill px-4">
            Logout 👋
          </button>
        </div>

        <div className="card border-0 shadow-lg p-4 rounded-4" style={{ background: 'var(--card-bg)' }}>
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h4 className="fw-bold m-0">Manage Database</h4>
            <button onClick={() => setShowForm(!showForm)} className="btn-primary-custom px-4 py-2 text-white" style={{ background: 'var(--primary-color)', border: 'none', borderRadius: '12px' }}>
              {showForm ? "❌ Cancel" : "➕ Add New Place"}
            </button>
          </div>
          
          {showForm && (
            <div className="bg-light p-4 rounded-3 mb-4 border">
              <h5 className="fw-bold mb-3">Add a Live Destination</h5>
              <form onSubmit={handleAddSubmit} className="row g-3">
                
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Place Name (e.g. Red Fort)" value={newPlace.title} onChange={e => setNewPlace({...newPlace, title: e.target.value})} required />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="State (e.g. Delhi)" value={newPlace.state} onChange={e => setNewPlace({...newPlace, state: e.target.value})} required />
                </div>
                
                <div className="col-md-4">
                  <select className="form-select" value={newPlace.category} onChange={e => setNewPlace({...newPlace, category: e.target.value})}>
                    <option>Heritage</option>
                    <option>Nature</option>
                    <option>Adventure</option>
                    <option>Religious</option>
                    <option>Offbeat</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Best Time (e.g. Oct - March)" value={newPlace.time} onChange={e => setNewPlace({...newPlace, time: e.target.value})} />
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Hashtags (e.g. #Vibes #Travel)" value={newPlace.hashtags} onChange={e => setNewPlace({...newPlace, hashtags: e.target.value})} />
                </div>

                <div className="col-12">
                  <input type="url" className="form-control" placeholder="Paste Image URL (Optional)" value={newPlace.img} onChange={e => setNewPlace({...newPlace, img: e.target.value})} />
                </div>
                <div className="col-12">
                  <textarea 
                    className="form-control" 
                    placeholder="Write a short, engaging description for this place..." 
                    rows="2" 
                    value={newPlace.description} 
                    onChange={e => setNewPlace({...newPlace, description: e.target.value})} 
                  />
                </div>

                <div className="col-12 text-end mt-3">
                  <button type="submit" className="btn btn-success px-5 fw-bold">Save to Cloud ☁️</button>
                </div>
              </form>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Place Name</th>
                  <th>State</th>
                  <th>Category</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {places.map((place) => (
                  <tr key={place._id}>
                    <td className="fw-semibold">
                      {place.img && <img src={place.img} alt="thumbnail" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }}/>}
                      {place.title}
                    </td>
                    <td>{place.state}</td>
                    <td>
                      <span className={`badge ${place.category === 'Heritage' ? 'bg-warning text-dark' : place.category === 'Nature' ? 'bg-success' : 'bg-primary'}`}>
                        {place.category}
                      </span>
                    </td>
                    <td className="text-end">
                      <button onClick={() => handleDelete(place._id)} className="btn btn-sm btn-outline-danger fw-bold">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;