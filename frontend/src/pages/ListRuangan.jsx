import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

// Simple SVG icon components for header
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 15l-3-3h6l-3 3zM8 7a4 4 0 118 0v4.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 01-.293-.707V7z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default function RoomListingUI() {
  const [activeMenu, setActiveMenu] = useState('List Ruangan');

  const rooms = [
    {
      id: 1,
      name: 'Ruang 1.1',
      description: 'Lantai 1 Gedung Diterasai FMIPA',
      capacity: 'LCP',
      availability: 'AC',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Lab Kom 2',
      description: 'Lantai 2 Gedung Diterasai FMIPA',
      capacity: 'AC',
      availability: 'Kapasitas 30+',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Ruang 2.5',
      description: 'Lantai 2 Gedung Diterasai FMIPA',
      capacity: 'AC',
      availability: 'Kapasitas 30+',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Ruang 2.5',
      description: 'Lantai 2 Gedung Diterasai FMIPA',
      capacity: 'AC',
      availability: 'Kapasitas 30+',
      image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Ruang 1.1',
      description: 'Lantai 1 Gedung Diterasai FMIPA',
      capacity: 'LCP',
      availability: 'AC',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Lab Kom 2',
      description: 'Lantai 2 Gedung Diterasai FMIPA',
      capacity: 'AC',
      availability: 'Kapasitas 30+',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Ruang 2.5',
      description: 'Lantai 2 Gedung Diterasai FMIPA',
      capacity: 'AC',
      availability: 'Kapasitas 30+',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Lab Kom 2',
      description: 'Lantai 2 Gedung Diterasai FMIPA',
      capacity: 'AC',
      availability: 'Kapasitas 30+',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      name: 'Ruang 2.5',
      description: 'Lantai 2 Gedung Diterasai FMIPA',
      capacity: 'AC',
      availability: 'Kapasitas 30+',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop'
    }
  ];

  // Function to split rooms into rows of 4
  const getRoomRows = () => {
    const rows = [];
    for (let i = 0; i < rooms.length; i += 4) {
      rows.push(rooms.slice(i, i + 4));
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Pages</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">List Ruangan</span>
            </div>
            <div className="flex items-center space-x-4">
              <SearchIcon />
              <BellIcon />
              <div className="w-8 h-8 text-gray-400">
                <UserIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Peminjaman Ruangan</h2>
          
          {/* Room Grid - 4 cards per row */}
          <div className="space-y-6">
            {getRoomRows().map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {row.map((room) => (
                  <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-w-16 aspect-h-12">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{room.capacity}</span>
                        <span className="text-gray-500">{room.availability}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}