import React from "react";

const reservations = [
  {
    id: 1,
    nama: "Bagus Arjuna S.kom, M.Kom",
    email: "bagusarjuna@gmail.com",
    ruangan: "Ruang 1.1",
    matkul: "Kuliah",
    status: "Disetujui",
    tanggal: "14/06/21",
  },
  {
    id: 2,
    nama: "Bagus Arjuna S.kom, M.Kom",
    email: "bagusarjuna@gmail.com",
    ruangan: "Ruang 2.1",
    matkul: "Kuliah",
    status: "Menunggu",
    tanggal: "14/06/21",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Disetujui":
      return "bg-green-500";
    case "Ditolak":
      return "bg-red-500";
    case "Menunggu":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const ReservationTable = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Status Ruangan</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="px-6 py-3 text-left">AUTHOR</th>
              <th className="px-6 py-3 text-left">RUANGAN</th>
              <th className="px-6 py-3 text-left">MATKUL</th>
              <th className="px-6 py-3 text-left">STATUS</th>
              <th className="px-6 py-3 text-left">TANGGAL</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">B</div>
                    <div>
                      <p className="font-semibold text-gray-800">{r.nama}</p>
                      <p className="text-sm text-gray-500">{r.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-800">{r.ruangan}</td>
                <td className="px-6 py-4">
                  <p className="text-gray-800">{r.matkul}</p>
                  <p className="text-sm text-gray-500">PM3</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(r.status)}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-800">{r.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationTable;
