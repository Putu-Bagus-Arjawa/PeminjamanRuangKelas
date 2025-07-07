import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SidebarAdmin from "../components/SidebarAdmin.jsx"

const ManajemenPengguna = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Data dummy untuk demo (bisa diganti dengan fetch API)
    const dummyUsers = [
      { id: 1, name: "Ahmad Rizki", email: "ahmad.rizki@email.com", role: "admin" },
      { id: 2, name: "Siti Nurhaliza", email: "siti.nurhaliza@email.com", role: "user" },
      { id: 3, name: "Budi Santoso", email: "budi.santoso@email.com", role: "user" },
      { id: 4, name: "Maya Sari", email: "maya.sari@email.com", role: "moderator" },
      { id: 5, name: "Dedi Kurniawan", email: "dedi.kurniawan@email.com", role: "user" },
    ]

    setUsers(dummyUsers)

    // Ganti dengan backend fetch jika backend sudah tersedia:
    // fetch("http://localhost:5000/api/users")
    //   .then(res => res.json())
    //   .then(data => setUsers(data))
    //   .catch(err => console.error("Gagal fetch data user:", err))
  }, [])

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      moderator: "bg-yellow-100 text-yellow-800",
      user: "bg-green-100 text-green-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Pengguna</h1>

          <div className="overflow-x-auto bg-white shadow-sm border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/edituser/${user.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600"
                        >
                          ✏️ Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      Tidak ada data pengguna
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ManajemenPengguna
