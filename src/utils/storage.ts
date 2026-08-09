const PROFILE_KEY = "abtalks.profile";
const PREFERENCES_KEY = "abtalks.preferences";
const DEMO_PRESET_KEY = "abtalks.demoPreset";

export function getProfile<T>(fallback: T): T {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveProfile(profile: unknown): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save profile to localStorage:", e);
  }
}

export function clearProfile(): void {
  localStorage.removeItem(PROFILE_KEY);
}

export function getPreferences<T>(fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function savePreferences(prefs: unknown): void {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error("Failed to save preferences to localStorage:", e);
  }
}

export function getDemoPreset(): string | null {
  return localStorage.getItem(DEMO_PRESET_KEY);
}

export function setDemoPreset(preset: string): void {
  localStorage.setItem(DEMO_PRESET_KEY, preset);
}
