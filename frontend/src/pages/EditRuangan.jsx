import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin.jsx';
import Header from '../components/Header.jsx';
import { useUserContext } from "../Context/UserContext";
import Loading from '../components/Loading.jsx';


const EditRuangan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Manajemen Ruangan');
  const {user, loading: loadUser} = useUserContext() 

  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    location: '',
    facilities: ''
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/room/display/${id}`, {
          credentials: 'include',
        });
        const json = await res.json();
        if (json.sukses) {
          const { nama_ruangan, kapasitas, lokasi_ruangan, fasilitas } = json.data;
          setFormData({
            name: nama_ruangan,
            capacity: kapasitas.toString(),
            location: lokasi_ruangan,
            facilities: fasilitas || ''
          });
        } else {
          alert('Ruangan tidak ditemukan');
          navigate('/manajemenruangan');
        }
      } catch (err) {
        console.error(err);
        alert('Gagal memuat data ruangan');
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/room/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          capacity: parseInt(formData.capacity),
          location: formData.location,
          facilities: formData.facilities
        })
      });

      const result = await res.json();
      if (result.sukses) {
        navigate('/manajemenruangan');
      } else {
        alert('Gagal menyimpan perubahan');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/manajemenruangan');
  };
  if(loadUser) return <Loading/>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <Header 
          breadcrumbPath="Admin / Ruangan / Edit"
          userName={user.name}
          showSearchBar={false}
        />

        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Manajemen Ruangan
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Ruangan</h1>
            <p className="text-gray-600">Edit informasi ruangan ID: {id}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Ruangan</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Masukkan nama ruangan"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Masukkan kapasitas ruangan"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Masukkan lokasi ruangan"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fasilitas (pisahkan dengan koma)</label>
              <input
                type="text"
                name="facilities"
                value={formData.facilities}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Contoh: Proyektor, AC, Whiteboard"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRuangan;
