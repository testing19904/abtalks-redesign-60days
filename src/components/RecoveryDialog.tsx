import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentProfile } from "../data/mockData";
import { X, Shield, RotateCcw, ArrowRight } from "lucide-react";

interface RecoveryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  isDarkMode: boolean;
  onActivateShield: () => void;
  onRecoverMissedDay: (dayNum: number) => void;
}

export const RecoveryDialog: React.FC<RecoveryDialogProps> = ({
  isOpen,
  onClose,
  profile,
  isDarkMode,
  onActivateShield,
  onRecoverMissedDay,
}) => {
  if (!isOpen) return null;

  const hasMissed = profile.missedDays.length > 0;
  const missedDayNum = hasMissed ? profile.missedDays[0] : null;
  const canAffordShield = profile.totalSynergy >= 50;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`w-full max-w-sm rounded-2xl p-5 border relative ${
            isDarkMode
              ? "bg-zinc-900 border-zinc-800 text-zinc-100"
              : "bg-white border-stone-200 text-stone-900"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-orange-500" />
            <h3 className="text-sm font-bold uppercase tracking-wide">Exam Shield & Recovery</h3>
          </div>

          <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? "text-zinc-400" : "text-stone-600"}`}>
            Academic life happens. Protect your streak during college exam weeks or recover missed sessions.
          </p>

          <div className="space-y-3 text-xs">
            {/* Option 1: Activate Exam Shield */}
            <div className={`p-3 rounded-xl border ${
              isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-stone-50 border-stone-200"
            }`}>
              <div className="flex items-center justify-between font-semibold mb-1">
                <span>Exam Shield Protection</span>
                <span className="text-orange-500 font-mono text-[11px]">{profile.shieldCount} Active</span>
              </div>
              <p className={`text-[11px] mb-3 ${isDarkMode ? "text-zinc-400" : "text-stone-500"}`}>
                50 Synergy points grants 1 Shield to safeguard your streak line during exam weeks.
              </p>

              <button
                onClick={() => {
                  if (canAffordShield) onActivateShield();
                }}
                disabled={!canAffordShield}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                  canAffordShield
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed"
                }`}
              >
                {canAffordShield ? "Acquire Shield (50 Synergy)" : "Requires 50 Synergy Points"}
              </button>
            </div>

            {/* Option 2: Recover Missed Day if applicable */}
            {hasMissed && missedDayNum && (
              <div className={`p-3 rounded-xl border ${
                isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-stone-50 border-stone-200"
              }`}>
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5 text-orange-500" /> Recover Day {missedDayNum}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">Missed</span>
                </div>
                <p className={`text-[11px] mb-3 ${isDarkMode ? "text-zinc-400" : "text-stone-500"}`}>
                  Submit your code proof for Day {missedDayNum} to restore your continuous streak line.
                </p>

                <button
                  onClick={() => {
                    onRecoverMissedDay(missedDayNum);
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Complete Day {missedDayNum} Proof</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
