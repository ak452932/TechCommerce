import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Services.css';

const services = [
  {
    title: 'Web Development',
    description: 'Modern websites with responsive design.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO37v_q0KYG_wqTvUnNpUTk6men_nyD-3_ZQ&s'
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications.',
    image: 'https://t4.ftcdn.net/jpg/04/78/08/31/360_F_478083183_6CQZKaiML4lyTBKOx450KCRkU0aExkVH.jpg'
  },
  {
    title: 'SEO & Marketing',
    description: 'Boost your visibility online.',
    image: 'https://zebratechies.com/images/Blogs/1594382872-role-of-seo-in-digital-marketingjpg.jpg'
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO37v_q0KYG_wqTvUnNpUTk6men_nyD-3_ZQ&s'
  }
];

export default function Services() {
  return (
    <section className="services py-5">
      <div className="container text-center">
        <h2 className="mb-5 fw-bold text-primary">Our Services</h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card h-100 shadow-sm service-card border-0">
                <img src={service.image} className="card-img-top" alt={service.title} />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{service.title}</h5>
                  <p className="card-text text-muted">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}