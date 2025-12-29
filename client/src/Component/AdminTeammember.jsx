import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/AdminAddTeamMember.css';

export default function AdminAddTeamMember() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    imageUrl: ''
  });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('http://localhost:8000/add-team-member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // 👈 Token added here
    },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    alert('Team member added!');
    setFormData({ name: '', role: '', description: '', imageUrl: '' });
    navigate('/');
  } else {
    console.error('Failed to add team member');
  }
};

  return (
    <div className="admin-add-team-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow form-card">
        <h2 className="text-center text-primary fw-bold mb-3">Add Team Member</h2>
        <p className="text-center text-muted mb-4">Fill in the details below to add a new team member.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input name="role" className="form-control" placeholder="Role" value={formData.role} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input name="description" className="form-control" placeholder="Description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <input name="imageUrl" className="form-control" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Member</button>
        </form>
      </div>
    </div>
  );
}



