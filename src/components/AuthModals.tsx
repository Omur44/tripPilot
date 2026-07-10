import React, { useState } from "react";
import { X, Mail, Lock, User, Sparkles, AlertCircle } from "lucide-react";
import { User as UserType } from "../types";

interface AuthModalsProps {
  isOpen: boolean;
  initialTab: "login" | "register" | "recovery";
  onClose: () => void;
  onSuccess: (user: UserType) => void;
}

export default function AuthModals({
  isOpen,
  initialTab,
  onClose,
  onSuccess
}: AuthModalsProps) {
  const [tab, setTab] = useState<"login" | "register" | "recovery">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Пожалуйста, заполните поле Email");
      return;
    }

    if (tab === "recovery") {
      setMessage("Инструкции по восстановлению пароля отправлены на ваш Email!");
      return;
    }

    if (tab === "login") {
      if (!password) {
        setError("Пожалуйста, введите пароль");
        return;
      }
      // Success simulation
      onSuccess({
        email,
        name: name || email.split("@")[0],
        isPro: false
      });
      onClose();
    } else {
      if (!name) {
        setError("Пожалуйста, введите ваше имя");
        return;
      }
      if (password.length < 6) {
        setError("Пароль должен содержать не менее 6 символов");
        return;
      }
      // Register success simulation
      onSuccess({
        email,
        name,
        isPro: false
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-white shadow-2xl backdrop-blur-xl transition-all"
        id="auth-modal"
      >
        {/* Glow Effects */}
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-indigo-600/30 blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-purple-600/30 blur-3xl"></div>

        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
          id="close-auth-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center relative z-10">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {tab === "login" && "Вход в TripPilot"}
            {tab === "register" && "Создать аккаунт"}
            {tab === "recovery" && "Восстановление пароля"}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            {tab === "login" && "Спланируйте путешествие вашей мечты с ИИ"}
            {tab === "register" && "Получите полный доступ к планировщику"}
            {tab === "recovery" && "Мы вышлем вам ссылку для сброса пароля"}
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-center space-x-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-4 flex items-center space-x-2 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-xs text-green-400">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {tab === "register" && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Имя</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Иван Петров"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                  id="auth-name-input"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                id="auth-email-input"
              />
            </div>
          </div>

          {tab !== "recovery" && (
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Пароль</label>
                {tab === "login" && (
                  <button
                    type="button"
                    onClick={() => setTab("recovery")}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Забыли пароль?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                  id="auth-password-input"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 hover:from-indigo-500 hover:to-purple-500 transition-all"
            id="auth-submit-btn"
          >
            {tab === "login" && "Войти в систему"}
            {tab === "register" && "Зарегистрироваться"}
            {tab === "recovery" && "Отправить инструкцию"}
          </button>
        </form>

        {/* Footer Switching links */}
        <div className="mt-6 text-center text-xs text-gray-400 relative z-10 border-t border-white/5 pt-4">
          {tab === "login" && (
            <p>
              Еще нет аккаунта?{" "}
              <button
                onClick={() => setTab("register")}
                className="font-semibold text-indigo-400 hover:underline"
              >
                Создать аккаунт
              </button>
            </p>
          )}
          {tab === "register" && (
            <p>
              Уже есть аккаунт?{" "}
              <button
                onClick={() => setTab("login")}
                className="font-semibold text-indigo-400 hover:underline"
              >
                Войти в систему
              </button>
            </p>
          )}
          {tab === "recovery" && (
            <button
              onClick={() => setTab("login")}
              className="font-semibold text-indigo-400 hover:underline"
            >
              Вернуться ко входу
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
