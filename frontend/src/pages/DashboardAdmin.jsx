import { useState } from 'react';
import { User, Bell, Settings, Edit } from 'lucide-react';
import { useNavigate } from 'react-router';
import SidebarAdmin from '../components/SidebarAdmin.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const [newRoom, setNewRoom] = useState({
    nama_ruangan: '',
    kapasitas: 0,
    fasilitas: '',
    lokasi_ruangan: ''
  });

  const [newUser, setNewUser] = useState({
    name: '', // ✅ GANTI dari "nama"
    email: '',
    password: '',
    role: ''
  });

  const [message, setMessage] = useState({ pesan: '', tipe: '' });

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const respons = await fetch('http://localhost:5000/room/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newRoom)
      });

      const data = await respons.json();

      if (respons.ok) {
        setNewRoom({
          nama_ruangan: '',
          kapasitas: 0,
          fasilitas: '',
          lokasi_ruangan: ''
        });
        setMessage({ pesan: data.message, tipe: 'success' });
      } else {
        setMessage({ pesan: data.message, tipe: 'failed' });
      }
    } catch (error) {
      setMessage({ pesan: error.message || 'Terjadi kesalahan', tipe: 'failed' });
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const respons = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newUser)
      });

      const data = await respons.json();

      if (respons.ok) {
        setNewUser({
          name: '',
          email: '',
          password: '',
          role: ''
        });
        setMessage({ pesan: data.message, tipe: 'success' });
      } else {
        setMessage({ pesan: data.message, tipe: 'failed' });
      }
    } catch (error) {
      setMessage({ pesan: error.message || 'Terjadi kesalahan', tipe: 'failed' });
    }
  };

  const tableData = [
    { id: 1, name: 'Bob Robert', email: 'robert@example.com', ruangan: 'Ruang 1.1', jadwal: 'Kuliah', status: 'Disetujui', tanggal: '14/06/21' },
    { id: 2, name: 'Alice Liza', email: 'alice@example.com', ruangan: 'Ruang 2.1', jadwal: 'Kuliah', status: 'Pending', tanggal: '14/06/21' },
    { id: 3, name: 'Laurent Michael', email: 'laurent@example.com', ruangan: 'Lab Kom 1', jadwal: 'Praktek', status: 'Ditolak', tanggal: '14/06/21' },
    { id: 4, name: 'Fredianeu Hill', email: 'fredianeu@example.com', ruangan: 'Ruang 2.3', jadwal: 'Kuliah', status: 'Disetujui', tanggal: '14/06/21' },
    { id: 5, name: 'Daniel Thomas', email: 'daniel@example.com', ruangan: 'Ruang 1.2', jadwal: 'Praktek', status: 'Pending', tanggal: '14/06/21' },
    { id: 6, name: 'Mark Wilson', email: 'mark@example.com', ruangan: 'Ruang 3.4', jadwal: 'Praktek', status: 'Pending', tanggal: '14/06/21' }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
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

  const handleEdit = (rowId) => {
    navigate(`/approve/${rowId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
        <SidebarAdmin activeMenu="Dashboard" setActiveMenu={() => {}} />
      </div>

      <div className="ml-64">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-semibold text-gray-900">Admin / Data</h1>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700"><Bell className="w-5 h-5" /></button>
                <button className="text-gray-500 hover:text-gray-700"><Settings className="w-5 h-5" /></button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <User className="w-5 h-5" /><span>Sign in</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Status Ruangan</h2>
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
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{row.name}</div>
                              <div className="text-sm text-gray-500">{row.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.ruangan}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.jadwal}</td>
                        <td className="px-6 py-4"><span className={getStatusBadge(row.status)}>{row.status}</span></td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.tanggal}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleEdit(row.id)} className="flex items-center gap-2 px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                            <Edit size={16} />Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Form Ruangan */}
          <form onSubmit={handleCreateRoom} className="bg-teal-500 rounded-lg p-6 text-white space-y-6 mb-8">
            <h3 className="text-xl font-bold text-center">TAMBAH RUANGAN</h3>
            <input type="text" placeholder="Nama Ruangan" value={newRoom.nama_ruangan} onChange={(e) => setNewRoom({ ...newRoom, nama_ruangan: e.target.value })} className="w-full px-3 py-2 rounded bg-transparent border border-white placeholder-gray-200" />
            <input type="number" placeholder="Kapasitas" value={newRoom.kapasitas} onChange={(e) => setNewRoom({ ...newRoom, kapasitas: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded bg-transparent border border-white placeholder-gray-200" />
            <input type="text" placeholder="Fasilitas" value={newRoom.fasilitas} onChange={(e) => setNewRoom({ ...newRoom, fasilitas: e.target.value })} className="w-full px-3 py-2 rounded bg-transparent border border-white placeholder-gray-200" />
            <input type="text" placeholder="Lokasi Ruangan" value={newRoom.lokasi_ruangan} onChange={(e) => setNewRoom({ ...newRoom, lokasi_ruangan: e.target.value })} className="w-full px-3 py-2 rounded bg-transparent border border-white placeholder-gray-200" />
            <div className="flex justify-center">
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg">Submit</button>
            </div>
          </form>

          {/* Form User */}
          <form onSubmit={handleCreateUser} className="bg-gray-200 rounded-lg p-6 shadow space-y-6">
            <h3 className="text-xl font-bold text-center text-gray-900">Tambah Pengguna</h3>
            <input type="text" placeholder="Nama" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
            >
            <option value="">Pilih Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            </select>
            <div className="flex justify-center">
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg">Submit</button>
            </div>
          </form>
        </main>
      </div>

      {/* Notifikasi */}
      {message.pesan && (
        <div className={`border ${message.tipe === 'success' ? 'bg-green-200 border-green-300' : 'bg-red-200 border-red-300'} px-8 py-4 rounded-lg text-sm absolute right-4 bottom-8 shadow-lg text-blue-950`}>
          <p className="flex justify-center">{message.pesan}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
