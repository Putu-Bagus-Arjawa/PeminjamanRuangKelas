import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const KalenderJadwal = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Contoh data dummy, nanti bisa diganti fetch ke backend
    setEvents([
      { title: 'Booking Ruang A', date: '2025-07-10' },
      { title: 'Booking Ruang B', date: '2025-07-11' },
    ]);
  }, []);

  const handleDateClick = (info) => {
    const newTitle = prompt('Judul event?');
    if (newTitle) {
      setEvents([...events, { title: newTitle, date: info.dateStr }]);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
    />
  );
};

export default KalenderJadwal;
