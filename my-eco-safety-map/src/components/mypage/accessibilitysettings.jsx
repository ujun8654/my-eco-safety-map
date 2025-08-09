import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function AccessibilitySettings() {
  const [settings, setSettings] = useState({
    large_text: false,
    high_contrast: false,
    font_size: [16],
    voice_guidance: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardHeader>
        <CardTitle className="text-lg font-bold">접근성 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
          <div>
            <h4 className="font-medium text-gray-900">큰 글씨 모드</h4>
            <p className="text-sm text-gray-600">텍스트 크기를 크게 표시</p>
          </div>
          <Switch
            checked={settings.large_text}
            onCheckedChange={() => handleToggle("large_text")}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
          <div>
            <h4 className="font-medium text-gray-900">고대비 모드</h4>
            <p className="text-sm text-gray-600">화면 대비를 높여 가독성 향상</p>
          </div>
          <Switch
            checked={settings.high_contrast}
            onCheckedChange={() => handleToggle("high_contrast")}
          />
        </div>

        <div className="p-3 bg-white rounded-lg border border-gray-100">
          <h4 className="font-medium text-gray-900 mb-2">글자 크기</h4>
          <div className="space-y-3">
            <Slider
              value={settings.font_size}
              onValueChange={(value) => setSettings(prev => ({ ...prev, font_size: value }))}
              max={24}
              min={12}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>작게</span>
              <span>현재: {settings.font_size[0]}px</span>
              <span>크게</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
          <div>
            <h4 className="font-medium text-gray-900">음성 안내</h4>
            <p className="text-sm text-gray-600">경로 안내 시 음성으로 알림</p>
          </div>
          <Switch
            checked={settings.voice_guidance}
            onCheckedChange={() => handleToggle("voice_guidance")}
          />
        </div>
      </CardContent>
    </Card>
  );
}