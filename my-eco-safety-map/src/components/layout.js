import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, MapPin, Plus, User, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "홈",
    url: createPageUrl("Home"),
    icon: Home,
    id: "home"
  },
  {
    title: "경로",
    url: createPageUrl("Route"),
    icon: MapPin,
    id: "route"
  },
  {
    title: "참여",
    url: createPageUrl("Contribute"),
    icon: Plus,
    id: "contribute"
  },
  {
    title: "마이페이지",
    url: createPageUrl("MyPage"),
    icon: User,
    id: "mypage"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [notifications, setNotifications] = useState(2);

  const getCurrentPageId = () => {
    const currentPath = location.pathname;
    const currentItem = navigationItems.find(item => currentPath === item.url);
    return currentItem?.id || "home";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <style>
        {`
          :root {
            --primary-green: #10b981;
            --primary-blue: #3b82f6;
            --secondary-green: #d1fae5;
            --accent-orange: #f59e0b;
            --danger-red: #ef4444;
            --safe-green: #22c55e;
            --warning-yellow: #eab308;
          }
        `}
      </style>

      {/* 모바일 헤더 */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-100 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🛡️</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">우리동네 안심지도</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="pb-20">
        {children}
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-green-100 z-50">
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => {
            const isActive = getCurrentPageId() === item.id;
            return (
              <Link
                key={item.id}
                to={item.url}
                className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs font-medium">{item.title}</span>
                {isActive && (
                  <div className="w-4 h-0.5 bg-green-500 rounded-full mt-1" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}