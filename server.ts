import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API securely on the server
let aiClient: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini Client successfully initialized on server.");
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined. App will run in demo fallback mode.");
  }
} catch (error) {
  console.error("Error initializing GoogleGenAI client:", error);
}

// Helper to provide a rich fallback trip in Russian when API key is missing or error occurs
function getFallbackTrip(from: string, destination: string, days: number, travelers: number, budgetType: any): any {
  const destName = destination || "Париж";
  const fromName = from || "Москва";
  const numDays = days || 5;
  const numTravelers = travelers || 2;
  
  // Custom adjustments based on destination to make fallbacks feel customized
  let flightCost = 25000;
  let hotelCost = 8000 * numDays;
  let foodCost = 3000 * numDays * numTravelers;
  let transportCost = 1500 * numDays;
  let excursionsCost = 4000;
  let entertainmentCost = 3500;
  let shoppingCost = 5000;
  let currencyCode = "EUR";
  let conversionRateToUSD = 1.08;

  if (destName.toLowerCase().includes("ток") || destName.toLowerCase().includes("япон")) {
    currencyCode = "JPY";
    conversionRateToUSD = 0.0065;
    flightCost = 55000;
    hotelCost = 12000 * numDays;
  } else if (destName.toLowerCase().includes("дуб") || destName.toLowerCase().includes("оаэ")) {
    currencyCode = "AED";
    conversionRateToUSD = 0.27;
    flightCost = 35000;
    hotelCost = 15000 * numDays;
  } else if (destName.toLowerCase().includes("бали") || destName.toLowerCase().includes("индон")) {
    currencyCode = "IDR";
    conversionRateToUSD = 0.000062;
    flightCost = 60000;
    hotelCost = 5000 * numDays;
  }

  const mapPoints = [
    {
      id: "pt-1",
      name: `Отель "Grand Plaza ${destName}"`,
      type: "hotel",
      lat: 55.7558 + (Math.random() - 0.5) * 0.05,
      lng: 37.6173 + (Math.random() - 0.5) * 0.05,
      description: "Роскошный отель в самом сердце города с потрясающим видом.",
      rating: 4.8,
      priceLevel: "$$$"
    },
    {
      id: "pt-2",
      name: "Ресторан местной кухни \"Вкус Традиций\"",
      type: "restaurant",
      lat: 55.7558 + (Math.random() - 0.5) * 0.05,
      lng: 37.6173 + (Math.random() - 0.5) * 0.05,
      description: "Аутентичный ресторан, славящийся своими фирменными блюдами по старинным рецептам.",
      rating: 4.7,
      priceLevel: "$$"
    },
    {
      id: "pt-3",
      name: "Кафе \"Ароматный Уголок\"",
      type: "restaurant",
      lat: 55.7558 + (Math.random() - 0.5) * 0.05,
      lng: 37.6173 + (Math.random() - 0.5) * 0.05,
      description: "Идеальное место для утреннего кофе со свежей выпечкой.",
      rating: 4.5,
      priceLevel: "$"
    },
    {
      id: "pt-4",
      name: "Главный Исторический Музей",
      type: "museum",
      lat: 55.7558 + (Math.random() - 0.5) * 0.05,
      lng: 37.6173 + (Math.random() - 0.5) * 0.05,
      description: "Огромная коллекция исторических артефактов и интерактивных выставок.",
      rating: 4.9
    },
    {
      id: "pt-5",
      name: "Центральный Городской Парк",
      type: "park",
      lat: 55.7558 + (Math.random() - 0.5) * 0.05,
      lng: 37.6173 + (Math.random() - 0.5) * 0.05,
      description: "Зеленый оазис посреди мегаполиса с озерами и тенистыми аллеями.",
      rating: 4.6
    },
    {
      id: "pt-6",
      name: "Торговый Пассаж",
      type: "shopping",
      lat: 55.7558 + (Math.random() - 0.5) * 0.05,
      lng: 37.6173 + (Math.random() - 0.5) * 0.05,
      description: "Современный молл с бутиками мировых брендов и фуд-кортом.",
      rating: 4.4
    },
    {
      id: "pt-7",
      name: "Городской Аэропорт",
      type: "airport",
      lat: 55.7558 + (Math.random() - 0.5) * 0.15,
      lng: 37.6173 + (Math.random() - 0.5) * 0.15,
      description: "Международный аэровокзал, куда прибывают рейсы.",
      rating: 4.3
    }
  ];

  const itineraryDays = [];
  for (let i = 1; i <= numDays; i++) {
    if (i === 1) {
      itineraryDays.push({
        day: 1,
        title: "Прибытие и первое знакомство",
        activities: [
          { time: "12:00", title: `Прилет в аэропорт ${destName}`, description: "Прохождение паспортного контроля, получение багажа и трансфер до отеля.", cost: 1500, type: "flight" },
          { time: "14:00", title: "Заселение в отель", description: "Регистрация, размещение в номере, небольшой отдых после перелета.", cost: 0, type: "checkin" },
          { time: "16:00", title: "Ознакомительная прогулка по центру", description: "Пешеходный маршрут по главным площадям и улицам. Первое знакомство с архитектурой.", cost: 0, type: "sightseeing" },
          { time: "19:00", title: "Ужин в местном ресторане", description: "Традиционный ужин в ресторане у отеля, дегустация фирменного блюда.", cost: 2500, type: "food" }
        ]
      });
    } else if (i === numDays) {
      itineraryDays.push({
        day: i,
        title: "Завершение путешествия и сувениры",
        activities: [
          { time: "09:00", title: "Завтрак в отеле", description: "Сытный утренний завтрак и сбор вещей перед выселением.", cost: 800, type: "food" },
          { time: "10:30", title: "Шопинг и покупка сувениров", description: "Посещение колоритных местных рынков или торговых центров. Покупаем подарки близким.", cost: 4000, type: "relaxation" },
          { time: "12:00", title: "Выселение из отеля", description: "Освобождение номера, сдача ключей. Чемоданы можно оставить в камере хранения.", cost: 0, type: "checkin" },
          { time: "14:00", title: "Обед перед дорогой", description: "Спокойный обед в любимом кафе, обсуждение лучших моментов поездки.", cost: 1200, type: "food" },
          { time: "16:00", title: "Трансфер в аэропорт", description: "Отправление на такси или экспрессе в аэропорт для обратного вылета.", cost: 1000, type: "transport" }
        ]
      });
    } else {
      itineraryDays.push({
        day: i,
        title: i === 2 ? "Культурное наследие и музеи" : i === 3 ? "Парки, природа и панорамы" : `Исследование окрестностей. День ${i}`,
        activities: [
          { time: "09:00", title: "Вкусный завтрак в кондитерской", description: "Свежая выпечка и чашка ароматного кофе или местного чая.", cost: 700, type: "food" },
          { time: "10:00", title: i === 2 ? "Экскурсия в исторический музей" : i === 3 ? "Прогулка по центральному парку" : "Экскурсия к скрытым достопримечательностям", description: i === 2 ? "Профессиональный гид расскажет о возникновении и эволюции этого удивительного места." : "Наслаждаемся природой, озерами и красивыми ландшафтными инсталляциями.", cost: 1500, type: "sightseeing" },
          { time: "13:30", title: "Обед на летней террасе", description: "Пробуем популярные блюда национальной кухни на открытом воздухе.", cost: 1400, type: "food" },
          { time: "15:30", title: i === 2 ? "Посещение смотровой площадки" : i === 3 ? "Арендованный велопробег" : "Посещение арт-галереи современного искусства", description: i === 2 ? "Великолепный панорамный обзор всего города с высоты птичьего полета. Лучшее время для фото." : "Осматриваем город с ветерком на экологичном транспорте по выделенным дорожкам.", cost: 1000, type: "relaxation" },
          { time: "19:30", title: "Вечерняя развлекательная программа", description: "Посещение уютного джаз-клуба, театрального шоу или просто прогулка под неоновыми огнями.", cost: 2000, type: "entertainment" }
        ]
      });
    }
  }

  return {
    destination: destName,
    from: fromName,
    startDate: new Date().toLocaleDateString('ru-RU'),
    durationDays: numDays,
    travelersCount: numTravelers,
    totalBudget: flightCost + hotelCost + foodCost + transportCost + excursionsCost + entertainmentCost + shoppingCost,
    guide: {
      history: `${destName} имеет богатую многовековую историю. Он развивался от небольшого поселения до крупного культурного, экономического и туристического центра, привлекая миллионы людей своим колоритом и величественной архитектурой.`,
      famousSpots: [
        { name: `Старый Город ${destName}`, description: "Историческое сердце города с мощеными улочками и старинными зданиями.", photoQuery: `${destName} old town` },
        { name: "Кафедральный собор", description: "Потрясающий памятник готической архитектуры с великолепными витражами.", photoQuery: `${destName} cathedral` },
        { name: "Смотровая башня", description: "Самая высокая точка в черте города, открывающая 360-градусный обзор.", photoQuery: `${destName} view` }
      ],
      audioGuideIntro: `Приветствуем вас в ${destName}! Наш интеллектуальный аудиогид проведет вас по самым удивительным уголкам этого города. Нажмите play, чтобы начать погружение в историю.`,
      audioGuideScript: `Добро пожаловать в захватывающий аудиотур по ${destName}. Прямо сейчас вы стоите на пороге великих открытий. Посмотрите вокруг: каждое здание здесь хранит свои тайны. Легенда гласит, что основатели города выбрали это место из-за его уникальной энергетики. Обратите внимание на шпиль центрального собора – он символизирует стремление вверх и величие духа местных жителей. Прогуливаясь далее по улочкам, вдыхайте аромат свежесваренного кофе и выпечки...`,
      facts: [
        `Жители ${destName} славятся своим гостеприимством и любовью к искусству.`,
        "В этом городе расположено одно из старейших действующих кафе на континенте.",
        "Ежегодно здесь проходит грандиозный карнавал цветов и музыки."
      ],
      bestTime: "С мая по октябрь (весна-лето-осень) — идеальное время с теплой, солнечной погодой для долгих пеших прогулок.",
      tips: [
        "Покупайте билеты в музеи заранее онлайн — это убережет вас от длинных очередей.",
        "Всегда носите с собой немного наличных местных денег для маленьких сувенирных лавок.",
        "Пользуйтесь общественным транспортом: он отлично развит и сэкономит ваш бюджет по сравнению с такси."
      ],
      safeNeighborhoods: ["Центральный культурный квартал", "Университетский городок", "Набережная парк-зоны"],
      dangerousNeighborhoods: ["Промышленная окраина у вокзала (вечером лучше избегать)", "Район старого порта после полуночи"],
      traditions: [
        "Традиция воскресных семейных обедов на открытом воздухе.",
        "Уважительное отношение к личному пространству и неторопливый ритм жизни."
      ],
      cuisine: ["Традиционные тушеные блюда", "Местные сыры и домашняя выпечка", "Легкие освежающие супы с зеленью"],
      mustTryDishes: ["Фирменный пирог с начинкой", "Национальный мясной рулет с травами", "Особый заварной десерт"],
      freeThings: ["Вход в центральные ботанические сады", "Бесплатные пешеходные экскурсии (Free Walking Tours)", "Панорамный вид с холма художников"],
      hiddenGems: ["Старинная виниловая библиотека в переулке Искусств", "Секретный внутренний дворик с фонтаном и вековыми плющами"]
    },
    mapPoints,
    itinerary: itineraryDays,
    budget: {
      flight: flightCost,
      hotel: hotelCost,
      food: foodCost,
      transport: transportCost,
      excursions: excursionsCost,
      entertainment: entertainmentCost,
      shopping: shoppingCost,
      currencyCode,
      conversionRateToUSD
    },
    hotels: [
      { name: "Starlight Boutique Hotel", rating: 4.9, pricePerNight: 9500, distanceToCenter: "300 м до центра", amenities: ["Wi-Fi", "Бассейн", "Завтрак включен", "Спа-зона"], reviews: ["Потрясающий сервис!", "Очень уютно, стильный дизайн в стиле лофт."], photoQuery: "boutique hotel room" },
      { name: "Cosmo Premium Apartments", rating: 4.7, pricePerNight: 7200, distanceToCenter: "1.2 км до центра", amenities: ["Собственная кухня", "Wi-Fi", "Стиральная машина"], reviews: ["Удобное расположение, прекрасный вид с балкона.", "Есть все необходимое для проживания."], photoQuery: "modern apartment interior" },
      { name: "Eco Green Park Hotel", rating: 4.6, pricePerNight: 5500, distanceToCenter: "2.5 км до центра", amenities: ["Рядом с парком", "Прокат велосипедов", "Wi-Fi"], reviews: ["Тихое место для отдыха душой.", "Замечательный вежливый персонал."], photoQuery: "cozy resort cottage" }
    ],
    restaurants: [
      { name: "L'Aura Gastronomy", rating: 4.8, cuisine: "Высокая местная кухня", averageCheck: "3500 руб", hours: "12:00 - 23:00", photoQuery: "fine dining plate restaurant", description: "Изысканный ресторан авторской кухни с живой классической музыкой." },
      { name: "Bistro \"У Дяди Франка\"", rating: 4.6, cuisine: "Домашняя семейная кухня", averageCheck: "1500 руб", hours: "09:00 - 22:00", photoQuery: "bistro terrace cozy", description: "Уютное семейное местечко, знаменитое своими пирогами и радушием хозяина." },
      { name: "Raw & Green Cafe", rating: 4.5, cuisine: "Веганская и здоровая еда", averageCheck: "1100 руб", hours: "08:00 - 21:00", photoQuery: "healthy salad bowl cafe", description: "Легкие завтраки, смузи-боулы, натуральные десерты без сахара." }
    ],
    weather: {
      current: { temp: 22, description: "Переменная облачность" },
      forecast: [
        { dayName: "Пн", temp: 23, description: "Солнечно", icon: "sun" },
        { dayName: "Вт", temp: 21, description: "Облачно с прояснениями", icon: "cloud-sun" },
        { dayName: "Ср", temp: 19, description: "Небольшой дождь", icon: "cloud-rain" },
        { dayName: "Чт", temp: 22, description: "Ясно", icon: "sun" },
        { dayName: "Пт", temp: 24, description: "Ясно", icon: "sun" },
        { dayName: "Сб", temp: 25, description: "Солнечно и тепло", icon: "sun" },
        { dayName: "Вс", temp: 23, description: "Переменная облачность", icon: "cloud-sun" }
      ],
      clothingTips: "Днем рекомендуется легкая одежда (футболки, шорты, легкие платья), но обязательно захватите ветровку или кардиган для вечерних прогулок, а также зонт на случай кратковременного дождя."
    }
  };
}

