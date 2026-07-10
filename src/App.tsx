import React, { useState } from "react";
import { 
  Compass, Plane, Sparkles, MapPin, Calendar, Users, 
  DollarSign, Landmark, HelpCircle, Heart, Bell, ShieldCheck, 
  User as UserIcon, Settings, ChevronRight, CheckCircle2, 
  Trash2, Plus, Star, ArrowRight, Loader2, RefreshCw
} from "lucide-react";

import { TripPlan, User, MapPoint } from "./types";
import Navbar from "./components/Navbar";
import AuthModals from "./components/AuthModals";
import BudgetChart from "./components/BudgetChart";
import CurrencyConverter from "./components/CurrencyConverter";
import WeatherWidget from "./components/WeatherWidget";
import MapMock from "./components/MapMock";
import AIChat from "./components/AIChat";
import ItineraryView from "./components/ItineraryView";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import AboutSection from "./components/AboutSection";

// Static Initial Stunning Trip to ensure the user gets premium content instantly!
const INITIAL_TRIP_PLAN: TripPlan = {
  destination: "Париж",
  from: "Москва",
  startDate: "12.08.2026",
  durationDays: 5,
  travelersCount: 2,
  totalBudget: 115000,
  guide: {
    history: "Париж, основанный более двух тысяч лет назад на реке Сена, вырос из небольшого кельтского поселения Лютеция в один из самых влиятельных мегаполисов мира. Город пережил эпохи величия королей, революционные бури, наполеоновские перестройки барона Османа и стал мировой столицей искусства, моды и гастрономии. Каждый квартал здесь — это живая книга истории.",
    famousSpots: [
      { name: "Эйфелева башня", description: "Символ Парижа, построенный к Всемирной выставке 1889 года.", photoQuery: "eiffel tower paris" },
      { name: "Собор Парижской Богоматери", description: "Шедевр готической архитектуры, воспетый Виктором Гюго.", photoQuery: "notre dame paris" },
      { name: "Лувр", description: "Самый посещаемый художественный музей в мире с загадочной Моной Лизой.", photoQuery: "louvre museum paris" }
    ],
    audioGuideIntro: "Приветствуем вас в самом романтичном городе мира — Париже! Наш ИИ-аудиогид проведет вас по тайным тропам, мимо величественных соборов и тихих кафе Монмартра.",
    audioGuideScript: "Добро пожаловать в аудиоэкскурсию по Парижу. Прямо сейчас представьте себя на мосту Александра III, когда солнце медленно садится за горизонт, окрашивая купол Дома Инвалидов в золотистые тона. Сена тихо несет свои воды, помнящие королей, художников и поэтов. Обратите внимание на архитектурный стиль: эти ровные светлые фасады из тесаного известняка — наследие великой градостроительной реформы барона Османа XIX века. Сделайте глубокий вдох: воздух Парижа пропитан ароматом свежеиспеченных круассанов и уличного кофе. Дальше мы направимся к уютным улочкам квартала Маре...",
    facts: [
      "В Париже находится более 400 государственных парков и садов.",
      "Каждый день в городе выпекается более миллиона свежих багетов.",
      "Эйфелева башня может быть на 15 см выше летом из-за теплового расширения металла."
    ],
    bestTime: "С мая по октябрь (весна и ранняя осень) — идеальное время с теплой, солнечной погодой для долгих пеших прогулок.",
    tips: [
      "Покупайте музейную карту Paris Museum Pass заранее онлайн, чтобы не стоять в огромных очередях.",
      "Не оставляйте чаевые в ресторанах, они уже включены в счет по закону (service compris).",
      "Скачайте карту метро на телефон: это самый быстрый и удобный способ передвижения."
    ],
    safeNeighborhoods: ["8-й округ (Елисейские поля)", "5-й округ (Латинский квартал)", "6-й округ (Сен-Жермен)"],
    dangerousNeighborhoods: ["Окрестности Северного вокзала (Gare du Nord) ночью", "Районы 19-го и 20-го округов после полуночи"],
    traditions: [
      "Традиция неторопливого утреннего кофе с круассаном на уличной террасе.",
      "Пикники на набережной Сены в теплые летние вечера."
    ],
    cuisine: ["Классическая французская кухня с акцентом на соусы", "Свежайшие сыры, багеты и изысканные десерты"],
    mustTryDishes: ["Круассаны и багеты из местной буланжери", "Французский луковый суп с гренками", "Нежное пирожное макарон"],
    freeThings: ["Прогулка по саду Тюильри и Люксембургскому саду", "Панорамный вид на город со ступеней Сакре-Кёр", "Бесплатные пешеходные экскурсии"],
    hiddenGems: ["Музей романтической жизни в уединенном дворике", "Крытые пассажи XIX века с винтажными лавочками и стеклянными крышами"]
  },
  mapPoints: [
    { id: "pt-1", name: 'Отель "Le Bristol Paris"', type: "hotel", lat: 48.8718, lng: 2.3142, description: "Культовый роскошный отель рядом с Елисейскими полями.", rating: 4.9, priceLevel: "$$$" },
    { id: "pt-2", name: 'Ресторан "Le Consulat"', type: "restaurant", lat: 48.8872, lng: 2.3402, description: "Уютный исторический ресторан на Монмартре, где собирались великие художники.", rating: 4.7, priceLevel: "$$" },
    { id: "pt-3", name: "Музей Лувр", type: "museum", lat: 48.8606, lng: 2.3376, description: "Крупнейший королевский дворец и музей изобразительных искусств.", rating: 4.8 },
    { id: "pt-4", name: "Сад Тюильри", type: "park", lat: 48.8635, lng: 2.3275, description: "Исторический парковый ансамбль во французском стиле.", rating: 4.6 },
    { id: "pt-5", name: "Торговый центр Galeries Lafayette", type: "shopping", lat: 48.8732, lng: 2.3323, description: "Роскошный универмаг с великолепным стеклянным куполом в стиле ар-нуво.", rating: 4.5 }
  ],
  itinerary: [
    {
      day: 1,
      title: "Прибытие и шарм Монмартра",
      activities: [
        { time: "11:30", title: "Прибытие в Париж", description: "Приземление в аэропорту Шарль-де-Голль, трансфер в центр города на комфортном такси.", cost: 5500, type: "flight" },
        { time: "13:30", title: "Заселение в отель Le Bristol", description: "Регистрация, размещение в просторном номере, чашка кофе перед прогулкой.", cost: 0, type: "checkin" },
        { time: "15:30", title: "Прогулка по романтичному Монмартру", description: "Пешеходная прогулка к базилике Сакре-Кёр, осмотр площади Тертр с уличными художниками.", cost: 0, type: "sightseeing" },
        { time: "19:00", title: "Ужин в Le Consulat", description: "Ужин в знаменитом историческом ресторане, пробуем традиционный луковый суп и эскарго.", cost: 3500, type: "food" }
      ]
    },
    {
      day: 2,
      title: "Шедевры искусства и парки",
      activities: [
        { time: "09:00", title: "Завтрак в парижской буланжери", description: "Хрустящий багет, свежий круассан и горячий шоколад.", cost: 900, type: "food" },
        { time: "10:00", title: "Экскурсия в музей Лувр", description: "Осмотр шедевров: Мона Лиза, Венера Милосская, Ника Самофракийская.", cost: 2100, type: "sightseeing" },
        { time: "14:00", title: "Обед в кафе у фонтана", description: "Легкий французский обед с кишем и салатом на свежем воздухе.", cost: 1800, type: "food" },
        { time: "15:30", title: "Отдых в Саду Тюильри", description: "Спокойная прогулка среди скульптур, отдых в знаменитых зеленых металлических креслах у пруда.", cost: 0, type: "relaxation" },
        { time: "19:30", title: "Вечерний круиз по Сене", description: "Речной круиз на кораблике с подсветкой, панорама сверкающей Эйфелевой башни.", cost: 1500, type: "entertainment" }
      ]
    },
    {
      day: 3,
      title: "Архитектурное величие",
      activities: [
        { time: "09:30", title: "Французские блинчики (крепы)", description: "Сладкие крепы с карамелью или соленые галеты с сыром.", cost: 700, type: "food" },
        { time: "10:30", title: "Осмотр Триумфальной арки", description: "Прогулка по Елисейским полям, подъем на смотровую площадку арки.", cost: 1300, type: "sightseeing" },
        { time: "13:00", title: "Обед в Латинском квартале", description: "Изучаем старинные улочки, сытный обед в уютном бистро.", cost: 1600, type: "food" },
        { time: "15:00", title: "Собор Нотр-Дам и остров Сите", description: "Любуемся готическими фасадами и гуляем по старинным мостам.", cost: 0, type: "sightseeing" },
        { time: "20:00", title: "Ужин с живым джазом", description: "Посещение скрытого джаз-клуба Caveau de la Huchette.", cost: 2500, type: "entertainment" }
      ]
    },
    {
      day: 4,
      title: "Мода, шопинг и панорамы",
      activities: [
        { time: "09:00", title: "Завтрак в Cafe de Flore", description: "Атмосферный завтрак в культовом кафе интеллектуалов Сен-Жермен.", cost: 1500, type: "food" },
        { time: "10:30", title: "Шопинг в Galeries Lafayette", description: "Посещение универмага, подъем на смотровую крышу с панорамным видом.", cost: 4500, type: "shopping" },
        { time: "13:30", title: "Легкий ланч на крыше", description: "Пробуем закуски и лимонад с панорамным видом на Париж.", cost: 1200, type: "food" },
        { time: "16:00", title: "Прогулка по Кварталу Маре", description: "Изучаем концепт-сторы, исторические особняки и еврейские пекарни.", cost: 0, type: "relaxation" },
        { time: "19:30", title: "Ужин в традиционном Бульоне", description: "Классический ужин в Bouillon Chartier по демократичным ценам.", cost: 2000, type: "food" }
      ]
    },
    {
      day: 5,
      title: "Сувениры и прощание",
      activities: [
        { time: "09:30", title: "Заключительный завтрак", description: "Горячий багет, джем и ароматный капучино.", cost: 600, type: "food" },
        { time: "11:00", title: "Покупка сувениров", description: "Покупаем сыры, шоколад, макароны и винтажные открытки у букинистов на набережной.", cost: 5000, type: "shopping" },
        { time: "13:00", title: "Освобождение номеров", description: "Выселение из отеля, сдача багажа в камеру хранения.", cost: 0, type: "checkin" },
        { time: "15:00", title: "Прощальный чай в Люксембургском саду", description: "Спокойный отдых перед дорогой у королевского дворца.", cost: 500, type: "relaxation" },
        { time: "17:00", title: "Трансфер в аэропорт", description: "Отправление на экспрессе в аэропорт к вашему рейсу.", cost: 1000, type: "transport" }
      ]
    }
  ],
  budget: {
    flight: 25000,
    hotel: 45000,
    food: 23000,
    transport: 8000,
    excursions: 5000,
    entertainment: 4000,
    shopping: 5000,
    currencyCode: "EUR",
    conversionRateToUSD: 1.08
  },
  hotels: [
    { name: "Starlight Boutique Hotel", rating: 4.9, pricePerNight: 9500, distanceToCenter: "300 м до центра", amenities: ["Wi-Fi", "Бассейн", "Завтрак включен", "Спа-зона"], reviews: ["Потрясающий сервис!", "Очень уютно, стильный дизайн в стиле лофт."], photoQuery: "boutique hotel room" },
    { name: "Cosmo Premium Apartments", rating: 4.7, pricePerNight: 7200, distanceToCenter: "1.2 км до center", amenities: ["Собственная кухня", "Wi-Fi", "Стиральная машина"], reviews: ["Удобное расположение, прекрасный вид с балкона.", "Есть все необходимое для проживания."], photoQuery: "modern apartment interior" },
    { name: "Eco Green Park Hotel", rating: 4.6, pricePerNight: 5500, distanceToCenter: "2.5 км до центра", amenities: ["Рядом с парком", "Прокат велосипедов", "Wi-Fi"], reviews: ["Тихое место для отдыха душой.", "Замечательный вежливый персонал."], photoQuery: "cozy resort cottage" }
  ],
  restaurants: [
    { name: "L'Aura Gastronomy", rating: 4.8, cuisine: "Высокая местная кухня", averageCheck: "3500 руб", hours: "12:00 - 23:00", photoQuery: "fine dining plate restaurant", description: "Изысканный ресторан авторской кухни с живой классической музыкой." },
    { name: "Bistro \"У Дяди Франка\"", rating: 4.6, cuisine: "Домашняя семейная кухня", averageCheck: "1500 руб", hours: "09:00 - 22:00", photoQuery: "bistro terrace cozy", description: "Уютное семейное местечко, знаменитое своими пирогами и радушием хозяина." },
    { name: "Raw & Green Cafe", rating: 4.5, cuisine: "Веганская и здоровая еда", averageCheck: "1100 руб", hours: "08:00 - 21:00", photoQuery: "healthy salad bowl cafe", description: "Легкие завтраки, смузи-боулы, натуральные десерты без сахара." }
  ],
  weather: {
    current: { temp: 22, description: "Ясно и солнечно" },
    forecast: [
      { dayName: "Пн", temp: 23, description: "Солнечно", icon: "sun" },
      { dayName: "Вт", temp: 21, description: "Переменная облачность", icon: "cloud-sun" },
      { dayName: "Ср", temp: 19, description: "Небольшой дождь", icon: "cloud-rain" },
      { dayName: "Чт", temp: 22, description: "Ясно", icon: "sun" },
      { dayName: "Пт", temp: 24, description: "Ясно", icon: "sun" },
      { dayName: "Сб", temp: 25, description: "Солнечно", icon: "sun" },
      { dayName: "Вс", temp: 23, description: "Облачно", icon: "cloud-sun" }
    ],
    clothingTips: "Днем рекомендуется легкая одежда (футболки, шорты, легкие платья), но обязательно захватите ветровку или кардиган для вечерних прогулок, а также зонт на случай кратковременного дождя."
  }
};

