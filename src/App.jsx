import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

import CalendarView from './components/CalendarView';
import StatsChart from './components/StatsChart';
import StatsView from './components/StatsView';

function EmotionPicker({ onSelect }) {
  const emotions = [
    { emoji: '😊', name: 'happy' },
    { emoji: '😢', name: 'sad' },
    { emoji: '😡', name: 'angry' },
    { emoji: '😴', name: 'sleepy' },
    { emoji: '😍', name: 'love' },
    { emoji: '🤯', name: 'crazy' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '0.4rem',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      maxWidth: '100%',
      margin: '1rem 0',
    }}>
      {emotions.map((e) => (
        <button
          key={e.name}
          onClick={() => onSelect(e)}
          style={{
            fontSize: '1.3rem',
            backgroundColor: 'white',
            border: '2px solid #ffc6d0',
            borderRadius: '50%',
            padding: '0.3rem 0.5rem',
            cursor: 'pointer',
            minWidth: '2rem',
            minHeight: '2rem',
          }}
        >
          {e.emoji}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [emotion, setEmotion] = useState(null);
  const [text, setText] = useState('');
  const [showDetails, setShowDetails] = useState(false); // 👈 토글용 상태

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(today);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.emotion) setEmotion({ emoji: data.emotion });
        if (data.text) setText(data.text);
      } catch (error) {
        console.error("Failed to parse saved data:", error);
      }
    }
  }, []);

  const handleSave = () => {
    const today = new Date().toISOString().split('T')[0];
    const data = {
      emotion: emotion?.emoji ?? '',
      text: text,
    };
    localStorage.setItem(today, JSON.stringify(data));
    alert(`${t('save_complete')}\n\n[${t('date')}]: ${today}\n[${t('emotion')}]: ${data.emotion}\n[${t('content')}]: ${data.text}`);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        backgroundImage: 'url("/summervillage.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '0',
        fontFamily: "'Gowun Dodum', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(6px)', 
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          width: '90%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t('title')}</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{t('greeting')}</p>

        <EmotionPicker onSelect={(e) => setEmotion(e)} />

        <textarea
          placeholder={t('placeholder')}
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            resize: 'none',
            margin: '1rem auto',
            display: 'block',
            textAlign: 'center',
            lineHeight: '1.6',
            boxSizing: 'border-box',
          }}
        />

        <button
          onClick={handleSave}
          style={{
            padding: '0.6rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#ffc6d0',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          {t('save')}
        </button>

        {/* 👇 기록 보기 토글 버튼 */}
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '0.4rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            {showDetails ? '닫기' : '기록 보기'}
          </button>
        </div>

        {/* 👇 토글된 내용 */}
        {showDetails && (
          <div style={{ marginTop: '2rem' }}>
            <CalendarView />
            <StatsChart />
            <StatsView />
          </div>
        )}
      </div>
    </div>
  );
}