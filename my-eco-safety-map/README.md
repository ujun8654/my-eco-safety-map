# 우리동네 안심지도 🛡️

시민 참여형 환경 모니터링과 안전한 경로 안내를 통해 **모든 시민이 안전하고 쾌적한 환경에서 생활**할 수 있도록 지원하는 모바일 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🌤️ **실시간 환경 정보**: 대기질, 기온, 습도, 자외선 지수 모니터링
- 🗺️ **스마트 경로 안내**: 개인 맞춤형 안전 경로 제공 (어르신, 유모차, 반려동물 등)
- 📱 **시민 참여형 제보**: 환경 이슈를 실시간으로 신고하고 공유
- ♿ **접근성 지원**: 시각장애인, 고령자를 위한 음성 안내 및 고대비 모드
- 🏆 **커뮤니티**: 환경 특파원 랭킹 및 뱃지 시스템

## 🚀 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone https://github.com/your-username/my-eco-safety-map.git
cd my-eco-safety-map
2. 의존성 설치
npm install
3. 개발 서버 실행
npm run dev
앱이 http://localhost:5173에서 실행됩니다.

4. 프로덕션 빌드
npm run build
🏗️ 기술 스택
Frontend: React 18, React Router
Styling: Tailwind CSS, Shadcn/UI
Maps: React Leaflet, OpenStreetMap
Icons: Lucide React
Build Tool: Vite
Backend: Base44 Platform (자동 API 생성)
📱 화면 구성
1. 홈 대시보드
현재 위치 기반 환경 정보
안전도 종합 평가
인터랙티브 지도
주변 추천 장소
2. 경로 안내
5가지 경로 유형 (기본, 어르신, 유모차, 반려동물, 운동)
AI 기반 안전 경로 생성
카카오맵 연동
3. 환경 제보
오염, 시설파손, 소음, 안전, 쾌적 정보 제보
사진 첨부 및 위치 기반 제보
실시간 제보 현황 확인
4. 마이페이지
개인 설정 관리
접근성 옵션
활동 내역 조회
♿ 접근성 지원
이 앱은 웹 접근성 가이드라인 (WCAG 2.1 AA) 을 준수합니다:

키보드 내비게이션: 모든 기능을 키보드로 조작 가능
스크린 리더 지원: ARIA 라벨 및 시맨틱 HTML 사용
고대비 모드: 시각 장애인을 위한 색상 대비 강화
큰 글자 모드: 저시력자를 위한 글자 크기 확대
애니메이션 감소: 전정 장애가 있는 사용자를 위한 모션 최소화
🗂️ 프로젝트 구조
src/
├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── home/          # 홈 화면 컴포넌트
│   ├── route/         # 경로 안내 컴포넌트
│   ├── contribute/    # 환경 제보 컴포넌트
│   ├── mypage/        # 마이페이지 컴포넌트
│   └── context/       # React Context (전역 상태)
├── pages/             # 페이지 컴포넌트
├── entities/          # 데이터 모델 (JSON 스키마)
├── utils/             # 유틸리티 함수
└── App.jsx           # 메인 앱 컴포넌트
🌟 기여 방법
이 저장소를 포크합니다
새로운 기능 브랜치를 생성합니다 (git checkout -b feature/새기능)
변경사항을 커밋합니다 (git commit -am '새기능 추가')
브랜치에 푸시합니다 (git push origin feature/새기능)
Pull Request를 생성합니다
📄 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 LICENSE 파일을 참고하세요.

📞 문의
프로젝트에 대한 문의나 제안사항이 있으시면 Issues를 통해 연락해 주세요.

모든 시민이 안전하고 건강한 환경에서 살아갈 권리를 함께 지켜나가요! 🌍💚


---
