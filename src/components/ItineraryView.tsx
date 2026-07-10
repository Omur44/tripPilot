import React, { useState } from "react";
import { TripPlan, ItineraryDay, Activity } from "../types";
import { 
  Play, Pause, Volume2, Sparkles, MapPin, 
  Clock, Flame, HelpCircle, Compass, Heart, AlertTriangle, ShieldAlert, Check, CheckCircle
} from "lucide-react";

interface ItineraryViewProps {
  plan: TripPlan;
}

export default function ItineraryView({ plan }: ItineraryViewProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Simulated audio progress loop when playing
  React.useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 400);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const selectedDayData = plan.itinerary?.find((d) => d.day === activeDay) || plan.itinerary?.[0];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "flight": return "✈️";
      case "checkin": return "🏨";
      case "food": return "🍽️";
      case "sightseeing": return "🏛️";
      case "relaxation": return "🧘";
      case "entertainment": return "🎭";
      default: return "📍";
    }
  };

  return (
    <div className="space-y-6" id="itinerary-view-section">
      {/* City Title and Audio Guide Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left main Intro */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center space-x-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-300 font-semibold mb-3">
              <Compass className="h-3.5 w-3.5" />
              <span>Онлайн-путеводитель ИИ</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Путешествие в {plan.destination}</h2>
            <p className="text-xs text-gray-400 mt-1">Отправление из: {plan.from} • {plan.durationDays} дней • {plan.travelersCount} чел.</p>
            <p className="text-sm text-gray-300 mt-4 leading-relaxed">{plan.guide?.history || "Потрясающий город с богатой культурой и историей."}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Лучшее время</p>
              <p className="text-xs text-white font-semibold mt-1">{plan.guide?.bestTime || "С мая по сентябрь"}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Национальная кухня</p>
              <p className="text-xs text-white font-semibold mt-1 truncate">{plan.guide?.cuisine?.[0] || "Национальные блюда"}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Audio Guide Block */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-4 top-4 opacity-10">
            <Volume2 className="h-24 w-24 text-white" />
          </div>

          <div>
            <div className="flex items-center space-x-2 text-indigo-300 mb-3">
              <Sparkles className="h-4.5 w-4.5" />
              <span className="text-xs font-bold uppercase tracking-wider">Интеллектуальный Аудиогид</span>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed italic mb-4">
              "{plan.guide?.audioGuideIntro || "Послушайте захватывающую историю от нашего гида."}"
            </p>
          </div>

          {/* Audio Player Controls */}
          <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-md"
                  id="audio-guide-play-btn"
                >
                  {isPlayingAudio ? <Pause className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5 ml-0.5" />}
                </button>
                <div>
                  <p className="text-xs font-bold text-white">Аудиотур по городу</p>
                  <p className="text-[9px] text-gray-400">Голос: Пётр (ИИ TripPilot)</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">0:{audioProgress < 10 ? `0${audioProgress}` : audioProgress} / 2:30</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              ></div>
            </div>

            {/* Text script toggle details */}
            {isPlayingAudio && (
              <p className="text-[10px] text-gray-300 leading-relaxed mt-3 border-t border-white/5 pt-2 animate-pulse line-clamp-3">
                {plan.guide?.audioGuideScript || "Добро пожаловать в этот чудесный экскурсионный маршрут..."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Day Selector and Daily Itinerary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Day Selectors */}
        <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {plan.itinerary?.map((day: ItineraryDay) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`flex items-center justify-between text-left px-4 py-3.5 rounded-2xl text-xs font-bold transition-all border shrink-0 ${
                activeDay === day.day
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              id={`itinerary-day-tab-${day.day}`}
            >
              <div>
                <span className="block text-[10px] opacity-60 uppercase">День {day.day}</span>
                <span className="text-xs block max-w-[150px] truncate">{day.title}</span>
              </div>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-lg border border-white/5 ml-2">
                {day.activities?.length || 0} акт.
              </span>
            </button>
          ))}
        </div>

        {/* Daily activities details */}
        <div className="lg:col-span-9 bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Детальный план • День {activeDay}</span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedDayData?.title || "План дня"}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400">Расходы дня:</span>
              <p className="text-sm font-bold text-emerald-400">
                {(selectedDayData?.activities?.reduce((acc, a) => acc + (a.cost || 0), 0) || 0).toLocaleString("ru-RU")} ₽
              </p>
            </div>
          </div>

          {/* Activities list timeline */}
          <div className="space-y-6 relative pl-6">
            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/10"></div>

            {selectedDayData?.activities?.map((activity: Activity, index: number) => (
              <div key={index} className="relative group" id={`activity-${index}`}>
                {/* Timeline Marker icon */}
                <div className="absolute left-[-29px] top-1.5 w-4 h-4 rounded-full bg-slate-800 border-2 border-indigo-500 flex items-center justify-center ring-4 ring-indigo-500/10 group-hover:bg-indigo-600 transition-colors"></div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <span className="text-2xl mt-0.5 select-none">{getActivityIcon(activity.type)}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-indigo-400">{activity.time || "09:00"}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">{activity.title}</h4>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{activity.description}</p>
                    </div>
                  </div>

                  {activity.cost > 0 && (
                    <div className="text-left md:text-right shrink-0">
                      <span className="text-[9px] text-gray-500 block">Стоимость:</span>
                      <span className="text-xs font-bold text-emerald-400">{activity.cost.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Online Guide Detailed Information Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Travel Tips */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 mb-3">
              <Sparkles className="h-4.5 w-4.5" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Полезные советы</h4>
            </div>
            <ul className="space-y-3">
              {plan.guide?.tips?.map((tip: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-gray-300 leading-relaxed">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Neighbourhood safety block */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center space-x-2 text-red-400 mb-4">
            <ShieldAlert className="h-4.5 w-4.5" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Карта Безопасности</h4>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">🟢 Безопасные районы</p>
              <div className="flex flex-wrap gap-1.5">
                {plan.guide?.safeNeighborhoods?.map((area: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 font-medium rounded-lg">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1.5">⚠️ Нерекомендуемые районы</p>
              <div className="flex flex-wrap gap-1.5">
                {plan.guide?.dangerousNeighborhoods?.map((area: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-300 font-medium rounded-lg">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Curated Secrets & Hidden Gems */}
        <div className="bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 mb-3">
              <Flame className="h-4.5 w-4.5" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Секретные места и Бесплатно</h4>
            </div>

            <div className="space-y-3.5">
              <div>
                <p className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">🤫 Знают только местные:</p>
                <p className="text-xs text-gray-300 mt-1 italic leading-relaxed">
                  {plan.guide?.hiddenGems?.[0] || "Маленькая старинная библиотека во двориках"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-teal-300 uppercase tracking-widest">🎟️ Посмотреть Бесплатно:</p>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  {plan.guide?.freeThings?.[0] || "Вход в ботанические сады по воскресеньям"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
