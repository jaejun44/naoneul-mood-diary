import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import './i18n';
import { db } from './firebase'; // ✅ firebase 연결
import { doc, setDoc } from 'firebase/firestore'; // ✅ Firestore 저장 함수

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
  const [showDetails, setShowDetails] = useState(false);

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

  const auth = getAuth();

  const handleSave = async () => {
    console.log("💾 handleSave 실행됨");

    const today = new Date().toISOString().split('T')[0];

    const data = {
      uid: 'test-user', // 임시 uid
      emotion: emotion?.emoji ?? '',
      text: text,
      date: today,
    };

    console.log("📦 저장할 데이터:", data); // 저장 전 데이터 확인

    try {
      const docRef = await addDoc(collection(db, 'entries'), data); // Firestore 저장 시도
      console.log("✅ Firestore 문서 ID:", docRef.id); // 저장된 문서의 ID 출력
      alert("Firebase에 저장 완료!"); // 사용자에게 알림
    } catch (error) {
      console.error("🔥 Firestore 저장 오류:", error); // 에러 로그
      alert("저장 실패! 콘솔을 확인해주세요."); // 사용자에게 알림
    }
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

        {/* 👇 입력 영역은 기록 보기 아닐 때만 표시 */}
        {!showDetails && (
          <>
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
          </>
        )}



        {/* 👇 기록 보기 토글 버튼 */}
        <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '0.6rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            {showDetails ? '메인으로' : '기록 보기'}
          </button>
        </div>

        {/* 👇 기록 보기 페이지 */}
        {showDetails && (
          <div style={{ marginTop: '3rem', position: 'relative' }}>
            <CalendarView />
            <StatsChart />
            <StatsView />
          </div>
        )}
      </div>
    </div>
  );
}
