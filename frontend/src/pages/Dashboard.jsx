import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BookingForm from "../components/BookingForm";
import ReservationTable from "../components/ReservationTable";

const Dashboard = () => {
  const [form, setForm] = useState({
    name: "name",
    email: "",
    role: "",
  });

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/user", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setForm(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const cards = [
    { title: "Ruangan Tersedia", value: 12, note: "Ruangan tersedia saat ini" },
    { title: "Total Reservasi Anda", value: 11, note: "Total reservasi anda" },
    { title: "Reservasi Disetujui", value: 8, note: "Total reservasi disetujui" },
    { title: "Reservasi Ditolak", value: 0, note: "Total reservasi ditolak" },
  ];

  const rooms = [
    { name: "Ruang 1.1", desc: "Ruang kelas Bawah Fasilitas", kapasitas: 40 },
    { name: "Lab Kom 2", desc: "Ruang Kelas Bawah Fasilitas", kapasitas: 35 },
    { name: "Ruang 2.5", desc: "Ruang Kelas Lantai 2 Fasilitas", kapasitas: 40 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-10">
        <Sidebar activeMenu="Dashboard" setActiveMenu={() => {}} />
      </div>

      <div className="ml-64 flex-1 p-8">
        <Header
          breadcrumbPath="Pages / Dashboard"
          userName={form.name}
          showSearchBar
          searchPlaceholder="Type here"
          onSearchChange={(e) => console.log(e.target.value)}
        />

        <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg p-8 text-white mb-8">
          <h1 className="text-3xl font-bold">Selamat Datang Bagus</h1>
          <p className="mt-2">Ayo mulai reservasi ruangan dengan mudah dan nyaman</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.note}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Peminjaman Ruangan</h2>
          <div className="grid grid-cols-4 gap-6">
            {rooms.map((room, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold">{room.name}</h3>
                  <p className="text-sm text-gray-500">{room.desc}</p>
                  <p className="text-xs text-gray-400">Kapasitas: {room.kapasitas}</p>
                </div>
              </div>
            ))}

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

        {/* FORM */}
        <BookingForm />

        {/* TABLE */}
        <ReservationTable />
      </div>
    </div>
  );
};

export default Dashboard;
