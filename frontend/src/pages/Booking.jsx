import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import BookingRuangan from "../components/BookingRuangan";

const Booking = () => {
  const defaultFormData = {
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
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setFormData(defaultFormData); // Reset setelah submit
  };

  const handleReset = () => {
    setFormData(defaultFormData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar tetap di sisi kiri */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
        <Sidebar activeMenu="Booking" />
      </div>

      {/* Konten halaman Booking */}
      <div className="ml-64 flex-1 p-8">
        <BookingRuangan
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default Booking;
