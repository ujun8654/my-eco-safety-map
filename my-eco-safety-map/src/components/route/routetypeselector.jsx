import React from "react";
import { Users, Baby, Heart, Dumbbell, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const routeTypes = [
  {
    id: "default",
    title: "기본 경로",
    description: "최단거리 + 안전요소",
    icon: MapPin,
    color: "bg-gray-500"
  },
  {
    id: "elderly", 
    title: "어르신 우선",
    description: "완만한 길, 그늘, 쉼터",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    id: "stroller",
    title: "유모차/휠체어",
    description: "계단 없는 넓은 길",
    icon: Baby,
    color: "bg-purple-500"
  },
  {
    id: "pet",
    title: "반려동물",
    description: "흙길, 그늘진 산책로",
    icon: Heart,
    color: "bg-pink-500"
  },
  {
    id: "exercise",
    title: "운동 최적",
    description: "공원, 하천변 코스",
    icon: Dumbbell,
    color: "bg-green-500"
  }
];

export default function RouteTypeSelector({ selectedType, onTypeChange }) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full" />
          경로 유형 선택
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {routeTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "default" : "outline"}
              className={`h-auto p-4 justify-start ${
                selectedType === type.id
                  ? `${type.color} text-white hover:opacity-90`
                  : "border-gray-200 hover:border-green-300 hover:bg-green-50"
              }`}
              onClick={() => onTypeChange(type.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedType === type.id ? "bg-white/20" : `${type.color} text-white`
                }`}>
                  <type.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{type.title}</div>
                  <div className={`text-sm ${
                    selectedType === type.id ? "text-white/80" : "text-gray-500"
                  }`}>
                    {type.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}