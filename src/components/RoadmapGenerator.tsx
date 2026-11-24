import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Loader2,
  Plus,
  Sparkles,
  X,
  AlertCircle,
} from "lucide-react";
import {
  EXPERIENCE_LEVELS,
  LEARNING_PREFERENCES,
  POPULAR_JOB_ROLES,
} from "../types/career";
import type {
  AppView,
  CareerPlan,
  ExperienceLevel,
  JobRole,
  LearningPreference,
  RoadmapGenerationPayload,
} from "../types/career";
import { SUGGESTED_SKILLS } from "../data/presets";

interface RoadmapGeneratorProps {
  plan: CareerPlan;
  preselectedRole?: JobRole | null;
  onClearPreselectedRole: () => void;
  onPlanGenerated: (newPlan: CareerPlan) => void;
  onToggleMilestone: (phaseId: string, milestoneId: string) => void;
  onNavigate: (view: AppView) => void;
}

export function RoadmapGenerator({
  plan,
  preselectedRole,
  onClearPreselectedRole,
  onPlanGenerated,
  onToggleMilestone,
  onNavigate,
}: RoadmapGeneratorProps) {
  const [studentName, setStudentName] = useState(plan.studentName);
  const [currentSkills, setCurrentSkills] = useState<string[]>(plan.currentSkills);
  const [skillInput, setSkillInput] = useState("");
  const [targetRole, setTargetRole] = useState<JobRole>(preselectedRole ?? plan.targetRole);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(plan.experienceLevel);
  const [weeklyHours, setWeeklyHours] = useState<number>(plan.weeklyHours);
  const [learningPreferences, setLearningPreferences] = useState<LearningPreference[]>(
    plan.learningPreferences
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [justGenerated, setJustGenerated] = useState(false);

  useEffect(() => {
    if (preselectedRole) {
      setTargetRole(preselectedRole);
      onClearPreselectedRole();
    }
  }, [preselectedRole, onClearPreselectedRole]);

  const addSkill = (rawSkill: string) => {
    const trimmed = rawSkill.trim();
    if (!trimmed) return;
    const exists = currentSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase());
    if (!exists && currentSkills.length < 20) {
      setCurrentSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    setCurrentSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const togglePreference = (pref: LearningPreference) => {
    setLearningPreferences((prev) => {
      if (prev.includes(pref)) {
        return prev.length > 1 ? prev.filter((p) => p !== pref) : prev;
      }
      return [...prev, pref];
    });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setJustGenerated(false);
    setIsGenerating(true);

    const payload: RoadmapGenerationPayload = {
      studentName: studentName.trim() || "Student",
      currentSkills,
      targetRole,
      experienceLevel,
      weeklyHours,
      learningPreferences,
    };

    try {
      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate career roadmap.");
      }

      onPlanGenerated(data as CareerPlan);
      setJustGenerated(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to reach the AI roadmap service. Please retry.";
      setErrorMsg(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const availableSuggestions = SUGGESTED_SKILLS.filter(
    (s) => !currentSkills.some((curr) => curr.toLowerCase() === s.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-blue-400">Personalized Curriculum Engine</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Career Roadmap Generator
        </h1>
        <p className="mt-1.5 text-sm text-slate-300 max-w-2xl">
          Configure your current skills, target job role, weekly study availability, and learning
          style to generate an adaptive 4-phase roadmap and skill gap matrix.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left: Generator Form */}
        <form
          onSubmit={handleGenerate}
          className="xl:col-span-5 rounded-xl border border-white/[0.08] bg-[#0B101D]/85 p-6 space-y-6"
        >
          {/* Student Name */}
          <div>
            <label htmlFor="student-name" className="block text-xs font-medium text-slate-300 mb-2">
              Student Name
            </label>
            <input
              id="student-name"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-white/10 bg-[#060913] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Target Job Role */}
          <div>
            <label htmlFor="target-role" className="block text-xs font-medium text-slate-300 mb-2">
              Target Job Role
            </label>
            <select
              id="target-role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value as JobRole)}
              className="w-full rounded-lg border border-white/10 bg-[#060913] px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {POPULAR_JOB_ROLES.map((role) => (
                <option key={role} value={role} className="bg-[#0B101D] text-white">
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <span className="block text-xs font-medium text-slate-300 mb-2">
              Experience Level
            </span>
            <div className="grid grid-cols-2 gap-2">
              {EXPERIENCE_LEVELS.map((level) => {
                const active = experienceLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setExperienceLevel(level)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium border transition-colors whitespace-nowrap ${
                      active
                        ? "border-violet-500/60 bg-violet-600/20 text-white"
                        : "border-white/10 bg-[#060913] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Skills Multi-Tag Input */}
          <div>
            <label htmlFor="skill-input" className="block text-xs font-medium text-slate-300 mb-2">
              Current Skills ({currentSkills.length})
            </label>
            <div className="flex gap-2">
              <input
                id="skill-input"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                placeholder="Type a skill (e.g. Python, SQL) & press Enter"
                className="flex-1 min-w-0 rounded-lg border border-white/10 bg-[#060913] px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addSkill(skillInput)}
                className="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white hover:bg-white/[0.08] transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Active Skill Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {currentSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-blue-500/35 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-200 hover:bg-rose-500/15 hover:border-rose-400/40 hover:text-rose-200 transition-colors"
                  title={`Remove ${skill}`}
                >
                  <span>{skill}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>

            {/* Quick-Add Suggestions */}
            {availableSuggestions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <p className="text-[11px] text-slate-400 mb-2">Quick-add common skills:</p>
                <div className="flex flex-wrap gap-1.5">
                  {availableSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addSkill(s)}
                      className="rounded-md border border-white/10 bg-[#060913] px-2 py-1 text-[11px] text-slate-300 hover:border-blue-500/40 hover:text-white transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Weekly Study Hours Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="weekly-hours" className="text-xs font-medium text-slate-300">
                Weekly Study Hours
              </label>
              <span className="text-sm font-bold text-white font-mono tabular-nums">
                {weeklyHours} hrs/week
              </span>
            </div>
            <input
              id="weekly-hours"
              type="range"
              min={5}
              max={40}
              step={1}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="career-slider w-full"
            />
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 font-mono tabular-nums">
              <span>5h (Part-time)</span>
              <span>20h (Focused)</span>
              <span>40h (Bootcamp)</span>
            </div>
          </div>

          {/* Learning Preferences */}
          <div>
            <span className="block text-xs font-medium text-slate-300 mb-2">
              Learning Preferences
            </span>
            <div className="flex flex-wrap gap-2">
              {LEARNING_PREFERENCES.map((pref) => {
                const selected = learningPreferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => togglePreference(pref)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                      selected
                        ? "border-blue-500/50 bg-blue-600/20 text-white"
                        : "border-white/10 bg-[#060913] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {pref}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div
              role="alert"
              className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3.5 flex items-start gap-2.5 text-xs text-rose-200"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-rose-300">Roadmap generation failed</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Primary Generate CTA */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 hover:from-violet-500 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Skill Gaps &amp; Building Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Career Roadmap</span>
              </>
            )}
          </button>
        </form>

        {/* Right: Generated Career Roadmap View */}
        <div className="xl:col-span-7 space-y-5">
          {/* Summary Card */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/80 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{plan.targetRole}</span>
                  <span aria-hidden="true">·</span>
                  <span>{plan.experienceLevel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{plan.weeklyHours}h/wk</span>
                </div>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {plan.studentName}&rsquo;s {plan.estimatedTotalWeeks}-Week Blueprint
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-[11px] text-slate-400">Readiness</p>
                  <p className="text-xl font-bold text-white font-mono tabular-nums">
                    {plan.readinessScore}%
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("skill-gap")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 transition-colors whitespace-nowrap"
                >
                  <span>Skill Gap Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {justGenerated && (
              <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  New roadmap and skill gap matrix generated for {plan.targetRole}. Your Student
                  Dashboard has been updated.
                </span>
              </div>
            )}

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">{plan.executiveSummary}</p>
          </div>

          {/* Loading Skeleton Overlay or Phased Cards */}
          {isGenerating ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-xl border border-white/[0.08] bg-[#0B101D]/60 p-6 space-y-3 animate-pulse"
                >
                  <div className="h-4 w-48 rounded bg-white/10" />
                  <div className="h-3 w-full rounded bg-white/[0.06]" />
                  <div className="h-3 w-4/5 rounded bg-white/[0.06]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {plan.phases.map((phase) => {
                const phaseCompleted = phase.milestones.filter((m) => m.completed).length;
                return (
                  <div
                    key={phase.id}
                    className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.07]">
                      <div>
                        <p className="text-xs font-mono tabular-nums text-violet-400">
                          Phase 0{phase.phaseNumber} · {phase.durationWeeks}
                        </p>
                        <h3 className="mt-0.5 text-lg font-semibold text-white">{phase.title}</h3>
                      </div>
                      <span className="text-xs font-mono tabular-nums text-slate-400 shrink-0">
                        {phaseCompleted}/{phase.milestones.length} done
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      {phase.focusSummary}
                    </p>

                    {phase.skillsCovered.length > 0 && (
                      <p className="mt-2.5 text-xs text-slate-400">
                        Focus: {phase.skillsCovered.join(" · ")}
                      </p>
                    )}

                    <div className="mt-4 divide-y divide-white/[0.06]">
                      {phase.milestones.map((m) => (
                        <div key={m.id} className="py-3 flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => onToggleMilestone(phase.id, m.id)}
                            className="mt-0.5 text-slate-400 hover:text-blue-400 transition-colors shrink-0"
                            aria-label={`Toggle milestone ${m.title}`}
                          >
                            {m.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm font-medium ${
                                m.completed ? "text-slate-400 line-through" : "text-slate-100"
                              }`}
                            >
                              {m.title}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              Deliverable: {m.deliverable}
                            </p>
                          </div>
                          <span className="text-xs font-mono tabular-nums text-slate-400 shrink-0">
                            {m.estimatedHours}h
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
