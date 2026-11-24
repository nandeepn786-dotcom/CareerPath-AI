import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import type { AppView, CareerPlan } from "../types/career";

interface StudentDashboardProps {
  plan: CareerPlan;
  onNavigate: (view: AppView) => void;
  onToggleMilestone: (phaseId: string, milestoneId: string) => void;
  onLogStudyHour: () => void;
}

const STUDENT_AVATAR = "/src/assets/images/avatar_student_profile_1795408092602.jpg";

export function StudentDashboard({
  plan,
  onNavigate,
  onToggleMilestone,
  onLogStudyHour,
}: StudentDashboardProps) {
  const [avatarError, setAvatarError] = useState(false);

  const allMilestones = plan.phases.flatMap((p) =>
    p.milestones.map((m) => ({ ...m, phaseId: p.id, phaseTitle: p.title, phaseNum: p.phaseNumber }))
  );
  const completedCount = allMilestones.filter((m) => m.completed).length;
  const totalCount = allMilestones.length;
  const roadmapPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const totalLoggedHours = Number(
    plan.weeklyStudyLog.reduce((acc, item) => acc + item.logged, 0).toFixed(1)
  );
  const maxDayHours = Math.max(
    4,
    ...plan.weeklyStudyLog.map((d) => Math.max(d.target, d.logged))
  );

  const missingCount = plan.skillGaps.filter((g) => g.status === "Missing Skills").length;
  const needsWorkCount = plan.skillGaps.filter((g) => g.status === "Needs Improvement").length;

  return (
    <div className="space-y-8">
      {/* 1. Welcome & Student Profile Card */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        <div className="xl:col-span-8 rounded-xl border border-white/[0.08] bg-[#0B101D]/80 backdrop-blur-sm p-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-blue-400">Student Command Center</p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Welcome back, {plan.studentName}
              </h1>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                {plan.executiveSummary}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("generator")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white hover:bg-white/[0.08] transition-colors whitespace-nowrap shrink-0 self-start"
            >
              <span>Update Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Current Skills Overview */}
          <div className="mt-6 pt-5 border-t border-white/[0.08]">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-medium text-slate-400">
                Current Skills Overview ({plan.currentSkills.length} verified)
              </span>
              <button
                type="button"
                onClick={() => onNavigate("skill-gap")}
                className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Compare against {plan.targetRole}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {plan.currentSkills.length > 0 ? (
                plan.currentSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/10 bg-[#060913] px-2.5 py-1 text-xs font-medium text-slate-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">
                  No baseline skills added yet. Add skills in the Roadmap Generator.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="xl:col-span-4 rounded-xl border border-white/[0.08] bg-[#0B101D]/80 backdrop-blur-sm p-6 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            {avatarError ? (
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-base font-bold text-white shrink-0">
                {plan.studentName
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            ) : (
              <img
                src={STUDENT_AVATAR}
                alt={plan.studentName}
                referrerPolicy="no-referrer"
                onError={() => setAvatarError(true)}
                className="h-14 w-14 rounded-full object-cover border border-white/15 shrink-0"
              />
            )}
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-white truncate">{plan.studentName}</h2>
              <p className="text-xs text-blue-400 font-medium truncate">
                Target: {plan.targetRole}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 truncate">
                {plan.experienceLevel} · {plan.estimatedTotalWeeks}-week plan
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-2 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Learning Style</span>
              <span className="text-slate-200 font-medium text-right truncate">
                {plan.learningPreferences.join(" · ") || "Hands-on Projects"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Open Skill Gaps</span>
              <span className="font-mono tabular-nums text-slate-200">
                {missingCount} missing · {needsWorkCount} improving
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Plan Generated</span>
              <span className="font-mono tabular-nums text-slate-300">{plan.generatedAt}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4-Column KPI Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">Target Career</p>
            <Target className="w-4 h-4 text-violet-400" />
          </div>
          <p className="mt-2.5 text-xl font-bold text-white truncate">{plan.targetRole}</p>
          <p className="mt-1 text-xs text-slate-400 font-mono tabular-nums">
            {plan.estimatedTotalWeeks} weeks estimated
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">Skill Readiness Score</p>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <p className="mt-2.5 text-2xl font-bold text-white font-mono tabular-nums">
            {plan.readinessScore}%
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300"
              style={{ width: `${plan.readinessScore}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">Roadmap Progress</p>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="mt-2.5 text-2xl font-bold text-white font-mono tabular-nums">
            {roadmapPct}%
          </p>
          <p className="mt-1 text-xs text-slate-400 font-mono tabular-nums">
            {completedCount} of {totalCount} milestones completed
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">Weekly Learning Hours</p>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between gap-2">
            <p className="text-2xl font-bold text-white font-mono tabular-nums">
              {totalLoggedHours}h{" "}
              <span className="text-sm font-normal text-slate-400">/ {plan.weeklyHours}h</span>
            </p>
            <button
              type="button"
              onClick={onLogStudyHour}
              className="inline-flex items-center gap-1 rounded-md border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-300 hover:bg-blue-500/20 transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3 h-3" />
              <span>1h</span>
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-400">Current week study log</p>
        </div>
      </section>

      {/* 3. Skill Analytics Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Competency Comparison Chart */}
        <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.07]">
            <div>
              <h2 className="text-base font-semibold text-white">
                Skill Competency vs. Role Benchmark
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Current proficiency compared against {plan.targetRole} hiring expectations
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-r from-violet-500 to-blue-500" />
                Current
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-0.5 bg-slate-200" />
                Target
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {plan.categoryCompetencies.map((item) => {
              const delta = item.currentScore - item.requiredScore;
              return (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">{item.category}</span>
                    <span className="font-mono tabular-nums text-slate-400">
                      <span className="text-white font-semibold">{item.currentScore}%</span>
                      <span> / {item.requiredScore}% req</span>
                      <span
                        className={`ml-2 ${
                          delta >= 0 ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        ({delta >= 0 ? `+${delta}` : delta}%)
                      </span>
                    </span>
                  </div>
                  <div className="relative h-2.5 w-full rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-300"
                      style={{ width: `${item.currentScore}%` }}
                    />
                    <div
                      title={`Required target: ${item.requiredScore}%`}
                      className="absolute top-[-2px] bottom-[-2px] w-0.5 bg-slate-100"
                      style={{ left: `${Math.min(99, item.requiredScore)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Learning Hours Bar Chart */}
        <div className="lg:col-span-5 rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/[0.07]">
            <div>
              <h2 className="text-base font-semibold text-white">Weekly Study Momentum</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Daily logged hours against {plan.weeklyHours}h/week goal
              </p>
            </div>
            <span className="text-xs font-mono tabular-nums text-blue-400">
              {totalLoggedHours}h total
            </span>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-3 items-end h-44 pt-4">
            {plan.weeklyStudyLog.map((entry) => {
              const targetHeightPct = Math.round((entry.target / maxDayHours) * 100);
              const loggedHeightPct = Math.round((entry.logged / maxDayHours) * 100);
              const metGoal = entry.logged >= entry.target;
              return (
                <div key={entry.day} className="flex flex-col items-center h-full justify-end gap-2">
                  <span className="text-[11px] font-mono tabular-nums text-slate-400">
                    {entry.logged}h
                  </span>
                  <div className="relative w-full max-w-[28px] h-28 rounded-md bg-white/[0.04] flex items-end overflow-hidden border border-white/[0.06]">
                    <div
                      className="absolute inset-x-0 border-t border-dashed border-slate-400/50"
                      style={{ bottom: `${targetHeightPct}%` }}
                      title={`Target: ${entry.target}h`}
                    />
                    <div
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        metGoal
                          ? "bg-gradient-to-t from-violet-600 to-blue-500"
                          : "bg-slate-600/80"
                      }`}
                      style={{ height: `${loggedHeightPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{entry.day}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.07] flex items-center justify-between text-xs text-slate-400">
            <span>Dashed line indicates daily target</span>
            <button
              type="button"
              onClick={onLogStudyHour}
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              + Log study hour
            </button>
          </div>
        </div>
      </section>

      {/* 4. Roadmap Milestones + Recommended Next Steps & Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Milestones Checklist */}
        <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-6">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
            <div>
              <h2 className="text-base font-semibold text-white">Active Roadmap Milestones</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Check off deliverables as you complete them to update progress
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("generator")}
              className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap shrink-0"
            >
              Full Roadmap
            </button>
          </div>

          <div className="mt-4 divide-y divide-white/[0.06]">
            {allMilestones.slice(0, 6).map((m) => (
              <div key={m.id} className="py-3.5 flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => onToggleMilestone(m.phaseId, m.id)}
                  className="mt-0.5 text-slate-400 hover:text-blue-400 transition-colors shrink-0"
                  aria-label={`Mark "${m.title}" as ${m.completed ? "incomplete" : "complete"}`}
                >
                  {m.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5" />
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
                    Phase {m.phaseNum} · {m.deliverable}
                  </p>
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-400 shrink-0">
                  {m.estimatedHours}h
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recommended Next Steps + Recent Activity */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recommended Next Steps */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-6">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/[0.07]">
              <h2 className="text-base font-semibold text-white">Recommended Next Steps</h2>
              <button
                type="button"
                onClick={() => onNavigate("skill-gap")}
                className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Skill Gaps
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {plan.recommendedSteps.map((step) => (
                <div key={step.id} className="pb-4 last:pb-0 border-b last:border-b-0 border-white/[0.06]">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-medium text-white">{step.title}</h3>
                    <span
                      className={`text-xs font-medium shrink-0 ${
                        step.priority === "Critical"
                          ? "text-rose-400"
                          : step.priority === "High"
                          ? "text-amber-400"
                          : "text-blue-400"
                      }`}
                    >
                      {step.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">{step.reason}</p>
                  <p className="mt-1.5 text-xs font-mono tabular-nums text-slate-500">
                    Est. {step.estimatedHours} hours
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-6">
            <h2 className="text-base font-semibold text-white pb-4 border-b border-white/[0.07]">
              Recent Activity
            </h2>
            <ul className="mt-4 space-y-3.5">
              {plan.recentActivity.slice(0, 5).map((act) => (
                <li key={act.id} className="flex items-start justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-200">{act.title}</p>
                    <p className="text-slate-400 mt-0.5">{act.context}</p>
                  </div>
                  <span className="text-slate-500 shrink-0 tabular-nums">{act.timestamp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
