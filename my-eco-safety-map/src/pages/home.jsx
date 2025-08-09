import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { EnvironmentReport } from "@/entities/EnvironmentReport";
import { 
  Thermometer, 
  Wind, 
  Droplet, 
  Sun, 
  MapPin, 
  AlertTriangle,
  Leaf,
  Navigation,
  Heart,
  Shield,
  Trees, // Added for nearbySpotsData
  Building, // Added for nearbySpotsData
  Umbrella // Added for nearbySpotsData
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import EnvironmentBriefing from "../components/home/EnvironmentBriefing";
import RecentReports from "../components/home/RecentReports";
import NearbySpots from "../components/home/NearbySpots";
import QuickActions from "../components/home/QuickActions";
import HomeMap from "../components/home/HomeMap"; // Added HomeMap import

const nearbySpotsData = [
  {
    id: 1,
    name: "역삼공원",
    type: "공원",
    distance: "50m",
    position: [37.5020, 127.0398],
    icon: Trees
  },
  {
    id: 2,
    name: "역삼1동 주민센터 쉼터",
    type: "무더위쉼터",
    distance: "120m",
    position: [37.5008, 127.0402],
    icon: Building
  },
  {
    id: 3,
    name: "역삼동 카페거리",
    type: "카페",
    distance: "200m",
    position: [37.5025, 127.0385],
    icon: Umbrella
  }
];

export default function HomePage() {
  const [currentLocation, setCurrentLocation] = useState("현재 위치 확인 중...");
  const [environmentData, setEnvironmentData] = useState({
    air_quality: { status: "good", value: 42, label: "좋음" },
    temperature: { status: "moderate", value: 24, label: "적당" },
    humidity: { status: "good", value: 65, label: "쾌적" },
    uv_index: { status: "caution", value: 7, label: "주의" }
  });
  const [recentReports, setRecentReports] = useState([]);

  useEffect(() => {
    loadLocationAndData();
    loadRecentReports();
  }, []);

  const loadLocationAndData = async () => {
    // 실제 구현에서는 GPS와 환경 API 연동
    // 강남구 역삼동 공원 인근으로 설정
    setCurrentLocation("서울시 강남구 역삼동");
  };

  const loadRecentReports = async () => {
    try {
      const reports = await EnvironmentReport.list("-created_date", 5);
      setRecentReports(reports);
    } catch (error) {
      console.error("최근 신고 로드 실패:", error);
    }
  };

  const getOverallSafetyLevel = () => {
    const statuses = Object.values(environmentData).map(item => item.status);
    if (statuses.includes("danger")) return { level: "danger", color: "bg-red-500", text: "위험" };
    if (statuses.includes("caution")) return { level: "caution", color: "bg-yellow-500", text: "주의" };
    if (statuses.includes("moderate")) return { level: "moderate", color: "bg-blue-500", text: "보통" };
    return { level: "good", color: "bg-green-500", text: "좋음" };
  };

  const safetyLevel = getOverallSafetyLevel();

  return (
    <div className="p-4 space-y-6">
      {/* 현재 위치 및 전체 안전도 */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm opacity-90">{currentLocation}</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">오늘의 안전도</h2>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${safetyLevel.color}`} />
                <span className="text-lg font-semibold">{safetyLevel.text}</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 지도 UI 추가 */}
      <HomeMap reports={recentReports} spots={nearbySpotsData} />

      {/* 환경 브리핑 */}
      <EnvironmentBriefing environmentData={environmentData} />

      {/* 빠른 실행 버튼들 */}
      <QuickActions />

      {/* 내 주변 추천 장소 */}
      <NearbySpots spots={nearbySpotsData} /> {/* Passed nearbySpotsData */}

      {/* 최근 동네 소식 */}
      <RecentReports reports={recentReports} />
    </div>
  );
}

