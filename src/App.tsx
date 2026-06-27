import React, { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { MoodModal } from './components/MoodModal';
import type { MoodEntry } from './types';
import { MOOD_COLORS } from './types';
import { format } from 'date-fns';

function App() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayEntry = entries.find(e => e.date === todayStr);

  useEffect(() => {
    if (todayEntry) {
      document.documentElement.style.setProperty('--bg-color', MOOD_COLORS[todayEntry.mood]);
    } else {
      document.documentElement.style.setProperty('--bg-color', '#fcf9f2');
    }
  }, [todayEntry]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveEntry = (entry: MoodEntry) => {
    setEntries(prev => {
      const existingIndex = prev.findIndex(e => e.date === entry.date);
      if (existingIndex >= 0) {
        const newEntries = [...prev];
        newEntries[existingIndex] = entry;
        return newEntries;
      }
      return [...prev, entry];
    });
  };

  const getExistingEntry = (date: Date | null) => {
    if (!date) return undefined;
    const dateStr = format(date, 'yyyy-MM-dd');
    return entries.find(e => e.date === dateStr);
  };

  return (
    <div className="app-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-1px' }}>Mood Tracker</h1>
        <p style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '0.5rem' }}>How are you feeling today?</p>
      </div>

      <Calendar 
        entries={entries}
        onDateClick={handleDateClick}
      />

      <MoodModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
        existingEntry={getExistingEntry(selectedDate)}
        onSave={handleSaveEntry}
      />
    </div>
  );
}

export default App;
