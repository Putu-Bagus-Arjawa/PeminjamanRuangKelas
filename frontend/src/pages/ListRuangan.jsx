import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useRoomContext } from '../Context/RoomContext';
import Loading from '../components/Loading';
import { useUserContext } from '../Context/UserContext';


export default function RoomListingUI() {
  const [activeMenu, setActiveMenu] = useState('List Ruangan');
  const {user, loading:userLoad} = useUserContext()
  const { room, loading } = useRoomContext();

  if (loading ) return <Loading />;
  if(userLoad) return <Loading/>


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-8">
        <Header 
          breadcrumbPath="Pages / List Ruangan"
          userName={user.name}
          showSearchBar={false}
          searchPlaceholder=""
          onSearchChange={(e) => console.log(e.target.value)}
        />

        <div className="p-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Peminjaman Ruangan</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {room.length > 0 ? (
              room.map((roomItem) => (
                <div 
                  key={roomItem.id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 w-full">
                    <img
                      src='https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
                      alt={roomItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{roomItem.nama_ruangan}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">Kapasitas:{roomItem.kapasitas}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Fasilitas: {roomItem.fasilitas}</span>
                      <span 
                        className={`font-medium ${
                          roomItem.availability === 'Available' 
                            ? 'text-green-500' 
                            : 'text-red-500'
                        }`}
                      >
                        {roomItem.lokasi_ruangan}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No rooms available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}