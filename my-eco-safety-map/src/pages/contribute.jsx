import React, { useState } from "react";
import { Camera, MapPin, Upload, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ReportForm from "../components/contribute/ReportForm";
import ReportHistory from "../components/contribute/ReportHistory";
import CommunityRanking from "../components/contribute/CommunityRanking";

export default function ContributePage() {
  const [activeTab, setActiveTab] = useState("report");

  return (
    <div className="p-4 space-y-6">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">에코 워치</h1>
              <p className="opacity-90">동네 환경 특파원이 되어주세요</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="report" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            제보하기
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            내 활동
          </TabsTrigger>
          <TabsTrigger value="ranking" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            랭킹
          </TabsTrigger>
        </TabsList>

        <TabsContent value="report">
          <ReportForm />
        </TabsContent>

        <TabsContent value="history">
          <ReportHistory />
        </TabsContent>

        <TabsContent value="ranking">
          <CommunityRanking />
        </TabsContent>
      </Tabs>
    </div>
  );
}