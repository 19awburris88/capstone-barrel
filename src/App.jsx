import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import UserStore from './pages/UserStore';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));
  const location = useLocation(); // 👈 triggers effect on route change

  // 🔁 Re-check localStorage on every route change
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<Users />} />

      <Route
        path="/userstore"
        element={isAdmin ? <UserStore /> : <Navigate to="/" replace />}
      />
      <Route
        path="/admin"
        element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}
