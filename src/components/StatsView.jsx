import React, { useEffect, useState } from 'react';

export default function StatsView() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const allEmotions = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const value = JSON.parse(localStorage.getItem(key));
        const emo = value?.emotion;
        if (emo) {
          allEmotions[emo] = (allEmotions[emo] || 0) + 1;
        }
      } catch (e) {
        continue;
      }
    }
    setCounts(allEmotions);
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>감정 통계</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(counts).map(([emo, count]) => (
          <li key={emo} style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
            {emo} : {count}회
          </li>
        ))}
      </ul>
    </div>
  );
}