import React from 'react';
import { useNavigate } from 'react-router';

// Simple SVG icon components
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LogInIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);

export default function Sidebar({ activeMenu, setActiveMenu }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, active: false },
    { name: 'List Ruangan', icon: ListIcon, active: true },
    { name: 'Booking Ruang', icon: CalendarIcon, active: false },
    { name: 'Riwayat Booking', icon: UserIcon, active: false }
  ];

  const accountPages = [
    { name: 'Profile', icon: UserIcon, active: false },
    { name: 'Sign In', icon: LogInIcon, active: false }
  ];

  const handleAccountPageClick = (pageName) => {
    if (pageName === 'Sign In') {
      navigate('/login');
    }
    // Add other navigation logic here if needed for Profile page
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">SMART CLASS</h1>
      </div>
      
      <nav className="mt-6">
        <div className="px-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 cursor-pointer transition-colors ${
                item.name === activeMenu
                  ? 'bg-teal-50 text-teal-600 border-r-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className={`mr-3 ${
                item.name === activeMenu ? 'text-teal-600' : 'text-gray-400'
              }`}>
                <item.icon />
              </div>
              {item.name}
            </div>
          ))}
        </div>
        
        <div className="mt-8 px-6">
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            ACCOUNT PAGES
          </h3>
          <div className="mt-3">
            {accountPages.map((item) => (
              <div
                key={item.name}
                onClick={() => handleAccountPageClick(item.name)}
                className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg mb-2 cursor-pointer hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <div className="mr-3 text-gray-400">
                  <item.icon />
                </div>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}