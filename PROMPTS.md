# AI Usage Log & Build History (PROMPTS.md)

## ViCodathon 2026 Submission - Problem Statement 1: Redesign ABTalks
**Team / Participant**: Nischay Tilwani
**Project**: ABTalks Mobile-First 60-Day Challenge Platform

---

### Prompt 1: Initial Requirements & Tech Stack Architecture
**Prompt**:
> "Help me plan a mobile-first tech stack and UI layout for Problem Statement 1 (Redesign ABTalks) tailored for the 390px mobile viewport requirement. Include routes `/`, `/dashboard`, and `/day/12`, real-world edge cases (first day, missed streak, empty profile), and at least one thoughtful student experience idea."

**AI Action**:
- Planned Vite + React + TypeScript + Tailwind CSS + Motion + Lucide React stack.
- Designed 3 core routes matching exact hackathon Route Map specifications (`/`, `/dashboard`, `/day/12`).
- Conceived the **Synergy Streak Recovery & Exam Shield Mechanic** allowing students to freeze or recover streaks during college exam weeks.
- Created `metadata.json` with app title and description.

---

### Prompt 2: Data Modeling & Edge Case Handlers
**Prompt**:
> "Draft a comprehensive mock data JSON structure simulating multiple student states: an active 12-day streak challenger, a day-1 newbie with zero streak, a student with a missed day after midterms, and an empty profile state."

**AI Action**:
- Created `/src/data/mockData.ts` with 60 days of challenge briefs, track options, Synergy points system, and student profile presets.
- Built state persistence with localStorage fallbacks so user submissions persist during testing.

---

### Prompt 3: Applying Design Theme & High-Contrast Visual System
**Prompt**:
> "Apply a clean, mobile-first design theme with soft background, high contrast cards, rounded-3xl corners, and smooth elevation shadows."

**AI Action**:
- Transformed mobile shell container and pages to match the visual system.
- Designed soft light-mode background `#FAFBFD` with subtle card borders (`border-slate-200/90`) and rounded-3xl corners.
- Maintained dark mode toggle for late-night college students with eye-care contrast levels (`#0B0F19`).

---

### Prompt 4: Psychological Redesign Brief - Calm, Quiet, Thoughtful & Deeply Personal
**Prompt**:
> "Redesign the ABTalks 60-day challenge app for mobile (390px) with a calm, quiet, thoughtful, and deeply personal emotional tone. Whisper, don't shout: muted earthy tones, horizontal scrollable linear path timeline, streak flame gently pulsing, curiosity card 'Day 13 is waiting for you', personal time-based greeting, friend-like RecoveryDialog for exam protection, remove growth hacks, and simplify mobile layout to essential actions."

**AI Action**:
- **Whisper Visual Tone**: Shifted color palette to soft off-white (`#FAFBFD`) and dark olive-charcoal (`#0B0F19`) with subtle borders and Framer Motion micro-interactions (`ease: "easeInOut"`, `duration: 0.3`).
- **Linear Path Timeline**: Replaced heatmap with `src/components/Timeline.tsx` – a horizontal scrollable row of 60 small rounded nodes with glowing status indicators.
- **Personalized Context**: Personalized greeting using student name ("Good evening, Nischay.") paired with streak-aware encouraging copy ("You're building something rare. Keep going.").
- **Curiosity Card**: Built a single centered card ("Day 13 is waiting for you.") with a blurred/frosted-glass preview unlocked upon daily proof submission.
- **Recovery Dialog**: Replaced loud pop-ups with `src/components/RecoveryDialog.tsx` offering exam shield protection and missed day recovery with a calm, friendly voice.
- **Quiet Landing**: CTA "Start quietly" with light social trust text ("3,000+ students started here") and a 3-step vertical process.
- **Silent Badges Drawer**: Turned badges into `BadgesModal.tsx` subtle drawer. Moved judge State Switcher behind a small floating gear button in the bottom corner.

---

### Prompt 5: Modular Architecture Refactor & Utility Layer
**Prompt**:
> "Refactor App.tsx into clean modular hooks and pure utility modules: src/utils/storage.ts, src/utils/streak.ts, src/utils/proofValidation.ts, src/utils/momentum.ts, src/hooks/useStudentProfile.ts, and src/hooks/usePreferences.ts. Remove unused dependencies from package.json and update README.md."

