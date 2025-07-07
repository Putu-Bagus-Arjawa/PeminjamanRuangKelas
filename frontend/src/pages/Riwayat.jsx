import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Riwayat = () => {
    const [activeMenu, setActiveMenu] = useState('Riwayat Booking');
  // Sample data - replace with your actual data
  const borrowingData = [
    {
      id: 1,
      user: "Bagus Arjawa S.kom, M.Kom",
      email: "bagusarjawa@gmail.com",
      room: "Ruang 1.1",
      agenda: "Kuliah PPDM",
      status: "Disetujui",
      date: "14/06/21"
    },
    {
      id: 2,
      user: "Bagus Arjawa S.kom, M.Kom",
      email: "bagusarjawa@gmail.com",
      room: "Ruang 2.1",
      agenda: "Kuliah FPW",
      status: "Ditolak",
      date: "14/06/21"
    },
    {
      id: 3,
      user: "Bagus Arjawa S.kom, M.Kom",
      email: "bagusarjawa@gmail.com",
      room: "Lab Kom 1",
      agenda: "Proker STACK 2025",
      status: "Ditolak",
      date: "14/06/21"
    },
    {
      id: 4,
      user: "Bagus Arjawa S.kom, M.Kom",
      email: "bagusarjawa@gmail.com",
      room: "Ruang 2.3",
      agenda: "Kuliah PKB",
      status: "Disetujui",
      date: "14/06/21"
    },
    {
      id: 5,
      user: "Bagus Arjawa S.kom, M.Kom",
      email: "bagusarjawa@gmail.com",
      room: "Ruang 1.2",
      agenda: "Proker FGD 2026",
      status: "Disetujui",
      date: "14/06/21"
    },
    {
      id: 6,
      user: "Bagus Arjawa S.kom, M.Kom",
      email: "bagusarjawa@gmail.com",
      room: "Ruang 3.4",
      agenda: "Proker SSC",
      status: "Disetujui",
      date: "14/06/21"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disetujui':
        return 'bg-green-500 text-white';
      case 'Ditolak':
        return 'bg-red-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <Header 
          breadcrumbPath="Pages / Riwayat"
          userName="A"
          showSearchBar={true}
          searchPlaceholder="Type here"
          onSearchChange={(e) => console.log(e.target.value)}
        />

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">USER</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">RUANGAN</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">AGENDA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">STATUS</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">TANGGAL</th>
              </tr>
            </thead>
            <tbody>
              {borrowingData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                        {getInitials(item.user)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.user}</div>
                        <div className="text-sm text-gray-500">{item.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{item.room}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{item.agenda.split(' ')[0]}</div>
                      <div className="text-sm text-gray-500">{item.agenda.split(' ').slice(1).join(' ')}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900">{item.date}</span>
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

export default Riwayat;