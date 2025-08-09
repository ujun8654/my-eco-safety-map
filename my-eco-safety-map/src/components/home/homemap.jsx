
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet 기본 아이콘 깨짐 방지
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// SVG 경로 데이터
const iconPaths = {
    AlertTriangle: `<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
    Heart: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`,
    Trees: `<path d="M10 10v.2A3 3 0 0 1 7 13v5H4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h3m4-6v.2A3 3 0 0 1 11 13v5h3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-3m4-4.8.9.8c.3.3.5.7.5 1.1v2.8a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9.9a2 2 0 0 1 .5-1.2z"/><path d="M12 21v-3"/><path d="M8 21v-3"/>`,
    Building: `<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>`,
    Umbrella: `<path d="M22 12a10.36 10.36 0 0 0-20 0Z"/><path d="M12 12v8a2 2 0 0 0 4 0"/>`,
    MapPin: `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`
};

const createCustomIcon = (svgPath, colorClass) => {
    const html = `
        <div class="p-2 rounded-full bg-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${colorClass}">
                ${svgPath}
            </svg>
        </div>
    `;
    return L.divIcon({
        html: html,
        className: 'bg-transparent border-0',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
    });
};

const reportIcons = {
    pollution: createCustomIcon(iconPaths.AlertTriangle, "text-red-500"),
    facility_damage: createCustomIcon(iconPaths.AlertTriangle, "text-orange-500"),
    noise: createCustomIcon(iconPaths.AlertTriangle, "text-purple-500"),
    comfort: createCustomIcon(iconPaths.Heart, "text-green-500"),
};

const spotIcons = {
    공원: createCustomIcon(iconPaths.Trees, "text-emerald-600"),
    무더위쉼터: createCustomIcon(iconPaths.Building, "text-blue-600"),
    카페: createCustomIcon(iconPaths.Umbrella, "text-amber-600"),
};

export default function HomeMap({ reports, spots }) {
    const mapCenter = [37.5013, 127.0395]; // 강남구 역삼동 공원 인근
    const zoomLevel = 16; // 더 상세한 줌 레벨

    return (
        <div className="h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-green-100">
            <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* 현재 위치 마커 (역삼동 공원 인근) */}
                <Marker position={mapCenter} icon={createCustomIcon(iconPaths.MapPin, "text-blue-500")}>
                    <Popup>
                        <div className="font-semibold">현재 위치</div>
                        <p className="text-xs text-gray-600">강남구 역삼동 (역삼공원 인근)</p>
                    </Popup>
                </Marker>

                {/* 시민 제보 마커 */}
                {reports.map(report => (
                    <Marker
                        key={`report-${report.id}`}
                        position={[report.location.latitude, report.location.longitude]}
                        icon={reportIcons[report.report_type] || reportIcons.comfort}
                    >
                        <Popup>
                            <div className="font-semibold">{report.title}</div>
                            <p className="text-xs text-gray-600">{report.description}</p>
                        </Popup>
                    </Marker>
                ))}

                {/* 주변 추천 장소 마커 */}
                {spots.map(spot => (
                    <Marker
                        key={`spot-${spot.id}`}
                        position={spot.position}
                        icon={spotIcons[spot.type] || spotIcons.공원}
                    >
                        <Popup>
                            <div className="font-semibold">{spot.name}</div>
                            <p className="text-xs text-gray-600">{spot.type} | {spot.distance}</p>
                        </Popup>
                    </Marker>
                ))}
                
                {/* 대기질 정보 (역삼동 지역 기준으로 조정) */}
                <Circle center={[37.5020, 127.0405]} pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.2 }} radius={150}>
                    <Popup>대기질: 좋음 (역삼공원 일대)</Popup>
                </Circle>
                <Circle center={[37.5005, 127.0385]} pathOptions={{ color: 'yellow', fillColor: 'yellow', fillOpacity: 0.2 }} radius={200}>
                    <Popup>대기질: 보통 (테헤란로 인근)</Popup>
                </Circle>
            </MapContainer>
        </div>
    );
}
