import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaArrowRight } from 'react-icons/fa';
import DemirciLogo from '../assets/logos/demirci-logo-yatay.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  // Hakkımızda linkine tıklandığında yapılacak işlem
  const scrollToAboutSection = (e) => {
    e.preventDefault();
    
    // Eğer zaten anasayfadaysak, sadece scroll et
    if (location.pathname === '/') {
      const aboutSection = document.getElementById('hakkimda');
      if (aboutSection) {
        // Navbar yüksekliğini hesaba katarak scroll et (navbar + ekstra padding için)
        const navbarHeight = 100; // yaklaşık navbar yüksekliği
        const aboutSectionTop = aboutSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: aboutSectionTop,
          behavior: 'smooth'
        });
      }
    } else {
      // Başka sayfadaysak, anasayfaya yönlendir ve sonra scroll et
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('hakkimda');
        if (aboutSection) {
          const navbarHeight = 100; // yaklaşık navbar yüksekliği
          const aboutSectionTop = aboutSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: aboutSectionTop,
            behavior: 'smooth'
          });
        }
      }, 300); // Sayfa geçişi için biraz daha uzun süre
    }
  };

  return (
    <footer className="site-footer relative z-20">
      {/* Üst kısım - ana içerik */}
      <div className="bg-gradient-to-r from-koyu-mavi via-mavi to-koyu-mavi text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Logo ve açıklama */}
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-turkuaz to-acik-mavi">
                  Av. Emre Okur
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-turkuaz to-acik-mavi rounded-full mt-2"></div>
              </div>
              <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                Profesyonel hukuki danışmanlık ve dava takibi hizmetleriyle müvekkillerime kapsamlı destek sunuyorum.
              </p>
            </div>

            {/* İletişim bilgileri */}
            <div className="space-y-6 text-left">
              <h3 className="text-xl font-semibold text-acik-mavi">İletişim</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 group">
                  <div className="bg-koyu-mavi p-2 rounded-full group-hover:bg-turkuaz transition-colors duration-300 flex-shrink-0">
                    <FaMapMarkerAlt className="text-acik-mavi group-hover:text-white transition-colors duration-300" />
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Altındağ+Mahallesi+Güllük+Caddesi+No:73/1+Muratpaşa+Antalya+Türkiye" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-gray-300 hover:text-turkuaz transition-colors duration-300"
                  >
                    Altındağ Mah. Güllük Cad. No:73/1, Muratpaşa/Antalya
                  </a>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="bg-koyu-mavi p-2 rounded-full group-hover:bg-turkuaz transition-colors duration-300 flex-shrink-0">
                    <FaPhone className="text-acik-mavi group-hover:text-white transition-colors duration-300" />
                  </div>
                  <a 
                    href="tel:+90369151144" 
                    className="text-sm text-gray-300 hover:text-turkuaz transition-colors duration-300"
                  >
                    +90 36 915 11 44
                  </a>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="bg-koyu-mavi p-2 rounded-full group-hover:bg-turkuaz transition-colors duration-300 flex-shrink-0">
                    <FaEnvelope className="text-acik-mavi group-hover:text-white transition-colors duration-300" />
                  </div>
                  <a 
                    href="mailto:emreokur@antalya.av.tr" 
                    className="text-sm text-gray-300 hover:text-turkuaz transition-colors duration-300"
                  >
                    emreokur@antalya.av.tr
                  </a>
                </li>
              </ul>
            </div>

            {/* Hızlı linkler */}
            <div className="space-y-6 text-left">
              <h3 className="text-xl font-semibold text-acik-mavi">Hızlı Linkler</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="flex items-center text-sm text-gray-300 hover:text-turkuaz group transition-colors">
                    <FaArrowRight className="mr-2 text-turkuaz opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Ana Sayfa</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/" 
                    onClick={scrollToAboutSection}
                    className="flex items-center text-sm text-gray-300 hover:text-turkuaz group transition-colors"
                  >
                    <FaArrowRight className="mr-2 text-turkuaz opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Hakkımızda</span>
                  </Link>
                </li>
                <li>
                  <Link to="/makaleler" className="flex items-center text-sm text-gray-300 hover:text-turkuaz group transition-colors">
                    <FaArrowRight className="mr-2 text-turkuaz opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Makaleler</span>
                  </Link>
                </li>
                <li>
                  <Link to="/iletisim" className="flex items-center text-sm text-gray-300 hover:text-turkuaz group transition-colors">
                    <FaArrowRight className="mr-2 text-turkuaz opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>İletişim</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Çalışma alanları */}
            <div className="space-y-6 text-left">
              <h3 className="text-xl font-semibold text-acik-mavi">Çalışma Alanlarımız</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/calisma-alani/1" className="flex items-center text-sm text-gray-300 hover:text-turkuaz group transition-colors">
                    <FaArrowRight className="mr-2 text-turkuaz opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Aile Hukuku</span>
                  </Link>
                </li>
                <li>
                  <Link to="/calisma-alani/2" className="flex items-center text-sm text-gray-300 hover:text-turkuaz group transition-colors">
                    <FaArrowRight className="mr-2 text-turkuaz opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Ceza Hukuku</span>
                  </Link>
                </li>
                <li>
                  <Link to="/calisma-alani/3" className="flex items-center text-sm text-gray-300 hover:text-turkuaz group transition-colors">
                    <FaArrowRight className="mr-2 text-turkuaz opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>İş Hukuku</span>
                  </Link>
                </li>
                <li>
                  <Link to="/calisma-alani/4" className="flex items-center text-sm text-gray-300 hover:text-turkuaz group transition-colors">
                    <FaArrowRight className="mr-2 text-turkuaz opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Tazminat Hukuku</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alt kısım - telif hakkı */}
      <div className="bg-koyu-mavi bg-opacity-90 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-acik-mavi text-sm">
              &copy; {currentYear} Av. Emre Okur. Tüm hakları saklıdır.
            </p>
            <div className="mt-4 sm:mt-0">
              <a 
                href="https://www.demirciyazilim.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:opacity-80 transition-opacity group"
              >
                
                <span className="text-sm text-gray-400 mr-2 group-hover:text-acik-mavi transition-colors">
                  Bu web-sitesi <b>Demirci Yazılım</b> tarafından tasarlanmıştır.
                </span>   
                <img src={DemirciLogo} alt="Demirci Yazılım Logo" className="h-10 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 