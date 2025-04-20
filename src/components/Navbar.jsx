import React, { useEffect, useState } from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";
import { maviPaleti } from "../utils/colorPalette";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [legalContents, setLegalContents] = useState([
    { id: 1, title: "Aile Hukuku" },
    { id: 2, title: "Ceza Hukuku" },
    { id: 3, title: "İş Hukuku" },
    { id: 4, title: "Tazminat Hukuku" }
  ]);

  useEffect(() => {
    const burger = document.querySelectorAll(".navbar-burger");
    const menu = document.querySelectorAll(".navbar-menu");

    if (burger.length && menu.length) {
      for (let i = 0; i < burger.length; i++) {
        burger[i].addEventListener("click", function () {
          for (let j = 0; j < menu.length; j++) {
            menu[j].classList.toggle("hidden");
          }
        });
      }
    }

    const close = document.querySelectorAll(".navbar-close");
    const backdrop = document.querySelectorAll(".navbar-backdrop");

    if (close.length) {
      for (let i = 0; i < close.length; i++) {
        close[i].addEventListener("click", function () {
          for (let j = 0; j < menu.length; j++) {
            menu[j].classList.toggle("hidden");
          }
        });
      }
    }

    if (backdrop.length) {
      for (let i = 0; i < backdrop.length; i++) {
        backdrop[i].addEventListener("click", function () {
          for (let j = 0; j < menu.length; j++) {
            menu[j].classList.toggle("hidden");
          }
        });
      }
    }
  }, []);

  return (
    <div className="w-full">
      <nav style={{backgroundColor: maviPaleti.koyuMavi}} className="flex-no-wrap fixed top-0 left-0 right-0 z-20 flex w-full items-center justify-start backdrop-filter backdrop-blur-xl">
        <div className="flex justify-between items-center w-full px-3 sm:px-6 lg:px-8">
          {/* Logo ve Başlık */}
          <div className="flex items-center space-x-4">
            <img
              className="custom-logo my-4 h-24"
              src={logo}
              alt="Av. Emre Okur Logo"
            />
            <div className="flex flex-col text-center">
              <span style={{color: maviPaleti.cokAcikMavi}} className="text-2xl font-josefin font-bold">
                Av. Emre Okur
              </span>
            </div>
          </div>

          {/* Navigasyon Linkleri */}
          <div className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-8">
            <Link
              to="/"
              style={{color: maviPaleti.acikMavi}}
              className="block text-xl text-center font-josefin font-bold hover:scale-125 transition-transform duration-300 ease-in-out"
              onMouseOver={(e) => e.target.style.color = maviPaleti.cokAcikMavi}
              onMouseOut={(e) => e.target.style.color = maviPaleti.acikMavi}
            >
              Ana Sayfa
            </Link>
            <Link
              to="hakkimizda"
              style={{color: maviPaleti.acikMavi}}
              className="block text-xl font-josefin font-bold hover:scale-125 transition-transform duration-300 ease-in-out"
              onMouseOver={(e) => e.target.style.color = maviPaleti.cokAcikMavi}
              onMouseOut={(e) => e.target.style.color = maviPaleti.acikMavi}
            >
              Hakkımızda
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                style={{color: maviPaleti.acikMavi}}
                className="block text-xl font-josefin font-bold hover:scale-125 transition-transform duration-300 ease-in-out"
                onMouseOver={(e) => e.target.style.color = maviPaleti.cokAcikMavi}
                onMouseOut={(e) => e.target.style.color = maviPaleti.acikMavi}
              >
                Çalışma Alanlarımız
              </button>
              <div
                className={`absolute ${
                  dropdownOpen ? "block" : "hidden"
                } bg-white shadow-lg rounded mt-0 w-48`}
              >
                <ul className="py-2">
                  {legalContents.map((content) => (
                    <li key={content.id}>
                      <Link
                        to={`/calisma-alani/${content.id}`}
                        style={{color: maviPaleti.mavi}}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        {content.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              to="/makaleler"
              style={{color: maviPaleti.acikMavi}}
              className="block text-xl font-josefin font-bold hover:scale-125 transition-transform duration-300 ease-in-out"
              onMouseOver={(e) => e.target.style.color = maviPaleti.cokAcikMavi}
              onMouseOut={(e) => e.target.style.color = maviPaleti.acikMavi}
            >
              Makaleler
            </Link>
            <Link
              to="/iletisim"
              style={{color: maviPaleti.acikMavi}}
              className="block text-xl font-josefin font-bold hover:scale-125 transition-transform duration-300 ease-in-out"
              onMouseOver={(e) => e.target.style.color = maviPaleti.cokAcikMavi}
              onMouseOut={(e) => e.target.style.color = maviPaleti.acikMavi}
            >
              İletişim
            </Link>
          </div>

          {/* Hamburger Menüsü */}
          <div className="flex flex-col items-end space-y-2">
            <button className="relative group navbar-burger lg:hidden">
              <div style={{backgroundColor: maviPaleti.mavi}} className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0 ring-gray-300 hover:scale-125 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-500 origin-center overflow-hidden group-focus:-rotate-180">
                  <div className="bg-white h-[2px] w-7 transform transition-all duration-500 group-focus:rotate-45 -translate-x-1"></div>
                  <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-500 "></div>
                  <div className="bg-white h-[2px] w-7 transform transition-all duration-500 group-focus:-rotate-45 -translate-x-1"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobil Menü */}
      <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <img
                className="custom-logo scale-50 mx-0"
                src={logo}
                alt="Cindemir Hukuk Bürosu Logo"
              />
            </a>
            <button className="navbar-close">
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="hakkimizda"
                >
                  Hakkımızda
                </Link>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded w-full text-left"
                >
                  Çalışma Alanlarımız
                  <svg
                    className={`w-4 h-4 inline-block ml-2 transform ${
                      dropdownOpen ? "rotate-180" : ""
                    } transition-transform`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul className="pl-4 mt-2">
                    {legalContents.map((content) => (
                      <li key={content.id} className="mb-1">
                        <Link
                          to={`/calisma-alani/${content.id}`}
                          className="block p-2 text-sm text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                        >
                          {content.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/makaleler"
                >
                  Makaleler
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/iletisim"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2024</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;