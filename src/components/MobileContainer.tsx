import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
  isFramed: boolean;
  isDarkMode: boolean;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, isFramed, isDarkMode }) => {
  if (!isFramed) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-zinc-950 text-zinc-100" : "bg-stone-50 text-stone-900"}`}>
        <div className="w-full max-w-md mx-auto min-h-screen border-x border-zinc-800/40">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-6 px-2 flex flex-col items-center justify-start ${isDarkMode ? "bg-zinc-950" : "bg-stone-900"}`}>
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
          390px Mobile Viewport
        </span>
      </div>

      <div className={`w-[390px] min-h-[820px] rounded-2xl border border-zinc-800 shadow-xl overflow-hidden relative flex flex-col ${
        isDarkMode ? "bg-zinc-950 text-zinc-100" : "bg-stone-50 text-stone-900"
      }`}>
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
