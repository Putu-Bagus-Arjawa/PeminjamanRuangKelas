import React, { useState } from 'react';
import { Search, User, Bell, Settings } from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin.jsx';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newRoom, setNewRoom] = useState({
    nama: '',
    kapasitas: '',
    fasilitas: '',
    lokasi: ''
  });
  const [newUser, setNewUser] = useState({
    nama: '',
    email: '',
    password: '',
    role: ''
  });

  const tableData = [
    { id: 1, name: 'Bob Robert', email: 'robert@example.com', ruangan: 'Ruang 1.1', jadwal: 'Kuliah', status: 'Disetujui', tanggal: '14/06/21' },
    { id: 2, name: 'Alice Liza', email: 'alice@example.com', ruangan: 'Ruang 2.1', jadwal: 'Kuliah', status: 'Pending', tanggal: '14/06/21' },
    { id: 3, name: 'Laurent Michael', email: 'laurent@example.com', ruangan: 'Lab Kom 1', jadwal: 'Praktek', status: 'Ditolak', tanggal: '14/06/21' },
    { id: 4, name: 'Fredianeu Hill', email: 'fredianeu@example.com', ruangan: 'Ruang 2.3', jadwal: 'Kuliah', status: 'Disetujui', tanggal: '14/06/21' },
    { id: 5, name: 'Daniel Thomas', email: 'daniel@example.com', ruangan: 'Ruang 1.2', jadwal: 'Praktek', status: 'Pending', tanggal: '14/06/21' },
    { id: 6, name: 'Mark Wilson', email: 'mark@example.com', ruangan: 'Ruang 3.4', jadwal: 'Praktek', status: 'Pending', tanggal: '14/06/21' }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch(status) {
      case 'Disetujui':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'Ditolak':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleRoomSubmit = () => {
    console.log('Room submitted:', newRoom);
    setNewRoom({ nama: '', kapasitas: '', fasilitas: '', lokasi: '' });
  };

  const handleUserSubmit = () => {
    console.log('User submitted:', newUser);
    setNewUser({ nama: '', email: '', password: '', role: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
            <SidebarAdmin activeMenu="Dashboard" setActiveMenu={() => {}} />
        </div>

        {/* Main Content Container with left margin */}
        <div className="ml-64">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">Admin / Data</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                type="text"
                                placeholder="Type here..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                                <Bell className="w-5 h-5" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                                <User className="w-5 h-5" />
                                <span>Sign in</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status Ruangan Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Status Ruangan</h2>
                    
                    {/* Data Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruangan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jadwal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {tableData.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        <User className="w-5 h-5 text-gray-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{row.name}</div>
                                        <div className="text-sm text-gray-500">{row.email}</div>
                                    </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.ruangan}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.jadwal}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusBadge(row.status)}>{row.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.tanggal}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                                    Edit
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Chart */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-lg p-6 text-white">
                        <h3 className="text-lg font-semibold mb-4">Peminjaman</h3>
                        <p className="text-sm text-gray-300 mb-6">14:29 | Menunggu Konfirmasi</p>
                        
                        {/* Bar Chart */}
                        <div className="flex items-end justify-between h-32 mb-6">
                            {[60, 40, 80, 35, 70, 45, 90, 25, 55, 65].map((height, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                className="w-4 bg-white rounded-t"
                                style={{ height: `${height}%` }}
                                ></div>
                            </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                                <span className="text-sm">Berhasil</span>
                            </div>
                            <div className="text-2xl font-bold">25</div>
                            </div>
                            <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                                <span className="text-sm">Disetujui</span>
                            </div>
                            <div className="text-2xl font-bold">16</div>
                            </div>
                            <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <div className="w-3 h-3 bg-teal-400 rounded-full mr-2"></div>
                                <span className="text-sm">Menunggu</span>
                            </div>
                            <div className="text-2xl font-bold">5</div>
                            </div>
                            <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                                <span className="text-sm">Jadwal</span>
                            </div>
                            <div className="text-2xl font-bold">10</div>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Right Column - Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Add Room Form */}
                        <div className="bg-teal-500 rounded-lg p-6 text-white">
                        <h3 className="text-xl font-bold mb-6 text-center">TAMBAH RUANGAN</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nama Ruangan</label>
                                <input
                                type="text"
                                className="w-full px-3 py-2 border border-white bg-transparent rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-200"
                                placeholder="Masukkan nama ruangan"
                                value={newRoom.nama}
                                onChange={(e) => setNewRoom({...newRoom, nama: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Kapasitas</label>
                                <input
                                type="text"
                                className="w-full px-3 py-2 border border-white bg-transparent rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-200"
                                placeholder="Contoh: 30 orang"
                                value={newRoom.kapasitas}
                                onChange={(e) => setNewRoom({...newRoom, kapasitas: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Fasilitas</label>
                                <input
                                type="text"
                                className="w-full px-3 py-2 border border-white bg-transparent rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-200"
                                placeholder="Contoh: AC, Proyektor"
                                value={newRoom.fasilitas}
                                onChange={(e) => setNewRoom({...newRoom, fasilitas: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Lokasi Ruangan</label>
                                <input
                                type="text"
                                className="w-full px-3 py-2 border border-white bg-transparent rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-200"
                                placeholder="Contoh: Lantai 2"
                                value={newRoom.lokasi}
                                onChange={(e) => setNewRoom({...newRoom, lokasi: e.target.value})}
                                />
                            </div>
                            </div>
                            <div className="flex justify-center">
                            <button
                                onClick={handleRoomSubmit}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg transition duration-200"
                            >
                                Submit
                            </button>
                            </div>
                        </div>
                        </div>

                        {/* Add User Form */}
                        <div className="bg-white rounded-lg p-6 shadow">
                        <h3 className="text-xl font-bold mb-6 text-center text-gray-900">Tambah Pengguna</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                                <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan nama pengguna"
                                value={newUser.nama}
                                onChange={(e) => setNewUser({...newUser, nama: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan password pengguna"
                                value={newUser.password}
                                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan email pengguna"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Contoh: Admin, User"
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                />
                            </div>
                            </div>
                            <div className="flex justify-center">
                            <button
                                onClick={handleUserSubmit}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg transition duration-200"
                            >
                                Submit
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
};

export default Dashboard;