import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRoomContext } from "../Context/RoomContext";

const BookingForm = () => {
  const { room: roomList, loading: roomLoading } = useRoomContext();

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

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("tanggal", formData.tanggalPeminjaman);
      data.append("jamMulai", formData.waktuMulai);
      data.append("jamSelesai", formData.waktuSelesai);
      data.append("idRuangan", formData.ruangDipinjam);
      data.append("agenda", "Agenda Acara");
      data.append("deskripsi", formData.keteranganPeminjaman);
      if (formData.fileSurat) {
        data.append("surat_permohonan", formData.fileSurat);
      }

      const res = await fetch("http://localhost:5000/booking", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await res.json();
      if (result.sukses) {
        setMessage("Booking berhasil!");
        setMessageType("success");
        handleReset();
      } else {
        setMessage("Booking gagal: " + result.pesan);
        setMessageType("error");
      }

      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan saat submit");
      setMessageType("error");
      setTimeout(() => setMessage(null), 3000);
    }
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
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
        <Sidebar activeMenu="Booking Ruang" setActiveMenu={() => {}} />
      </div>

      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg p-8">
            <h2 className="text-xl font-bold text-white text-center mb-6">
              FORM BOOKING RUANGAN
            </h2>

            {message && (
              <div
                className={`col-span-3 mb-4 px-4 py-2 rounded text-white font-semibold ${
                  messageType === "success" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="Tanggal Peminjaman" name="tanggalPeminjaman" value={formData.tanggalPeminjaman} onChange={handleInputChange} type="date" />
              <InputGroup label="Waktu Mulai" name="waktuMulai" value={formData.waktuMulai} onChange={handleInputChange} type="time" />
              <InputGroup label="Waktu Selesai" name="waktuSelesai" value={formData.waktuSelesai} onChange={handleInputChange} type="time" />

              {roomLoading ? (
                <div className="text-white">Loading ruangan...</div>
              ) : (
                <SelectGroup
                  label="Ruang Dipinjam"
                  name="ruangDipinjam"
                  value={formData.ruangDipinjam}
                  onChange={handleInputChange}
                  options={roomList.map((r) => ({ label: r.nama_ruangan, value: r.id }))}
                />
              )}

              <FileGroup label="Upload Surat Permohonan" name="fileSurat" onChange={handleInputChange} />
              <TextAreaGroup label="Keperluan Peminjaman" name="keteranganPeminjaman" value={formData.keteranganPeminjaman} onChange={handleInputChange} />

              <div className="col-span-3 flex justify-start space-x-4 mt-4">
                <button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold">
                  Pinjam Kelas
                </button>
                <button onClick={handleReset} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-semibold">
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
    <input type={type} name={name} value={value} onChange={onChange} className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition" />
  </div>
);

const SelectGroup = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-white text-sm mb-2">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition">
      <option value="">-- Pilih --</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const FileGroup = ({ label, name, onChange }) => (
  <div className="col-span-3">
    <label className="block text-white text-sm mb-2">{label}</label>
    <input type="file" name={name} onChange={onChange} className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition" />
  </div>
);

const TextAreaGroup = ({ label, name, value, onChange }) => (
  <div className="col-span-3">
    <label className="block text-white text-sm mb-2">{label}</label>
    <textarea name={name} value={value} onChange={onChange} rows="4" className="w-full px-4 py-2 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none transition" />
  </div>
);

export default BookingForm;
