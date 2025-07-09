import { useParams, useNavigate, Link } from "react-router"
import { useEffect, useState } from "react"
import SidebarAdmin from "../components/SidebarAdmin"

const EditUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: "", email: "", role: "USER" })
  const [loading, setLoading] = useState(true)

console.log("ID dari useParams():", id)

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        credentials: "include",
      })
      const data = await res.json()
      setUser(data)
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  fetchUser() 
}, [id])


  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:5000/user/edit/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user)
      })

      if (!res.ok) throw new Error("Gagal update user.")
      alert("User berhasil diperbarui!")
      navigate("/manajemenpengguna")
    } catch (err) {
      console.error("Update error:", err)
      alert("Gagal memperbarui user.")
    }
  }

  if (loading) return <p className="p-8 text-center">Loading...</p>

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
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
              >
                Simpan Perubahan
              </button>
              <Link
                to={"/manajemenpengguna"}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default EditUser
