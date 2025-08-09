import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 전체 페이지 레이아웃
import Layout from './components/Layout';

// 페이지 컴포넌트들
import HomePage from './pages/Home';
import RoutePage from './pages/Route';
import ContributePage from './pages/Contribute';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 모든 페이지를 Layout으로 감싸서 일관된 UI(헤더, 네비게이션 바)를 제공합니다. */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Routes>
                {/* 기본 경로는 HomePage로 리다이렉트 */}
                <Route index element={<Navigate to="/Home" replace />} />
                
                {/* 각 페이지 라우트 설정 */}
                <Route path="/Home" element={<HomePage />} />
                <Route path="/Route" element={<RoutePage />} />
                <Route path="/Contribute" element={<ContributePage />} />
                <Route path="/MyPage" element={<MyPage />} />
                
                {/* 일치하는 경로가 없을 경우 홈으로 이동 */}
                <Route path="*" element={<Navigate to="/Home" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}