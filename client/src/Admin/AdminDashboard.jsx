import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Admin/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading dashboard...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{stats?.users ?? 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Sales</h5>
              <p className="card-text">₹{stats?.sales ?? 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Active Sessions</h5>
              <p className="card-text">{stats?.activeSessions ?? 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;