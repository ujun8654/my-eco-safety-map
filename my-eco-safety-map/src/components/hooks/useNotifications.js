import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    checkNotificationPermission();
    loadStoredNotifications();
  }, []);

  // 브라우저 알림 권한 확인
  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  };

  // 알림 권한 요청
  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    }
    return false;
  };

  // 로컬 스토리지에서 저장된 알림 목록 불러오기
  const loadStoredNotifications = () => {
    try {
      const stored = localStorage.getItem('app_notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    } catch (error) {
      console.error('저장된 알림 로드 실패:', error);
    }
  };

  // 새로운 알림 추가
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      type: 'general',
      ...notification
    };
    
    const updatedNotifications = [newNotification, ...notifications].slice(0, 50); // 최대 50개만 저장
    setNotifications(updatedNotifications);
    localStorage.setItem('app_notifications', JSON.stringify(updatedNotifications));
    
    // 브라우저 푸시 알림 표시
    if (permission === 'granted' && !notification.silent) {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.type || 'general'
      });
    }
  };

  // 특정 알림을 읽음으로 표시
  const markAsRead = (notificationId) => {
    const updated = notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    setNotifications(updated);
    localStorage.setItem('app_notifications', JSON.stringify(updated));
  };

  // 모든 알림을 읽음으로 표시
  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updated);
    localStorage.setItem('app_notifications', JSON.stringify(updated));
  };

  // 읽지 않은 알림 개수 계산
  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  return {
    notifications,
    permission,
    requestPermission,
    addNotification,
    markAsRead,
    markAllAsRead,
    getUnreadCount
  };
};
