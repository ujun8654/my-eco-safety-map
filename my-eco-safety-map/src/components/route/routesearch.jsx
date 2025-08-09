import React from "react";
import { Search, Navigation, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RouteSearch({ searchQuery, setSearchQuery, onSearch, isSearching }) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-green-100">
      <CardContent className="p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="목적지를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              className="pl-10 h-12 text-base"
            />
            <Search className="w-4 h-4 absolute left-3 top-4 text-gray-400" />
          </div>
          <Button 
            onClick={onSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="h-12 px-6 bg-green-500 hover:bg-green-600"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}