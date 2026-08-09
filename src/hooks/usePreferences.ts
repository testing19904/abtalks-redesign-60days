import { useState, useCallback } from "react";
import { getPreferences, savePreferences } from "../utils/storage";

export interface Preferences {
  isDarkMode: boolean;
  isFramed: boolean;
}

const DEFAULT_PREFERENCES: Preferences = {
  isDarkMode: true, // Default to eye-care night mode
  isFramed: false,  // Default to standard mobile responsive viewport
};

export function usePreferences() {
  const [preferences, setPreferencesState] = useState<Preferences>(() => {
    return getPreferences(DEFAULT_PREFERENCES);
  });

  const toggleDarkMode = useCallback(() => {
    setPreferencesState((prev) => {
      const next = { ...prev, isDarkMode: !prev.isDarkMode };
      savePreferences(next);
      return next;
    });
  }, []);

  const toggleFramed = useCallback(() => {
    setPreferencesState((prev) => {
      const next = { ...prev, isFramed: !prev.isFramed };
      savePreferences(next);
      return next;
    });
  }, []);

  return {
    isDarkMode: preferences.isDarkMode,
    isFramed: preferences.isFramed,
    toggleDarkMode,
    toggleFramed,
  };
}
