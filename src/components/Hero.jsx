import React, { useState } from "react";
import { motion } from "motion/react";
import { FlipWords } from "./ui/flip-words";
import AvLogo from "../assets/logos/av-logo.svg";
import { FaUsers, FaBalanceScale, FaHandHoldingUsd, FaKey, FaBook, FaGavel, FaArrowRight, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ContactModal from "./ContactModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  
  // Hakkımda bölümüne scroll işlemi
  const scrollToHakkimda = () => {
    const hakkimdaElement = document.getElementById('hakkimda');
    if (hakkimdaElement) {
      hakkimdaElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // FlipWords için uzmanlık alanları
  const uzmanlikFlip = ["Aile", "Ceza", "Mal Rejimi", "Kira", "Miras", "İcra ve İflas"];
  
  // Uzmanlık alanları
  const uzmanlikAlanlari = [
    { 
      baslik: "Aile Hukuku", 
      aciklama: "Boşanma, velayet, nafaka ve evlilik konularında uzman destek",
      icon: <FaUsers className="w-10 h-10 mb-4 text-blue-600" />,
      link: "/aile-hukuku"
    },
    { 
      baslik: "Ceza Hukuku", 
      aciklama: "Savunma, dava takibi ve adli süreçlerde profesyonel danışmanlık",
      icon: <FaBalanceScale className="w-10 h-10 mb-4 text-blue-600" />,
      link: "/ceza-hukuku"
    },
    { 
      baslik: "Mal Rejimi Hukuku", 
      aciklama: "Edinilmiş mallara katılma ve mal paylaşımı konularında danışmanlık",
      icon: <FaHandHoldingUsd className="w-10 h-10 mb-4 text-blue-600" />,
      link: "/mal-rejimi-hukuku"
    },
    { 
      baslik: "Kira Hukuku", 
      aciklama: "Kira sözleşmeleri, tahliye ve kira uyuşmazlıkları konularında destek",
      icon: <FaKey className="w-10 h-10 mb-4 text-blue-600" />,
      link: "/kira-hukuku"
    },
    { 
      baslik: "Miras Hukuku", 
      aciklama: "Vasiyetname, miras paylaşımı ve veraset konularında danışmanlık",
      icon: <FaBook className="w-10 h-10 mb-4 text-blue-600" />,
      link: "/miras-hukuku"
    },
    { 
      baslik: "İcra ve İflas Hukuku", 
      aciklama: "Borç takibi, haciz işlemleri ve icra süreçlerinde hukuki destek",
      icon: <FaGavel className="w-10 h-10 mb-4 text-blue-600" />,
      link: "/icra-iflas-hukuku"
    }
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Sol Taraf - Metin İçeriği */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center lg:justify-start mb-6"
          >
            <img src={AvLogo} alt="Av. Emre Okur Logo" className="w-16 h-16 mr-4" />
            <h3 className="text-2xl font-semibold text-gray-800">Av. Emre Okur</h3>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Profesyonel Hukuki Hizmet
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0"
          >
            <p className="mb-6">
              Zorlu hukuki süreçlerde yanınızda olmak için buradayız. Yılların tecrübesiyle daima en iyi sonucu hedefliyoruz.
            </p>
            
            <div className="flex flex-col items-center lg:items-start mt-6 mb-6">
              <div className="text-blue-700 font-semibold mb-2 text-xl">Uzmanlık Alanlarımız:</div>
              <div className="text-center lg:text-left">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-2xl md:text-3xl">
                  <FlipWords words={uzmanlikFlip} duration={1500} />
                </span> 
                <span className="text-gray-800 text-2xl md:text-3xl ml-2">Hukuku</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-200 w-full sm:w-auto"
            >
              Randevu Al
            </button>
            <button 
              onClick={scrollToHakkimda}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md transition-all duration-300 w-full sm:w-auto flex items-center justify-center"
            >
              <span>Hakkımda</span>
              <FaUser className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
        
        {/* Sağ Taraf - Uzmanlık Alanları */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uzmanlikAlanlari.map((alan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link 
                  to={alan.link}
                  className="block bg-white shadow-lg p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100 h-full relative group overflow-hidden hover:shadow-xl hover:border-blue-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    {alan.icon}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{alan.baslik}</h3>
                    <p className="text-gray-600 text-sm mb-4">{alan.aciklama}</p>
                    <div className="flex items-center justify-center mt-auto text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="mr-2 font-medium">Detaylı Bilgi</span>
                      <FaArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Hukuki Danışmanlık Talebi"
        description="Ücretsiz ilk görüşme için size nasıl ulaşalım?"
      />
    </div>
  );
};

export default Hero;
