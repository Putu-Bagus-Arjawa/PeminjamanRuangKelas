import { useEffect, useState } from 'react';
import { User, Edit } from 'lucide-react';
import { useNavigate } from 'react-router';
import SidebarAdmin from '../components/SidebarAdmin.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [newRoom, setNewRoom] = useState({
    nama_ruangan: '',
    kapasitas: 0,
    fasilitas: '',
    lokasi_ruangan: ''
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const [message, setMessage] = useState({ pesan: '', tipe: '' });

  const fetchRiwayat = async (pageNow = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/riwayat/admin?page=${pageNow}&limit=5`, {
        credentials: 'include'
      });
      const result = await res.json();
      if (result.sukses) {
        setData(result.data);
        setPage(result.page);
        setTotalPages(result.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayat(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'Disetujui':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Ditolak':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleEdit = (rowId) => {
    navigate(`/approve/${rowId}`);
  };

  useEffect(() => {
  console.log("Data dari backend:", data); 
}, [data]);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/room/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newRoom)
      });
      const data = await res.json();
      if (res.ok) {
        setNewRoom({ nama_ruangan: '', kapasitas: 0, fasilitas: '', lokasi_ruangan: '' });
        setMessage({ pesan: data.message, tipe: 'success' });
      } else {
        setMessage({ pesan: data.message, tipe: 'failed' });
      }
    } catch (err) {
      setMessage({ pesan: err.message || 'Terjadi kesalahan', tipe: 'failed' });
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (res.ok) {
        setNewUser({ name: '', email: '', password: '', role: '' });
        setMessage({ pesan: data.message, tipe: 'success' });
      } else {
        setMessage({ pesan: data.message, tipe: 'failed' });
      }
    } catch (err) {
      setMessage({ pesan: err.message || 'Terjadi kesalahan', tipe: 'failed' });
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ruangan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jadwal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr><td colSpan={6} className="text-center p-4">Loading...</td></tr>
                    ) : data.length === 0 ? (
                      <tr><td colSpan={6} className="text-center p-4">Tidak ada data</td></tr>
                    ) : data.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                              {getInitials(row.user)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{row.user}</div>
                              <div className="text-sm text-gray-500">{row.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.room}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="font-medium">{row.agenda.split(' ')[0]}</div>
                          <div className="text-sm text-gray-500">{row.agenda.split(' ').slice(1).join(' ')}</div>
                        </td>
                        <td className="px-6 py-4"><span className={getStatusBadge(row.status)}>{row.status}</span></td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.date}</td>
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

              {/* Pagination */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                  ← Sebelumnya
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-2 py-1 text-sm rounded ${
                        page === i + 1
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                  Selanjutnya →
                </button>
              </div>
            </div>
          </div>

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

          <form onSubmit={handleCreateUser} className="bg-gray-200 rounded-lg p-6 shadow space-y-6">
            <h3 className="text-xl font-bold text-center text-gray-900">Tambah Pengguna</h3>
            <input type="text" placeholder="Nama" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700">
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

      {message.pesan && (
        <div className={`border ${message.tipe === 'success' ? 'bg-green-200 border-green-300' : 'bg-red-200 border-red-300'} px-8 py-4 rounded-lg text-sm absolute right-4 bottom-8 shadow-lg text-blue-950`}>
          <p className="flex justify-center">{message.pesan}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
