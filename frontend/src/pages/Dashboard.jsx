import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReservationTable from "../components/ReservationTable";
import { useUserContext } from "../Context/UserContext";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Dashboard = () => {
  const { user, loading } = useUserContext();
  const [ruangan, setRuangan] = useState([]);
  const [riwayat, setRiwayat] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ruanganRes, riwayatRes] = await Promise.all([
          fetch("http://localhost:5000/room/roomdisplay", {
            credentials: 'include'
          }),
          fetch("http://localhost:5000/riwayat?page=1&limit=5", {
            credentials: 'include'
          })
        ]);

        if (!ruanganRes.ok || !riwayatRes.ok) throw new Error("Gagal fetch");

        const ruanganData = await ruanganRes.json();
        const riwayatData = await riwayatRes.json();

        setRuangan(ruanganData);
        if (riwayatData.sukses) {
          setRiwayat(riwayatData.data);
        }
      } catch (err) {
        console.error("Gagal ambil data dashboard:", err);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, []);

  if (loading || load) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
        <Sidebar activeMenu="Dashboard" setActiveMenu={() => {}} />
      </div>

      <div className="ml-64 flex-1 p-8">
        <Header
          breadcrumbPath="Pages / Dashboard"
          userName={user.name}
          showSearchBar={false}
          searchPlaceholder="Cari..."
          onSearchChange={(e) => console.log(e.target.value)}
        />

        <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg p-8 text-white mb-8">
          <h1 className="text-3xl font-bold">Selamat Datang {user.name}</h1>
          <p className="mt-2">Ayo mulai reservasi ruangan dengan mudah dan nyaman</p>
        </div>

        {/* Ruangan Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Peminjaman Ruangan</h2>
          <div className="grid grid-cols-4 gap-6">
            {ruangan.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop"
                  alt="Ruangan"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{room.nama_ruangan}</h3>
                  <p className="text-sm text-gray-500">{room.fasilitas}</p>
                  <p className="text-xs text-gray-400">Kapasitas: {room.kapasitas}</p>
                  <p className="text-xs text-gray-400">Lokasi: {room.lokasi_ruangan}</p>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center h-60">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Link to={"/listruangan"} className="text-2xl text-gray-400">+</Link>
                </div>
                <p className="text-sm text-gray-500">Cari Ruangan Lain</p>
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Table */}
        <ReservationTable data={riwayat} />
      </div>
    </div>
  );
};

export default Dashboard;
