
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../CSS/ContactForm.css';
const ContactPage = () => {


  return (
    <div className="contact-wrapper container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Contact Us</h1>
        <p className="lead text-muted">We’d love to hear from you! Drop us a message below.</p>
      </div>

      <div className="row g-5">
        {/* Contact Form */}
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">Name</label>
              <input type="text" className="form-control" id="name" placeholder="John Doe" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Your message here..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary px-4">Send Message</button>
          </form>
        </div>

        {/* Company Info */}
        <div className="col-md-6">
          <div className="bg-light p-4 rounded shadow-sm h-100">
            <h5 className="fw-semibold mb-3">Reach Us</h5>
            <p className="mb-1"><strong>Address:</strong> Noida sector 81 , India</p>
            <p className="mb-1"><strong>Email:</strong> akhileshkumar545232@gmail.com</p>
            <p className="mb-3"><strong>Phone:</strong> +91-8299545232</p>
           <iframe
  title="company-location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.123456789!2d77.543210!3d28.612345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d123456789abc%3A0xabcdef1234567890!2sYour%20Business%20Name!5e0!3m2!1sen!2sin!4v1720345678901!5m2!1sen!2sin"
  style={{ width: "100%", height: "250px", border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
