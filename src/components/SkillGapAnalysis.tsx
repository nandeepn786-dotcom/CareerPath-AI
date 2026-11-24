import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Search,
  TrendingUp,
  XCircle,
} from "lucide-react";
import type { AppView, CareerPlan, SkillGapStatus } from "../types/career";

interface SkillGapAnalysisProps {
  plan: CareerPlan;
  onBoostSkill: (skillId: string) => void;
  onNavigate: (view: AppView) => void;
}

type StatusFilter = "All" | SkillGapStatus;

export function SkillGapAnalysis({
  plan,
  onBoostSkill,
  onNavigate,
}: SkillGapAnalysisProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const haveCount = plan.skillGaps.filter((g) => g.status === "Already Have").length;
  const improveCount = plan.skillGaps.filter((g) => g.status === "Needs Improvement").length;
  const missingCount = plan.skillGaps.filter((g) => g.status === "Missing Skills").length;

  const filteredGaps = plan.skillGaps.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      item.skillName.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.gapAnalysis.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-blue-400">Role Competency Benchmark</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Skill Gap Analysis — {plan.targetRole}
          </h1>
          <p className="mt-1.5 text-sm text-slate-300">
            Side-by-side comparison of your current proficiency against production expectations for{" "}
            {plan.targetRole}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("generator")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white hover:bg-white/[0.08] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <span>Recalibrate Skills</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Summary KPI Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Already Have</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">{haveCount}</p>
          <p className="mt-0.5 text-xs text-emerald-400">Meets role requirement</p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Needs Improvement</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {improveCount}
          </p>
          <p className="mt-0.5 text-xs text-amber-400">Targeted upskilling needed</p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Missing Skills</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {missingCount}
          </p>
          <p className="mt-0.5 text-xs text-rose-400">Priority roadmap focus</p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/75 p-5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overall Readiness</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {plan.readinessScore}%
          </p>
          <p className="mt-0.5 text-xs text-slate-400">Across {plan.skillGaps.length} skills</p>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#0B101D] p-1 border border-white/[0.08]">
          {(["All", "Already Have", "Needs Improvement", "Missing Skills"] as StatusFilter[]).map(
            (tab) => {
              const active = statusFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              );
            }
          )}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter skills or categories..."
            aria-label="Filter skills"
            className="w-full rounded-lg border border-white/10 bg-[#0B101D] pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Professional Comparison Table */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#080C17] text-xs font-medium text-slate-400">
                <th className="py-3.5 px-5">Skill Name</th>
                <th className="py-3.5 px-4">Current Skill Status</th>
                <th className="py-3.5 px-4">Required Level</th>
                <th className="py-3.5 px-4 w-56">Skill Progress</th>
                <th className="py-3.5 px-4">Gap Analysis</th>
                <th className="py-3.5 px-5 text-right">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-sm">
              {filteredGaps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-6 text-center text-sm text-slate-400">
                    No skills match the selected filter. Try switching back to All or clearing your
                    search query.
                  </td>
                </tr>
              ) : (
                filteredGaps.map((item) => {
                  const statusColor =
                    item.status === "Already Have"
                      ? "text-emerald-400"
                      : item.status === "Needs Improvement"
                      ? "text-amber-400"
                      : "text-rose-400";

                  const barColor =
                    item.status === "Already Have"
                      ? "bg-emerald-500"
                      : item.status === "Needs Improvement"
                      ? "bg-amber-500"
                      : "bg-rose-500";

                  const priorityColor =
                    item.priority === "Critical"
                      ? "text-rose-400"
                      : item.priority === "High"
                      ? "text-amber-400"
                      : item.priority === "Medium"
                      ? "text-blue-400"
                      : "text-emerald-400";

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-white/[0.025] transition-colors align-top"
                    >
                      <td className="py-4 px-5">
                        <p className="font-semibold text-white">{item.skillName}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.category} · {item.targetPhase}
                        </p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusColor}`}>
                          {item.status === "Already Have" && (
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                          )}
                          {item.status === "Needs Improvement" && (
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                          )}
                          {item.status === "Missing Skills" && (
                            <XCircle className="w-4 h-4 shrink-0" />
                          )}
                          <span>{item.status}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap font-mono tabular-nums text-xs text-slate-200">
                        {item.requiredLevel}% target
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                            <span className="text-slate-200">{item.currentLevel}%</span>
                            <span className="text-slate-500">Req {item.requiredLevel}%</span>
                          </div>
                          <div className="relative h-2 w-full rounded-full bg-white/[0.07]">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                              style={{ width: `${item.currentLevel}%` }}
                            />
                            <div
                              className="absolute top-[-2px] bottom-[-2px] w-0.5 bg-white/80"
                              style={{ left: `${Math.min(99, item.requiredLevel)}%` }}
                              title={`Required level: ${item.requiredLevel}%`}
                            />
                          </div>
                          {item.status !== "Already Have" && (
                            <button
                              type="button"
                              onClick={() => onBoostSkill(item.id)}
                              className="text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              + Log practice (+10%)
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs text-slate-300 leading-relaxed max-w-xs">
                        {item.gapAnalysis}
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <span className={`text-xs font-semibold ${priorityColor}`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
