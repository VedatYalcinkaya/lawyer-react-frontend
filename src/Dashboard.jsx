import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { FlipWordsDemo } from './components/FlipWordsDemo'

const Dashboard = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Açık/beyaz arkaplan */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 z-0">
        {/* İnce nokta deseni - koyu gri tonlarında */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}></div>
        
        {/* Hafif mavi vurgu */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-l from-blue-50 to-indigo-50 opacity-60"></div>
      </div>
      
      <div className="relative z-10 w-full h-full overflow-y-auto">
        <Navbar />
        <div className="relative w-full min-h-screen pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="ui-try" element={<FlipWordsDemo />} />
            <Route path="/hakkimizda" element={<div style={{padding: "20px"}}>Hakkımızda Sayfası</div>} />
            <Route path="/calisma-alani/:id" element={<div style={{padding: "20px"}}>Çalışma Alanı Detay Sayfası</div>} />
            <Route path="/makaleler" element={<div style={{padding: "20px"}}>Makaleler Sayfası</div>} />
            <Route path="/iletisim" element={<div style={{padding: "20px"}}>İletişim Sayfası</div>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard