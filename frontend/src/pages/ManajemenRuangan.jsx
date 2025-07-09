import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Edit } from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin.jsx';
import Header from '../components/Header.jsx';
import { useRoomContext } from '../Context/RoomContext.jsx';
import Loading from '../components/Loading.jsx';
import { useUserContext } from '../Context/UserContext.jsx';

const ManajemenRuangan = () => {
    const [activeMenu, setActiveMenu] = useState('Manajemen Ruangan');
    const navigate = useNavigate();
    const {room, loading} = useRoomContext()
    const {user, loading:userLoad} = useUserContext()

    if (loading) return <Loading/>
    if(userLoad) return <Loading/>
  

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
          userName={user.name}
          showSearchBar={false}
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
                {room.map((room) => (
                  <tr key={room.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{room.nama_ruangan}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{room.kapasitas}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                          <span 
                            
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {room.fasilitas}
                          </span>

                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{room.lokasi_ruangan}</span>
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