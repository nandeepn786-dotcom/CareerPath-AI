import { useState } from "react";
import {
  LayoutDashboard,
  Compass,
  Table2,
  ArrowLeft,
  Menu,
  X,
  Plus,
} from "lucide-react";
import type { AppView, CareerPlan } from "../types/career";
import { BrandMark } from "./BrandMark";

interface WorkspaceShellProps {
  activeView: Exclude<AppView, "landing">;
  plan: CareerPlan;
  onNavigate: (view: AppView) => void;
  children: React.ReactNode;
}

const NAV_ITEMS: {
  view: Exclude<AppView, "landing">;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { view: "dashboard", label: "Student Dashboard", icon: LayoutDashboard },
  { view: "generator", label: "Roadmap Generator", icon: Compass },
  { view: "skill-gap", label: "Skill Gap Analysis", icon: Table2 },
];

export function WorkspaceShell({
  activeView,
  plan,
  onNavigate,
  children,
}: WorkspaceShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTitle =
    NAV_ITEMS.find((item) => item.view === activeView)?.label ?? "Student Dashboard";

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-100 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/[0.08] bg-[#080C17] flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/[0.08]">
            <button
              type="button"
              onClick={() => onNavigate("landing")}
              className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0"
            >
              <BrandMark className="w-7 h-7 shrink-0" />
              <span>CareerPath AI</span>
            </button>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden rounded-lg p-1.5 text-slate-400 hover:text-white"
              aria-label="Close navigation sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Workspace Navigation" className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => {
                    onNavigate(item.view);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600/20 to-blue-600/20 text-white border border-violet-500/30"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-400" : "text-slate-400"}`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Active Track Summary */}
          <div className="mx-3 mt-4 rounded-lg border border-white/[0.07] bg-[#0B101D] p-3.5">
            <p className="text-xs text-slate-400">Active Target Role</p>
            <p className="mt-1 text-sm font-semibold text-white truncate">{plan.targetRole}</p>
            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
              <span>{plan.readinessScore}% Ready</span>
              <span>{plan.weeklyHours}h/wk</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300"
                style={{ width: `${plan.readinessScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Return Link */}
        <div className="p-3 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-white/[0.04] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>Back to Home</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Contextual Top Bar */}
        <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#05070E]/90 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden rounded-lg border border-white/10 p-2 text-slate-300 hover:text-white shrink-0"
                aria-label="Open navigation sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 truncate">
                <span className="hidden sm:inline">Workspace</span>
                <span className="hidden sm:inline text-slate-600">/</span>
                <span className="font-medium text-white truncate">{currentTitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeView !== "generator" ? (
                <button
                  type="button"
                  onClick={() => onNavigate("generator")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:from-violet-500 hover:to-blue-500 transition-all whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Roadmap</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate("skill-gap")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.08] transition-colors whitespace-nowrap shrink-0"
                >
                  <Table2 className="w-3.5 h-3.5" />
                  <span>Inspect Skill Gaps</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 sm:px-8 py-7 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
