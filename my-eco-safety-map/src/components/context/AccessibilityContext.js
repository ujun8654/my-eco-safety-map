import React, { createContext, useContext, useState, useEffect } from 'react';

// 접근성 설정을 위한 Context 생성
const AccessibilityContext = createContext();

// Context를 사용하기 위한 커스텀 훅
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

// 접근성 설정을 제공하는 Provider 컴포넌트
export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    large_text: false,        // 큰 글자 모드
    high_contrast: false,     // 고대비 모드
    font_size: 16,           // 기본 글자 크기
    voice_guidance: false,    // 음성 안내 (향후 구현)
    motion_reduced: false     // 애니메이션 감소
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserSettings();
  }, []);

  // 로컬 스토리지에서 사용자 접근성 설정 불러오기
  const loadUserSettings = async () => {
    try {
      const stored = localStorage.getItem('accessibility_settings');
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));
      }
    } catch (error) {
      console.error('접근성 설정 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 접근성 설정 업데이트 함수
  const updateSetting = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      // 로컬 스토리지에 설정 저장
      localStorage.setItem('accessibility_settings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('접근성 설정 저장 실패:', error);
    }
  };

  // 설정에 따른 CSS 클래스명 생성
  const getAccessibilityClasses = () => {
    const classes = [];
    
    if (settings.high_contrast) classes.push('accessibility-high-contrast');
    if (settings.large_text) classes.push('accessibility-large-text');
    if (settings.motion_reduced) classes.push('accessibility-reduced-motion');
    
    return classes.join(' ');
  };

  const value = {
    settings,
    updateSetting,
    getAccessibilityClasses,
    isLoading
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
