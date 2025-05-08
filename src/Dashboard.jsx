import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import WorkAreaPage from './pages/WorkAreaPage'
import FamilyLawPage from './pages/FamilyLawPage'
import CriminalLawPage from './pages/CriminalLawPage'
import MalRejimiLawPage from './pages/MalRejimiLawPage'
import KiraLawPage from './pages/KiraLawPage'
import MirasLawPage from './pages/MirasLawPage'
import IcraIflasLawPage from './pages/IcraIflasLawPage'
import Navbar from './components/Navbar'
import { FlipWordsDemo } from './components/FlipWordsDemo'
import ArticlesPage from './pages/ArticlesPage'
import BlogDetailPage from './pages/BlogDetailPage'
import NotFound from './pages/NotFound'

const Dashboard = () => {
  const location = useLocation();
  
  // Sayfa değiştiğinde en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      {/* Açık/beyaz arkaplan */}
      <div className="fixed inset-0 bg-gradient-to-b from-white to-gray-100 z-0">
        {/* İnce nokta deseni - koyu gri tonlarında */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}></div>
        
        {/* Hafif mavi vurgu */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-l from-blue-50 to-indigo-50 opacity-60"></div>
      </div>
      
      <Navbar />
      
      {/* Ana içerik alanı (büyüyebilir) */}
      <main className="relative z-10 w-full flex-grow pt-20">
        {/* İçerik konteyneri (padding ile) - Navbar ve Footer gibi */}
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="ui-try" element={<FlipWordsDemo />} />
              <Route path="hakkimizda" element={<div className="py-8">Hakkımızda Sayfası</div>} />
              <Route path="aile-hukuku" element={<FamilyLawPage />} />
              <Route path="ceza-hukuku" element={<CriminalLawPage />} />
              <Route path="mal-rejimi-hukuku" element={<MalRejimiLawPage />} />
              <Route path="kira-hukuku" element={<KiraLawPage />} />
              <Route path="miras-hukuku" element={<MirasLawPage />} />
              <Route path="icra-iflas-hukuku" element={<IcraIflasLawPage />} />
              <Route path="makaleler" element={<ArticlesPage />} />
              <Route path="makale/:slug" element={<BlogDetailPage />} />
              <Route path="iletisim" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard