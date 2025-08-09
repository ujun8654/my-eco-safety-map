import React from "react";
import { Clock, MapPin, Shield, Navigation, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RouteResults({ results, selectedType, currentLocation }) {
  if (!results || !results.routes) return null;

  const handleNavigate = (route) => {
    if (!currentLocation) {
      alert("현재 위치를 확인할 수 없습니다. 위치 권한을 확인해주세요.");
      return;
    }

    if (!route.destination) {
      alert("목적지 정보가 없어 길안내를 시작할 수 없습니다.");
      return;
    }
    
    // 카카오맵 길안내 URL 스킴 (출발지와 도착지를 명시하는 'route' 링크로 수정)
    const startName = "현재 위치";
    const endName = route.destination.name;
    const startX = currentLocation.longitude;
    const startY = currentLocation.latitude;
    const endX = route.destination.longitude;
    const endY = route.destination.latitude;

    const kakaoMapUrl = `https://map.kakao.com/link/route?start_name=${encodeURIComponent(startName)}&start_x=${startX}&start_y=${startY}&end_name=${encodeURIComponent(endName)}&end_x=${endX}&end_y=${endY}`;
    
    window.open(kakaoMapUrl, '_blank');
  };

  const getSafetyColor = (score) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full" />
          경로 결과
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.routes.map((route, index) => (
          <div key={route.id} className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{route.type}</h4>
                  {index === 0 && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      추천
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{route.duration}</span>
                  </div>
                </div>
              </div>
              <Badge className={`text-xs ${getSafetyColor(route.safety_score)} border-0`}>
                안전도 {route.safety_score}%
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-gray-700">경로 특징</p>
              <div className="flex flex-wrap gap-2">
                {route.features.map((feature, featureIndex) => (
                  <Badge key={featureIndex} variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={() => handleNavigate(route)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              카카오맵으로 길안내 시작
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}