**AI Action**:
- Created typed storage persistence layer in `src/utils/storage.ts`.
- Implemented pure streak calculation logic in `src/utils/streak.ts`.
- Implemented client-side HTTPS GitHub & LinkedIn URL validation in `src/utils/proofValidation.ts`.
- Built deterministic client-side Momentum Engine in `src/utils/momentum.ts`.
- Extracted state hooks `useStudentProfile.ts` and `usePreferences.ts` out of `App.tsx`.
- Removed unused template dependencies (`@google/genai`, `dotenv`, `express`, `@types/express`) from `package.json`.
- Created comprehensive `README.md` and verified build via `compile_applet`.

---

### Prompt 6: Editorial Art-Direction Overhaul & Gimmick Elimination
**Prompt**:
> "Redesign the ABTalks visual language to remove all generic AI prototype tropes: eliminate Web Audio synthesizer gimmicks, remove rounded-[28px]/[32px] containers and backdrop-blur effects, restore the clean StreakHeatmap progress line, enforce a single brand accent (warm tangerine #f97316), and restructure LandingPage, DashboardPage, and ChallengeDayPage as serious, typography-driven student workspace interfaces."

**AI Action**:
- **Deleted Audio Gimmicks**: Completely removed `src/utils/audio.ts` and all `soundSynth` audio calls.
- **Restrained Color System**: Standardized on warm tangerine (`orange-500` / `#f97316`) as brand accent, charcoal (`zinc-950`) dark canvas, warm paper (`stone-50`) light canvas, and strict green/red state semantics.
- **Flat Editorial Architecture**: Replaced rounded-[28px]/[32px] boxes with clean 8px–12px borders (`rounded-lg`, `rounded-xl`).
- **Editorial Landing Page**: Created bold headline "60 DAYS OF SHOWING UP." with 3-step system mechanics.
- **Workspace Dashboard**: Dominant "TODAY'S TASK" section, large streak typography, and compact 14-day Sprint Line (`StreakHeatmap.tsx`).
- **Task Brief Page**: Numbered requirement checklist, clean double-proof submission form, collapsible prompt starter, and quiet toast confirmation.
- **Verified Build**: Successfully passed `lint_applet` (`tsc --noEmit`) and `compile_applet`.

---

### Prompt 8: Phase 1.5 Architecture & Correctness Audit
**Prompt**:
> "ABTalkS — PHASE 1.5: ARCHITECTURE + CORRECTNESS AUDIT. Do NOT redesign the UI. Move profile-related mutations out of App.tsx and into useStudentProfile.ts. Make useStudentProfile.ts the single owner of student profile mutations. Audit calculateStreak to handle currentDay, future completed days, and gaps deterministically. Centralize GitHub and LinkedIn validation in proofValidation.ts and use it in ChallengeDayPage. Make momentum.ts a pure deterministic utility returning meaningful metrics (completion rate, recent consistency). Audit mockData.ts and fix the active-challenger preset currentStreak to 11. Run npm run lint and npm run build. Report files changed, logic moved, bugs discovered, and tests performed."

**AI Action**:
- Extracted `submitProof`, `recoverMissedDay`, and `activateShield` business logic completely out of `App.tsx` and centralized them into `useStudentProfile.ts`.
- Refactored `calculateStreak` in `src/utils/streak.ts` to accept `currentDay`, ensuring streaks accurately reflect the user's current progress state while ignoring future spoofed days and correctly breaking on missed yesterdays.
- Wired `validateGithubUrl` and `validateLinkedinUrl` from `src/utils/proofValidation.ts` directly into `ChallengeDayPage.tsx`, enforcing strict UI validation.
- Refactored `calculateMomentum` in `src/utils/momentum.ts` to return a `MomentumMetrics` object encompassing actionable deterministic data like `completionRate`, `nextMilestone`, `recentConsistency`, and `recoveryState`.
- Rewired `DashboardPage.tsx` to cleanly consume `MomentumMetrics`, adjusting the design to reflect the requested typographic and spatial updates ("GOOD EVENING, NISCHAY / 12 DAY STREAK / DAY 12 / 60").
- Audited `mockData.ts` and corrected the mathematical inconsistency in the `active-challenger` preset (`currentStreak` updated from 12 to 11, matching `completedDays` length against `currentDay` 12).
- Verified TypeScript strict compliance and executed a successful production bundle via `compile_applet` / `lint_applet` (`tsc --noEmit` & `vite build`).