export default function App() {
  const [currentView, setView] = useState<string>("landing"); // landing, planner, dashboard
  const [currentUser, setCurrentUser] = useState<User | null>({
    email: "maksutovomurbek680@gmail.com",
    name: "Мурабек",
    isPro: false
  });
  
  const [activeCabinetTab, setActiveCabinetTab] = useState<string>("trips"); // trips, favorites, profile, settings, notifications
  const [searchHistory, setSearchHistory] = useState<string[]>(["Париж", "Токио", "Рим"]);
  
  const [tripPlan, setTripPlan] = useState<TripPlan>(INITIAL_TRIP_PLAN);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([INITIAL_TRIP_PLAN]);

  // Auth modalities
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<"login" | "register" | "recovery">("login");

  // Planner Form Inputs
  const [fromCity, setFromCity] = useState("Москва");
  const [toCity, setToCity] = useState("Париж");
  const [startDate, setStartDate] = useState("2026-08-12");
  const [daysCount, setDaysCount] = useState<number>(5);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [budgetLimit, setBudgetLimit] = useState<number>(100000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["culture", "history", "food"]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const interestsOptions = [
    { id: "beach", label: "🏖️ Пляжи" },
    { id: "nature", label: "🌲 Природа" },
    { id: "history", label: "🏰 История" },
    { id: "museums", label: "🏛️ Музеи" },
    { id: "shopping", label: "🛍️ Шопинг" },
    { id: "nightlife", label: "💃 Ночная жизнь" },
    { id: "food", label: "🍽️ Гастрономия" },
    { id: "mountains", label: "🏔️ Горы" }
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toCity.trim()) {
      alert("Пожалуйста, введите город назначения!");
      return;
    }

    setIsGenerating(true);
    setGenerationError("");

    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromCity,
          destination: toCity,
          startDate,
          days: daysCount,
          travelers: travelersCount,
          budget: budgetLimit,
          interests: selectedInterests.map(id => interestsOptions.find(o => o.id === id)?.label)
        })
      });

      if (response.ok) {
        const generated: TripPlan = await response.json();
        setTripPlan(generated);
        // Add to history and saved trips automatically
        if (!searchHistory.includes(generated.destination)) {
          setSearchHistory([generated.destination, ...searchHistory.slice(0, 4)]);
        }
        setSavedTrips([generated, ...savedTrips]);
        
        // Scroll to results seamlessly
        setTimeout(() => {
          document.getElementById("planner-results-title")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        setGenerationError("Не удалось составить маршрут. Сервер вернул ошибку.");
      }
    } catch (err) {
      console.error(err);
      setGenerationError("Ошибка сети. Пожалуйста, проверьте подключение и повторите.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpgradeToPro = () => {
    if (!currentUser) {
      setAuthInitialTab("login");
      setIsAuthOpen(true);
      return;
    }
    setCurrentUser({
      ...currentUser,
      isPro: true
    });
    alert("Поздравляем! Ваш статус успешно обновлен до TripPilot Pro. Все безлимитные возможности ИИ теперь активны! ⭐");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("landing");
  };

  const handleOpenAuth = (tab: "login" | "register") => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  const handleDeleteSavedTrip = (idxToDelete: number) => {
    setSavedTrips(savedTrips.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-50 font-sans relative overflow-x-hidden flex flex-col">
      {/* Visual Ambient Atmosphere Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[0%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
      </div>

      <Navbar
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        currentView={currentView}
        setView={setView}
        onUpgradeToPro={handleUpgradeToPro}
      />

      {/* Auth Modals Container */}
      <AuthModals
        isOpen={isAuthOpen}
        initialTab={authInitialTab}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(usr) => setCurrentUser(usr)}
      />

      {/* Primary view Router Switch */}
      {currentView === "landing" && (
        <div className="flex-1 relative" id="landing-page-root">
          {/* Hero Section */}
          <div className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto z-10">
            <div className="inline-flex items-center space-x-1 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-indigo-300 font-semibold mb-6 hover:bg-white/10 transition-colors">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Умный ИИ-планировщик TripPilot 2.0</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Путешествуйте умнее <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">вместе с ИИ</span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Планируйте маршрут, рассчитывайте бюджет, находите лучшие места и путешествуйте без лишних забот. Полностью на русском языке.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setView("planner")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-bold text-white rounded-2xl shadow-xl shadow-indigo-950/50 hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
                id="hero-primary-cta"
              >
                <span>Начать путешествие</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => {
                  setView("planner");
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-sm font-semibold text-white rounded-2xl hover:bg-white/10 transition-all"
                id="hero-secondary-cta"
              >
                Попробовать бесплатно
              </button>
            </div>
          </div>

          {/* Premium Bento Grid Advantages Showcase */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10" id="landing-bento-grid">
            {/* Bento Block 1: Audio Guide & Online Guide */}
            <div className="md:col-span-8 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute right-0 bottom-0 opacity-10 translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500">
                <Landmark className="h-64 w-64 text-indigo-400" />
              </div>
              <div>
                <span className="text-2xl mb-3 block">🎧</span>
                <h3 className="text-lg font-bold text-white">Интеллектуальный ИИ-аудиогид</h3>
                <p className="text-xs text-gray-400 mt-2 max-w-md leading-relaxed">
                  Больше никаких скучных печатных буклетов и дорогих экскурсоводов. Слушайте художественную, захватывающую историю от ИИ прямо во время прогулок по городу с воспроизведением в реальном времени.
                </p>
              </div>
              <span className="text-xs text-indigo-400 font-bold uppercase mt-6 tracking-wider flex items-center space-x-1.5 cursor-pointer" onClick={() => setView("planner")}>
                <span>Исследовать путеводители</span>
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>

            {/* Bento Block 2: Live Weather snippet */}
            <div className="md:col-span-4 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/20 to-purple-950/20 p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">☀️</span>
                <h3 className="text-lg font-bold text-white">Точная погода</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Актуальный прогноз на 7 дней в выбранном городе с индивидуальными советами по выбору гардероба от TripPilot ИИ.
                </p>
              </div>
              <div className="flex items-center space-x-2.5 bg-white/5 border border-white/5 p-3 rounded-2xl mt-6">
                <span className="text-xl font-bold text-white">+24°C</span>
                <span className="text-[10px] text-gray-400">Идеально для вечерних прогулок по Монмартру!</span>
              </div>
            </div>

            {/* Bento Block 3: Interactive Map */}
            <div className="md:col-span-4 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">📍</span>
                <h3 className="text-lg font-bold text-white">Умная Карта Локаций</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Отели, рестораны, музеи, аптеки и даже безопасные/опасные районы города — всё нанесено на интерактивную карту для вашего удобства.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1">
                <span className="text-[9px] font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full">Отели</span>
                <span className="text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">Рестораны</span>
                <span className="text-[9px] font-bold bg-pink-500/10 border border-pink-500/20 text-pink-400 px-2.5 py-1 rounded-full">Шопинг</span>
              </div>
            </div>

            {/* Bento Block 4: Budget Calculator Donut */}
            <div className="md:col-span-8 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">📊</span>
                <h3 className="text-lg font-bold text-white">Планирование Бюджета</h3>
                <p className="text-xs text-gray-400 mt-2 max-w-md leading-relaxed">
                  Вводите ваш финансовый лимит — ИИ автоматически распределит расходы на авиабилеты, гостиницы, питание, развлечения и покупки, отображая красивую интерактивную диаграмму.
                </p>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-6">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>

          {/* Pricing component */}
          <PricingSection onUpgrade={handleUpgradeToPro} isPro={currentUser?.isPro || false} />

          {/* Interactive FAQs component */}
          <FAQSection />

          {/* About us / contact form */}
          <AboutSection />
        </div>
      )}

      {currentView === "planner" && (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-12" id="planner-view-root">
          {/* Main Planner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left form Sidebar */}
            <aside className="lg:col-span-4 rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Compass className="h-5.5 w-5.5 text-indigo-400" />
                  <span>Новое приключение ИИ</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Заполните поля, чтобы ИИ составил премиальный и детальный план поездки.
                </p>
              </div>

              {generationError && (
                <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-400">
                  {generationError}
                </div>
              )}

              <form onSubmit={handleCreateTrip} className="space-y-4">
                {/* From City input */}
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Откуда вылет</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      placeholder="Например, Москва"
                      className="bg-transparent w-full outline-none text-xs font-semibold text-white placeholder:text-gray-500"
                      id="input-from-city"
                    />
                  </div>
                </div>

                {/* Destination input */}
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <label className="text-[10px] uppercase text-indigo-400 font-bold block mb-1">Куда хотите поехать</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      placeholder="Например, Рим, Париж, Токио"
                      className="bg-transparent w-full outline-none text-xs font-semibold text-white placeholder:text-gray-500"
                      id="input-to-city"
                    />
                  </div>
                </div>

                {/* Dates & duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                    <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Дата поездки</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-transparent w-full outline-none text-xs font-semibold text-white"
                      id="input-start-date"
                    />
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                    <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Количество дней</label>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={daysCount}
                      onChange={(e) => setDaysCount(parseInt(e.target.value) || 1)}
                      className="bg-transparent w-full outline-none text-xs font-semibold text-white"
                      id="input-days-count"
                    />
                  </div>
                </div>

                {/* Travelers count & budget */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                    <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Кол-во человек</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                      className="bg-transparent w-full outline-none text-xs font-semibold text-white"
                      id="input-travelers-count"
                    />
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                    <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Бюджет (₽)</label>
                    <input
                      type="number"
                      min={5000}
                      step={5000}
                      value={budgetLimit}
                      onChange={(e) => setBudgetLimit(parseInt(e.target.value) || 50000)}
                      className="bg-transparent w-full outline-none text-xs font-semibold text-white"
                      id="input-budget-limit"
                    />
                  </div>
                </div>

                {/* Interests Selection checkboxes list */}
                <div>
                  <label className="text-[10px] uppercase text-gray-400 font-bold block mb-2">Ваши интересы</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {interestsOptions.map((interest) => {
                      const isSelected = selectedInterests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                            isSelected 
                              ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300" 
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                          id={`interest-btn-${interest.id}`}
                        >
                          {interest.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-xs text-white shadow-xl shadow-blue-900/30 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-wait"
                  id="generate-trip-submit"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      <span>ИИ составляет маршрут...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4.5 w-4.5" />
                      <span>Создать маршрут</span>
                    </>
                  )}
                </button>
              </form>

              {/* Pro Promotion Sidebar Widget */}
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-4.5 rounded-2xl border border-white/10 relative overflow-hidden">
                <p className="text-xs font-extrabold text-amber-300 flex items-center space-x-1">
                  <span>TripPilot Pro ⭐</span>
                </p>
                <p className="text-[10px] text-gray-300 mt-1 leading-relaxed">
                  Получите доступ к скрытым местам от местных жителей, аудиогиду по достопримечательностям, оптимизации расходов и PDF экспорту.
                </p>
                <button 
                  onClick={handleUpgradeToPro} 
                  className="mt-3 text-xs text-white underline font-semibold hover:text-indigo-300"
                >
                  Активировать
                </button>
              </div>
            </aside>

            {/* Right side interactive results showcase */}
            <main className="lg:col-span-8 space-y-8">
              {isGenerating ? (
                <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 backdrop-blur-md text-center flex flex-col items-center justify-center space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg relative">
                    <Loader2 className="h-7 w-7 animate-spin" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Создаем ваше ИИ-путешествие...</h3>
                  <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                    ИИ анализирует сотни отзывов, подбирает оптимальный таймлайн, выстраивает бюджет и формирует персональные советы. Это займет всего 5-10 секунд.
                  </p>
                </div>
              ) : (
                <>
                  <div id="planner-results-title">
                    <ItineraryView plan={tripPlan} />
                  </div>

                  {/* Hot Hotels Search display */}
                  <section className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🏨</span>
                      <h3 className="text-lg font-bold text-white">Рекомендованные отели с ИИ</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tripPlan.hotels?.map((hotel, idx) => (
                        <div 
                          key={idx} 
                          className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col justify-between"
                          id={`hotel-card-${idx}`}
                        >
                          <div className="h-32 bg-slate-800 relative">
                            {/* Visual Placeholders using Unsplash free placeholder queries */}
                            <img 
                              src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80`} 
                              alt={hotel.name}
                              className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span>{hotel.rating}</span>
                            </div>
                          </div>
                          
                          <div className="p-4 space-y-3">
                            <div>
                              <h4 className="text-xs font-bold text-white line-clamp-1">{hotel.name}</h4>
                              <p className="text-[10px] text-gray-400 mt-1">{hotel.distanceToCenter}</p>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {hotel.amenities?.slice(0, 3).map((amenity, aIdx) => (
                                <span key={aIdx} className="px-2 py-0.5 bg-white/5 border border-white/5 text-[9px] text-gray-400 rounded">
                                  {amenity}
                                </span>
                              ))}
                            </div>

                            <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                              <div>
                                <span className="text-[9px] text-gray-500 block">За ночь</span>
                                <span className="text-xs font-extrabold text-emerald-400">
                                  {hotel.pricePerNight?.toLocaleString("ru-RU")} ₽
                                </span>
                              </div>
                              <button className="text-[10px] font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg px-2.5 py-1.5 transition-all">
                                Забронировать
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Curry restaurants lists */}
                  <section className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🍽️</span>
                      <h3 className="text-lg font-bold text-white">Лучшие рестораны & кафе по мнению ИИ</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tripPlan.restaurants?.map((restaurant, idx) => (
                        <div 
                          key={idx} 
                          className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col justify-between"
                          id={`restaurant-card-${idx}`}
                        >
                          <div className="h-32 bg-slate-800 relative">
                            <img 
                              src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80`} 
                              alt={restaurant.name}
                              className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span>{restaurant.rating}</span>
                            </div>
                          </div>

                          <div className="p-4 space-y-3">
                            <div>
                              <h4 className="text-xs font-bold text-white line-clamp-1">{restaurant.name}</h4>
                              <p className="text-[10px] text-indigo-400 font-semibold mt-1">{restaurant.cuisine}</p>
                            </div>
                            
                            <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-2">
                              {restaurant.description || "Уютное гастрономическое заведение с изысканным вкусом."}
                            </p>

                            <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                              <div>
                                <span className="text-[9px] text-gray-500 block">Средний чек</span>
                                <span className="text-xs font-bold text-white">{restaurant.averageCheck}</span>
                              </div>
                              <span className="text-[9px] text-gray-400 font-medium bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                {restaurant.hours}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Interactive Map Block */}
                  <MapMock points={tripPlan.mapPoints} destination={tripPlan.destination} />

                  {/* Budget statistics & Currency Converter */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    <div className="md:col-span-8 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md">
                      <div className="mb-4">
                        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Финансы</p>
                        <h4 className="text-base font-bold text-white">Диаграмма бюджета расходов</h4>
                      </div>
                      <BudgetChart budget={tripPlan.budget} />
                    </div>

                    <div className="md:col-span-4 flex flex-col justify-between">
                      <CurrencyConverter 
                        localCurrencyCode={tripPlan.budget?.currencyCode} 
                        conversionRateToUSD={tripPlan.budget?.conversionRateToUSD} 
                      />
                    </div>
                  </div>

                  {/* Weather and advice widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    <div className="md:col-span-7">
                      <WeatherWidget weather={tripPlan.weather} destination={tripPlan.destination} />
                    </div>

                    <div className="md:col-span-5">
                      <AIChat currentTripContext={tripPlan} />
                    </div>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      )}

      {currentView === "dashboard" && currentUser && (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10" id="cabinet-view-root">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cabinet Navigation Left Menu */}
            <aside className="lg:col-span-3 bg-slate-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-6">
              <div className="flex items-center space-x-3.5 pb-4 border-b border-white/5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-black uppercase shadow-lg">
                  {currentUser.name.slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center space-x-1">
                    <span>{currentUser.name}</span>
                    {currentUser.isPro && <span className="text-amber-400 text-xs">⭐</span>}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <button
                  onClick={() => setActiveCabinetTab("trips")}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeCabinetTab === "trips" 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-trips-btn"
                >
                  <Plane className="h-4.5 w-4.5" />
                  <span>Мои путешествия</span>
                </button>
                <button
                  onClick={() => setActiveCabinetTab("favorites")}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeCabinetTab === "favorites" 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-favorites-btn"
                >
                  <Heart className="h-4.5 w-4.5" />
                  <span>Избранное</span>
                </button>
                <button
                  onClick={() => setActiveCabinetTab("profile")}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeCabinetTab === "profile" 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-profile-btn"
                >
                  <UserIcon className="h-4.5 w-4.5" />
                  <span>Профиль</span>
                </button>
                <button
                  onClick={() => setActiveCabinetTab("settings")}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeCabinetTab === "settings" 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-settings-btn"
                >
                  <Settings className="h-4.5 w-4.5" />
                  <span>Настройки</span>
                </button>
                <button
                  onClick={() => setActiveCabinetTab("notifications")}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeCabinetTab === "notifications" 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-notifications-btn"
                >
                  <Bell className="h-4.5 w-4.5" />
                  <span>Уведомления</span>
                </button>
              </div>

              {!currentUser.isPro && (
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4.5 rounded-2xl">
                  <p className="text-xs font-bold text-amber-300">Режим ограничений</p>
                  <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                    Вы используете бесплатный тариф. Активируйте PRO для безлимита.
                  </p>
                  <button 
                    onClick={handleUpgradeToPro}
                    className="mt-3.5 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-[10px] font-extrabold text-slate-950 rounded-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    Активировать PRO
                  </button>
                </div>
              )}
            </aside>

            {/* Cabinet View Content Switcher */}
            <main className="lg:col-span-9 space-y-6">
              {activeCabinetTab === "trips" && (
                <div className="space-y-6" id="trips-tab-root">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Мои путешествия</h2>
                      <p className="text-xs text-gray-400 mt-0.5">Список всех ваших сохраненных планов поездок</p>
                    </div>
                    <button 
                      onClick={() => setView("planner")} 
                      className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Новое путешествие</span>
                    </button>
                  </div>

                  {savedTrips.length === 0 ? (
                    <div className="border border-white/5 bg-slate-900/40 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3.5">
                      <Plane className="h-10 w-10 text-gray-600" />
                      <p className="text-sm font-semibold text-gray-400">У вас пока нет сохраненных путешествий.</p>
                      <button 
                        onClick={() => setView("planner")}
                        className="text-xs text-indigo-400 hover:underline font-bold"
                      >
                        Создайте свое первое приключение прямо сейчас!
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedTrips.map((saved, idx) => (
                        <div 
                          key={idx} 
                          className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col justify-between"
                          id={`saved-trip-card-${idx}`}
                        >
                          <div className="h-32 bg-slate-800 relative">
                            <img 
                              src={`https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80`} 
                              alt={saved.destination}
                              className="w-full h-full object-cover opacity-75"
                            />
                            <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                              {saved.durationDays} дней
                            </div>
                            <button 
                              onClick={() => handleDeleteSavedTrip(idx)}
                              className="absolute top-2.5 right-2.5 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white p-2 rounded-xl border border-red-500/30 transition-colors"
                              title="Удалить путешествие"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="p-4.5 space-y-4">
                            <div>
                              <h3 className="text-base font-bold text-white tracking-tight">{saved.destination}</h3>
                              <p className="text-xs text-gray-400 mt-1">Из: {saved.from} • {saved.travelersCount} человек</p>
                            </div>

                            <div className="border-t border-white/5 pt-3.5 flex items-center justify-between">
                              <div>
                                <span className="text-[9px] text-gray-500 block">Общий бюджет</span>
                                <span className="text-sm font-extrabold text-emerald-400">
                                  {saved.totalBudget?.toLocaleString("ru-RU")} ₽
                                </span>
                              </div>
                              <button 
                                onClick={() => {
                                  setTripPlan(saved);
                                  setView("planner");
                                }}
                                className="flex items-center space-x-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-all"
                              >
                                <span>Открыть</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* AI Recommendations based on search behavior and favorites */}
                  <section className="bg-gradient-to-br from-indigo-950/10 to-purple-950/10 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                    <div className="flex items-center space-x-2 text-indigo-300 mb-4">
                      <Sparkles className="h-5 w-5" />
                      <h4 className="text-sm font-bold uppercase tracking-wider">Персональные рекомендации ИИ</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                      На основе вашей любви к культурным и гастрономическим приключениям, ИИ рекомендует рассмотреть следующие удивительные направления:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">🇯🇵 Киото, Япония</span>
                          <span className="text-[10px] text-gray-400 mt-1 block">Уникальные храмы, сады камней и гастрономия</span>
                        </div>
                        <button 
                          onClick={() => {
                            setToCity("Киото");
                            setView("planner");
                          }} 
                          className="text-[10px] font-bold text-indigo-400 hover:underline"
                        >
                          Спланировать
                        </button>
                      </div>

                      <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">🇮🇹 Рим, Италия</span>
                          <span className="text-[10px] text-gray-400 mt-1 block">Величественные древности и лучшая паста в мире</span>
                        </div>
                        <button 
                          onClick={() => {
                            setToCity("Рим");
                            setView("planner");
                          }} 
                          className="text-[10px] font-bold text-indigo-400 hover:underline"
                        >
                          Спланировать
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeCabinetTab === "favorites" && (
                <div className="space-y-4" id="favorites-tab-root">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Избранные локации</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Места, отели и рестораны, которые вы сохранили для будущих поездок</p>
                  </div>

                  <div className="border border-white/5 bg-slate-900/40 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                    <Heart className="h-8 w-8 text-gray-600" />
                    <p className="text-xs font-semibold text-gray-400">У вас пока нет сохраненных избранных мест.</p>
                    <p className="text-[10px] text-gray-500">Нажимайте на иконку сердечка на карточках отелей и ресторанов, чтобы сохранить их здесь.</p>
                  </div>
                </div>
              )}

              {activeCabinetTab === "profile" && (
                <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-6" id="profile-tab-root">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Профиль пользователя</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Редактируйте свои личные данные и настройки аккаунта</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-gray-400 font-bold block">Полное имя</label>
                      <input 
                        type="text" 
                        defaultValue={currentUser.name} 
                        className="w-full text-xs rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-500/50" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-gray-400 font-bold block">Электронная почта</label>
                      <input 
                        type="email" 
                        disabled 
                        defaultValue={currentUser.email} 
                        className="w-full text-xs rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 outline-none cursor-not-allowed" 
                      />
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 flex justify-end">
                    <button 
                      onClick={() => alert("Изменения успешно сохранены!")}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white shadow-md transition-all"
                    >
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              )}

              {activeCabinetTab === "settings" && (
                <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-6" id="settings-tab-root">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Настройки аккаунта</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Управляйте безопасностью и личными предпочтениями</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div>
                        <span className="text-xs font-bold text-white block">Двухфакторная аутентификация</span>
                        <span className="text-[10px] text-gray-400">Дополнительная защита для вашего профиля</span>
                      </div>
                      <input type="checkbox" className="h-4 w-4 rounded bg-slate-800 accent-indigo-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div>
                        <span className="text-xs font-bold text-white block">Оптимальная валюта</span>
                        <span className="text-[10px] text-gray-400">По умолчанию отображать цены в рублях (₽)</span>
                      </div>
                      <select className="bg-slate-800 border border-white/10 rounded-lg text-xs p-1 text-white">
                        <option>RUB (₽)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeCabinetTab === "notifications" && (
                <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4" id="notifications-tab-root">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Уведомления</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Держите руку на пульсе ваших поездок</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">Добро пожаловать в TripPilot AI! ✈️</span>
                        <span className="text-[10px] text-gray-400 leading-relaxed mt-1 block">
                          Мы рады видеть вас в числе наших путешественников. Начните свое планирование во вкладке Планировщик!
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-500 font-medium">Только что</span>
                    </div>

                    <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">ИИ-Обновление: Париж, Франция 🌟</span>
                        <span className="text-[10px] text-gray-400 leading-relaxed mt-1 block">
                          Маршрут по Парижу был обновлен с включением скрытых верандных ресторанов и актуальной погоды.
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-500 font-medium">1 день назад</span>
                    </div>
                  </div>
                </div>
              )}
            </main>

          </div>
        </div>
      )}

      {/* Styled Universal Site Footer */}
      <footer className="mt-auto border-t border-white/10 bg-slate-950/60 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md">
              <Plane className="h-4 w-4 rotate-45 text-white" />
            </div>
            <span className="text-sm font-bold text-white">TripPilot <span className="text-indigo-400">AI</span></span>
          </div>

          <p className="text-[11px] text-gray-500">
            © 2026 TripPilot AI. Разработано специально для интеллектуального планирования путешествий. Все права защищены.
          </p>

          <div className="flex space-x-4">
            <button onClick={() => setView("landing")} className="hover:text-white transition-colors">Главная</button>
            <button onClick={() => setView("planner")} className="hover:text-white transition-colors">Планировщик</button>
            <button 
              onClick={() => {
                setView("landing");
                setTimeout(() => {
                  document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }} 
              className="hover:text-white transition-colors"
            >
              Тарифы
            </button>
            <button 
              onClick={() => {
                setView("landing");
                setTimeout(() => {
                  document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }} 
              className="hover:text-white transition-colors"
            >
              О нас
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
