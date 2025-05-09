import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './adminDashBoard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="create">Create Team</Link></li>   {/* Relative */}
            <li><Link to="list">List Team</Link></li>       {/* Relative */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet /> {/* Render matched route component here */}
      </main>
    </div>
  );
};

export default AdminDashboard;
