import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { MessageCircle, AlertTriangle, Heart, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const reportTypeInfo = {
  pollution: { icon: AlertTriangle, color: "bg-red-100 text-red-800", label: "오염제보" },
  comfort: { icon: Heart, color: "bg-green-100 text-green-800", label: "쾌적정보" },
  safety: { icon: AlertTriangle, color: "bg-yellow-100 text-yellow-800", label: "안전제보" },
  facility_damage: { icon: AlertTriangle, color: "bg-orange-100 text-orange-800", label: "시설파손" },
  noise: { icon: AlertTriangle, color: "bg-purple-100 text-purple-800", label: "소음제보" }
};

export default function RecentReports({ reports }) {
  if (!reports || reports.length === 0) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full" />
            최근 동네 소식
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">아직 동네 소식이 없습니다</p>
            <p className="text-xs mt-1">첫 번째 환경 특파원이 되어보세요!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full" />
          최근 동네 소식
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report) => {
          const typeInfo = reportTypeInfo[report.report_type] || reportTypeInfo.safety;
          
          return (
            <div key={report.id} className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 ${typeInfo.color} rounded-full flex items-center justify-center`}>
                  <typeInfo.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs ${typeInfo.color} border-0`}>
                      {typeInfo.label}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {report.created_date && format(new Date(report.created_date), "MM/dd HH:mm", { locale: ko })}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                  {report.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{report.description}</p>
                  )}
                  {report.location?.address && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{report.location.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}