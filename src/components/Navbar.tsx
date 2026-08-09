import React from "react";
import { Link, useLocation } from "react-router-dom";
import { StudentProfile } from "../data/mockData";
import { Shield, Award, Moon, Sun } from "lucide-react";

interface NavbarProps {
  profile: StudentProfile;
  isDarkMode: boolean;
  onOpenShieldModal: () => void;
  onOpenBadgesModal?: () => void;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isDarkMode,
  onOpenShieldModal,
  onOpenBadgesModal,
  onToggleDarkMode,
}) => {
  const location = useLocation();

  return (
    <header className={`sticky top-0 z-30 border-b transition-colors ${
      isDarkMode ? "bg-zinc-950 border-zinc-800 text-zinc-100" : "bg-stone-50 border-stone-200 text-stone-900"
    }`}>
      <div className="px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
            AB
          </div>
          <span className="text-xs font-bold tracking-tight">
            ABTalks <span className="font-mono text-[10px] text-zinc-400 font-normal">60d</span>
          </span>
        </Link>

        {/* Status Actions */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`px-2 py-0.5 rounded border text-[11px] ${
            isDarkMode ? "bg-zinc-900 border-zinc-800 text-orange-400" : "bg-white border-stone-200 text-orange-600"
          }`}>
            {profile.currentStreak}d streak
          </span>

          {onOpenBadgesModal && (
            <button
              onClick={onOpenBadgesModal}
              className={`p-1 rounded border hover:opacity-80 transition-opacity ${
                isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-white border-stone-200 text-stone-700"
              }`}
              title="Milestones"
            >
              <Award className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onOpenShieldModal}
            className={`p-1 rounded border hover:opacity-80 transition-opacity ${
              profile.shieldCount > 0
                ? "bg-orange-500/10 border-orange-500/30 text-orange-500"
                : isDarkMode
                ? "bg-zinc-900 border-zinc-800 text-zinc-400"
                : "bg-white border-stone-200 text-stone-500"
            }`}
            title="Exam Shield"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>

          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className={`p-1 rounded border hover:opacity-80 transition-opacity ${
                isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-white border-stone-200 text-stone-700"
              }`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Clean Navigation Bar */}
      <nav className={`px-4 py-1.5 flex items-center gap-4 text-xs font-medium border-t ${
        isDarkMode ? "border-zinc-800/80 text-zinc-400" : "border-stone-200 text-stone-600"
      }`}>
        <Link
          to="/"
          className={`transition-colors ${
            location.pathname === "/" ? "text-orange-500 font-semibold" : "hover:text-zinc-200"
          }`}
        >
          Overview
        </Link>
        <Link
          to="/dashboard"
          className={`transition-colors ${
            location.pathname === "/dashboard" ? "text-orange-500 font-semibold" : "hover:text-zinc-200"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to={`/day/${profile.currentDay || 12}`}
          className={`transition-colors ${
            location.pathname.startsWith("/day/") ? "text-orange-500 font-semibold" : "hover:text-zinc-200"
          }`}
        >
          Today's Task
        </Link>
      </nav>
    </header>
  );
};
