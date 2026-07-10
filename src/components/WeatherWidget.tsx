import { Weather, WeatherDay } from "../types";
import { Sun, Cloud, CloudSun, CloudRain, Wind, Thermometer, Sparkles } from "lucide-react";

interface WeatherWidgetProps {
  weather: Weather;
  destination: string;
}

export default function WeatherWidget({ weather, destination }: WeatherWidgetProps) {
  const getWeatherIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "sun":
        return <Sun className="h-6 w-6 text-amber-400" />;
      case "cloud-rain":
        return <CloudRain className="h-6 w-6 text-blue-400" />;
      case "cloud-sun":
        return <CloudSun className="h-6 w-6 text-amber-300" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl relative overflow-hidden" id="weather-widget-card">
      <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-blue-600/10 blur-2xl"></div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Прогноз погоды</p>
          <h3 className="text-xl font-bold text-white mt-0.5">{destination}</h3>
        </div>
        <div className="flex items-center space-x-1.5 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-xl text-xs text-blue-300">
          <Thermometer className="h-4.5 w-4.5 text-blue-400" />
          <span className="font-bold">{weather.current?.temp}°C</span>
        </div>
      </div>

      {/* Current */}
      <div className="flex items-center space-x-4 mb-5 bg-white/5 p-4 rounded-2xl border border-white/5">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
          {getWeatherIcon(weather.forecast?.[0]?.icon || "sun")}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{weather.current?.description}</p>
          <p className="text-[11px] text-gray-400">Комфортно для экскурсий и уличной активности</p>
        </div>
      </div>

      {/* 7 Day Forecast */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Прогноз на неделю</p>
      <div className="grid grid-cols-7 gap-1.5 mb-5 overflow-x-auto pb-1">
        {weather.forecast?.map((day: WeatherDay, idx: number) => (
          <div 
            key={idx} 
            className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/5 text-center min-w-[45px] hover:bg-white/10 transition-all"
            id={`weather-day-${idx}`}
          >
            <span className="text-[10px] font-semibold text-gray-400 mb-1">{day.dayName}</span>
            <div className="my-1.5">{getWeatherIcon(day.icon)}</div>
            <span className="text-xs font-bold text-white">{day.temp}°</span>
          </div>
        ))}
      </div>

      {/* Clothing Advice */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600/15 to-indigo-600/15 border border-blue-500/20 p-4">
        <div className="flex items-center space-x-2 mb-1.5 text-blue-300">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wide">Совет по гардеробу от ИИ</span>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed">
          {weather.clothingTips || "Одевайтесь по погоде, возьмите с собой удобную спортивную обувь для экскурсий и легкую куртку на случай прохладного вечера."}
        </p>
      </div>
    </div>
  );
}
