import React, { useState } from "react";
import { Compass, Mail, Phone, MapPin, Send, CheckCircle, Star } from "lucide-react";

export default function AboutSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isSent, setIsSent] = useState(false);

  const testimonials = [
    {
      name: "Екатерина Смирнова",
      role: "Travel Blogger",
      text: "TripPilot Pro полностью изменил мои путешествия! ИИ-аудиогид заменяет дорогие экскурсии, а скрытые места, которые он нашел в Риме, просто поразили.",
      stars: 5,
    },
    {
      name: "Александр Волков",
      role: "Бизнес-аналитик",
      text: "Удобный расчет бюджета. Погрешность в Токио составила всего 5%. Конвертер валют прямо в приложении очень выручает на кассе.",
      stars: 5,
    },
    {
      name: "Дмитрий Морозов",
      role: "Семейный турист",
      text: "Спланировали поездку на 4 человек за 5 минут. Дети в восторге от парков, которые посоветовал ИИ, а мы с женой оценили уютные рестораны.",
      stars: 5,
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setEmail("");
      setMessage("");
      setName("");
    }, 4000);
  };

  return (
    <section className="py-16 relative" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* About Us Story Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-300 font-semibold mb-4">
                <Compass className="h-3.5 w-3.5" />
                <span>О проекте TripPilot</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Наша миссия — сделать путешествия доступными, легкими и вдохновляющими для каждого.
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
                TripPilot AI — это высокоинтеллектуальный штурман для планирования поездок любого масштаба. Мы объединили передовые алгоритмы искусственного интеллекта и экспертизу тысяч путешественников, чтобы избавить вас от рутины при составлении маршрутов, поиске жилья и планировании бюджета.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                Забудьте о десятках открытых вкладок с картами, отзывами и расписаниями. TripPilot соберет всё воедино и предоставит персонального ИИ-гида, который всегда в вашем кармане.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 text-center">
              <div>
                <p className="text-2xl font-black text-indigo-400">150K+</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Путешествий</p>
              </div>
              <div>
                <p className="text-2xl font-black text-indigo-400">98%</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Отзывов 5★</p>
              </div>
              <div>
                <p className="text-2xl font-black text-indigo-400">120+</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Стран мира</p>
              </div>
            </div>
          </div>

          {/* Contact Form Block */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Напишите нам</h3>
              <p className="text-xs text-gray-400 mb-6">Возникли вопросы, предложения или идеи? Наша служба поддержки ответит вам в течение 1 часа.</p>
              
              {isSent ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center text-xs text-emerald-300 space-y-2">
                  <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto" />
                  <p className="font-bold">Сообщение успешно отправлено!</p>
                  <p className="text-[10px] text-gray-400">Спасибо за обращение. Мы свяжемся с вами по электронной почте.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Ваш Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Сообщение или вопрос..."
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-500 resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-white shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Отправить сообщение</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Testimonials Review Slider list */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Что говорят путешественники</h3>
            <p className="text-xs text-gray-400 mt-1">Отзывы реальных пользователей, исследовавших мир с TripPilot AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic">"{t.text}"</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{t.name}</span>
                  <span className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
