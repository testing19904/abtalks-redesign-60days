import { useState, useCallback } from "react";
import { StudentProfile, STUDENT_PRESETS } from "../data/mockData";
import { getProfile, saveProfile, clearProfile, getDemoPreset, setDemoPreset } from "../utils/storage";
import { calculateStreak, calculateBestStreak } from "../utils/streak";

const DEFAULT_PRESET_KEY = "active-challenger";
const INITIAL_FALLBACK = STUDENT_PRESETS[DEFAULT_PRESET_KEY];

export function useStudentProfile() {
  const [activePresetId, setActivePresetId] = useState<string>(() => {
    return getDemoPreset() || DEFAULT_PRESET_KEY;
  });

  const [profile, setProfileState] = useState<StudentProfile>(() => {
    return getProfile(INITIAL_FALLBACK);
  });

  const selectPreset = useCallback((presetId: string) => {
    if (STUDENT_PRESETS[presetId]) {
      const presetCopy = JSON.parse(JSON.stringify(STUDENT_PRESETS[presetId]));
      setProfileState(presetCopy);
      setActivePresetId(presetId);
      saveProfile(presetCopy);
      setDemoPreset(presetId);
    }
  }, []);

  const updateProfile = useCallback((updater: (prev: StudentProfile) => StudentProfile) => {
    setProfileState((prev) => {
      const next = updater(prev);
      saveProfile(next);
      return next;
    });
  }, []);

  const activateShield = useCallback(() => {
    updateProfile((prev) => ({
      ...prev,
      shieldCount: prev.shieldCount + 1,
      totalSynergy: Math.max(0, prev.totalSynergy - 50),
    }));
  }, [updateProfile]);

  const recoverMissedDay = useCallback((dayNum: number) => {
    updateProfile((prev) => {
      const updatedMissed = prev.missedDays.filter((d) => d !== dayNum);
      const updatedCompleted = [...prev.completedDays, dayNum].sort((a, b) => a - b);
      const newStreak = calculateStreak(updatedCompleted, prev.currentDay);
      return {
        ...prev,
        missedDays: updatedMissed,
        completedDays: updatedCompleted,
        currentStreak: newStreak,
        bestStreak: calculateBestStreak(newStreak, prev.bestStreak),
        totalSynergy: Math.max(0, prev.totalSynergy - 30),
      };
    });
  }, [updateProfile]);

  const submitProof = useCallback((dayNum: number, githubUrl: string, linkedinUrl: string) => {
    updateProfile((prev) => {
      const isAlreadyCompleted = prev.completedDays.includes(dayNum);
      const updatedCompleted = isAlreadyCompleted ? prev.completedDays : [...prev.completedDays, dayNum].sort((a, b) => a - b);
      const updatedMissed = prev.missedDays.filter((d) => d !== dayNum);
      const newStreak = calculateStreak(updatedCompleted, prev.currentDay);
      const newSynergy = isAlreadyCompleted ? prev.totalSynergy : prev.totalSynergy + 20;

      return {
        ...prev,
        completedDays: updatedCompleted,
        missedDays: updatedMissed,
        totalSynergy: newSynergy,
        currentStreak: newStreak,
        bestStreak: calculateBestStreak(newStreak, prev.bestStreak),
        submissions: {
          ...prev.submissions,
          [dayNum]: {
            githubUrl,
            linkedinUrl,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
        },
      };
    });
  }, [updateProfile]);

  const resetProfile = useCallback(() => {
    clearProfile();
    const fallback = JSON.parse(JSON.stringify(INITIAL_FALLBACK));
    setProfileState(fallback);
    setActivePresetId(DEFAULT_PRESET_KEY);
    setDemoPreset(DEFAULT_PRESET_KEY);
  }, []);

  return {
    profile,
    activePresetId,
    selectPreset,
    updateProfile,
    resetProfile,
    setProfile: setProfileState,
    activateShield,
    recoverMissedDay,
    submitProof,
  };
}
