import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Features.css';

export default function Features() {
  return (
    <section className="features-section py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-4">Why Choose Us?</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="feature-box p-3 border rounded shadow-sm">
              <span className="emoji">✔️</span>
              <h5 className="mt-2">Expert Team</h5>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="feature-box p-3 border rounded shadow-sm">
              <span className="emoji">✔️</span>
              <h5 className="mt-2">24/7 Support</h5>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="feature-box p-3 border rounded shadow-sm">
              <span className="emoji">✔️</span>
              <h5 className="mt-2">Affordable Pricing</h5>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="feature-box p-3 border rounded shadow-sm">
              <span className="emoji">✔️</span>
              <h5 className="mt-2">Proven Results</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}