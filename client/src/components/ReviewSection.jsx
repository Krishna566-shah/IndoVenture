import React, { useState, useEffect } from 'react';
// 🚀 1. Imported the Phosphor Icons
import { Star, ChatText, MapPin, PaperPlaneRight } from '@phosphor-icons/react';

const ReviewSection = () => {
  // 1. Start with an empty array instead of dummy data
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🚀 2. FETCH SAVED REVIEWS WHEN THE PAGE LOADS
  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Error fetching reviews:", err));
  }, []);

  // 🚀 3. SEND THE NEW REVIEW TO MONGODB
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!form.name || !form.comment) return; 

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const savedReview = await response.json();
        
        // Add the new review to the top of the list on the screen instantly
        setReviews([savedReview, ...reviews]);
        
        // Clear the form back to blank
        setForm({ name: '', location: '', rating: 5, comment: '' });
        alert("✅ Thank you! Your review has been posted.");
      } else {
        alert("❌ Failed to post review. Please try again.");
      }
    } catch (error) {
      console.error("Error saving review:", error);
      alert("❌ Server error. Is your backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-5" style={{ backgroundColor: 'var(--bg-light)' }}>
      <div className="container">
        
        {/* Title with Icon */}
        <h2 className="text-center fw-bold mb-4 display-5 d-flex justify-content-center align-items-center gap-3" style={{ color: 'var(--secondary-color)' }}>
          <ChatText size={48} weight="duotone" color="var(--primary-color)" />
          Community Reviews
        </h2>
        
        {/* Existing Reviews Display */}
        <div className="row g-4 mb-5">
          {reviews.length === 0 ? (
            <div className="text-center text-muted">No reviews yet. Be the first to share your experience!</div>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="col-md-6">
                <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '12px' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                      {rev.name} 
                      <span className="text-muted fs-6 fw-normal d-flex align-items-center gap-1">
                        <MapPin size={16} weight="duotone" /> {rev.location}
                      </span>
                    </h5>
                    {/* Phosphor Star Icon */}
                    <span className="badge bg-warning text-dark fs-6 d-flex align-items-center gap-1">
                      <Star size={16} weight="fill" /> {rev.rating}/5
                    </span>
                  </div>
                  <p className="text-muted mb-0 fst-italic">"{rev.comment}"</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* The Review Submission Form */}
        <div className="card shadow-lg p-4 p-md-5 mx-auto border-0" style={{ maxWidth: '700px', borderRadius: '16px' }}>
          <h4 className="fw-bold mb-4 text-center">Share Your Travel Experience</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input 
                  type="text" 
                  className="form-control bg-light border-0" 
                  placeholder="Your Name" 
                  value={form.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="col-md-6">
                <input 
                  type="text" 
                  className="form-control bg-light border-0" 
                  placeholder="Your City" 
                  value={form.location} 
                  onChange={(e) => setForm({...form, location: e.target.value})} 
                  required 
                />
              </div>
              <div className="col-12">
                <textarea 
                  className="form-control bg-light border-0" 
                  rows="3" 
                  placeholder="Write your review here..." 
                  value={form.comment} 
                  onChange={(e) => setForm({...form, comment: e.target.value})} 
                  required
                ></textarea>
              </div>
              <div className="col-12 text-center mt-4">
                <button type="submit" disabled={isSubmitting} className="btn-primary-custom w-100 fs-5 d-flex justify-content-center align-items-center gap-2">
                  {isSubmitting ? 'Submitting...' : <>Submit Review <PaperPlaneRight size={22} weight="bold" /></>}
                </button>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </section>
  );
};

export default ReviewSection;