import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useUserContext } from '../Context/UserContext'
import Loading from '../components/Loading'

const Riwayat = () => {
  const [activeMenu, setActiveMenu] = useState('Riwayat Booking')
  const {user, loading:loadUser} = useUserContext()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchRiwayat = async (pageNow = 1) => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/riwayat?page=${pageNow}&limit=4`, {
        credentials: 'include'
      })
      const result = await res.json()
      if (result.sukses) {
        setData(result.data)
        setPage(result.page)
        setTotalPages(result.totalPages)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRiwayat(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disetujui':
        return 'bg-green-500 text-white'
      case 'Ditolak':
        return 'bg-red-500 text-white'
      case 'Pending':
        return 'bg-yellow-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  if(loadUser) return <Loading/>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 p-8">
        <Header
          breadcrumbPath="Pages / Riwayat"
          userName={user.name}
          showSearchBar={false}
        />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">USER</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">RUANGAN</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">AGENDA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">STATUS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">TANGGAL</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center p-4">Loading...</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan={5} className="text-center p-4">Tidak ada data</td></tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                            {getInitials(item.user)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{item.user}</div>
                            <div className="text-sm text-gray-500">{item.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-900">{item.room}</td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{item.agenda.split(' ')[0]}</div>
                          <div className="text-sm text-gray-500">{item.agenda.split(' ').slice(1).join(' ')}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{item.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
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
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Riwayat
