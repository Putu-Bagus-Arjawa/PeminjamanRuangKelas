import React from 'react'

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">SMART CLASS</h2>
        </div>
        
        <nav className="mt-8">
          <div className="px-6 py-2 bg-teal-500 text-white">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              Dashboard
            </span>
          </div>
          
          <div className="mt-4 space-y-2 px-6">
            <div className="text-gray-600 py-2">📊 List Ruangan</div>
            <div className="text-gray-600 py-2">🏢 Booking Ruang</div>
            <div className="text-gray-600 py-2">📖 Status Booking</div>
            <div className="text-gray-600 py-2">📋 Request Peminjaman</div>
            <div className="text-gray-600 py-2">📅 Kalender</div>
          </div>
          
          <div className="mt-8 px-6">
            <p className="text-sm text-gray-500 font-semibold mb-4">ACCOUNT PAGES</p>
            <div className="space-y-2">
              <div className="text-gray-600 py-2">👤 Profile</div>
              <div className="text-gray-600 py-2">🔐 Sign In</div>
            </div>
          </div>
        </nav>
      </div>
  )
}

export default Sidebar
