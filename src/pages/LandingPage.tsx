import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Check } from "lucide-react";

interface LandingPageProps {
  isDarkMode: boolean;
  onSelectTrack: (trackId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex-1 flex flex-col transition-colors ${
      isDarkMode ? "bg-[#18181b] text-zinc-100" : "bg-[#fafaf9] text-zinc-900"
    }`}>
      <section className="px-6 pt-16 pb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] mb-6">
          60 DAYS <br />
          OF SHOWING <br />
          <span className="text-[#f97316]">UP.</span>
        </h1>
        
        <p className={`text-sm leading-relaxed max-w-xs mb-10 ${
          isDarkMode ? "text-zinc-400" : "text-zinc-600"
        }`}>
          A focused coding sprint for students who want visible proof of consistent work, not just another abandoned tutorial.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-4 px-6 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-between gap-3 active:scale-[0.98]"
        >
          <span>Start Day 1</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      <hr className={`mx-6 ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`} />

      <section className="px-6 py-12 space-y-8">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">01. Build</h2>
          <p className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Receive a targeted 20-minute engineering task every evening.
          </p>
        </div>
        
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">02. Prove</h2>
          <p className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Submit your GitHub commit and LinkedIn post. No faking it.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">03. Keep Going</h2>
          <p className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Use Exam Shields when college gets heavy. Never lose your momentum.
          </p>
        </div>
      </section>

      <section className={`mx-6 mb-12 p-6 border ${
        isDarkMode ? "bg-[#27272a] border-zinc-700" : "bg-white border-zinc-200"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold font-mono">DAY 12</span>
          <span className="text-xs font-mono text-[#f97316]">12 / 60</span>
        </div>
        
        <div className="flex gap-1 mb-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-1.5 flex-1 bg-[#10b981]" />
          ))}
          <div className="h-1.5 flex-1 bg-[#f97316]" />
          <div className="h-1.5 flex-1 bg-zinc-200 dark:bg-zinc-700" />
        </div>

        <ul className="space-y-3 text-xs font-medium">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#10b981]" /> 20 min system build
          </li>
          <li className="flex items-center gap-2">
            <Github className="w-4 h-4 text-zinc-400" /> GitHub proof required
          </li>
          <li className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn proof required
          </li>
        </ul>
      </section>
    </div>
  );
};
