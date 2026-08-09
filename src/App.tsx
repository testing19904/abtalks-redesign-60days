import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useStudentProfile } from "./hooks/useStudentProfile";
import { usePreferences } from "./hooks/usePreferences";
import { StateSwitcher } from "./components/StateSwitcher";
import { MobileContainer } from "./components/MobileContainer";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ChallengeDayPage } from "./pages/ChallengeDayPage";

export default function App() {
  const { profile, activePresetId, selectPreset, activateShield, recoverMissedDay, submitProof } = useStudentProfile();
  const { isDarkMode, isFramed, toggleDarkMode, toggleFramed } = usePreferences();

  // Shield and badges modals state are still UI state, which is fine to keep here or move to a UI hook. For now, keep them as is.
  const [isShieldModalOpen, setIsShieldModalOpen] = React.useState<boolean>(false);

  return (
    <BrowserRouter>
      <StateSwitcher
        currentPresetId={activePresetId}
        onSelectPreset={selectPreset}
        isFramed={isFramed}
        onToggleFrame={toggleFramed}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <MobileContainer isFramed={isFramed} isDarkMode={isDarkMode}>
        <Navbar
          profile={profile}
          isDarkMode={isDarkMode}
          onOpenShieldModal={() => setIsShieldModalOpen(true)}
          onToggleDarkMode={toggleDarkMode}
        />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPage isDarkMode={isDarkMode} onSelectTrack={selectPreset} />} />
            <Route path="/dashboard" element={
                <DashboardPage 
                  profile={profile} 
                  isDarkMode={isDarkMode} 
                  onOpenShieldModal={() => setIsShieldModalOpen(true)} 
                  onSelectPreset={selectPreset} 
                />
              } 
            />
            <Route path="/day/:dayId" element={<ChallengeDayPage profile={profile} isDarkMode={isDarkMode} onSubmitProof={submitProof} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </MobileContainer>
    </BrowserRouter>
  );
}
