import React, { useState } from 'react';
import { Camera, Edit3, Save, X } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Bagus Arjawa S.kom, M.Kom",
    email: "bagusarjawa@gmail.com",
    phone: "+62 812-3456-7890",
    position: "Dosen Informatika",
    department: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    studyProgram: "Informatika",
    joinDate: "15 Januari 2020",
    address: "Jl. Pendidikan No. 123, Jakarta",
    birthDate: "1 Januari 1990"
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>Pages</span>
          <span className="mx-2">/</span>
          <span>Profile</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                  {getInitials(profileData.name)}
                </div>
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{profileData.name}</h2>
              <p className="text-gray-600 mb-2">{profileData.position}</p>
              <p className="text-sm text-gray-500">{profileData.department}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-800">{profileData.email}</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-600">Telepon</p>
                  <p className="text-gray-800">{profileData.phone}</p>
                </div>
                <div className="pb-3">
                  <p className="text-sm font-medium text-gray-600">Bergabung</p>
                  <p className="text-gray-800">{profileData.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Informasi Personal</h3>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Simpan
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Batal
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="pb-4 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-600 mb-2">Nama Lengkap</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{profileData.name}</p>
                )}
              </div>

              <div className="pb-4 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{profileData.email}</p>
                )}
              </div>

              <div className="pb-4 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-600 mb-2">Telepon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{profileData.phone}</p>
                )}
              </div>

              <div className="pb-4 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-600 mb-2">Posisi</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{profileData.position}</p>
                )}
              </div>

              <div className="pb-4 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-600 mb-2">Departemen</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{profileData.department}</p>
                )}
              </div>

              <div className="pb-4 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-600 mb-2">Program Studi</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.studyProgram}
                    onChange={(e) => handleInputChange('studyProgram', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{profileData.studyProgram}</p>
                )}
              </div>

              <div className="md:col-span-2 pb-4 border-b border-gray-200">
                <label className="block text-sm font-medium text-gray-600 mb-2">Alamat</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{profileData.address}</p>
                )}
              </div>

              <div className="md:col-span-2 pb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Tanggal Lahir</label>
                {isEditing ? (
                  <textarea
                    value={editData.bithDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{profileData.birthDate}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;