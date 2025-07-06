import React from "react";

const BookingRuangan = ({ formData, handleInputChange, handleSubmit, handleReset }) => {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg p-8 mb-8">
      <h2 className="text-xl font-bold text-white text-center mb-6">
        FORM BOOKING RUANGAN
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom 1 */}
        <div>
          <label className="block text-white text-sm mb-2">Nama Peminjam</label>
          <input
            type="text"
            name="namaPeminjam"
            value={formData.namaPeminjam}
            onChange={handleInputChange}
            placeholder="Input nama peminjam"
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">NIM/NIP</label>
          <input
            type="text"
            name="nimNip"
            value={formData.nimNip}
            onChange={handleInputChange}
            placeholder="Input nim/NIP"
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Program Studi</label>
          <select
            name="programStudi"
            value={formData.programStudi}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          >
            <option value="">Pilih program studi</option>
            <option value="Informatika">Informatika</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
          </select>
        </div>

        {/* Kolom 2 */}
        <div>
          <label className="block text-white text-sm mb-2">Tanggal Peminjaman</label>
          <input
            type="date"
            name="tanggalPeminjaman"
            value={formData.tanggalPeminjaman}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Waktu Mulai</label>
          <input
            type="time"
            name="waktuMulai"
            value={formData.waktuMulai}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Waktu Selesai</label>
          <input
            type="time"
            name="waktuSelesai"
            value={formData.waktuSelesai}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          />
        </div>

        {/* Kolom 3 */}
        <div>
          <label className="block text-white text-sm mb-2">Ruang dipinjam</label>
          <select
            name="ruangDipinjam"
            value={formData.ruangDipinjam}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          >
            <option value="">Pilih kelas</option>
            <option value="Ruang 101">Ruang BG 1.1</option>
            <option value="Ruang 102">Ruang BG 1.2</option>
            
          </select>
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Email aktif</label>
          <input
            type="email"
            name="emailAktif"
            value={formData.emailAktif}
            onChange={handleInputChange}
            placeholder="Input email aktif"
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">No HP / WhatsApp</label>
          <input
            type="text"
            name="noHpWhatsapp"
            value={formData.noHpWhatsapp}
            onChange={handleInputChange}
            placeholder="Input No HP / WhatsApp aktif"
            className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none"
          />
        </div>
      </div>

      {/* 👉 Upload Surat */}
      <div className="mt-6">
        <label className="block text-white text-sm mb-2">Upload Surat Permohonan</label>
        <input
          type="file"
          name="suratPermohonan"
          className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-white file:text-teal-600
          hover:file:bg-teal-100"
        />
      </div>

      {/* 👉 Keterangan Peminjaman */}
      <div className="mt-6">
        <label className="block text-white text-sm mb-2">Keperluan Peminjaman</label>
        <textarea
          name="keteranganPeminjaman"
          value={formData.keteranganPeminjaman}
          onChange={handleInputChange}
          placeholder="Tuliskan keterangan peminjaman"
          className="w-full px-4 py-2 rounded bg-white shadow-sm resize-none h-32 focus:outline-none"
        />
      </div>

      {/* Tombol */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
        >
          Pinjam Kelas
        </button>
        <button
          onClick={handleReset}
          className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-2 rounded font-semibold"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default BookingRuangan;
