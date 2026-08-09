import React, { useState } from "react";
import { ShieldAlert, User, Flame, Smartphone, Moon, Sun, Sparkles, Settings, X } from "lucide-react";

interface StateSwitcherProps {
  currentPresetId: string;
  onSelectPreset: (presetId: string) => void;
  isFramed: boolean;
  onToggleFrame: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const StateSwitcher: React.FC<StateSwitcherProps> = ({
  currentPresetId,
  onSelectPreset,
  isFramed,
  onToggleFrame,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Gear Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-8 h-8 rounded-full bg-zinc-900 text-zinc-200 border border-zinc-700 shadow-md flex items-center justify-center hover:bg-zinc-800 transition-transform active:scale-95 opacity-80 hover:opacity-100"
        title="Judge Demo Presets"
      >
        <Settings className="w-3.5 h-3.5" />
      </button>

      {/* Floating Control Panel */}
      {isOpen && (
        <div className="fixed bottom-14 right-4 z-50 w-64 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
            <span className="font-mono text-[10px] uppercase font-bold text-orange-400">
              Evaluator Presets
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-0.5 rounded text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectPreset("active-challenger");
                setIsOpen(false);
              }}
              className={`w-full py-1.5 px-2 rounded flex items-center gap-2 text-left transition-colors ${
                currentPresetId === "active-challenger"
                  ? "bg-orange-500/20 text-orange-300 font-semibold border border-orange-500/30"
                  : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Active Challenger (Day 12)</span>
            </button>

            <button
              onClick={() => {
                onSelectPreset("day-1-newbie");
                setIsOpen(false);
              }}
              className={`w-full py-1.5 px-2 rounded flex items-center gap-2 text-left transition-colors ${
                currentPresetId === "day-1-newbie"
                  ? "bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700"
                  : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Day 1 Newbie</span>
            </button>

            <button
              onClick={() => {
                onSelectPreset("missed-streak");
                setIsOpen(false);
              }}
              className={`w-full py-1.5 px-2 rounded flex items-center gap-2 text-left transition-colors ${
                currentPresetId === "missed-streak"
                  ? "bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30"
                  : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Missed Day / Exam</span>
            </button>

            <button
              onClick={() => {
                onSelectPreset("empty-profile");
                setIsOpen(false);
              }}
              className={`w-full py-1.5 px-2 rounded flex items-center gap-2 text-left transition-colors ${
                currentPresetId === "empty-profile"
                  ? "bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700"
                  : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              <User className="w-3.5 h-3.5 text-zinc-400" />
              <span>Empty Profile</span>
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={onToggleFrame}
              className={`py-1 px-2 rounded flex items-center gap-1 text-[11px] ${
                isFramed ? "bg-orange-600 text-white" : "bg-zinc-800 text-zinc-300"
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>{isFramed ? "390px Mobile" : "Full Width"}</span>
            </button>

            <button
              onClick={onToggleDarkMode}
              className="py-1 px-2 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1 text-[11px]"
            >
              {isDarkMode ? <Sun className="w-3 h-3 text-orange-400" /> : <Moon className="w-3 h-3" />}
              <span>{isDarkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
