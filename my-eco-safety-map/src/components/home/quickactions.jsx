import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Navigation, Camera, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    title: "안전경로 찾기",
    description: "맞춤형 경로 안내",
    icon: Navigation,
    url: createPageUrl("Route"),
    color: "bg-blue-500",
    textColor: "text-blue-600"
  },
  {
    title: "환경 제보",
    description: "동네 이슈 제보하기",
    icon: Camera,
    url: createPageUrl("Contribute"),
    color: "bg-green-500", 
    textColor: "text-green-600"
  },
  {
    title: "주변 쉼터",
    description: "가까운 휴식 공간",
    icon: MapPin,
    url: createPageUrl("NearbySpots"),
    color: "bg-purple-500",
    textColor: "text-purple-600"
  },
  {
    title: "건강 정보",
    description: "맞춤 건강 가이드",
    icon: Heart,
    url: createPageUrl("HealthGuide"),
    color: "bg-pink-500",
    textColor: "text-pink-600"
  }
];

export default function QuickActions() {
  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full" />
          빠른 실행
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.url}>
              <Button
                variant="ghost"
                className="h-auto p-4 w-full bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${action.textColor}`}>{action.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}