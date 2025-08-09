import React, { useState } from "react";
import { User } from "@/entities/User";
import { Edit2, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UserProfile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: user?.full_name || "",
    preferred_route: user?.preferred_route || "default",
    age_group: user?.age_group || ""
  });

  const handleSave = async () => {
    try {
      await User.updateMyUserData(editData);
      setUser(prev => ({ ...prev, ...editData }));
      setIsEditing(false);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setEditData({
      full_name: user?.full_name || "",
      preferred_route: user?.preferred_route || "default",
      age_group: user?.age_group || ""
    });
    setIsEditing(false);
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">프로필 관리</CardTitle>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              수정
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                <X className="w-4 h-4 mr-2" />
                취소
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600"
              >
                <Save className="w-4 h-4 mr-2" />
                저장
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">이름</label>
          {isEditing ? (
            <Input
              value={editData.full_name}
              onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="이름을 입력하세요"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-md">{user?.full_name || "이름 없음"}</div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">이메일</label>
          <div className="p-3 bg-gray-50 rounded-md text-gray-600">{user?.email}</div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">선호 經로 유형</label>
          {isEditing ? (
            <Select
              value={editData.preferred_route}
              onValueChange={(value) => setEditData(prev => ({ ...prev, preferred_route: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">기본 경로</SelectItem>
                <SelectItem value="elderly">어르신 우선</SelectItem>
                <SelectItem value="stroller">유모차/휠체어</SelectItem>
                <SelectItem value="pet">반려동물</SelectItem>
                <SelectItem value="exercise">운동 최적</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="p-3 bg-gray-50 rounded-md">
              {editData.preferred_route === "elderly" ? "어르신 우선" :
               editData.preferred_route === "stroller" ? "유모차/휠체어" :
               editData.preferred_route === "pet" ? "반려동물" :
               editData.preferred_route === "exercise" ? "운동 최적" : "기본 경로"}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">연령대</label>
          {isEditing ? (
            <Select
              value={editData.age_group}
              onValueChange={(value) => setEditData(prev => ({ ...prev, age_group: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="연령대 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20s">20대</SelectItem>
                <SelectItem value="30s">30대</SelectItem>
                <SelectItem value="40s">40대</SelectItem>
                <SelectItem value="50s">50대</SelectItem>
                <SelectItem value="60plus">60대 이상</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="p-3 bg-gray-50 rounded-md">
              {editData.age_group || "설정되지 않음"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}