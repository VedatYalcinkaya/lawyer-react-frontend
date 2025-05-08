import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logos/av-logo-beyaz.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Uzmanlık alanlarını manuel olarak tanımlayalım
  const expertiseAreas = [
    { id: "aile", title: "Aile Hukuku", path: "/aile-hukuku" },
    { id: "ceza", title: "Ceza Hukuku", path: "/ceza-hukuku" },
    { id: "mal-rejimi", title: "Mal Rejimi Hukuku", path: "/mal-rejimi-hukuku" },
    { id: "kira", title: "Kira Hukuku", path: "/kira-hukuku" },
    { id: "miras", title: "Miras Hukuku", path: "/miras-hukuku" },
    { id: "icra-iflas", title: "İcra ve İflas Hukuku", path: "/icra-iflas-hukuku" }
  ];

  // Sayfa değiştiğinde en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hakkımızda linkine tıklandığında yapılacak işlem
  const scrollToAboutSection = (e) => {
    e.preventDefault(); // Default link davranışını engelle
    
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
      // Sayfa geçişinden sonra scroll işlemi için timeout kullan
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
    
    // Mobil menüyü kapat
    setMobileMenuOpen(false);
  };

  // Dropdown dışında bir yere tıklandığında dropdown'u kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Scroll efekti için
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    // Body'nin scroll edilebilirliğini mobil menü açıkken kısıtla
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [scrolled, dropdownRef, mobileMenuOpen]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileDropdownToggle = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Sayfa geçişleri için handler
  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full">
      <nav className={`fixed top-0 left-0 right-0 z-20 w-full transition-all duration-300 ease-in-out ${
        scrolled ? "bg-koyu-mavi shadow-lg" : "bg-koyu-mavi/90 backdrop-blur-sm"
      }`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
          {/* Logo ve Başlık */}
            <div className="flex items-center space-x-3">
              <div 
                onClick={() => handleNavigation('/')}
                className="flex-shrink-0 transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              >
            <img
                  className="h-16 w-auto"
              src={logo}
              alt="Av. Emre Okur Logo"
            />
              </div>
              <div className="hidden md:block">
                <span className="text-2xl font-josefin font-bold text-white">
                Av. Emre Okur
              </span>
            </div>
          </div>

            {/* Navigasyon Linkleri - Masaüstü */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" active={location.pathname === '/'}>
              Ana Sayfa
              </NavLink>
              <NavLink to="/" onClick={scrollToAboutSection}>
              Hakkımızda
              </NavLink>
            <div
                ref={dropdownRef}
                className="relative group"
            >
              <button 
                  onClick={handleDropdownToggle}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className="group relative inline-flex items-center px-1 py-2 text-base font-medium text-acik-mavi hover:text-white transition-colors duration-300 ease-in-out"
              >
                  <span>Uzmanlık Alanları</span>
                  <svg className="ml-1 w-4 h-4 transition-transform duration-200 ease-in-out" 
                       fill="none" 
                       stroke="currentColor" 
                       viewBox="0 0 24 24" 
                       xmlns="http://www.w3.org/2000/svg"
                       style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-turkuaz to-acik-mavi group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </button>
              <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className={`absolute left-0 mt-0 pt-2 w-64 origin-top-left transform transition-all duration-200 ease-in-out ${
                    dropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <div className="bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
                    <div className="py-2 px-3 bg-gradient-to-r from-koyu-mavi to-turkuaz text-white font-semibold text-sm">
                      UZMANLIK ALANLARI
                    </div>
                    <div className="py-1">
                      {expertiseAreas.map((area) => (
                        <Link
                          key={area.id}
                          to={area.path}
                          onClick={() => {
                            setDropdownOpen(false);
                            window.scrollTo(0, 0);
                          }}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-acik-mavi/10 hover:to-turkuaz/10 hover:text-koyu-mavi transition-colors duration-200 ease-in-out border-l-2 border-transparent hover:border-koyu-mavi flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2 text-turkuaz" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                          {area.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <NavLink to="/makaleler" active={location.pathname === '/makaleler'}>
              Makaleler
              </NavLink>
              <NavLink to="/iletisim" active={location.pathname === '/iletisim'}>
              İletişim
              </NavLink>
          </div>

          {/* Hamburger Menüsü */}
            <div className="md:hidden">
              <button 
                className="focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="Menüyü aç/kapat"
              >
                <div className="w-8 h-8 flex items-center justify-center relative">
                  <span 
                    className={`block absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`}
                  ></span>
                  <span 
                    className={`block absolute h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
                    }`}
                  ></span>
                  <span 
                    className={`block absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`}
                  ></span>
                </div>
              </button>
              </div>
          </div>
        </div>
      </nav>

      {/* Mobil Menü - Yeni Tasarım */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Karartılmış arkaplan */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-50' : 'opacity-0'
          }`} 
          onClick={closeMobileMenu}
        ></div>
        
        {/* Menü Paneli */}
        <div 
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}
        >
          {/* Başlık ve Kapat Butonu */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto mr-3" />
              <h2 className="text-xl font-bold text-koyu-mavi">Av. Emre Okur</h2>
            </div>
            <button 
              onClick={closeMobileMenu}
              className="p-2 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Menü İçeriği */}
          <div className="flex-grow overflow-y-auto px-6 py-4">
            <div className="space-y-2">
              <MobileNavLink 
                  to="/"
                onClick={() => handleNavigation('/')}
                isActive={location.pathname === '/'}
                >
                  Ana Sayfa
              </MobileNavLink>
              
              <MobileNavLink 
                  to="/"
                onClick={(e) => {
                  scrollToAboutSection(e);
                  closeMobileMenu();
                }}
                >
                  Hakkımızda
              </MobileNavLink>
              
              {/* Uzmanlık Alanları Dropdown */}
              <div className="py-2">
                <button
                  onClick={handleMobileDropdownToggle}
                  className="flex items-center justify-between w-full px-4 py-2 text-base font-medium text-gray-700 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <span>Uzmanlık Alanları</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      mobileDropdownOpen ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div 
                  className={`mt-2 space-y-1 transition-all duration-200 ease-in-out overflow-hidden ${
                    mobileDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-gradient-to-r from-koyu-mavi to-turkuaz rounded-t-md">
                    <div className="py-2 px-4 text-white text-sm font-semibold">
                      UZMANLIK ALANLARI
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-b-md py-2 border border-gray-100">
                    {expertiseAreas.map((area) => (
                      <Link
                        key={area.id}
                        to={area.path}
                        onClick={() => handleNavigation(area.path)}
                        className="flex items-center pl-6 pr-4 py-2.5 text-sm text-gray-700 hover:text-koyu-mavi hover:bg-acik-mavi/10 transition-colors duration-200 border-l-2 border-transparent hover:border-koyu-mavi"
                      >
                        <svg className="w-4 h-4 mr-2 text-turkuaz" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        {area.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <MobileNavLink 
                  to="/makaleler"
                onClick={() => handleNavigation('/makaleler')}
                isActive={location.pathname === '/makaleler'}
                >
                  Makaleler
              </MobileNavLink>
              
              <MobileNavLink 
                  to="/iletisim"
                onClick={() => handleNavigation('/iletisim')}
                isActive={location.pathname === '/iletisim'}
                >
                  İletişim
              </MobileNavLink>
            </div>
          </div>
          
          {/* Alt Bilgi */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="mt-2 flex flex-col">
              <a href="tel:+905123456789" className="flex items-center text-gray-600 hover:text-koyu-mavi py-1">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>+90 (536) 915 11 44</span>
              </a>
              <a href="mailto:emreokur@antalya.av.tr" className="flex items-center text-gray-600 hover:text-koyu-mavi py-1">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>emreokur@antalya.av.tr</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-center text-gray-500">
              © {new Date().getFullYear()} Tüm Hakları Saklıdır<br />Av. Emre Okur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// NavLink bileşeni - Masaüstü için
const NavLink = ({ to, active, children, onClick }) => {
  const handleClick = (e) => {
    if (!onClick) {
      window.scrollTo(0, 0);
    } else {
      onClick(e);
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="group relative inline-flex items-center px-1 py-2 text-base font-medium text-acik-mavi hover:text-white transition-colors duration-300 ease-in-out"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-turkuaz to-acik-mavi group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </Link>
  );
};

// MobileNavLink bileşeni - Mobil görünüm için
const MobileNavLink = ({ to, children, onClick, isActive }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
        isActive 
          ? 'bg-gradient-to-r from-turkuaz/20 to-acik-mavi/20 text-koyu-mavi' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;