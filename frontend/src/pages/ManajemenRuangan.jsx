import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, User, Bell, Settings, Edit } from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin.jsx';
import Header from '../components/Header.jsx';

const ManajemenRuangan = () => {
    const [activeMenu, setActiveMenu] = useState('Manajemen Ruangan');
    const navigate = useNavigate();
  
  // Sample room data - replace with your actual data
  const roomData = [
    {
      id: 1,
      name: "Ruang 1.1",
      capacity: "40 orang",
      facilities: ["Proyektor", "AC", "Whiteboard"],
      location: "Gedung A Lantai 1"
    },
    {
      id: 2,
      name: "Ruang 2.1",
      capacity: "35 orang",
      facilities: ["Proyektor", "AC", "Sound System"],
      location: "Gedung A Lantai 2"
    },
    {
      id: 3,
      name: "Lab Kom 1",
      capacity: "30 orang",
      facilities: ["Komputer", "Proyektor", "AC"],
      location: "Gedung B Lantai 1"
    },
    {
      id: 4,
      name: "Ruang 2.3",
      capacity: "50 orang",
      facilities: ["Proyektor", "AC", "Microphone"],
      location: "Gedung A Lantai 2"
    },
    {
      id: 5,
      name: "Ruang 1.2",
      capacity: "45 orang",
      facilities: ["Proyektor", "AC", "Whiteboard", "Sound System"],
      location: "Gedung A Lantai 1"
    },
    {
      id: 6,
      name: "Ruang 3.4",
      capacity: "60 orang",
      facilities: ["Proyektor", "AC", "Podium", "Sound System"],
      location: "Gedung A Lantai 3"
    }
  ];

  const handleEdit = (roomId) => {
    console.log('Edit button clicked for room ID:', roomId);
    try {
      navigate(`/editruangan/${roomId}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <SidebarAdmin activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <Header 
          breadcrumbPath="Admin / Ruangan"
          userName="A"
          showSearchBar={true}
          searchPlaceholder="Cari ruangan..."
          onSearchChange={(e) => console.log(e.target.value)}
        />

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">NAMA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">KAPASITAS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">FASILITAS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">LOKASI</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {roomData.map((room) => (
                  <tr key={room.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{room.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{room.capacity}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {room.facilities.map((facility, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{room.location}</span>
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEdit(room.id);
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenRuangan;