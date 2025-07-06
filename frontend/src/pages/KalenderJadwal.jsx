import React from "react";
import Sidebar from "../components/Sidebar";
import KalenderJadwal from "../components/Kalender";

const Dashboard = () => {
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
              <p className="text-gray-500">Pages / Kalender Jadwal</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Type here"
                className="px-4 py-2 border rounded-lg"
              />
              {/* <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                {form.name.charAt(0)}
              </div> */}
            </div>
          </div>
          <div className="flex-1 p-8">
            <KalenderJadwal /> {/* Kalender muncul di dashboard */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
