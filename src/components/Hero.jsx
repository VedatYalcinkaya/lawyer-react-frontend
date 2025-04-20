import React from "react";
import { motion } from "motion/react";
import { FlipWords } from "./ui/flip-words";
import AvLogo from "../assets/logos/av-logo.svg";

const Hero = () => {
  // FlipWords için uzmanlık alanları
  const uzmanlikFlip = ["Aile", "Ceza", "Ticaret", "İş", "Miras", "Gayrimenkul"];
  
  // Uzmanlık alanları
  const uzmanlikAlanlari = [
    { 
      baslik: "Aile Hukuku", 
      aciklama: "Boşanma, velayet, nafaka ve evlilik konularında uzman destek",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
          <path d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 22C7 19.2386 9.23858 17 12 17C14.7614 17 17 19.2386 17 22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 14C19.8284 14 20.5 13.3284 20.5 12.5C20.5 11.6716 19.8284 11 19 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2.5C16 3.32843 16.6716 4 17.5 4C18.3284 4 19 3.32843 19 2.5C19 1.67157 18.3284 1 17.5 1C16.6716 1 16 1.67157 16 2.5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 8.5C22 9.32843 21.3284 10 20.5 10C19.6716 10 19 9.32843 19 8.5C19 7.67157 19.6716 7 20.5 7C21.3284 7 22 7.67157 22 8.5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 14C4.17157 14 3.5 13.3284 3.5 12.5C3.5 11.6716 4.17157 11 5 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 2.5C5 3.32843 4.32843 4 3.5 4C2.67157 4 2 3.32843 2 2.5C2 1.67157 2.67157 1 3.5 1C4.32843 1 5 1.67157 5 2.5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 8.5C2 9.32843 2.67157 10 3.5 10C4.32843 10 5 9.32843 5 8.5C5 7.67157 4.32843 7 3.5 7C2.67157 7 2 7.67157 2 8.5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      baslik: "Ceza Hukuku", 
      aciklama: "Savunma, dava takibi ve adli süreçlerde profesyonel danışmanlık",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 16L12 7L15.5 16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 13H18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      baslik: "Ticaret Hukuku", 
      aciklama: "Şirket kurulumu, ticari sözleşmeler ve fikri mülkiyet hizmetleri",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
          <path d="M16 16L22 22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 14V6C19 4.89543 18.1046 4 17 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 8H19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 3V5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 3V5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      baslik: "İş Hukuku", 
      aciklama: "İşçi-işveren ilişkileri, tazminat davaları ve iş sözleşmeleri",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
          <path d="M20 7H4C3.44772 7 3 7.44772 3 8V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V8C21 7.44772 20.5523 7 20 7Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 7V3.5C8 3.22386 8.22386 3 8.5 3H15.5C15.7761 3 16 3.22386 16 3.5V7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12V16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12H8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      baslik: "Miras Hukuku", 
      aciklama: "Vasiyetname, miras paylaşımı ve veraset konularında danışmanlık",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
          <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 2V22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 12H22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      baslik: "Gayrimenkul Hukuku", 
      aciklama: "Tapu işlemleri, kat mülkiyeti ve gayrimenkul davalarında destek",
      icon: (
        <svg className="w-10 h-10 mb-4 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
          <path d="M19 8.71002L13.667 4.56202C13.199 4.19702 12.563 4.19702 12.095 4.56202L6.76196 8.71002C6.44496 8.95702 6.22796 9.42802 6.22796 9.82002V18.276C6.22796 19.175 6.94996 19.907 7.83996 19.907H17.922C18.812 19.907 19.534 19.175 19.534 18.276V9.82002C19.534 9.42902 19.317 8.95702 19 8.71002Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.88098 15.407C11.1508 16.6583 13.0965 16.6323 14.336 15.348C15.5754 14.0637 15.5495 12.1181 14.2797 10.8785C13.01 9.63904 11.0643 9.66502 9.825 10.9348C9.59893 11.1657 9.40496 11.4268 9.24989 11.71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen w-full pt-8">
      <div className="container mx-auto px-6 lg:px-16 py-12">
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-200 w-full sm:w-auto">
                Randevu Al
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md transition-all duration-300 w-full sm:w-auto">
                Hizmetler
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
                  className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100"
                >
                  {alan.icon}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{alan.baslik}</h3>
                  <p className="text-gray-600 text-sm">{alan.aciklama}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
