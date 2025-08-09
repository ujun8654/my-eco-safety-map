import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Settings, Bell, Globe, Accessibility, HelpCircle, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import UserProfile from "../components/mypage/UserProfile";
import NotificationSettings from "../components/mypage/NotificationSettings";
import AccessibilitySettings from "../components/mypage/AccessibilitySettings";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보 로드 실패:", error);
    }
  };

  const menuItems = [
    { id: "profile", title: "프로필 관리", icon: Settings },
    { id: "notifications", title: "알림 설정", icon: Bell },
    { id: "accessibility", title: "접근성 설정", icon: Accessibility },
    { id: "language", title: "언어 설정", icon: Globe },
    { id: "help", title: "도움말", icon: HelpCircle }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">
                {user?.full_name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.full_name || "사용자"}</h1>
              <p className="opacity-90">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 메뉴 */}
      <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
        <CardContent className="p-6">
          <div className="space-y-3">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start h-12 ${
                  activeSection === item.id ? "bg-green-50 text-green-700" : "text-gray-700"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 선택된 섹션 내용 */}
      {activeSection === "profile" && <UserProfile user={user} setUser={setUser} />}
      {activeSection === "notifications" && <NotificationSettings />}
      {activeSection === "accessibility" && <AccessibilitySettings />}
      {activeSection === "language" && (
        <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold">언어 설정</CardTitle>
          </CardHeader>
          <CardContent>
            <Select defaultValue="ko">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}
      {activeSection === "help" && (
        <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold">도움말</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">자주 묻는 질문</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 앱 사용법이 궁금해요</p>
                <p>• 신고가 처리되지 않아요</p>
                <p>• 경로 안내가 부정확해요</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              고객센터 문의하기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 로그아웃 */}
      <Button
        variant="outline"
        className="w-full text-red-600 border-red-200 hover:bg-red-50"
        onClick={() => {
          if (confirm("로그아웃 하시겠습니까?")) {
            User.logout();
          }
        }}
      >
        <LogOut className="w-4 h-4 mr-2" />
        로그아웃
      </Button>
    </div>
  );
}