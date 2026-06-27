import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { MoodType, MoodEntry } from '../types';
import { MOOD_EMOJIS, MOOD_COLORS } from '../types';

interface MoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  existingEntry: MoodEntry | undefined;
  onSave: (entry: MoodEntry) => void;
}

export const MoodModal: React.FC<MoodModalProps> = ({ isOpen, onClose, date, existingEntry, onSave }) => {
  const [mood, setMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (existingEntry) {
        setMood(existingEntry.mood);
        setNote(existingEntry.note);
      } else {
        setMood(null);
        setNote('');
      }
      setError('');
    }
  }, [isOpen, existingEntry]);

  if (!isOpen || !date) return null;

  const handleSave = () => {
    if (!mood) {
      setError('기분을 먼저 선택해주세요!');
      return;
    }
    if (!note.trim()) {
      setError('오늘의 일기를 짧게라도 남겨보세요.');
      return;
    }
    
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    onSave({
      date: dateStr,
      mood,
      note: note.trim()
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ 
        backgroundColor: mood ? MOOD_COLORS[mood] : 'white',
        transition: 'background-color 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
            {date.getMonth() + 1}월 {date.getDate()}일의 기록
          </h2>
          <button onClick={onClose} data-cy="modal-close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="mood-selector">
          {(Object.keys(MOOD_EMOJIS) as MoodType[]).map(m => (
            <button
              key={m}
              className={`mood-option ${mood === m ? 'selected' : ''}`}
              onClick={() => { setMood(m); setError(''); }}
              data-cy={`mood-btn-${m}`}
              style={{ fontSize: '1.8rem', padding: '4px' }}
            >
              {MOOD_EMOJIS[m]}
            </button>
          ))}
        </div>

        <div>
          <textarea
            placeholder="오늘 하루는 어땠나요?"
            value={note}
            onChange={e => { setNote(e.target.value); setError(''); }}
            data-cy="note-input"
          />
          {error && <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }} data-cy="error-msg">{error}</p>}
        </div>

        <button className="btn-save" onClick={handleSave} data-cy="save-btn">
          기록하기
        </button>
      </div>
    </div>
  );
};