// Route to generate a personalized trip itinerary using Gemini API in Russian
app.post("/api/generate-trip", async (req, res) => {
  const { from, destination, startDate, days, travelers, budget, interests } = req.body;
  
  if (!destination) {
    return res.status(400).json({ error: "Пожалуйста, укажите место назначения (поле 'Куда')." });
  }

  const durationDays = parseInt(days) || 3;
  const travelersCount = parseInt(travelers) || 1;
  const numBudget = parseInt(budget) || 50000;
  const interestList = Array.isArray(interests) ? interests.join(", ") : "общее знакомство";

  if (!aiClient) {
    console.log("No AI client found. Returning beautiful custom fallback response.");
    const fallback = getFallbackTrip(from, destination, durationDays, travelersCount, budget);
    return res.json(fallback);
  }

  try {
    const prompt = `
      Ты — элитный ИИ-планировщик путешествий TripPilot AI. Составь премиальный, подробный и реалистичный план поездки.
      ВСЕ ТЕКСТОВЫЕ ПОЛЯ ДОЛЖНЫ БЫТЬ СТРОГО НА РУССКОМ ЯЗЫКЕ.
      
      Параметры поездки:
      - Откуда: ${from || "Москва"}
      - Куда (место назначения): ${destination}
      - Дата поездки: ${startDate || "в ближайшее время"}
      - Количество дней: ${durationDays} дней
      - Количество человек: ${travelersCount}
      - Примерный бюджет в рублях: ${numBudget} руб.
      - Интересы: ${interestList}

      Сгенерируй ответ строго в формате JSON, соответствующем следующей схеме:
      {
        "destination": "Название города назначения на русском",
        "from": "Название города отправления на русском",
        "startDate": "Дата",
        "durationDays": ${durationDays},
        "travelersCount": ${travelersCount},
        "totalBudget": число (итоговый бюджет в рублях),
        "guide": {
          "history": "Краткая интересная история города (2-3 абзаца)",
          "famousSpots": [
            { "name": "Название места 1", "description": "Великолепное описание", "photoQuery": "английский поисковый запрос для фото Unsplash" }
          ],
          "audioGuideIntro": "Введение аудиогида (приветствие туриста, интригующее описание)",
          "audioGuideScript": "Полный текст интересной аудиоэкскурсии (около 150-200 слов), написанный художественным, увлекательным языком для прослушивания",
          "facts": ["Интересный факт 1", "Интересный факт 2", "Интересный факт 3"],
          "bestTime": "Описание лучшего времени для посещения",
          "tips": ["Полезный совет 1", "Полезный совет 2"],
          "safeNeighborhoods": ["Безопасный район 1", "Безопасный район 2"],
          "dangerousNeighborhoods": ["Опасный или нерекомендуемый район 1", "Район 2"],
          "traditions": ["Интересная традиция 1", "Традиция 2"],
          "cuisine": ["Особенность национальной кухни 1", "Особенность 2"],
          "mustTryDishes": ["Блюдо 1, которое надо попробовать", "Блюдо 2"],
          "freeThings": ["Что посмотреть бесплатно 1", "Что посмотреть бесплатно 2"],
          "hiddenGems": ["Скрытое место 1 для местных", "Скрытое место 2"]
        },
        "mapPoints": [
          {
            "id": "уникальный id типа pt-1, pt-2...",
            "name": "Название объекта",
            "type": "один из: hotel, restaurant, museum, beach, park, shopping, pharmacy, hospital, airport, transport, sightseeing",
            "lat": число (координата широты города назначения, например, для Парижа около 48.8566),
            "lng": число (координата долготы города назначения, например, для Парижа около 2.3522),
            "description": "Описание точки на карте",
            "rating": число от 3.5 до 5.0,
            "priceLevel": "знак $, $$ или $$$"
          }
        ],
        "itinerary": [
          {
            "day": 1,
            "title": "Название первого дня",
            "activities": [
              { "time": "ЧЧ:ММ", "title": "Заголовок активности", "description": "Подробное премиум описание", "cost": стоимость в рублях (число), "type": "flight / checkin / food / sightseeing / relaxation / entertainment / transport" }
            ]
          }
        ],
        "budget": {
          "flight": число (расходы на перелет в рублях),
          "hotel": число (расходы на жилье в рублях),
          "food": число (расходы на еду в рублях),
          "transport": число (расходы на транспорт в рублях),
          "excursions": число (расходы на экскурсии в рублях),
          "entertainment": число (расходы на развлечения в рублях),
          "shopping": число (расходы на покупки в рублях),
          "currencyCode": "код местной валюты, например EUR, USD, JPY",
          "conversionRateToUSD": курс этой валюты к доллару США (число)
        },
        "hotels": [
          { "name": "Название отеля", "rating": число, "pricePerNight": число в рублях, "distanceToCenter": "расстояние, например, 400 м от центра", "amenities": ["Wi-Fi", "Завтрак"], "reviews": ["Отзыв 1", "Отзыв 2"], "photoQuery": "unsplash search query" }
        ],
        "restaurants": [
          { "name": "Название ресторана", "rating": число, "cuisine": "Кухня", "averageCheck": "средний чек, например, 1500 руб", "hours": "часы работы, например, 10:00 - 22:00", "photoQuery": "unsplash search query", "description": "Описание" }
        ],
        "weather": {
          "current": { "temp": число градусов, "description": "облачность/ясно" },
          "forecast": [
            { "dayName": "Пн", "temp": число градусов, "description": "ясно/дождь", "icon": "sun / cloud-sun / cloud-rain / cloud" }
          ],
          "clothingTips": "Какие вещи взять с собой"
        }
      }

      Важно:
      - Убедись, что сгенерировано не менее 5-8 интересных точек для карты (mapPoints) разных категорий: hotel, restaurant, sightseeing, beach, park, shopping, pharmacy, hospital, airport, transport, museum.
      - Погода должна соответствовать сезону (если дата не указана, пусть будет лето).
      - Itinerary должен содержать полноценный план на каждый день из ${durationDays} запрашиваемых дней (сделай не менее 3-4 активностей на каждый день).
      - Ответ должен быть валидным JSON-объектом. Не оборачивай ответ ни во что, кроме JSON.
    `;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (text) {
      try {
        const parsedData = JSON.parse(text.trim());
        return res.json(parsedData);
      } catch (parseErr) {
        console.error("Failed to parse JSON from Gemini response, returning fallback. Text was:", text);
        const fallback = getFallbackTrip(from, destination, durationDays, travelersCount, numBudget);
        return res.json(fallback);
      }
    } else {
      console.warn("Empty response text from Gemini. Returning fallback.");
      const fallback = getFallbackTrip(from, destination, durationDays, travelersCount, numBudget);
      return res.json(fallback);
    }
  } catch (error) {
    console.error("Error generating trip with Gemini API:", error);
    const fallback = getFallbackTrip(from, destination, durationDays, travelersCount, numBudget);
    return res.json(fallback);
  }
});

