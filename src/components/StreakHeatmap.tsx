import React, { useState } from "react";

interface StreakHeatmapProps {
  completedDays: number[];
  missedDays: number[];
  currentDay: number;
  isDarkMode: boolean;
  onSelectDay?: (dayNum: number) => void;
}

export const StreakHeatmap: React.FC<StreakHeatmapProps> = ({
  completedDays,
  missedDays,
  currentDay,
  isDarkMode,
  onSelectDay,
}) => {
  const [showAll60, setShowAll60] = useState(false);
  const completedSet = new Set(completedDays);
  const missedSet = new Set(missedDays);

  const startDay = Math.max(1, Math.min(47, currentDay - 6));
  const focusWindow = Array.from({ length: 14 }, (_, i) => startDay + i);
  const all60Days = Array.from({ length: 60 }, (_, i) => i + 1);

  const displayDays = showAll60 ? all60Days : focusWindow;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-baseline justify-between text-xs font-mono">
        <button
          onClick={() => setShowAll60(!showAll60)}
          className={`uppercase tracking-wider text-[11px] font-semibold hover:text-orange-500 transition-colors flex items-center gap-1.5 ${
            isDarkMode ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          <span>{showAll60 ? "60-DAY FULL SPRINT GRID" : `SPRINT LINE • DAYS ${startDay}–${startDay + 13}`}</span>
          <span className="text-[10px] text-orange-500 underline font-normal">
            ({showAll60 ? "Focus 14d" : "Show All 60d"})
          </span>
        </button>
        <span className={isDarkMode ? "text-zinc-400" : "text-zinc-500"}>
          {completedDays.length}/60
        </span>
      </div>

      {/* Grid Strip */}
      <div className={`grid gap-1.5 pt-1 ${showAll60 ? "grid-cols-10" : "grid-cols-7"}`}>
        {displayDays.map((dayNum) => {
          const isCompleted = completedSet.has(dayNum);
          const isMissed = missedSet.has(dayNum);
          const isCurrent = dayNum === currentDay;

          let cellStyle = isDarkMode
            ? "bg-zinc-800/60 text-zinc-500 border-zinc-800 hover:border-zinc-700"
            : "bg-zinc-100 text-zinc-400 border-zinc-200 hover:border-zinc-300";

          if (isCompleted) {
            cellStyle = isDarkMode
              ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/60"
              : "bg-emerald-50 text-emerald-700 border-emerald-200";
          } else if (isMissed) {
            cellStyle = isDarkMode
              ? "bg-rose-950/80 text-rose-400 border-rose-800/60"
              : "bg-rose-50 text-rose-700 border-rose-200";
          } else if (isCurrent) {
            cellStyle = isDarkMode
              ? "bg-orange-950/80 text-orange-400 border-orange-500/80 font-bold shadow-xs"
              : "bg-orange-50 text-orange-600 border-orange-400 font-bold shadow-xs";
          }

          return (
            <button
              key={dayNum}
              onClick={() => onSelectDay?.(dayNum)}
              className={`rounded-lg border flex flex-col items-center justify-center text-[10px] font-mono transition-all relative ${
                showAll60 ? "h-7 text-[8px]" : "h-9 text-[10px]"
              } ${cellStyle}`}
              title={`Day ${dayNum}${isCompleted ? " (Completed)" : isMissed ? " (Missed)" : isCurrent ? " (Today)" : ""}`}
            >
              <span className="leading-none opacity-70">{dayNum}</span>
              <span className={`font-bold leading-none ${showAll60 ? "text-[8px] mt-0.5" : "text-[10px] mt-0.5"}`}>
                {isCompleted ? "●" : isMissed ? "×" : isCurrent ? "◎" : "○"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
