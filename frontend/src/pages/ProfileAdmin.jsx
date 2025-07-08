import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin.jsx';

const ProfileAdminPage = () => {
  const profileData = {
    name: "Bagus Arjawa S.kom, M.Kom",
    email: "bagusarjawa@gmail.com",
    id: "123456",
    role: "Admin",
    password: "********"
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
        <SidebarAdmin activeMenu="Profile" setActiveMenu={() => {}} />
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Pages</span>
            <span className="mx-2">/</span>
            <span>Profile</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>

        {/* Centered Profile Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                  {getInitials(profileData.name)}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{profileData.name}</h2>
              <p className="text-gray-600 mb-2">{profileData.role}</p>
            </div>

            <div className="mt-6 pt-6 border-t space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-800">{profileData.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">ID</p>
                <p className="text-gray-800">{profileData.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Password</p>
                <p className="text-gray-800">{profileData.password}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdminPage;