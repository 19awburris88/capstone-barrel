import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import UserStore from './pages/UserStore';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users'; // ✅ Import new Users page

export default function App() {
  const isAdmin = !!localStorage.getItem('adminToken');

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<Users />} /> {/* ✅ Add this line */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* 🔒 Protect store route - Admin only */}
      <Route
        path="/store"
        element={isAdmin ? <UserStore /> : <Navigate to="/admin-login" replace />}
      />

      {/* 🔒 Protect admin dashboard route */}
      <Route
        path="/admin"
        element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" replace />}
      />
    </Routes>
  );
}
