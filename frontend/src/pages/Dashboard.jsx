import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    namaPeminjam: "",
    nimNip: "",
    programStudi: "",
    tanggalPeminjaman: "",
    waktuMulai: "",
    waktuSelesai: "",
    ruangDipinjam: "",
    emailAktif: "",
    noHpWhatsapp: "",
    keteranganPeminjaman: "",
  });

  const [reservations] = useState([
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
    {
      id: 3,
      nama: "Bagus Arjuna S.kom, M.Kom",
      email: "bagusarjuna@gmail.com",
      ruangan: "Lab Kom 1",
      matkul: "Praktek",
      status: "Ditolak",
      tanggal: "14/06/21",
    },
    {
      id: 4,
      nama: "Bagus Arjuna S.kom, M.Kom",
      email: "bagusarjuna@gmail.com",
      ruangan: "Ruang 2.3",
      matkul: "Kuliah",
      status: "Disetujui",
      tanggal: "14/06/21",
    },
    {
      id: 5,
      nama: "Bagus Arjuna S.kom, M.Kom",
      email: "bagusarjuna@gmail.com",
      ruangan: "Ruang 1.2",
      matkul: "Kuliah",
      status: "Menunggu",
      tanggal: "14/06/21",
    },
    {
      id: 6,
      nama: "Bagus Arjuna S.kom, M.Kom",
      email: "bagusarjuna@gmail.com",
      ruangan: "Ruang 3.4",
      matkul: "Praktek",
      status: "Menunggu",
      tanggal: "14/06/21",
    },
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      namaPeminjam: "",
      nimNip: "",
      programStudi: "",
      tanggalPeminjaman: "",
      waktuMulai: "",
      waktuSelesai: "",
      ruangDipinjam: "",
      emailAktif: "",
      noHpWhatsapp: "",
      keteranganPeminjaman: "",
    });
  };

  const handleReset = () => {
    setFormData({
      namaPeminjam: "",
      nimNip: "",
      programStudi: "",
      tanggalPeminjaman: "",
      waktuMulai: "",
      waktuSelesai: "",
      ruangDipinjam: "",
      emailAktif: "",
      noHpWhatsapp: "",
      keteranganPeminjaman: "",
    });
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
          <Sidebar activeMenu="Dashboard" setActiveMenu={() => {}} />
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-500">Pages / Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Type here"
                className="px-4 py-2 border rounded-lg"
              />
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                B
              </div>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg p-8 text-white mb-8">
            <h1 className="text-3xl font-bold">Selamat Datang Bagus</h1>
            <p className="mt-2">
              Ayo mulai reservasi ruangan dengan mudah dan nyaman
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Ruangan Tersedia</h3>
              <p className="text-3xl font-bold text-gray-800">12</p>
              <p className="text-xs text-gray-400 mt-1">
                Ruangan tersedia saat ini
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Reservasi Anda</h3>
              <p className="text-3xl font-bold text-gray-800">11</p>
              <p className="text-xs text-gray-400 mt-1">Total reservasi anda</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Reservasi Disetujui</h3>
              <p className="text-3xl font-bold text-gray-800">8</p>
              <p className="text-xs text-gray-400 mt-1">
                Total reservasi disetujui
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Reservasi Ditolak</h3>
              <p className="text-3xl font-bold text-gray-800">0</p>
              <p className="text-xs text-gray-400 mt-1">
                Total reservasi ditolak
              </p>
            </div>
          </div>

          {/* Room Gallery */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Peminjaman Ruangan
            </h2>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold">Ruang 1.1</h3>
                  <p className="text-sm text-gray-500">
                    Ruang kelas Bawah Fasilitas
                  </p>
                  <p className="text-xs text-gray-400">Kapasitas: 40</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold">Lab Kom 2</h3>
                  <p className="text-sm text-gray-500">
                    Ruang Kelas Bawah Fasilitas
                  </p>
                  <p className="text-xs text-gray-400">Kapasitas: 35</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold">Ruang 2.5</h3>
                  <p className="text-sm text-gray-500">
                    Ruang Kelas Lantai 2 Fasilitas
                  </p>
                  <p className="text-xs text-gray-400">Kapasitas: 40</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center h-60">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl text-gray-400">+</span>
                  </div>
                  <p className="text-sm text-gray-500">Cari Ruangan Lain</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-white text-center mb-6">
              FORM BOOKING RUANGAN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div>
                <label className="block text-white text-sm mb-2">
                  Nama Peminjam
                </label>
                <input
                  type="text"
                  name="namaPeminjam"
                  value={formData.namaPeminjam}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                  placeholder="Input nama peminjam"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">NIM/NIP</label>
                <input
                  type="text"
                  name="nimNip"
                  value={formData.nimNip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                  placeholder="Input nim/nip"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Program Studi
                </label>
                <select
                  name="programStudi"
                  value={formData.programStudi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 shadow-sm rounded focus:outline-none focus:ring-2 bg-white focus:ring-teal-300 transition"
                >
                  <option value="">Pilih program studi</option>
                  <option value="Teknik Informatika">Informatika</option>
                  <option value="Sistem Informasi">Pharmasi</option>
                  <option value="Teknik Komputer">Matematika</option>
                  <option value="Teknik Elektro">Biologi</option>
                  <option value="Teknik Sipil">Kimia</option>
                  <option value="Manajemen">Fisika</option>
                </select>
              </div>

              {/* Row 2 */}
              <div>
                <label className="block text-white text-sm mb-2">
                  Tanggal Peminjaman
                </label>
                <input
                  type="date"
                  name="tanggalPeminjaman"
                  value={formData.tanggalPeminjaman}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-teal-300 transition"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Waktu Mulai
                </label>
                <input
                  type="time"
                  name="waktuMulai"
                  value={formData.waktuMulai}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                  placeholder="00:00 WITA"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Waktu Selesai
                </label>
                <input
                  type="time"
                  name="waktuSelesai"
                  value={formData.waktuSelesai}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                  placeholder="00:00 WITA"
                />
              </div>

              {/* Row 3 */}
              <div>
                <label className="block text-white text-sm mb-2">
                  Ruang dipinjam
                </label>
                <select
                  name="ruangDipinjam"
                  value={formData.ruangDipinjam}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-teal-300 transition bg-white"
                >
                  <option value="">Pilih kelas</option>
                  <option value="Ruang 1.1">Ruang 1.1</option>
                  <option value="Ruang 2.1">Ruang 2.1</option>
                  <option value="Lab Kom 1">Lab Kom 1</option>
                  <option value="Lab Kom 2">Lab Kom 2</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Email aktif
                </label>
                <input
                  type="email"
                  name="emailAktif"
                  value={formData.emailAktif}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                  placeholder="Input email aktif peminjam"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  No HP / WhatsApp
                </label>
                <input
                  type="text"
                  name="noHpWhatsapp"
                  value={formData.noHpWhatsapp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                  placeholder="Input no HP / WhatsApp aktif"
                />
              </div>

              {/* Upload Section */}
              <div className="col-span-3">
                <label className="block text-white text-sm mb-2">
                  Upload Surat Permohonan
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                />
              </div>

              {/* Keterangan */}
              <div className="col-span-3">
                <label className="block text-white text-sm mb-2">
                  Keperluan Peminjaman
                </label>
                <textarea
                  name="keteranganPeminjaman"
                  value={formData.keteranganPeminjaman}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition resize-none"
                  placeholder="Tuliskan keterangan peminjaman"
                />
              </div>

              {/* Buttons */}
              <div className="col-span-3 flex justify-start space-x-4 mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
                >
                  Pinjam Kelas
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-semibold"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Status Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                Status Ruangan
              </h2>
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
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            B
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {reservation.nama}
                            </p>
                            <p className="text-sm text-gray-500">
                              {reservation.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {reservation.ruangan}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-800">{reservation.matkul}</p>
                          <p className="text-sm text-gray-500">PM3</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {reservation.tanggal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
