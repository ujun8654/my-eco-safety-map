
import React, { useState, useEffect } from "react";
import { Navigation, MapPin, Clock, Users, Baby, Heart, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import RouteSearch from "../components/route/RouteSearch";
import RouteTypeSelector from "../components/route/RouteTypeSelector";
import RouteResults from "../components/route/RouteResults";

export default function RoutePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRouteType, setSelectedRouteType] = useState("default");
  const [routeResults, setRouteResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("위치 정보 확인 중...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationStatus("현재 위치가 확인되었습니다.");
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationStatus("위치 권한을 허용해주세요.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setLocationStatus("위치 정보를 사용할 수 없습니다.");
          } else if (error.code === error.TIMEOUT) {
            setLocationStatus("위치 확인 요청 시간이 초과되었습니다.");
          } else {
            setLocationStatus("위치 정보를 가져오는 데 실패했습니다.");
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationStatus("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // 실제 구현에서는 Geocoding API로 목적지 좌표를 가져옵니다.
    // 여기서는 '역삼공원'을 목적지로 한 샘플 데이터를 사용합니다.
    const destination = {
      name: searchQuery,
      latitude: 37.5020, // Example latitude for Yeoksam Park or similar
      longitude: 127.0398 // Example longitude for Yeoksam Park or similar
    };

    setTimeout(() => {
      setRouteResults({
        routes: [
          {
            id: "safe",
            type: "건강 경로",
            distance: "1.2km",
            duration: "15분",
            features: ["그늘진 길", "공원 경유", "쉼터 2곳"],
            safety_score: 95,
            destination: destination,
          },
          {
            id: "fast",
            type: "최단 경로", 
            distance: "0.8km",
            duration: "10분",
            features: ["대로변", "신호등 3개"],
            safety_score: 75,
            destination: destination,
          }
        ]
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="p-4 space-y-6">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">안전 경로 안내</h1>
              <p className="opacity-90">당신만을 위한 맞춤형 길찾기</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 검색 */}
      <RouteSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* 위치 정보 상태 */}
      <div className="text-center text-sm text-gray-500">{locationStatus}</div>

      {/* 경로 유형 선택 */}
      <RouteTypeSelector 
        selectedType={selectedRouteType}
        onTypeChange={setSelectedRouteType}
      />

      {/* 검색 결과 */}
      {routeResults && (
        <RouteResults 
          results={routeResults}
          selectedType={selectedRouteType}
          currentLocation={currentLocation}
        />
      )}

      {/* 빠른 목적지 */}
      {!routeResults && (
        <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full" />
              빠른 목적지
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {["집", "회사", "병원", "마트", "공원", "지하철역"].map((place) => (
                <Button
                  key={place}
                  variant="outline"
                  className="h-12 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                  onClick={() => {
                    setSearchQuery(place);
                    handleSearch();
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {place}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
