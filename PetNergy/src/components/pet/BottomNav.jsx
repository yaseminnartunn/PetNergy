import React from 'react';
import { Home, Trophy, User } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/Bakim", icon: Home, label: "Bakim" },
    { path: "/Oduller", icon: Trophy, label: "Oduller" },
    { path: "/Profile", icon: User, label: "Profil" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl">
      <div className="max-w-md mx-auto flex justify-around items-center py-3 px-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-pink-500' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;