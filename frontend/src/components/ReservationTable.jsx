import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const getStatusColor = (status) => {
  switch (status) {
    case "Disetujui":
      return "bg-green-500";
    case "Ditolak":
      return "bg-red-500";
    case "Pending":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const ReservationTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRiwayat = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/riwayat?page=1&limit=5`, {
        credentials: 'include',
      });
      const result = await res.json();
      if (result.sukses) {
        setData(result.data);
      }
    } catch (err) {
      console.error("Gagal fetch riwayat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayat();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Status Peminjaman</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="px-6 py-3 text-left">PENGAJU</th>
              <th className="px-6 py-3 text-left">RUANGAN</th>
              <th className="px-6 py-3 text-left">AGENDA</th>
              <th className="px-6 py-3 text-left">STATUS</th>
              <th className="px-6 py-3 text-left">TANGGAL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {r.user[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{r.user}</p>
                      <p className="text-sm text-gray-500">{r.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-800">{r.room}</td>
                <td className="px-6 py-4 text-gray-800">{r.agenda}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(r.status)}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-800">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationTable;
