
import React from react;
import { MapPin, Trees, Coffee, Umbrella, Building } from lucide-react;
import { Card, CardContent, CardHeader, CardTitle } from @componentsuicard;
import { Badge } from @componentsuibadge;
import { Button } from @componentsuibutton;

const spotIcons = {
    공원 Trees,
    무더위쉼터 Building,
    카페 Coffee,
    기타 Umbrella
};

const safetyColors = {
  excellent bg-green-100 text-green-800,
  good bg-blue-100 text-blue-800,
  moderate bg-yellow-100 text-yellow-800
};

export default function NearbySpots({ spots }) {
  return (
    Card className=bg-white70 backdrop-blur-sm shadow-lg border-green-100
      CardHeader className=pb-4
        CardTitle className=text-lg font-bold text-gray-900 flex items-center gap-2
          div className=w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full 
          내 주변 추천 장소
        CardTitle
      CardHeader
      CardContent className=space-y-3
        {spots.map((spot) = {
          const SpotIcon = spotIcons[spot.type]  spotIcons.기타;
          return (
            div key={spot.id} className=bg-white rounded-lg p-4 border border-gray-100
              div className=flex items-start justify-between
                div className=flex items-start gap-3
                  div className=w-10 h-10 bg-green-100 rounded-full flex items-center justify-center
                    SpotIcon className=w-5 h-5 text-green-600 
                  div
                  div className=flex-1
                    div className=flex items-center gap-2 mb-1
                      h4 className=font-semibold text-gray-900{spot.name}h4
                      Badge variant=outline className=text-xs
                        {spot.type}
                      Badge
                    div
                    div className=flex items-center gap-2 text-sm text-gray-600 mb-2
                      MapPin className=w-3 h-3 
                      span{spot.distance}span
                    div
                  div
                div
                Badge className={`text-xs bg-green-100 text-green-800 border-0`}
                  안전
                Badge
              div
            div
          );
        })}
        
        Button variant=outline className=w-full mt-4 text-green-600 border-green-200 hoverbg-green-50
          더 많은 장소 보기
        Button
      CardContent
    Card
  );
}
