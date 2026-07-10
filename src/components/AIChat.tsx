import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, ArrowRight, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface AIChatProps {
  currentTripContext: any | null;
}

const QUICK_PROMPTS = [
  "Что посмотреть сегодня?",
  "Где вкусно поесть?",
  "Какие места бесплатные?",
  "Безопасно ли здесь вечером?",
  "Что интересного рядом?",
  "Как сэкономить бюджет?",
];

export default function AIChat({ currentTripContext }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Привет! Я твой персональный ИИ-ассистент TripPilot. Спроси меня о лучших заведениях, тайных тропах местных жителей или как оптимизировать расходы! Что тебя интересует?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages,
          context: currentTripContext,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", text: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Извините, произошла ошибка связи с ИИ-моделью. Пожалуйста, попробуйте еще раз.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Не удалось подключиться к серверу. Пожалуйста, проверьте интернет-соединение.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[550px] rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden" id="ai-chat-assistant">
      {/* Chat Header */}
      <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-slate-900 animate-pulse"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Персональный ИИ-Гид</h3>
            <p className="text-[10px] text-emerald-400 font-semibold uppercase">В сети • TripPilot AI</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={index}
              className={`flex items-start gap-2.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              id={`chat-msg-${index}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-bold uppercase ${
                isUser 
                  ? "bg-slate-800 border-white/10 text-indigo-400" 
                  : "bg-indigo-600/20 border-indigo-500/20 text-indigo-400"
              }`}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
                isUser 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-white/5 border border-white/5 text-gray-100 rounded-tl-none"
              }`}>
                {/* Format markdown simple lists/bold and paragraphs */}
                <div className="space-y-1 whitespace-pre-line">
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5 mr-auto">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/20 text-indigo-400">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/5 p-3.5 rounded-tl-none">
              <div className="flex items-center space-x-2 text-xs text-indigo-400 font-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>ИИ думает...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 bg-white/5 border-t border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex space-x-1.5 py-1">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              disabled={isLoading}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-full px-3 py-1.5 transition-all shrink-0 cursor-pointer disabled:opacity-50"
              id={`quick-prompt-${prompt.slice(0, 5)}`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="p-3 bg-white/5 border-t border-white/10 flex items-center space-x-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Спроси меня о чем угодно..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-500"
          disabled={isLoading}
          id="chat-input"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-md disabled:opacity-50"
          id="chat-send-btn"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
