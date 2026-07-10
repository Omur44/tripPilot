import React, { useState } from "react";
import { MapPoint } from "../types";
import { 
  MapPin, Hotel, Utensils, Landmark, TreePine, 
  ShoppingBag, Pill, ShieldAlert, Navigation, Sparkles, Star, Coffee
} from "lucide-react";

interface MapMockProps {
  points: MapPoint[];
  destination: string;
}

const CATEGORY_ICONS: Record<string, any> = {
  hotel: Hotel,
  restaurant: Utensils,
  museum: Landmark,
  park: TreePine,
  shopping: ShoppingBag,
  pharmacy: Pill,
  hospital: ShieldAlert,
  sightseeing: MapPin,
};

const CATEGORY_NAMES: Record<string, string> = {
  all: "Все места",
  hotel: "Отели",
  restaurant: "Рестораны",
  museum: "Музеи",
  park: "Парки",
  shopping: "Шопинг",
  pharmacy: "Аптеки",
  hospital: "Больницы",
  sightseeing: "Достопримечательности"
};

const CATEGORY_COLORS: Record<string, string> = {
  hotel: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  restaurant: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  museum: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  park: "text-green-400 bg-green-500/10 border-green-500/20",
  shopping: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  pharmacy: "text-red-400 bg-red-500/10 border-red-500/20",
  hospital: "text-red-500 bg-red-600/10 border-red-600/20",
  sightseeing: "text-blue-400 bg-blue-500/10 border-blue-500/20"
};

export default function MapMock({ points, destination }: MapMockProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(points[0] || null);

  const filteredPoints = selectedCategory === "all" 
    ? points 
    : points.filter(p => p.type === selectedCategory);

  const handlePointSelect = (pt: MapPoint) => {
    setSelectedPoint(pt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl relative overflow-hidden" id="interactive-map-section">
      {/* Filters Sidebar */}
      <div className="lg:col-span-3 flex flex-col space-y-3">
        <div className="mb-2">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Интерактивная карта</p>
          <h3 className="text-lg font-bold text-white mt-0.5">Локации в {destination}</h3>
        </div>

        <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {Object.entries(CATEGORY_NAMES).map(([key, value]) => {
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center space-x-2 text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
                  isSelected 
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg" 
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                id={`map-filter-${key}`}
              >
                <span>{value}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Styled Map Interactive Visual Area */}
      <div className="lg:col-span-6 h-[400px] rounded-2xl relative border border-white/10 bg-[#0c1322] overflow-hidden group">
        {/* Map stylized background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute top-1/4 left-1/3 w-1/3 h-1 bg-blue-500/20 blur-sm rounded-full transform rotate-12"></div>
        <div className="absolute top-2/3 left-1/5 w-1/2 h-1 bg-emerald-500/20 blur-sm rounded-full transform -rotate-6"></div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0c1322] to-transparent pointer-events-none"></div>

        {/* Floating map controls */}
        <div className="absolute top-3 right-3 bg-slate-950/80 border border-white/10 rounded-xl p-2 flex flex-col space-y-1 z-10 text-xs">
          <button className="p-1 hover:text-white text-gray-400 font-bold">+</button>
          <div className="h-px bg-white/10 my-0.5"></div>
          <button className="p-1 hover:text-white text-gray-400 font-bold">-</button>
        </div>

        {/* Legend status */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-white/10 rounded-xl px-2.5 py-1.5 z-10 text-[10px] text-gray-400 flex items-center space-x-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Отображено точек: {filteredPoints.length}</span>
        </div>

        {/* Points positioning on mock map canvas */}
        {filteredPoints.map((pt, idx) => {
          const IconComponent = CATEGORY_ICONS[pt.type] || MapPin;
          const isSelected = selectedPoint?.id === pt.id;
          
          // Generate deterministic mock coordinate offsets inside the card
          const hashString = pt.name + pt.id;
          let sum = 0;
          for (let i = 0; i < hashString.length; i++) sum += hashString.charCodeAt(i);
          const leftPercent = 15 + (sum % 70); 
          const topPercent = 15 + ((sum * 3) % 70);

          return (
            <button
              key={pt.id}
              onClick={() => handlePointSelect(pt)}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full border shadow-xl transition-all ${
                isSelected 
                  ? "bg-indigo-600 border-indigo-400 text-white scale-125 z-20" 
                  : "bg-slate-900/90 border-white/10 text-indigo-400 hover:scale-110 hover:border-indigo-400 z-10"
              }`}
              title={pt.name}
              id={`map-marker-${pt.id}`}
            >
              <IconComponent className="h-4.5 w-4.5" />
            </button>
          );
        })}
      </div>

      {/* Info Panel of selected Point */}
      <div className="lg:col-span-3 flex flex-col justify-between">
        {selectedPoint ? (
          <div className="flex flex-col h-full justify-between" id="map-selected-info">
            <div className="space-y-4">
              <div className={`inline-flex px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wide border ${CATEGORY_COLORS[selectedPoint.type] || 'text-gray-400 bg-white/5'}`}>
                {CATEGORY_NAMES[selectedPoint.type] || selectedPoint.type}
              </div>

              <div>
                <h4 className="text-base font-bold text-white tracking-tight">{selectedPoint.name}</h4>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{selectedPoint.description}</p>
              </div>

              {(selectedPoint.rating || selectedPoint.priceLevel) && (
                <div className="flex items-center space-x-4 border-t border-white/5 pt-3">
                  {selectedPoint.rating && (
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-white">{selectedPoint.rating}</span>
                    </div>
                  )}
                  {selectedPoint.priceLevel && (
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <span className="font-semibold uppercase tracking-wider">Цены:</span>
                      <span className="text-emerald-400 font-bold">{selectedPoint.priceLevel}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-white/5 pt-4">
              <button className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-xs font-bold text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-md">
                <Navigation className="h-4 w-4" />
                <span>Построить маршрут ИИ</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 py-10">
            <MapPin className="h-8 w-8 text-gray-600 mb-2" />
            <p className="text-xs font-semibold">Выберите точку на карте, чтобы увидеть детали</p>
          </div>
        )}
      </div>
    </div>
  );
}
