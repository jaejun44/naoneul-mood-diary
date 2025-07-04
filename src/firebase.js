// src/firebase.js

// Firebase 앱과 Firestore 가져오기
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ 이게 Firestore 연결용!

// Firebase 설정 (너의 것 그대로 유지)
const firebaseConfig = {
    apiKey: "AIzaSyAz6rT2vfN9EW3Wv3TLxze6S-RMzlIuA-c",
    authDomain: "naoneul-mood-diary.firebaseapp.com",
    projectId: "naoneul-mood-diary",
    storageBucket: "naoneul-mood-diary.firebasestorage.app",
    messagingSenderId: "666697595682",
    appId: "1:666697595682:web:035b10dd65a64e9f10037b"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 가져오기
const db = getFirestore(app);

// 내보내기
export { db };
