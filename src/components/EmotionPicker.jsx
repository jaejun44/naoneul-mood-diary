// src/components/EmotionPicker.jsx
import React, { useState } from 'react';

const emotions = [
  { emoji: '😊', label: '기쁨' },
  { emoji: '😢', label: '슬픔' },
  { emoji: '😠', label: '화남' },
  { emoji: '😍', label: '사랑' },
  { emoji: '😴', label: '피곤' },
  { emoji: '😎', label: '여유' },
];

export default function EmotionPicker({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (emotion) => {
    setSelected(emotion);
    onSelect(emotion);
  };

  return (
    <div
  style={{
    marginTop: '1rem',
    display: 'flex',
    gap: '0.4rem',
    justifyContent: 'center',
    flexWrap: 'nowrap', // ✅ 줄바꿈 안되게!
    overflowX: 'auto',  // ✅ 혹시 넘치면 스크롤
    maxWidth: '100%',   // ✅ 반응형
  }}
>
  {emotions.map((e) => (
    <button
      key={e.emoji}
      onClick={() => handleSelect(e)}
      style={{
        fontSize: '1.3rem',               // ✅ 크기 축소
        backgroundColor: selected?.emoji === e.emoji ? '#ffdbe1' : 'white',
        border: '2px solid #ffc6d0',
        borderRadius: '50%',
        padding: '0.3rem 0.5rem',         // ✅ 패딩 축소
        cursor: 'pointer',
        minWidth: '2rem',                 // ✅ 너비 제한
        minHeight: '2rem',
      }}
    >
      {e.emoji}
    </button>
  ))}
</div>  
    );
    }   