// AI Chatbot assistant route using Gemini API
app.post("/api/chat", async (req, res) => {
  const { message, history, context } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Пожалуйста, введите сообщение." });
  }

  if (!aiClient) {
    // Elegant fallback simulation
    const msgLower = message.toLowerCase();
    let reply = "Я с радостью помогу вам спланировать идеальный маршрут! К сожалению, сейчас я работаю в демонстрационном режиме без активного ключа ИИ, но вот пара советов: всегда бронируйте билеты заранее, пользуйтесь местным транспортом и ищите бесплатные дни в музеях.";
    if (msgLower.includes("поесть") || msgLower.includes("ресторан") || msgLower.includes("вкусно")) {
      reply = "Чтобы вкусно и недорого поесть, отойдите на 2-3 улицы в сторону от главных туристических достопримечательностей. Ищите небольшие заведения, где обедают местные жители — там еда всегда свежее, вкуснее и в два раза дешевле!";
    } else if (msgLower.includes("сэкономить") || msgLower.includes("бюджет") || msgLower.includes("дешево")) {
      reply = "Для экономии бюджета воспользуйтесь городскими туристическими картами (City Pass), которые объединяют проезд и скидки на музеи. Также советую покупать продукты в местных супермаркетах для пикников в красивых парках города.";
    } else if (msgLower.includes("безопасн") || msgLower.includes("вечер")) {
      reply = "В большинстве популярных туристических городов центральные улицы отлично освещены и патрулируются полицией. Однако всегда держите ценные вещи в закрытых карманах спереди и избегайте темных неосвещенных переулков и районов около вокзалов в ночное время.";
    } else if (msgLower.includes("бесплатн") || msgLower.includes("посмотреть")) {
      reply = "Почти в каждом мегаполисе есть великолепные бесплатные развлечения! Это государственные парки, ботанические сады, смотровые площадки при соборах и знаменитые Free Walking Tours. Многие крупные музеи также имеют бесплатные часы посещения в первое воскресенье месяца.";
    }
    return res.json({ text: reply });
  }

  try {
    const formattedHistory = Array.isArray(history) 
      ? history.slice(-6).map((h: any) => `${h.role === "user" ? "Клиент" : "Ассистент"}: ${h.text}`).join("\n")
      : "";

    const contextString = context ? `Текущий контекст поездки: Путешествие в ${context.destination}. Продолжительность: ${context.durationDays} дней, бюджет: ${context.totalBudget} рублей.` : "Контекст поездки пока не создан.";

    const prompt = `
      Ты — элитный, дружелюбный и высокоинтеллектуальный ИИ-ассистент в составе сервиса планирования путешествий TripPilot AI.
      Твоя цель — давать потрясающие, вдохновляющие, практичные и очень полезные советы для туристов.
      ОТВЕЧАЙ СТРОГО НА РУССКОМ ЯЗЫКЕ. Пиши вежливо, грамотно, структурировано. Используй списки и выделение жирным шрифтом.
      
      ${contextString}

      История недавней беседы:
      ${formattedHistory}

      Запрос клиента: "${message}"

      Напиши емкий, дружелюбный и полезный ответ. Избегай общих фраз, давай конкретные советы, названия блюд, лайфхаки.
    `;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const replyText = response.text || "Извините, произошел сбой при генерации ответа. Пожалуйста, попробуйте еще раз.";
    return res.json({ text: replyText });
  } catch (error) {
    console.error("Error in Gemini API chat route:", error);
    return res.status(500).json({ error: "Ошибка сервера при обработке запроса ИИ." });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: aiClient ? "AI enabled" : "Demo fallback enabled" });
});

// Configure Vite integration or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamic import of Vite to avoid loading build deps in production containers
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted for Development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static files serving mounted for Production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TripPilot AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
