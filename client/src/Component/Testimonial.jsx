import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Testimonial.css';

export default function Footer() {
  return (
    <footer className="footer text-light pt-5 pb-4">
      <div className="container">
        <div className="row">

          {/* Logo & Contact Info */}
          <div className="col-md-4 mb-4">
            <img src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" alt="Service Hub Logo" className="mb-3" width="150" />
            <p>CALL US AT <strong>+91 98765 43210</strong> (India)</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/servicehub" className="me-3" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/servicehub" className="me-3" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/company/servicehub" className="me-3" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.youtube.com/servicehub" className="me-3" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.instagram.com/servicehub" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* About Service Hub */}
          <div className="col-md-4 text-dark mb-4">
            <h5>About Service Hub</h5>
            <ul className="list-unstyled text-dark">
              <li><a href="#">Who We Are</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Media</a></li>
              <li><a href="#">Insights</a></li>
              <li><a href="#">Trust & Safety</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Sustainability Goals</a></li>
              <li><a href="#">Share Your Experience</a></li>
            </ul>
          </div>

          {/* Helpful Resources */}
          <div className="col-md-4 mb-4">
            <h5>Helpful Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#">Features & Updates</a></li>
              <li><a href="#">Service Hub Mobile</a></li>
              <li><a href="#">App Directory</a></li>
              <li><a href="#">User Conference</a></li>
              <li><a href="#">Helpdesk Software</a></li>
              <li><a href="#">Service Hub TV</a></li>
              <li><a href="#">Pricing Plans</a></li>
              <li><a href="#">Explore Services</a></li>
            </ul>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center small">
          <p>Service Hub India Pvt Ltd. 14th Floor, Tower B, Tech Park, Noida Sector 125, UP 201301</p>
          <p>
            <a href="#">Legal</a> | <a href="#">Terms of Service</a> | <a href="#">Privacy</a> |
            <a href="#">Trust</a> | <a href="#">Cookie Settings</a> | <a href="#">User Privacy Options</a>
          </p>
          <p className="mt-2">&copy; 2025 Service Hub, Inc. All rights reserved. Logos and trademarks belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}