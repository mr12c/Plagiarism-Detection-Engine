import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Trophy, Code, Send, ChevronDown, Play, RotateCcw } from 'lucide-react';

// Navbar Component
const Navbar = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CodeContest</span>
          </div>

          {/* Contest Info */}
          <div className="flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
            <Trophy className="h-4 w-4 text-purple-400" />
            <span className="text-purple-400 font-semibold">Live Contest</span>
          </div>

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 transition-all duration-200 rounded-lg px-3 py-2 border border-white/20"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full ring-2 ring-purple-500/50"
              />
              <div className="text-left hidden sm:block">
                <div className="text-white text-sm font-medium">{user?.name}</div>
                <div className="text-gray-300 text-xs">{user?.email}</div>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-xl">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-white/10">
                    <div className="text-white text-sm font-medium">{user?.name}</div>
                    <div className="text-gray-300 text-xs">{user?.email}</div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-red-500/20 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;