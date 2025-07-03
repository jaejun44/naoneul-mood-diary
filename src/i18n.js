import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';

const resources = {
  en: { translation: en },
  ko: { translation: ko },
  ja: { translation: ja },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.split('-')[0] || 'en', // 브라우저 언어 자동 감지
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;