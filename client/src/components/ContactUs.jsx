import React, { useState } from 'react';
// 🚀 1. Import the Phosphor Icons
import { EnvelopeSimple, PaperPlaneRight, CheckCircle } from '@phosphor-icons/react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGmailSend = (e) => {
    e.preventDefault();
    
    // INDOVENTURE EMAIL
    const emailTo = "contact@indoventure.com";
    
    // Format Subject and Body
    const subject = encodeURIComponent(`New Trip Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Indoventure Team,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
    );

    // Opens Gmail exactly like your provided logic
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${subject}&body=${body}`, '_blank');
    
    // Show success screen
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e2ebf0 100%)' }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5">
            
            {/* 🚀 2. Added Envelope Icon to the Header */}
            <div className="d-flex justify-content-center mb-3">
               <EnvelopeSimple size={56} weight="duotone" color="#004e89" />
            </div>
            <h2 className="display-5 fw-bold" style={{ color: '#004e89' }}>Get in Touch</h2>
            <p className="lead text-muted">Planning a trip or have a question? Drop us a message.</p>
            
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              
              {submitted ? (
                // SUCCESS SCREEN
                <div className="text-center py-5">
                  {/* 🚀 3. Replaced emoji with a large CheckCircle */}
                  <CheckCircle size={72} weight="duotone" className="text-success mb-3 mx-auto" />
                  <h3 className="fw-bold text-success mb-3">Gmail Composer Opened!</h3>
                  <p className="text-muted mb-4">You can now review and send your email from the new tab.</p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }} 
                    className="btn btn-outline-primary px-4 py-2 rounded-pill fw-bold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                // THE FORM
                <form onSubmit={handleGmailSend}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control form-control-lg bg-light border-0" 
                        placeholder="Name" 
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control form-control-lg bg-light border-0" 
                        placeholder="xyz@example.com" 
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Message</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control form-control-lg bg-light border-0" 
                        rows="4" 
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    <div className="col-12 text-center mt-4">
                      
                      {/* 🚀 4. Replaced the rocket with the PaperPlaneRight icon */}
                      <button 
                        type="submit" 
                        className="btn text-white px-5 py-3 rounded-pill fw-bold fs-5 shadow d-flex justify-content-center align-items-center mx-auto gap-2" 
                        style={{ background: 'linear-gradient(45deg, #ff6b35, #ff9f1c)' }}
                      >
                        Send via Gmail <PaperPlaneRight size={24} weight="bold" />
                      </button>
                      
                    </div>
                  </div>
                </form>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;