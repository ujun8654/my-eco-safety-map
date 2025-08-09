import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    weather_alerts: true,
    air_quality: true,
    route_hazards: true,
    community_updates: false,
    report_updates: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationTypes = [
    {
      key: "weather_alerts",
      title: "기상 경보",
      description: "폭염, 한파, 강수 등 기상 특보"
    },
    {
      key: "air_quality",
      title: "대기질 알림",
      description: "미세먼지 나쁨 단계 알림"
    },
    {
      key: "route_hazards",
      title: "경로 위험 알림",
      description: "설정한 경로의 위험 요소 발생"
    },
    {
      key: "community_updates",
      title: "동네 소식",
      description: "주변 지역 환경 제보 업데이트"
    },
    {
      key: "report_updates",
      title: "제보 처리 현황",
      description: "내가 제보한 사항의 처리 현황"
    }
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardHeader>
        <CardTitle className="text-lg font-bold">알림 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notificationTypes.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <Switch
              checked={settings[item.key]}
              onCheckedChange={() => handleToggle(item.key)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}