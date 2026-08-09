import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentProfile, ACHIEVEMENT_BADGES } from "../data/mockData";
import { X, Award, Check, Lock } from "lucide-react";

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  isDarkMode: boolean;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  profile,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  const unlockedSet = new Set(profile.unlockedBadges || []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 border relative max-h-[80vh] flex flex-col ${
            isDarkMode
              ? "bg-zinc-900 border-zinc-800 text-zinc-100"
              : "bg-white border-stone-200 text-stone-900"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b pb-3 border-zinc-800/60">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-500" />
              <h3 className="text-sm font-bold uppercase tracking-wide">
                Milestones ({unlockedSet.size}/{ACHIEVEMENT_BADGES.length})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="space-y-2 overflow-y-auto pr-1 flex-1">
            {ACHIEVEMENT_BADGES.map((badge) => {
              const isUnlocked = unlockedSet.has(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 ${
                    isUnlocked
                      ? isDarkMode
                        ? "bg-zinc-950/80 border-zinc-800"
                        : "bg-stone-50 border-stone-200"
                      : "opacity-40 border-zinc-800/40 bg-transparent"
                  }`}
                >
                  <div className={`mt-0.5 p-1 rounded ${
                    isUnlocked ? "text-orange-500" : "text-zinc-500"
                  }`}>
                    {isUnlocked ? <Check className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold">{badge.name}</h4>
                      {isUnlocked && (
                        <span className="text-[10px] font-mono text-emerald-500">Unlocked</span>
                      )}
                    </div>
                    <p className={`text-[11px] leading-relaxed mt-0.5 ${isDarkMode ? "text-zinc-400" : "text-stone-600"}`}>
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
