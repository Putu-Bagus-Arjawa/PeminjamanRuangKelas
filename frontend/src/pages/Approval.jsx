import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Save, X, Clock, Calendar, User, BookOpen } from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin.jsx';
import Header from '../components/Header.jsx';

const Approval = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Approval');
  
  // Form state
  const [formData, setFormData] = useState({
    room: '',
    user: '',
    date: '',
    timeStart: '',
    timeFinish: '',
    status: 'Pending',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  // Sample data - replace with actual API call
  const sampleBookingData = {
    1: { 
      room: "Ruang 1.1", 
      user: "John Doe", 
      date: "2023-06-15", 
      timeStart: "08:00", 
      timeFinish: "10:00", 
      status: "Pending", 
      description: "Kuliah Sistem Operasi" 
    },
    2: { 
      room: "Lab Kom 1", 
      user: "Jane Smith", 
      date: "2023-06-16", 
      timeStart: "13:00", 
      timeFinish: "15:00", 
      status: "Approved", 
      description: "Praktikum Jaringan Komputer" 
    }
  };

  useEffect(() => {
    // Load booking data based on ID
    const bookingData = sampleBookingData[id];
    if (bookingData) {
      setFormData(bookingData);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Updated booking data:', formData);
      navigate('/admin');
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <SidebarAdmin activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <Header 
          breadcrumbPath="Admin / Approvals / Detail"
          userName="Admin"
          showSearchBar={false}
        />

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Daashboard
          </button>
        </div>

        {/* Approval Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Detail Peminjaman Ruangan</h1>
            <p className="text-gray-600">ID Peminjaman: {id}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Room */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Ruangan
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Nama ruangan"
                required
                readOnly
              />
            </div>

            {/* User */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Pemesan
              </label>
              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Nama pemesan"
                required
                readOnly
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Tanggal
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                  readOnly
                />
              </div>

              {/* Time Start */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Waktu Mulai
                </label>
                <input
                  type="time"
                  name="timeStart"
                  value={formData.timeStart}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                  readOnly
                />
              </div>

              {/* Time Finish */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Waktu Selesai
                </label>
                <input
                  type="time"
                  name="timeFinish"
                  value={formData.timeFinish}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Kegiatan
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Deskripsi kegiatan"
                rows="3"
                readOnly
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleStatusChange('Approved')}
                  className={`px-4 py-2 rounded-lg ${formData.status === 'Approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Setujui
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('Rejected')}
                  className={`px-4 py-2 rounded-lg ${formData.status === 'Rejected' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Tolak
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('Pending')}
                  className={`px-4 py-2 rounded-lg ${formData.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Tunda
                </button>
              </div>
            </div>

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

export default Approval;