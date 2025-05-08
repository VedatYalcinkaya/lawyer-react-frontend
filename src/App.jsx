import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import { Toaster } from 'react-hot-toast';

// Layouts ve koruma bileşenleri
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';

// Ana sayfa ve genel bileşenler
import Dashboard from './Dashboard';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

// Admin bileşenleri
import AdminPage from './admin/AdminPage';
import AdminDashboard from './admin/AdminDashboard';
import AdminBlogPage from './admin/AdminBlogPage';
import AdminBlogForm from './admin/AdminBlogForm';

// Kimlik doğrulama sayfaları
import LoginPage from './login/LoginPage';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Token kontrolü yaparak oturum durumunu kontrol et
    dispatch(checkAuthStatus());
    
    // Sayfa title'ını ayarla
    document.title = "Av. Emre Okur";
  }, [dispatch]);

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2D3748',
            color: '#fff',
          },
        }}
      />
      
      <Routes>
        {/* Ana Sayfa ve Genel Rotalar */}
        <Route path="/*" element={
          <>
            <Dashboard />
            <Footer />
          </>
        } />
        
        {/* Kimlik Doğrulama Rotaları */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Paneli Rotaları */}
        <Route path="/admin" element={
          <RoleGuard allowedRoles={['ADMIN']}>
            <AdminPage />
          </RoleGuard>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogPage />} />
          <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
          <Route path="blogs/new" element={<AdminBlogForm />} />
        </Route>
        
        {/* 404 Sayfası */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
