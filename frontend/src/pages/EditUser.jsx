import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SidebarAdmin from "../components/SidebarAdmin"

const EditUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "user"
  })

  useEffect(() => {
    // Simulasi fetch data user berdasarkan ID (dummy)
    const dummyUsers = [
      { id: 1, name: "Ahmad Rizki", email: "ahmad.rizki@email.com", role: "admin" },
      { id: 2, name: "Siti Nurhaliza", email: "siti.nurhaliza@email.com", role: "user" },
      { id: 3, name: "Budi Santoso", email: "budi.santoso@email.com", role: "user" },
      { id: 4, name: "Maya Sari", email: "maya.sari@email.com", role: "moderator" },
      { id: 5, name: "Dedi Kurniawan", email: "dedi.kurniawan@email.com", role: "user" }
    ]

    const selectedUser = dummyUsers.find(u => u.id === parseInt(id))
    if (selectedUser) setUser(selectedUser)
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulasi update user
    console.log("Data user setelah diedit:", user)
    alert("Data pengguna berhasil diperbarui!")

    // Redirect ke halaman manajemen pengguna
    navigate("/manajemenpengguna")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="flex-1 p-6">
        <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Edit Pengguna</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="admin">User</option>
                <option value="user">Admin</option>
              </select>
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
              >
                Simpan Perubahan
              </button>
              <button
                type="button"
                onClick={() => navigate("/manajemenpengguna")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default EditUser
