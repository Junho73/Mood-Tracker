export type MoodType = 
  | 'happy' 
  | 'excited'
  | 'loved'
  | 'calm'
  | 'tired'
  | 'sad'
  | 'crying'
  | 'anxious'
  | 'angry'
  | 'sick';

export interface MoodEntry {
  date: string; // YYYY-MM-DD format
  mood: MoodType;
  note: string;
}

export const MOOD_EMOJIS: Record<MoodType, string> = {
  happy: '😊',
  excited: '🤩',
  loved: '🥰',
  calm: '😌',
  tired: '😴',
  sad: '🥺',
  crying: '😭',
  anxious: '😰',
  angry: '😡',
  sick: '🤒',
};

export const MOOD_COLORS: Record<MoodType, string> = {
  happy: '#ffdf73',
  excited: '#ffc3a0',
  loved: '#ffb7b2',
  calm: '#a3e4d7',
  tired: '#d2b4de',
  sad: '#aed6f1',
  crying: '#85c1e9',
  anxious: '#a9dfbf',
  angry: '#f5b7b1',
  sick: '#aeb6bf',
};
