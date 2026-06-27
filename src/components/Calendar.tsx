import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday 
} from 'date-fns';
import type { MoodEntry } from '../types';
import { MOOD_EMOJIS } from '../types';

interface CalendarProps {
  entries: MoodEntry[];
  onDateClick: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ entries, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} data-cy="prev-month-btn">
          <ChevronLeft size={24} />
        </button>
        <span data-cy="current-month">{format(currentDate, 'yyyy. MM')}</span>
        <button onClick={nextMonth} data-cy="next-month-btn">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const entry = entries.find(e => e.date === dateStr);
          const isCurrentMonth = isSameMonth(day, monthStart);
          
          return (
            <div 
              key={day.toString()} 
              className={`calendar-cell ${!isCurrentMonth ? 'empty' : ''} ${isToday(day) ? 'today' : ''}`}
              onClick={() => isCurrentMonth && onDateClick(day)}
              data-cy={`cal-cell-${dateStr}`}
              title={entry ? entry.note : ''}
            >
              {isCurrentMonth && (
                <>
                  <div style={{ 
                    fontSize: entry ? '1.5rem' : '0.8rem', 
                    opacity: entry ? 1 : 0.3,
                    transition: 'all 0.2s',
                    lineHeight: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {entry ? MOOD_EMOJIS[entry.mood] : '•'}
                  </div>
                  <div className="calendar-date-num">{format(day, 'd')}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
