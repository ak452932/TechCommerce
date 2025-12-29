import React, { useState } from 'react';
import '../CSS/MobileAppDevelopment.css';

const MobileAppDevelopment = () => {
  const [formData, setFormData] = useState({ name: '', email: '', platform: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/mobile-apps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div className="mobile-app-container">
      <h1>Mobile App Development</h1>
      <p>We build high-performance mobile apps for iOS and Android platforms tailored to your business needs.</p>
      <ul>
        <li>Native & Cross-Platform Development</li>
        <li>UI/UX Design</li>
        <li>App Store Deployment</li>
        <li>Maintenance & Support</li>
      </ul>

      <h2>Request a Quote</h2>
      <form className="mobile-app-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
        <select name="platform" onChange={handleChange} required>
          <option value="">Select Platform</option>
          <option value="iOS">iOS</option>
          <option value="Android">Android</option>
          <option value="Both">Both</option>
        </select>
        <textarea name="message" placeholder="Project Details" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MobileAppDevelopment;
