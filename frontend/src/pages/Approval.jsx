import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Save, Clock, Calendar, User, BookOpen } from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin.jsx';
import Header from '../components/Header.jsx';
import { useUserContext } from "../Context/UserContext";
import Loading from '../components/Loading.jsx';

const Approval = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {user, loading:loadUser} = useUserContext()
  const [activeMenu, setActiveMenu] = useState('Approval');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    room: '',
    user: '',
    email: '',
    date: '',
    timeStart: '',
    timeFinish: '',
    status: '',
    description: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/approve/${id}`, {
          credentials: 'include'
        });
        const result = await res.json();
        if (result.sukses) {
          setFormData(result.data);
        } else {
          console.error(result.pesan);
        }
      } catch (err) {
        console.error('Gagal ambil data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStatusChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/approve/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: formData.status })
      });
      const result = await res.json();
      if (result.sukses) {
        navigate('/admin');
      } else {
        alert(result.pesan);
      }
    } catch (error) {
      console.error('Error saat update:', error);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Memuat data...</p>
      </div>
    );
  }

  if(loadUser) return <Loading/>
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <Header
          breadcrumbPath="Admin / Approvals / Detail"
          userName={user.name}
          showSearchBar={false}
        />

        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Detail Peminjaman Ruangan</h1>
            <p className="text-gray-600">ID Peminjaman: {id}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Ruangan
              </label>
              <input
                type="text"
                value={formData.room}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Pemesan
              </label>
              <input
                type="text"
                value={formData.user}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Tanggal
                </label>
                <input
                  type="text"
                  value={formData.date}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Waktu Mulai
                </label>
                <input
                  type="text"
                  value={formData.timeStart}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Waktu Selesai
                </label>
                <input
                  type="text"
                  value={formData.timeFinish}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Kegiatan
              </label>
              <textarea
                value={formData.description}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleStatusChange('DISETUJUI')}
                  className={`px-4 py-2 rounded-lg ${
                    formData.status === 'DISETUJUI' ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Setujui
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('DITOLAK')}
                  className={`px-4 py-2 rounded-lg ${
                    formData.status === 'DITOLAK' ? 'bg-red-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Tolak
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('PENDING')}
                  className={`px-4 py-2 rounded-lg ${
                    formData.status === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Tunda
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                <Save size={16} />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Approval;
