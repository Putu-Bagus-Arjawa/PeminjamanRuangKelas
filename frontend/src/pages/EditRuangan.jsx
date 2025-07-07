import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Save, X } from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin.jsx';
import Header from '../components/Header.jsx';

const EditRuangan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Manajemen Ruangan');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    location: '',
    facilities: []
  });
  
  const [availableFacilities] = useState([
    'Proyektor', 'AC', 'Whiteboard', 'Sound System', 'Komputer', 
    'Microphone', 'Podium', 'WiFi', 'CCTV', 'Papan Tulis'
  ]);
  
  const [loading, setLoading] = useState(false);

  // Sample data - replace with actual API call
  const sampleRoomData = {
    1: { name: "Ruang 1.1", capacity: "40", location: "Gedung A Lantai 1", facilities: ["Proyektor", "AC", "Whiteboard"] },
    2: { name: "Ruang 2.1", capacity: "35", location: "Gedung A Lantai 2", facilities: ["Proyektor", "AC", "Sound System"] },
    3: { name: "Lab Kom 1", capacity: "30", location: "Gedung B Lantai 1", facilities: ["Komputer", "Proyektor", "AC"] },
    4: { name: "Ruang 2.3", capacity: "50", location: "Gedung A Lantai 2", facilities: ["Proyektor", "AC", "Microphone"] },
    5: { name: "Ruang 1.2", capacity: "45", location: "Gedung A Lantai 1", facilities: ["Proyektor", "AC", "Whiteboard", "Sound System"] },
    6: { name: "Ruang 3.4", capacity: "60", location: "Gedung A Lantai 3", facilities: ["Proyektor", "AC", "Podium", "Sound System"] }
  };

  useEffect(() => {
    // Load room data based on ID
    const roomData = sampleRoomData[id];
    if (roomData) {
      setFormData(roomData);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFacilityToggle = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Updated room data:', formData);
      navigate('/manajemenruangan');
    } catch (error) {
      console.error('Error updating room:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/manajemenruangan');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <SidebarAdmin activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <Header 
          breadcrumbPath="Admin / Ruangan / Edit"
          userName="A"
          showSearchBar={false}
        />

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Manajemen Ruangan
          </button>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Ruangan</h1>
            <p className="text-gray-600">Edit informasi ruangan ID: {id}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Ruangan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Ruangan
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Masukkan nama ruangan"
                required
              />
            </div>

            {/* Kapasitas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kapasitas
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Masukkan kapasitas ruangan"
                required
              />
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Masukkan lokasi ruangan"
                required
              />
            </div>

            {/* Fasilitas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Fasilitas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableFacilities.map((facility) => (
                  <div key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      id={facility}
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleFacilityToggle(facility)}
                      className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                    />
                    <label
                      htmlFor={facility}
                      className="ml-2 text-sm text-gray-900 cursor-pointer"
                    >
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Facilities Preview */}
            {formData.facilities.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fasilitas Terpilih
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1"
                    >
                      {facility}
                      <button
                        type="button"
                        onClick={() => handleFacilityToggle(facility)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
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