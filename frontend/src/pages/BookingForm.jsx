import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const BookingForm = () => {
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
    fileSurat: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    handleReset();
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
      fileSurat: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
        <Sidebar activeMenu="Booking Ruang" setActiveMenu={() => {}} />
      </div>

      {/* Main Content with left margin */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg p-8">
            <h2 className="text-xl font-bold text-white text-center mb-6">
              FORM BOOKING RUANGAN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup
                label="Nama Peminjam"
                name="namaPeminjam"
                value={formData.namaPeminjam}
                onChange={handleInputChange}
              />
              <InputGroup
                label="NIM/NIP"
                name="nimNip"
                value={formData.nimNip}
                onChange={handleInputChange}
              />
              <SelectGroup
                label="Program Studi"
                name="programStudi"
                value={formData.programStudi}
                onChange={handleInputChange}
                options={[
                  "Informatika",
                  "Matematika",
                  "Farmasi",
                  "Biologi",
                  "Kimia",
                  "Fisika",
                ]}
              />
              <InputGroup
                label="Tanggal Peminjaman"
                name="tanggalPeminjaman"
                value={formData.tanggalPeminjaman}
                onChange={handleInputChange}
                type="date"
              />
              <InputGroup
                label="Waktu Mulai"
                name="waktuMulai"
                value={formData.waktuMulai}
                onChange={handleInputChange}
                type="time"
              />
              <InputGroup
                label="Waktu Selesai"
                name="waktuSelesai"
                value={formData.waktuSelesai}
                onChange={handleInputChange}
                type="time"
              />
              <SelectGroup
                label="Ruang Dipinjam"
                name="ruangDipinjam"
                value={formData.ruangDipinjam}
                onChange={handleInputChange}
                options={["Ruang 1.1", "Ruang 2.1", "Lab Kom 1", "Lab Kom 2"]}
              />
              <InputGroup
                label="Email Aktif"
                name="emailAktif"
                type="email"
                value={formData.emailAktif}
                onChange={handleInputChange}
              />
              <InputGroup
                label="No HP / WhatsApp"
                name="noHpWhatsapp"
                value={formData.noHpWhatsapp}
                onChange={handleInputChange}
              />
              <FileGroup
                label="Upload Surat Permohonan"
                name="fileSurat"
                onChange={handleInputChange}
              />
              <TextAreaGroup
                label="Keperluan Peminjaman"
                name="keteranganPeminjaman"
                value={formData.keteranganPeminjaman}
                onChange={handleInputChange}
              />
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
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-white text-sm mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
    />
  </div>
);

const SelectGroup = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-white text-sm mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
    >
      <option value="">-- Pilih --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FileGroup = ({ label, name, onChange }) => (
  <div className="col-span-3">
    <label className="block text-white text-sm mb-2">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
    />
  </div>
);

const TextAreaGroup = ({ label, name, value, onChange }) => (
  <div className="col-span-3">
    <label className="block text-white text-sm mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none transition"
    />
  </div>
);

export default BookingForm;