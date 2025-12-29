import React, { useState, useEffect } from 'react';
import api from '../Services/api'
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });

useEffect(() => {
  axios.get('http://localhost:8000/admin/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res => {
    setUsers(res.data);
    console.log(res.data); //  log directly from response
  })
  .catch(err => {
    console.error('Error fetching users:', err);
  });
}, []);

const handleAddUser = () => {
  // Step 1: Validate form fields
  if (!form.name || !form.email || !form.password || !form.role) {
    alert("Please fill all fields");
    return;
  }

  // Step 2: Get token from localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  // Step 3: Prepare data with isVerified: true
  const payload = {
    ...form,
    isVerified: true // ✅ Always include this
  };

  // Step 4: Send POST request with Authorization header
  axios.post('http://localhost:8000/admin/addusers', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      setUsers(prev => [...prev, res.data]);
      setForm({ name: '', email: '', password: '', role: '' });
      console.log("User added:", res.data);
    })
    .catch(err => {
      if (err.response) {
        console.error("Server error:", err.response.status, err.response.data);
        alert(`Error: ${err.response.data.message || 'Invalid token or unauthorized'}`);
      } else if (err.request) {
        console.error("No response from server:", err.request);
        alert("Server did not respond. Try again later.");
      } else {
        console.error("Request setup error:", err.message);
        alert("Something went wrong while preparing the request.");
      }
    });
};
 const handleDeleteUser = (id) => {
  const token = localStorage.getItem('token');
  axios.delete(`http://localhost:8000/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(() => {
    setUsers(users.filter(user => user._id !== id));
  })
  .catch(err => {
    console.error('Delete error:', err);
  });
};

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="card p-4 mb-4">
        <h4>Add New User</h4>
        <div className="row">
          <div className="col-md-3">
            <input className="form-control" placeholder="Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className=" col-md-3">
              <select
                        className="form-control"
                        name="role"
                        value={form.role}
                        onChange={e => setForm({ ...form, role: e.target.value })}
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
            </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={handleAddUser}>Add User</button>
          </div>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;