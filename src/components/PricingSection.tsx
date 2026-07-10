import { Sparkles, Check, X, Star } from "lucide-react";

interface PricingSectionProps {
  onUpgrade: () => void;
  isPro: boolean;
}

export default function PricingSection({ onUpgrade, isPro }: PricingSectionProps) {
  return (
    <section className="py-16 relative" id="pricing-section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10 px-4">
        <div className="inline-flex items-center space-x-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-300 font-semibold mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Лучшие цены для умных путешествий</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Тарифные планы TripPilot</h2>
        <p className="mt-3 text-sm text-gray-400">
          Выберите подходящий уровень ИИ-поддержки для ваших приключений. Никаких скрытых комиссий.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative z-10">
        {/* Free Plan */}
        <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-8 backdrop-blur-md flex flex-col justify-between hover:border-white/10 transition-all">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Базовый</h3>
                <p className="text-xs text-gray-400 mt-1">Для простых поездок на выходные</p>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">Free</span>
            </div>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-white">0 ₽</span>
              <span className="text-xs text-gray-400 ml-1">/ навсегда</span>
            </div>

            <div className="h-px bg-white/5 my-6"></div>

            <ul className="space-y-4">
              <li className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>До 3 активных путешествий в личном кабинете</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Базовый ИИ-планировщик маршрутов</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Базовый онлайн-гид по городам</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Простой расчёт бюджета по статьям расходов</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-400 italic">
                <X className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>Ограничение запросов к ИИ-ассистенту</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-400 italic">
                <X className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>Есть реклама и нет офлайн-доступа</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button 
              disabled 
              className="w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 cursor-not-allowed"
            >
              Вы используете этот тариф
            </button>
          </div>
        </div>

        {/* TripPilot Pro */}
        <div className="rounded-3xl border-2 border-indigo-500 bg-gradient-to-b from-indigo-950/40 to-slate-950/40 p-8 backdrop-blur-md flex flex-col justify-between relative shadow-2xl shadow-indigo-950/40 hover:-translate-y-1 transition-transform">
          {/* Popular Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border-2 border-slate-950 flex items-center space-x-1 shadow-md">
            <Star className="h-3 w-3 fill-slate-950" />
            <span>Рекомендуем</span>
          </div>

          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-1.5">
                  <span>TripPilot Pro</span>
                  <span className="text-xs text-amber-400">⭐</span>
                </h3>
                <p className="text-xs text-indigo-200 mt-1">Для тех, кто ценит полную свободу</p>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">PRO</span>
            </div>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-white">490 ₽</span>
              <span className="text-xs text-gray-400 ml-1">/ месяц</span>
            </div>

            <div className="h-px bg-indigo-500/20 my-6"></div>

            <ul className="space-y-4">
              <li className="flex items-start space-x-2.5 text-xs text-gray-100 font-semibold">
                <Check className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Безлимитное количество путешествий</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-100">
                <Check className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Полный безлимитный доступ к ИИ-ассистенту</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-100">
                <Check className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Профессиональный аудиогид и скрытые места</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-100">
                <Check className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Экспорт маршрута в PDF / отправка друзьям</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-100">
                <Check className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Умная оптимизация расходов и офлайн-карты</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-gray-100">
                <Check className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Абсолютно без рекламы • Приоритетная поддержка</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            {isPro ? (
              <button 
                disabled 
                className="w-full py-3.5 rounded-2xl bg-emerald-500 text-xs font-extrabold text-slate-950 flex items-center justify-center space-x-1.5 cursor-default"
              >
                <span>У вас активирован PRO статус!</span>
              </button>
            ) : (
              <button 
                onClick={onUpgrade}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-extrabold text-slate-950 shadow-lg shadow-amber-500/10 hover:scale-[1.02] active:scale-95 transition-all"
                id="pricing-upgrade-btn"
              >
                Активировать TripPilot Pro
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
