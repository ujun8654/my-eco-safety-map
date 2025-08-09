import React from "react";
import { Wind, Thermometer, Droplet, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  good: "bg-green-100 text-green-800 border-green-200",
  moderate: "bg-blue-100 text-blue-800 border-blue-200", 
  caution: "bg-yellow-100 text-yellow-800 border-yellow-200",
  danger: "bg-red-100 text-red-800 border-red-200"
};

const environmentItems = [
  {
    key: "air_quality",
    icon: Wind,
    title: "대기질",
    unit: "㎍/㎥",
    description: "미세먼지 농도"
  },
  {
    key: "temperature",
    icon: Thermometer,
    title: "기온",
    unit: "°C",
    description: "현재 온도"
  },
  {
    key: "humidity",
    icon: Droplet,
    title: "습도",
    unit: "%",
    description: "상대 습도"
  },
  {
    key: "uv_index",
    icon: Sun,
    title: "자외선",
    unit: "",
    description: "자외선 지수"
  }
];

export default function EnvironmentBriefing({ environmentData }) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full" />
          오늘의 환경 정보
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {environmentItems.map((item) => {
            const data = environmentData[item.key];
            if (!data) return null;

            return (
              <div key={item.key} className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{item.title}</span>
                  </div>
                  <Badge className={`text-xs ${statusColors[data.status]} border`}>
                    {data.label}
                  </Badge>
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {data.value}{item.unit}
                </div>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <span className="font-medium">💡 오늘의 팁:</span> 자외선이 강하니 외출 시 모자나 선크림을 준비하세요. 
            대기질은 양호하여 산책하기 좋은 날씨입니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}