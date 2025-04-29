import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import UserStore from './pages/UserStore';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/store" element={<UserStore />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
