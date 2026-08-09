import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { StudentProfile, MOCK_DAYS, TRACKS } from "../data/mockData";
import { StreakHeatmap } from "../components/StreakHeatmap";
import { ArrowRight, CheckCircle2, Shield, Lock } from "lucide-react";
import { calculateMomentum } from "../utils/momentum";

interface DashboardPageProps {
  profile: StudentProfile;
  isDarkMode: boolean;
  onOpenShieldModal: () => void;
  onSelectPreset: (presetId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profile,
  isDarkMode,
  onOpenShieldModal,
  onSelectPreset,
}) => {
  const navigate = useNavigate();

  const todayTask = MOCK_DAYS.find((d) => d.dayNumber === profile.currentDay) || MOCK_DAYS[0];
  const momentum = calculateMomentum(profile);
  const isTodayCompleted = momentum.isTodayCompleted;

  // Time-of-day greeting
  const currentHour = new Date().getHours();
  const firstName = profile.name ? profile.name.split(" ")[0].toUpperCase() : "STUDENT";
  let greetingPrefix = "GOOD EVENING";
  if (currentHour >= 22 || currentHour < 5) greetingPrefix = "LATE NIGHT";
  else if (currentHour >= 5 && currentHour < 12) greetingPrefix = "GOOD MORNING";
  else if (currentHour >= 12 && currentHour < 17) greetingPrefix = "GOOD AFTERNOON";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex-1 px-6 pt-10 pb-20 space-y-10 transition-colors ${
        isDarkMode ? "bg-[#18181b] text-zinc-100" : "bg-[#fafaf9] text-zinc-900"
      }`}
    >
      {/* Editorial Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-zinc-500 mb-6 font-semibold">
          {greetingPrefix}, {firstName}
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-5xl font-black tracking-tighter text-[#f97316] leading-none mb-1">
              {momentum.currentStreak}
            </div>
            <div className="text-sm text-zinc-400 font-bold uppercase tracking-wider">
              Day Streak
            </div>
          </div>

          <div className="text-sm font-mono text-zinc-400">
            DAY {profile.currentDay} / 60
          </div>
        </div>
      </div>

      <hr className={`border-t ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`} />

      {/* TODAY'S TASK (DOMINANT FEATURE) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-[#f97316] uppercase tracking-wider">
          <span>TODAY</span>
          <span className="font-mono text-zinc-500">{todayTask.estimatedMinutes} MIN</span>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight mb-2">
            {todayTask.title}
          </h2>
          <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            {todayTask.brief}
          </p>
        </div>

        <button
          onClick={() => navigate(`/day/${todayTask.dayNumber}`)}
          className={`w-full py-4 px-6 font-bold text-sm tracking-wide transition-colors flex items-center justify-between ${
            isTodayCompleted
              ? "bg-zinc-800 text-white hover:bg-zinc-700"
              : "bg-[#f97316] hover:bg-[#ea580c] text-white"
          }`}
        >
          {isTodayCompleted ? (
            <>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Today's Proof Submitted
              </span>
              <span>Review →</span>
            </>
          ) : (
            <>
              <span>Continue Day {todayTask.dayNumber}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <hr className={`border-t ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`} />

      {/* SPRINT LINE HEATMAP */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
          YOUR 60-DAY RUN
        </div>
        <StreakHeatmap
          completedDays={profile.completedDays}
          missedDays={profile.missedDays}
          currentDay={profile.currentDay}
          isDarkMode={isDarkMode}
          onSelectDay={(dayNum) => navigate(`/day/${dayNum}`)}
        />
      </div>

      <hr className={`border-t ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`} />

      {/* MOMENTUM & EXAM SHIELD UTILITY */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
          MOMENTUM
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xl font-bold mb-1">{momentum.currentStreak} days</div>
            <div className="text-sm text-zinc-400">Next milestone · {momentum.nextMilestone}</div>
          </div>

          <button
            onClick={onOpenShieldModal}
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-[#f97316] transition-colors"
          >
            <Shield className="w-4 h-4 text-[#f97316]" />
            <span>Shields ({profile.shieldCount})</span>
          </button>
        </div>

        {momentum.recoveryState.isRecovering && (
          <div className="mt-4 p-4 border border-[#f97316]/30 bg-[#f97316]/10 text-sm flex items-center justify-between">
            <span className="text-[#f97316] font-bold">Recovery available</span>
            <button onClick={() => navigate(`/day/${momentum.recoveryState.missedDayNum}`)} className="text-[#f97316] underline font-medium">
              Recover Day {momentum.recoveryState.missedDayNum}
            </button>
          </div>
        )}
      </div>

      {/* Track Selector fallback if empty profile */}
      {!profile.track && (
        <div className="pt-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
            Select Learning Track
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => onSelectPreset(track.id)}
                className={`p-4 border text-left transition-colors ${
                  isDarkMode
                    ? "bg-zinc-900 border-zinc-800 hover:border-[#f97316]/50 text-zinc-200"
                    : "bg-white border-zinc-200 hover:border-zinc-300 text-zinc-900"
                }`}
              >
                <div className="font-bold truncate">{track.name}</div>
                <div className="text-xs text-zinc-400 truncate mt-1">{track.tagline}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

