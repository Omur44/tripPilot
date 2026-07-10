import { Plane, Compass, User, LogOut, Sparkles, ShieldCheck } from "lucide-react";
import { User as UserType } from "../types";

interface NavbarProps {
  currentUser: UserType | null;
  onOpenAuth: (view: "login" | "register") => void;
  onLogout: () => void;
  currentView: string;
  setView: (view: string) => void;
  onUpgradeToPro: () => void;
}

export default function Navbar({
  currentUser,
  onOpenAuth,
  onLogout,
  currentView,
  setView,
  onUpgradeToPro
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => setView("landing")} 
          className="flex cursor-pointer items-center space-x-2 text-white transition-all hover:opacity-90"
          id="nav-logo"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 shadow-md">
            <Plane className="h-5 w-5 rotate-45 text-white" />
            <div className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400">
              <Sparkles className="h-2 w-2 text-black" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              TripPilot
            </span>
            <span className="ml-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              AI
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => setView("landing")}
            className={`text-sm font-medium transition-colors ${
              currentView === "landing" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            id="nav-link-home"
          >
            Главная
          </button>
          <button
            onClick={() => setView("planner")}
            className={`text-sm font-medium transition-colors ${
              currentView === "planner" ? "text-indigo-400" : "text-gray-400 hover:text-white"
            }`}
            id="nav-link-planner"
          >
            Планировщик
          </button>
          {currentUser && (
            <button
              onClick={() => setView("dashboard")}
              className={`text-sm font-medium transition-colors ${
                currentView === "dashboard" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
              id="nav-link-cabinet"
            >
              Личный кабинет
            </button>
          )}
          <button
            onClick={() => {
              setView("landing");
              setTimeout(() => {
                document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            id="nav-link-pricing"
          >
            Тарифы
          </button>
          <button
            onClick={() => {
              setView("landing");
              setTimeout(() => {
                document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            id="nav-link-faq"
          >
            Вопросы
          </button>
        </div>

        {/* User / Action Area */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              {currentUser.isPro ? (
                <div className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <span>PRO</span>
                </div>
              ) : (
                <button
                  onClick={onUpgradeToPro}
                  className="hidden sm:flex items-center space-x-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3.5 py-1 text-xs font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-indigo-500 hover:to-purple-500"
                  id="upgrade-nav-btn"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Активировать PRO</span>
                </button>
              )}

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setView("dashboard")}
                  className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white"
                  title="Личный кабинет"
                  id="user-profile-nav"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs font-semibold text-indigo-400 border border-white/10 uppercase">
                    {currentUser.name.slice(0, 2)}
                  </div>
                  <span className="hidden sm:inline max-w-[120px] truncate font-medium">
                    {currentUser.name}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-red-400"
                  title="Выйти"
                  id="logout-nav-btn"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth("login")}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                id="login-nav-btn"
              >
                Войти
              </button>
              <button
                onClick={() => onOpenAuth("register")}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black shadow-md transition-all hover:bg-gray-100 hover:scale-[1.02]"
                id="register-nav-btn"
              >
                Регистрация
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
