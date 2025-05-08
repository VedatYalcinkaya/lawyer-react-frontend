import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/sidebar';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import {
  IconDashboard,
  IconArticle,
  IconPlus,
  IconLogout,
  IconWorld,
  IconSettings,
} from '@tabler/icons-react';

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Başarıyla çıkış yapıldı');
      navigate('/login');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu');
      console.error('Logout error:', error);
    }
  };

  const mainLinks = [
    {
      label: 'Kontrol Paneli',
      href: "/admin",
      icon: <IconDashboard className="h-5 w-5 shrink-0 text-gray-300" />
    },
    {
      label: 'Blog Yazıları',
      href: "/admin/blogs",
      icon: <IconArticle className="h-5 w-5 shrink-0 text-gray-300" />
    }
  ];

  const quickLinks = [
    {
      label: 'Yeni Blog Ekle',
      href: "/admin/blogs/new",
      icon: <IconPlus className="h-5 w-5 shrink-0 text-gray-300" />
    }
  ];

  const additionalLinks = [
    {
      label: 'Siteyi Görüntüle',
      href: "/",
      icon: <IconWorld className="h-5 w-5 shrink-0 text-gray-300" />
    },
    {
      label: 'Ayarlar',
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-gray-300" />
    },
    {
      label: 'Çıkış Yap',
      onClick: handleLogout,
      icon: <IconLogout className="h-5 w-5 shrink-0 text-gray-300" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700 py-3 px-6 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Logo open={true} />
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="font-medium text-white">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 py-4 bg-gray-800 h-full">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="mt-2 flex flex-col gap-2 px-2">
                {mainLinks.map((link, idx) => (
                  <CustomSidebarLink key={idx} link={link} />
                ))}
              </div>
              
              <div className="mt-8 px-2">
                <span className="text-xs px-2 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Hızlı Erişim
                </span>
                <div className="mt-2 flex flex-col gap-2">
                  {quickLinks.map((link, idx) => (
                    <CustomSidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-auto px-2">
              <div className="flex flex-col gap-2">
                {additionalLinks.map((link, idx) => (
                  <CustomSidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-900">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 min-h-[calc(100vh-7rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const CustomSidebarLink = ({ link }) => {
  if (link.onClick) {
    return (
      <button
        onClick={link.onClick}
        className="flex items-center rounded-lg px-3 py-2 transition-colors duration-200 text-gray-300 hover:bg-gray-700/50 hover:text-white w-full text-left"
      >
        <div className="text-gray-400">
          {link.icon}
        </div>
        <span className="ml-3">{link.label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={link.href}
      end={link.href === "/admin"}
      className={({ isActive }) =>
        cn(
          "flex items-center rounded-lg px-3 py-2 transition-colors duration-200",
          isActive
            ? "bg-emerald-600/20 text-emerald-500"
            : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className={cn(isActive ? "text-emerald-500" : "text-gray-400")}>
            {link.icon}
          </div>
          <span className="ml-3">{link.label}</span>
        </>
      )}
    </NavLink>
  );
};

const Logo = ({ open }) => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1">
      <div className="h-6 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-emerald-500" />
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-emerald-500 text-lg">
        Emre Okur Avukatlık
      </motion.span>
    </div>
  );
};

export default AdminPage; 