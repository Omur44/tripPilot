import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Как именно ИИ TripPilot составляет маршрут?",
      answer: "Наш искусственный интеллект анализирует ваши интересы (например, пляжный отдых, музеи или гастрономия), бюджет, продолжительность и место назначения. На основе этих данных он за считанные секунды формирует персонализированный, логичный маршрут по часам на каждый день, подбирая лучшие заведения, отели и достопримечательности."
    },
    {
      question: "Доступны ли карты и гиды без подключения к интернету?",
      answer: "Да, пользователи с подпиской TripPilot Pro могут экспортировать свои поездки, подробные маршруты и карты в формате PDF, а также использовать офлайн-режим в приложении для доступа ко всем ранее загруженным гидам, советам и аудиодорожкам без роуминга."
    },
    {
      question: "Насколько точен расчет бюджета?",
      answer: "ИИ делает прогноз стоимости на основе актуальных средних цен в ресторанах, отелях, музеях и транспорте выбранного города. Фактические расходы могут немного отличаться в зависимости от сезона и ваших личных предпочтений, но погрешность обычно не превышает 10-15%."
    },
    {
      question: "Могу ли я планировать поездку вместе с друзьями?",
      answer: "Да, в Pro тарифе вы можете отправить уникальную ссылку друзьям, чтобы они могли просматривать маршрут, оставлять комментарии или вносить корректировки в реальном времени."
    },
    {
      question: "Как работает аудиогид?",
      answer: "Аудиогид использует высококачественные, профессионально обученные ИИ-голоса, которые озвучивают увлекательные факты и тайные легенды о ключевых достопримечательностях прямо во время вашей прогулки по городу."
    }
  ];

  return (
    <section className="py-16 relative" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-300 font-semibold mb-3">
            <HelpCircle className="h-4 w-4" />
            <span>Остались вопросы? Мы ответим!</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Часто задаваемые вопросы</h2>
          <p className="mt-3 text-sm text-gray-400">
            Все, что вам нужно знать о работе TripPilot AI и его возможностях.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all"
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:bg-white/5 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-indigo-400 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 shrink-0 ml-4" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/5 bg-black/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
