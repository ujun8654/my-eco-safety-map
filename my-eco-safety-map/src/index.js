import React from 'react';
import ReactDOM from 'react-dom/client';

// 전역 CSS (Tailwind CSS를 사용한다면 여기에 import)
import './index.css'; 

// 메인 앱 컴포넌트
import App from './App';

// React 18 렌더링 방식
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);