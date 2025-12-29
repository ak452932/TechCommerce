import React, { useState,useEffect } from 'react';
import axios from 'axios'; // ✅
import { useUser } from '../Component/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function RequestTicketForm() {
  const [formData, setFormData] = useState({
    requester: '',
    asset: '',
    requestType: '',
    status: '',
    vendorName: '',
    vendorTicketId: '',
    technician: '',
    mode: '',
    priority: '',
    category: '',
    subcategory: '',
    item: '',
    site: '',
    subject: '',
    description: '',
    attachment: null,
  });
  const { user, setUser } = useUser();
  

 useEffect(() => {
  console.log("User updated:", user);
}, [user]);
  
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
  //sif (!user) return null; // or a loading spinner

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);

  try {
    const res = await axios.post('http://localhost:8000/request-ticket', formData);

    if (res.status === 200) {
      alert('Ticket raised successfully');
      setFormData({
        requester: '',
        asset: '',
        requestType: '',
        status: '',
        vendorName: '',
        vendorTicketId: '',
        technician: '',
        mode: '',
        priority: '',
        category: '',
        subcategory: '',
        item: '',
        site: '',
        subject: '',
        description: '',
        attachment: null,
      });
    }
  } catch (err) {
    console.error('Ticket submission error:', err);
    alert(err.response?.data?.message || 'Ticket submission failed');
  }
};
  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Add Request Ticket</h4>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Requester */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Requester *</label>
                <input type="text" className="form-control" value={user.name}  name="requester" onChange={handleChange} required />
              </div>

              {/* Asset */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Asset(s)</label>
                <select className="form-select" name="asset" onChange={handleChange}>
                  <option>--Select--</option>
                  <option>Coming from db</option>
                  <option>Asset 2</option>
                </select>
              </div>

              {/* Request Type */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Request Type *</label>
                <input type="text" className="form-control" name="requestType" onChange={handleChange} required />
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Status *</label>
                <select className="form-select" name="status" onChange={handleChange} required>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              {/* Vendor Info */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Vendor Name</label>
                <input type="text" className="form-control" name="vendorName" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Vendor Ticket ID</label>
                <input type="text" className="form-control" name="vendorTicketId" onChange={handleChange} />
              </div>

              {/* Technician */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Technician</label>
                <input type="text" className="form-control" name="technician" onChange={handleChange} />
              </div>

              {/* Mode */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Mode *</label>
                <select className="form-select" name="mode" onChange={handleChange} required>
                  <option>Email</option>
                  <option>Phone</option>
                  <option>Portal</option>
                </select>
              </div>

              {/* Priority */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Priority</label>
                <select className="form-select" name="priority" onChange={handleChange}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              {/* Category/Subcategory/Item */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Category *</label>
                <input type="text" className="form-control" name="category" onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Subcategory *</label>
                <input type="text" className="form-control" name="subcategory" onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Item *</label>
                <input type="text" className="form-control" name="item" onChange={handleChange} required />
              </div>

              {/* Site */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Site</label>
                <input type="text" className="form-control" name="site" onChange={handleChange} />
              </div>

              {/* Subject & Description */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Subject *</label>
                <input type="text" className="form-control" name="subject" onChange={handleChange} required />
              </div>
              <div className="col-md-12">
                <label className="form-label fw-bold">Description</label>
                <textarea className="form-control" rows="4" name="description" onChange={handleChange}></textarea>
              </div>

              {/* Attachments */}
              <div className="col-md-12">
                <label className="form-label fw-bold">Attachments</label>
                <input type="file" className="form-control" name="attachment" onChange={handleChange} />
                <small className="text-muted">Max size: 15 MB</small>
              </div>

              {/* Submit Button */}
              <div className="col-md-12 text-end">
                <button type="submit" className="btn btn-primary mt-3 px-4">Submit Request</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestTicketForm;