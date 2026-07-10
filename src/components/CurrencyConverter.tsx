import React, { useState, useEffect } from "react";
import { ArrowLeftRight, CreditCard, RefreshCw } from "lucide-react";

interface CurrencyConverterProps {
  localCurrencyCode: string; // EUR, USD, JPY, etc.
  conversionRateToUSD: number; // rate of 1 local currency unit to USD
}

export default function CurrencyConverter({
  localCurrencyCode = "EUR",
  conversionRateToUSD = 1.08
}: CurrencyConverterProps) {
  const [rubValue, setRubValue] = useState<string>("1000");
  const [localValue, setLocalValue] = useState<string>("");
  
  // Hardcoded current approximate USD to RUB for converter calculations
  const usdToRub = 90.5;
  
  // Conversion formula:
  // 1 unit of local currency = conversionRateToUSD * usdToRub
  const rubPerUnit = conversionRateToUSD * usdToRub;

  useEffect(() => {
    if (rubValue) {
      const numRub = parseFloat(rubValue);
      if (!isNaN(numRub)) {
        setLocalValue((numRub / rubPerUnit).toFixed(2));
      } else {
        setLocalValue("");
      }
    } else {
      setLocalValue("");
    }
  }, [rubValue, rubPerUnit]);

  const handleLocalChange = (val: string) => {
    setLocalValue(val);
    if (val) {
      const numLocal = parseFloat(val);
      if (!isNaN(numLocal)) {
        setRubValue((numLocal * rubPerUnit).toFixed(2));
      } else {
        setRubValue("");
      }
    } else {
      setRubValue("");
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl relative overflow-hidden" id="currency-converter-card">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-600/10 blur-2xl"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-emerald-400" />
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Конвертер валют</h3>
        </div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
          Актуальный курс
        </span>
      </div>

      <div className="space-y-4">
        {/* Ruble Input */}
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
          <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Из Рубли (₽)</label>
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={rubValue}
              onChange={(e) => setRubValue(e.target.value)}
              className="bg-transparent w-full outline-none text-lg font-bold text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0.00"
              id="converter-rub-input"
            />
            <span className="text-sm font-bold text-gray-400">RUB</span>
          </div>
        </div>

        {/* Swap visual */}
        <div className="flex justify-center -my-2 relative z-10">
          <div className="bg-emerald-500 rounded-full p-2 text-slate-950 shadow-md border-2 border-slate-950 hover:scale-110 transition-transform cursor-pointer">
            <ArrowLeftRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Target Currency Input */}
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
          <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">В {localCurrencyCode}</label>
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={localValue}
              onChange={(e) => handleLocalChange(e.target.value)}
              className="bg-transparent w-full outline-none text-lg font-bold text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0.00"
              id="converter-local-input"
            />
            <span className="text-sm font-bold text-indigo-400">{localCurrencyCode}</span>
          </div>
        </div>

        {/* Rates Display */}
        <div className="text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-3.5 flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <RefreshCw className="h-3 w-3 text-emerald-400 animate-spin-slow" />
            <span>1 {localCurrencyCode} ≈ {rubPerUnit.toFixed(2)} ₽</span>
          </span>
          <span>1 ₽ ≈ {(1 / rubPerUnit).toFixed(4)} {localCurrencyCode}</span>
        </div>
      </div>
    </div>
  );
}
