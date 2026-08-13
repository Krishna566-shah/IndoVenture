import React, { useState, useEffect } from 'react';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  
  // 🚀 1. ADDED 'imageUrl' TO THE STATE
  const [form, setForm] = useState({ title: '', author: '', excerpt: '', link: '', imageBase64: '', imageUrl: '' });
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // FIXED URL HERE
    fetch(`${import.meta.env.VITE_API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, imageBase64: reader.result }); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.author || !form.excerpt || !form.link) {
      alert("⚠️ Wait! One of the fields is missing. Please check all boxes.");
      return; 
    }

    setIsPublishing(true);

    const formattedLink = form.link.startsWith('http') ? form.link : `https://${form.link}`;
    const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // 🚀 2. THE NEW LOGIC: It checks Upload first, then URL, then falls back to default!
    const finalImage = form.imageBase64 || form.imageUrl || "https://images.unsplash.com/photo-1506461883276-594a12b11dc3?auto=format&fit=crop&w=600&q=80";

    const blogData = {
      title: form.title,
      author: form.author,
      date: todayDate,
      excerpt: form.excerpt,
      image: finalImage,
      link: formattedLink 
    };

    try {
      // FIXED URL HERE
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });

      if (response.ok) {
        const savedBlog = await response.json();
        
        setBlogs([savedBlog, ...blogs]);
        
        // 🚀 3. Clear everything, including the new imageUrl
        setForm({ title: '', author: '', excerpt: '', link: '', imageBase64: '', imageUrl: '' });
        document.getElementById('imageUploadInput').value = ''; 
        
        alert("✅ Your blog has been published to the database successfully!");
      } else {
        alert("❌ Failed to save blog. Please try again.");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("❌ Server error. Is your backend running?");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <section id="blogs" className="py-5 bg-white">
      <div className="container my-5">
        
        <div className="text-center mb-5">
          <span className="badge px-3 py-2 rounded-pill mb-3" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#ff6b35' }}>Travel Community</span>
          <h2 className="fw-bold display-5" style={{ color: 'var(--secondary-color)' }}>Traveler Stories</h2>
          <p className="lead text-muted">Read guides from fellow explorers, or share your own journey!</p>
        </div>

        {/* The Blog Grid */}
        <div className="row g-4 justify-content-center mb-5">
          {blogs.length === 0 ? (
             <div className="text-center text-muted">No blogs published yet. Be the first!</div>
          ) : (
            blogs.map(blog => (
              <div key={blog._id} className="col-lg-6">
                <div className="card card-custom border-0 shadow-sm h-100 flex-row overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    style={{ width: '40%', objectFit: 'cover' }} 
                  />
                  <div className="card-body d-flex flex-column justify-content-center">
                    <p className="text-muted small mb-1 fw-semibold">📅 {blog.date} • ✍️ By {blog.author}</p>
                    <h5 className="fw-bold mb-2">{blog.title}</h5>
                    <p className="small text-muted mb-3">{blog.excerpt}</p>
                    
                    <a 
                      href={blog.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="fw-bold text-decoration-none mt-auto" 
                      style={{ color: 'var(--primary-color)' }}
                    >
                      Read Article →
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* WRITE YOUR OWN BLOG FORM */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4" style={{ background: 'var(--bg-gradient)' }}>
              <div className="text-center mb-4">
                <h3 className="fw-bold">Write a Travel Blog 📝</h3>
                <p className="text-muted small">Inspire others by sharing your experiences.</p>
              </div>
              
              <form onSubmit={handlePublish}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="fw-semibold small mb-1">Your Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg border-0 shadow-sm" 
                      placeholder="e.g. Rahul Verma" 
                      value={form.author}
                      onChange={(e) => setForm({...form, author: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold small mb-1">Blog Title</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg border-0 shadow-sm" 
                      placeholder="e.g. A Weekend in Goa" 
                      value={form.title}
                      onChange={(e) => setForm({...form, title: e.target.value})}
                      required 
                    />
                  </div>
                  
                  {/* 🚀 4. THE TWO IMAGE OPTIONS SIDE-BY-SIDE */}
                  <div className="col-md-6">
                    <label className="fw-semibold small mb-1">Upload Photo</label>
                    <input 
                      type="file" 
                      id="imageUploadInput"
                      accept="image/*" 
                      className="form-control form-control-lg border-0 shadow-sm bg-white" 
                      onChange={handleImageUpload}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="fw-semibold small mb-1">OR Paste Image URL</label>
                    <input 
                      type="url" 
                      className="form-control form-control-lg border-0 shadow-sm" 
                      placeholder="https://example.com/image.jpg" 
                      value={form.imageUrl}
                      onChange={(e) => setForm({...form, imageUrl: e.target.value})}
                    />
                  </div>

                  {/* 🚀 Preview area for the uploaded image (if they choose to upload) */}
                  {form.imageBase64 && (
                    <div className="col-12 text-center mt-2">
                      <img src={form.imageBase64} alt="Preview" style={{ height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div className="col-12">
                    <label className="fw-semibold small mb-1">Link to your full article/post</label>
                    <input 
                      type="url" 
                      className="form-control form-control-lg border-0 shadow-sm" 
                      placeholder="https://yourblog.com/post-url" 
                      value={form.link}
                      onChange={(e) => setForm({...form, link: e.target.value})}
                      required 
                    />
                  </div>

                  <div className="col-12">
                    <label className="fw-semibold small mb-1">Your Story (Excerpt)</label>
                    <textarea 
                      className="form-control border-0 shadow-sm" 
                      rows="3" 
                      placeholder="Write a short summary of your amazing trip..."
                      value={form.excerpt}
                      onChange={(e) => setForm({...form, excerpt: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="col-12 text-center mt-4">
                    <button type="submit" disabled={isPublishing} className="btn-primary-custom wiggle-btn w-100 fs-5">
                      {isPublishing ? 'Publishing...' : 'Publish Blog 🌍'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;