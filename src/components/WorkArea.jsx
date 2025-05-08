import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward, FiMessageCircle } from 'react-icons/fi';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

const WorkArea = ({ workAreaData }) => {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!workAreaData) {
    return <div>Geçerli bir uzmanlık alanı verisi bulunamadı.</div>;
  }
  
  const IconComponent = workAreaData.iconComponent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cok-acik-mavi/30">
      {/* Başlık Bölümü */}
            <motion.div
        className="py-16 bg-gradient-to-r from-acik-mavi/20 to-turkuaz/20 backdrop-blur-sm border-b border-acik-mavi/10"
        initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-koyu-mavi"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {workAreaData.title}
              </motion.h1>
              <motion.div 
                className="h-1 w-20 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mt-4 mb-6"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 80, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              ></motion.div>
              <motion.p 
                className="text-lg text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {workAreaData.description}
              </motion.p>
            </div>
            <motion.div 
              className="md:w-1/3 mt-8 md:mt-0 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-koyu-mavi to-turkuaz p-6 rounded-full w-32 h-32 flex items-center justify-center text-white shadow-lg">
                {IconComponent && <IconComponent className="w-8 h-8" />}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Ana İçerik */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Görsel ve Yaklaşım */}
          <div className="flex flex-col lg:flex-row gap-12 mb-20">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={workAreaData.mainImage}
                alt={workAreaData.title}
                className="w-full h-auto rounded-2xl shadow-xl" 
              />
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-koyu-mavi mb-6">{workAreaData.title} Yaklaşımımız</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mb-8"></div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <ul className="space-y-4">
                  {workAreaData.yaklasim.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-gradient-to-r from-koyu-mavi to-turkuaz w-6 h-6 rounded-full flex items-center justify-center">
                          <FiBookOpen className="text-white text-sm" />
          </div>
        </div>
                      <p className="ml-4 text-gray-700">{item}</p>
                    </motion.li>
                  ))}
                </ul>
                
                {workAreaData.avukatYorumu && (
                  <motion.div 
                    className="mt-8 p-4 bg-acik-mavi/10 rounded-lg border border-acik-mavi/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <p className="text-gray-700 italic">
                      "{workAreaData.avukatYorumu}"
                    </p>
                    <p className="text-right mt-2 text-koyu-mavi font-semibold">- Av. Emre Okur</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Sunulan Hizmetler */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-koyu-mavi mb-6">Sunduğumuz Hizmetler</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workAreaData.hizmetler.map((hizmet, index) => (
              <motion.div
                key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-koyu-mavi to-mavi w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <FiAward className="text-white" />
          </div>
                    <h3 className="text-xl font-semibold text-koyu-mavi">{hizmet.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{hizmet.description}</p>
              </motion.div>
            ))}
          </div>
          </motion.div>

      {/* Sık Sorulan Sorular */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-koyu-mavi mb-6">Sık Sorulan Sorular</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mb-8"></div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {workAreaData.sikSorulanSorular.map((soru, index) => (
              <motion.div
                key={index}
                  className={`p-6 ${index !== workAreaData.sikSorulanSorular.length - 1 ? 'border-b border-gray-200' : ''}`}
                initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                  <h3 className="text-xl font-semibold text-koyu-mavi mb-3 flex items-center">
                    <FiMessageCircle className="mr-2 text-turkuaz" />
                  {soru.soru}
                </h3>
                  <p className="text-gray-600 pl-7">{soru.cevap}</p>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </div>
      </div>

      {/* İletişim CTA */}
      <motion.div 
        className="bg-gradient-to-r from-koyu-mavi to-mavi py-16 border-t border-koyu-mavi/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{workAreaData.title} Danışmanlığı İçin</h2>
          <p className="text-acik-mavi/90 text-lg mb-8 max-w-3xl mx-auto">
            {workAreaData.title} alanındaki hukuki sorunlarınız için profesyonel destek almak isterseniz, bize ulaşın. Size özel çözümler sunalım.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-block bg-white text-koyu-mavi hover:bg-cok-acik-mavi px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Bize Ulaşın
          </button>
        </div>
      </motion.div>
      
      {/* Modal */}
      <ContactModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="İletişim Talebi"
        description={`${workAreaData.title} konusunda danışmanlık için size nasıl ulaşalım?`}
      />
    </div>
  );
};

export default WorkArea; 