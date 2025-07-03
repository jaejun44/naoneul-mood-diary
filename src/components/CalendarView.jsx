// src/components/CalendarView.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [entry, setEntry] = useState(null);

  const handleDateChange = (date) => {
    const key = date.toISOString().split('T')[0];
    const saved = localStorage.getItem(key);

    if (saved) {
      const data = JSON.parse(saved);
      setEntry({ ...data, date: key });
    } else {
      setEntry(null);
    }

    setSelectedDate(date);
  };

  // 각 날짜에 🎈 이모지 표시
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const key = date.toISOString().split('T')[0];
      const saved = localStorage.getItem(key);
      if (saved) {
        return <span style={{ fontSize: '1rem' }}>🎈</span>;
      }
    }
    return null;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={tileContent}
      />

      {entry && (
        <div style={{ marginTop: '1rem', background: '#fff6f9', padding: '1rem', borderRadius: '12px' }}>
          <p><strong>📅 {entry.date}</strong></p>
          <p><strong>{entry.emotion}</strong> {entry.text}</p>
        </div>
      )}
    </div>
  );
}