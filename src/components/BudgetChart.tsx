import { Budget } from "../types";
import { DollarSign, Plane, Hotel, Utensils, Compass, ShoppingBag, Car, Ticket } from "lucide-react";

interface BudgetChartProps {
  budget: Budget;
}

export default function BudgetChart({ budget }: BudgetChartProps) {
  const items = [
    { label: "Перелёт", value: budget.flight, color: "#3b82f6", icon: Plane },
    { label: "Отель", value: budget.hotel, color: "#a855f7", icon: Hotel },
    { label: "Питание", value: budget.food, color: "#10b981", icon: Utensils },
    { label: "Транспорт", value: budget.transport, color: "#f59e0b", icon: Car },
    { label: "Экскурсии", value: budget.excursions, color: "#06b6d4", icon: Compass },
    { label: "Развлечения", value: budget.entertainment, color: "#ec4899", icon: Ticket },
    { label: "Покупки", value: budget.shopping, color: "#f43f5e", icon: ShoppingBag },
  ];

  const total = items.reduce((acc, item) => acc + item.value, 0);

  // SVG parameters for donut chart
  const radius = 60;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;
  const donutSegments = items.map((item) => {
    const percentage = total > 0 ? item.value / total : 0;
    const strokeDasharray = `${percentage * circumference} ${circumference}`;
    const strokeDashoffset = currentOffset;
    currentOffset -= percentage * circumference;
    return {
      ...item,
      percentage,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center" id="budget-chart-container">
      {/* Chart Segment */}
      <div className="md:col-span-5 flex flex-col items-center justify-center relative">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={strokeWidth}
            />
            {/* Segments */}
            {donutSegments.map((segment, index) => {
              if (segment.value === 0) return null;
              return (
                <circle
                  key={index}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={segment.strokeDasharray}
                  strokeDashoffset={segment.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out hover:stroke-[16px]"
                  style={{ transformOrigin: "50% 50%" }}
                />
              );
            })}
          </svg>
          {/* Inner Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Всего</span>
            <span className="text-xl font-bold tracking-tight text-white mt-0.5">
              {total.toLocaleString("ru-RU")} ₽
            </span>
            <span className="text-[10px] font-medium text-emerald-400 mt-0.5">
              ~{(total * (budget.conversionRateToUSD || 0.011)).toFixed(0)} {budget.currencyCode || "USD"}
            </span>
          </div>
        </div>
      </div>

      {/* Categories Breakdown */}
      <div className="md:col-span-7 space-y-3.5">
        {items.map((item, index) => {
          if (item.value === 0) return null;
          const pct = total > 0 ? (item.value / total) * 100 : 0;
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 hover:bg-white/10 transition-all"
              id={`budget-item-${index}`}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{item.label}</p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {pct.toFixed(1)}% бюджета
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white">
                  {item.value.toLocaleString("ru-RU")} ₽
                </p>
                <p className="text-[10px] text-gray-400">
                  ~{(item.value * (budget.conversionRateToUSD || 0.011)).toFixed(0)} {budget.currencyCode || "USD"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
