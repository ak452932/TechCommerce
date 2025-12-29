import React, { useState } from 'react';
import '../CSS/ITConsultancy.css';

const ITConsultancy = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/consultancy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div className="consultancy-container">
      <h1>IT Consultancy Services</h1>
      <p>We provide expert IT solutions tailored to your business needs. Our services include:</p>
      <ul>
        <li>Software Development & Integration</li>
        <li>Cloud Solutions & Migration</li>
        <li>Cybersecurity & Risk Management</li>
        <li>IT Infrastructure Setup</li>
        <li>Digital Transformation Strategy</li>
      </ul>

      <h2>Contact Us</h2>
      <form className="consultancy-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ITConsultancy;
