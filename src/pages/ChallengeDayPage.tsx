import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { StudentProfile, MOCK_DAYS } from "../data/mockData";
import { ArrowLeft, ArrowRight, Github, Linkedin, CheckCircle2, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { validateGithubUrl, validateLinkedinUrl } from "../utils/proofValidation";

interface ChallengeDayPageProps {
  profile: StudentProfile;
  isDarkMode: boolean;
  onSubmitProof: (dayNum: number, githubUrl: string, linkedinUrl: string) => void;
}

export const ChallengeDayPage: React.FC<ChallengeDayPageProps> = ({
  profile,
  isDarkMode,
  onSubmitProof,
}) => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();

  const dayNum = parseInt(dayId || "12", 10);
  const task = MOCK_DAYS.find((d) => d.dayNumber === dayNum) || MOCK_DAYS[0];

  const existingSubmission = profile.submissions[dayNum];
  const isAlreadyCompleted = profile.completedDays.includes(dayNum);

  const [githubUrl, setGithubUrl] = useState(existingSubmission?.githubUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(existingSubmission?.linkedinUrl || "");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPromptStarter, setShowPromptStarter] = useState(false);

  useEffect(() => {
    const existing = profile.submissions[dayNum];
    if (existing) {
      setGithubUrl(existing.githubUrl);
      setLinkedinUrl(existing.linkedinUrl);
    }
  }, [dayNum, profile]);

  const ghValidation = validateGithubUrl(githubUrl);
  const liValidation = validateLinkedinUrl(linkedinUrl);
  const canSubmit = ghValidation.isValid && liValidation.isValid;

  const handleCopyPrompt = () => {
    if (task.aiPromptTemplate) {
      navigator.clipboard.writeText(task.aiPromptTemplate);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    onSubmitProof(dayNum, githubUrl, linkedinUrl);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex-1 p-5 space-y-6 pb-20 transition-colors ${
        isDarkMode ? "bg-zinc-950 text-zinc-100" : "bg-stone-50 text-stone-900"
      }`}
    >
      {/* Editorial Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>

        <div className="font-mono text-[11px] font-bold text-orange-500 uppercase tracking-wider">
          DAY {dayNum} / 60 • {task.category.toUpperCase()}
        </div>

        <div className="font-mono text-xs text-zinc-500">
          {task.estimatedMinutes} MIN
        </div>
      </div>

      {/* Task Headline & Brief */}
      <div>
        <h1 className="text-xl font-extrabold font-serif mb-2 tracking-tight">
          {task.title}
        </h1>
        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-stone-600"}`}>
          {task.brief}
        </p>
      </div>

      {/* Requirements List (Clean Numbered Typography) */}
      <div className="border-t border-b border-zinc-800/80 py-4 space-y-3">
        <div className="font-mono text-[10px] uppercase font-bold text-zinc-500">
          WHAT YOU NEED TO SHIP
        </div>

        <div className="space-y-2 font-mono text-xs">
          {task.requirements.map((req, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="text-orange-500 font-bold">0{idx + 1}.</span>
              <span className={`font-sans text-xs ${isDarkMode ? "text-zinc-300" : "text-stone-700"}`}>
                {req}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Prompt Starter */}
      {task.aiPromptTemplate && (
        <div className={`rounded-xl border ${
          isDarkMode ? "bg-zinc-900/60 border-zinc-800" : "bg-stone-100 border-stone-200"
        }`}>
          <button
            onClick={() => setShowPromptStarter(!showPromptStarter)}
            className="w-full p-3 flex items-center justify-between font-mono text-xs text-zinc-400 hover:text-zinc-200"
          >
            <span>Need a prompt starting point?</span>
            {showPromptStarter ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showPromptStarter && (
            <div className="p-3 pt-0 border-t border-zinc-800/60 mt-2 space-y-2">
              <div className="flex justify-end">
                <button
                  onClick={handleCopyPrompt}
                  className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono flex items-center gap-1"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap text-zinc-400 bg-zinc-950 p-2.5 rounded border border-zinc-800">
                {task.aiPromptTemplate}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Proof Submission Form */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-stone-200"
      }`}>
        <div className="font-mono text-xs uppercase font-bold text-zinc-500 mb-4">
          PROOF OF WORK
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[11px] text-zinc-400 uppercase mb-1.5">
              GitHub
            </label>
            <div className="relative">
              <Github className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="url"
                required
                placeholder="https://github.com/user/repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded border text-xs font-mono focus:outline-none focus:border-orange-500 ${
                  isDarkMode
                    ? "bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600"
                    : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                }`}
              />
            </div>
            {githubUrl && !ghValidation.isValid && (
              <div className="text-red-500 text-[10px] mt-1">{ghValidation.error}</div>
            )}
          </div>

          <div>
            <label className="block text-[11px] text-zinc-400 uppercase mb-1.5">
              LinkedIn
            </label>
            <div className="relative">
              <Linkedin className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="url"
                required
                placeholder="https://linkedin.com/posts/..."
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded border text-xs font-mono focus:outline-none focus:border-orange-500 ${
                  isDarkMode
                    ? "bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-600"
                    : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
                }`}
              />
            </div>
            {linkedinUrl && !liValidation.isValid && (
              <div className="text-red-500 text-[10px] mt-1">{liValidation.error}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 px-4 rounded font-mono text-xs uppercase font-bold transition-colors flex items-center justify-center gap-2 ${
              canSubmit
                ? "bg-[#f97316] hover:bg-[#ea580c] text-white"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
            }`}
          >
            <span>Submit proof</span>
          </button>
        </form>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between font-mono text-xs pt-2">
        {dayNum > 1 ? (
          <Link
            to={`/day/${dayNum - 1}`}
            className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Day {dayNum - 1}
          </Link>
        ) : <div />}

        {dayNum < 60 && (
          <Link
            to={`/day/${dayNum + 1}`}
            className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
          >
            Day {dayNum + 1} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-800 flex flex-col items-center gap-1 shadow-2xl min-w-[200px]"
          >
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">
              DAY {dayNum} COMPLETE
            </div>
            {!isAlreadyCompleted && (
              <div className="font-mono text-xs font-bold text-orange-500 mb-2">
                +20 SYNERGY
              </div>
            )}
            <div className="text-xs text-zinc-400">
              Proof recorded.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

