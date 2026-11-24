import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  Layers,
  Target,
  Clock,
} from "lucide-react";
import type { AppView, JobRole } from "../types/career";
import { FAQ_ITEMS, ROLE_SPOTLIGHTS, STUDENT_SUCCESS_STORIES } from "../data/presets";
import { BrandMark } from "./BrandMark";

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  onSelectRoleForGenerator: (role: JobRole) => void;
  onOpenLogin: () => void;
}

const PREVIEW_TRACKS: {
  role: JobRole;
  readiness: number;
  weeks: number;
  hours: number;
  skills: { name: string; status: "Already Have" | "Needs Improvement" | "Missing Skills"; pct: number }[];
  nextMilestone: string;
}[] = [
  {
    role: "AI Engineer",
    readiness: 68,
    weeks: 12,
    hours: 16,
    skills: [
      { name: "Python & Async APIs", status: "Already Have", pct: 88 },
      { name: "FastAPI Streaming", status: "Needs Improvement", pct: 54 },
      { name: "Hybrid RAG & Evals", status: "Missing Skills", pct: 18 },
    ],
    nextMilestone: "Build pgvector hybrid retrieval pipeline with precision@5 evals",
  },
  {
    role: "Full Stack Developer",
    readiness: 81,
    weeks: 8,
    hours: 14,
    skills: [
      { name: "TypeScript & React", status: "Already Have", pct: 90 },
      { name: "PostgreSQL Indexing", status: "Needs Improvement", pct: 60 },
      { name: "Distributed Caching", status: "Missing Skills", pct: 25 },
    ],
    nextMilestone: "Implement Redis rate-limiting and zero-downtime schema migrations",
  },
  {
    role: "Cloud Engineer",
    readiness: 59,
    weeks: 14,
    hours: 18,
    skills: [
      { name: "Linux & Git Workflows", status: "Already Have", pct: 84 },
      { name: "Docker Multi-Stage", status: "Needs Improvement", pct: 48 },
      { name: "Terraform & K8s RBAC", status: "Missing Skills", pct: 15 },
    ],
    nextMilestone: "Provision multi-AZ VPC and EKS cluster via modular Terraform",
  },
];

export function LandingPage({
  onNavigate,
  onSelectRoleForGenerator,
  onOpenLogin,
}: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreviewIdx, setActivePreviewIdx] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [brokenAvatars, setBrokenAvatars] = useState<Record<string, boolean>>({});

  const activePreview = PREVIEW_TRACKS[activePreviewIdx];

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-100">
      {/* Subtle radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(124,58,237,0.18),rgba(37,99,235,0.08),transparent)]"
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#05070E]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            <BrandMark className="w-7 h-7 shrink-0" />
            <span>CareerPath AI</span>
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300"
          >
            <a
              href="#home"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#features"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#careers"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Careers
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
          </nav>

          {/* Zone 3: Login & Get Started Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => onNavigate("generator")}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:from-violet-500 hover:to-blue-500 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden rounded-lg border border-white/10 p-2 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/[0.08] bg-[#080C17] px-6 py-4 space-y-3">
            <div className="flex flex-col space-y-2.5 text-sm font-medium text-slate-300">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-white">
                Home
              </a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-white">
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-white">
                How It Works
              </a>
              <a href="#careers" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-white">
                Careers
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-white">
                About
              </a>
            </div>
            <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("generator");
                }}
                className="flex-1 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 py-2.5 text-sm font-medium text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* 1. HERO SECTION */}
        <section id="home" className="mx-auto max-w-7xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm font-medium text-blue-400">
                AI Career Roadmap &amp; Skill Gap Diagnostics
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
                Your Dream Career Starts With the Right Skills.
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
                Benchmark your current technical stack against real hiring expectations, uncover
                high-priority skill gaps, and follow a calibrated week-by-week roadmap built around
                your schedule.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate("generator")}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 hover:from-violet-500 hover:to-blue-500 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <span>Get My Career Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("dashboard")}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/[0.07] hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore Student Dashboard</span>
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                <span>9 Engineering &amp; Data Tracks</span>
                <span aria-hidden="true">·</span>
                <span>Live Skill Gap Matrix</span>
                <span aria-hidden="true">·</span>
                <span>Adaptive Weekly Pacing</span>
              </div>
            </div>

            {/* Interactive Modern AI Dashboard Preview Illustration */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-white/10 bg-[#0B101D]/90 backdrop-blur-md p-5 sm:p-6 shadow-2xl shadow-black/50">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Interactive Workspace Preview</p>
                    <h2 className="text-base font-semibold text-white mt-0.5">
                      {activePreview.role} Readiness Model
                    </h2>
                  </div>

                  {/* Interactive Role Switcher */}
                  <div className="flex items-center gap-1 rounded-lg bg-[#060913] p-1 border border-white/[0.06]">
                    {PREVIEW_TRACKS.map((track, idx) => (
                      <button
                        key={track.role}
                        type="button"
                        onClick={() => setActivePreviewIdx(idx)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          activePreviewIdx === idx
                            ? "bg-gradient-to-r from-violet-600/90 to-blue-600/90 text-white"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {track.role.replace(" Developer", "").replace(" Engineer", "")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview KPI Row */}
                <div className="grid grid-cols-3 gap-4 py-4 border-b border-white/[0.08]">
                  <div>
                    <p className="text-xs text-slate-400">Skill Readiness</p>
                    <p className="mt-1 text-2xl font-bold text-white font-mono tabular-nums">
                      {activePreview.readiness}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Estimated Path</p>
                    <p className="mt-1 text-2xl font-bold text-white font-mono tabular-nums">
                      {activePreview.weeks} wks
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Study Cadence</p>
                    <p className="mt-1 text-2xl font-bold text-white font-mono tabular-nums">
                      {activePreview.hours}h/wk
                    </p>
                  </div>
                </div>

                {/* Preview Skill Gap Rows */}
                <div className="py-4 space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Competency Diagnostic</span>
                    <span>Current Proficiency</span>
                  </div>
                  {activePreview.skills.map((skill) => {
                    const statusStyle =
                      skill.status === "Already Have"
                        ? "text-emerald-400"
                        : skill.status === "Needs Improvement"
                        ? "text-amber-400"
                        : "text-rose-400";
                    const barColor =
                      skill.status === "Already Have"
                        ? "bg-emerald-500"
                        : skill.status === "Needs Improvement"
                        ? "bg-amber-500"
                        : "bg-rose-500";
                    return (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-medium text-slate-200">{skill.name}</span>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className={`inline-flex items-center gap-1 ${statusStyle}`}>
                              {skill.status === "Already Have" && (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              )}
                              {skill.status === "Needs Improvement" && (
                                <AlertTriangle className="w-3.5 h-3.5" />
                              )}
                              {skill.status === "Missing Skills" && (
                                <XCircle className="w-3.5 h-3.5" />
                              )}
                              <span>{skill.status}</span>
                            </span>
                            <span className="font-mono tabular-nums text-slate-300 w-9 text-right">
                              {skill.pct}%
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                            style={{ width: `${skill.pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Preview Next Milestone Footer */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Next Recommended Milestone</p>
                    <p className="text-xs font-medium text-slate-200 truncate mt-0.5">
                      {activePreview.nextMilestone}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectRoleForGenerator(activePreview.role)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Customize This Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FEATURES SECTION (Asymmetric Bento Grid) */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/[0.07]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-violet-400">Platform Capabilities</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Built to replace guesswork with measurable skill progression.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Marquee Feature 1 (col-span-2) */}
            <div className="md:col-span-2 rounded-xl border border-white/[0.08] bg-[#0B101D]/70 p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">
                    01. Precision Skill Gap Diagnostics
                  </h3>
                  <Target className="w-5 h-5 text-blue-400 shrink-0" />
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Compare every skill you already know against production engineering rubrics. Every
                  requirement is classified as Already Have, Needs Improvement, or Missing
                  Skills—with exact proficiency targets and priority rankings.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/[0.07] grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-emerald-400 font-medium">Already Have</span>
                  <p className="text-slate-400 mt-1">Skipped in curriculum</p>
                </div>
                <div>
                  <span className="text-amber-400 font-medium">Needs Improvement</span>
                  <p className="text-slate-400 mt-1">Targeted upgrade labs</p>
                </div>
                <div>
                  <span className="text-rose-400 font-medium">Missing Skills</span>
                  <p className="text-slate-400 mt-1">Priority sprint modules</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/70 p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">
                    02. Schedule-Aware Pacing
                  </h3>
                  <Clock className="w-5 h-5 text-violet-400 shrink-0" />
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Set your realistic weekly study commitment between 5 and 40 hours. Roadmaps adjust
                  sprint boundaries and deliverable sizes so you never burn out.
                </p>
              </div>
              <p className="mt-6 pt-4 border-t border-white/[0.07] text-xs text-slate-400 font-mono tabular-nums">
                5–40 hrs/week calibration
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/70 p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">
                    03. Readiness Analytics
                  </h3>
                  <BarChart3 className="w-5 h-5 text-blue-400 shrink-0" />
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Track category-by-category competency coverage and weekly study momentum from a
                  unified student command center.
                </p>
              </div>
              <p className="mt-6 pt-4 border-t border-white/[0.07] text-xs text-slate-400">
                Real-time milestone completion tracking
              </p>
            </div>

            {/* Feature 4 (col-span-2) */}
            <div className="md:col-span-2 rounded-xl border border-white/[0.08] bg-[#0B101D]/70 p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">
                    04. Deliverable-Driven Learning Phases
                  </h3>
                  <Layers className="w-5 h-5 text-violet-400 shrink-0" />
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Rather than passive watchlists, every roadmap phase concludes with concrete
                  engineering artifacts—deployed APIs, evaluation benchmarks, Terraform modules, or
                  reproducible data notebooks tailored to your learning preferences.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/[0.07] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                <span>Hands-on Projects</span>
                <span aria-hidden="true">·</span>
                <span>Interactive Labs</span>
                <span aria-hidden="true">·</span>
                <span>Documentation &amp; Books</span>
                <span aria-hidden="true">·</span>
                <span>Video Courses</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/[0.07]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-400">How It Works</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              From current skillset to interview-ready portfolio in three steps.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 pt-6 border-t border-white/15">
              <p className="text-xs font-mono tabular-nums text-violet-400">Step 01</p>
              <h3 className="text-lg font-semibold text-white">Input Your Stack &amp; Hours</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Enter your existing technical skills, experience level, weekly study budget, and
                preferred learning formats in under 60 seconds.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/15">
              <p className="text-xs font-mono tabular-nums text-blue-400">Step 02</p>
              <h3 className="text-lg font-semibold text-white">Inspect Your Skill Gap Matrix</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                AI evaluates your profile against target role benchmarks, surfacing what you already
                mastered alongside critical missing competencies.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/15">
              <p className="text-xs font-mono tabular-nums text-emerald-400">Step 03</p>
              <h3 className="text-lg font-semibold text-white">Execute Weekly Milestones</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Follow your 4-phase roadmap inside the Student Dashboard, checking off deliverables
                and watching your readiness score climb each week.
              </p>
            </div>
          </div>
        </section>

        {/* 4. POPULAR CAREER PATHS SECTION */}
        <section id="careers" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/[0.07]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-violet-400">Popular Career Paths</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                Nine high-demand technical tracks calibrated to industry hiring bars.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("generator")}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open Custom Generator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLE_SPOTLIGHTS.map((item) => (
              <div
                key={item.role}
                className="group rounded-xl border border-white/[0.08] bg-[#0B101D]/65 p-6 hover:border-blue-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                    <span className="text-xs font-mono tabular-nums text-slate-400 shrink-0">
                      ~{item.medianWeeks} wks
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-blue-400">{item.focusArea}</p>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">{item.demandNote}</p>
                  <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                    {item.coreSkills.join(" · ")}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                  <span className="text-xs text-slate-400">4-phase blueprint</span>
                  <button
                    type="button"
                    onClick={() => onSelectRoleForGenerator(item.role)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Build Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. STUDENT SUCCESS SECTION */}
        <section className="mx-auto max-w-7xl px-6 py-20 border-t border-white/[0.07]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-400">Student Outcomes</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Structured roadmaps that convert study hours into offers.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {STUDENT_SUCCESS_STORIES.map((story) => (
              <article
                key={story.id}
                className="rounded-xl border border-white/[0.08] bg-[#0B101D]/65 p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-emerald-400">{story.outcomeMetric}</p>
                  <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.07] flex items-center gap-3.5">
                  {brokenAvatars[story.id] ? (
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-violet-600/40 to-blue-600/40 border border-white/10 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                      {story.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  ) : (
                    <img
                      src={story.avatar}
                      alt={`${story.name}, ${story.role}`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenAvatars((prev) => ({ ...prev, [story.id]: true }))
                      }
                      className="h-11 w-11 rounded-full object-cover border border-white/10 shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{story.name}</p>
                    <p className="text-xs text-slate-400 truncate">
                      {story.role} · {story.company}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{story.previousBackground}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6. ABOUT SECTION */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/[0.07]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-sm font-medium text-violet-400">About CareerPath AI</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                Designed around how engineering teams actually hire.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Most learners waste months repeating introductory syntax courses while missing the
                applied system design, testing, and deployment skills hiring managers test for.
                CareerPath AI bridges that gap by mapping your real background directly onto
                role-specific competency rubrics.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/65 p-6">
                <p className="text-3xl font-bold text-white font-mono tabular-nums">9</p>
                <p className="mt-1 text-sm font-medium text-slate-200">Core Engineering Tracks</p>
                <p className="mt-1 text-xs text-slate-400">
                  From AI Engineering and Data Science to Cloud and Cybersecurity.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/65 p-6">
                <p className="text-3xl font-bold text-white font-mono tabular-nums">4-Phase</p>
                <p className="mt-1 text-sm font-medium text-slate-200">Execution Blueprints</p>
                <p className="mt-1 text-xs text-slate-400">
                  Foundations, Core Systems, Production Evals, and Portfolio Capstone.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/65 p-6">
                <p className="text-3xl font-bold text-white font-mono tabular-nums">3-Tier</p>
                <p className="mt-1 text-sm font-medium text-slate-200">Gap Classification</p>
                <p className="mt-1 text-xs text-slate-400">
                  Already Have, Needs Improvement, and Missing Skills diagnostics.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#0B101D]/65 p-6">
                <p className="text-3xl font-bold text-white font-mono tabular-nums">100%</p>
                <p className="mt-1 text-sm font-medium text-slate-200">Schedule Calibrated</p>
                <p className="mt-1 text-xs text-slate-400">
                  Every milestone is scoped to your exact weekly study hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section className="mx-auto max-w-4xl px-6 py-20 border-t border-white/[0.07]">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-sm font-medium text-blue-400">Frequently Asked Questions</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Clarity before you start
            </h2>
          </div>

          <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={item.question} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left py-1.5 text-sm sm:text-base font-medium text-white hover:text-blue-300 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-400" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-sm text-slate-300 leading-relaxed pr-8">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Conversion Callout */}
          <div className="mt-16 rounded-xl border border-white/10 bg-gradient-to-br from-[#0E1528] to-[#090D18] p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to map your skill gaps?
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Generate a personalized AI career roadmap and competency breakdown in under a minute.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate("generator")}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white hover:from-violet-500 hover:to-blue-500 transition-all whitespace-nowrap shrink-0"
              >
                <span>Get My Career Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("skill-gap")}
                className="rounded-lg border border-white/12 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/[0.05] transition-colors whitespace-nowrap shrink-0"
              >
                View Sample Skill Gap Table
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 8. PROFESSIONAL FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#04060C]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5 text-base font-bold text-white">
                <BrandMark className="w-6 h-6" />
                <span>CareerPath AI</span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                AI-powered career roadmap generator and skill gap diagnostics built for ambitious
                students and engineers.
              </p>
            </div>

            <div className="space-y-2.5 text-sm">
              <p className="font-semibold text-white">Platform</p>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("dashboard")}
                    className="hover:text-white transition-colors"
                  >
                    Student Dashboard
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("generator")}
                    className="hover:text-white transition-colors"
                  >
                    Roadmap Generator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("skill-gap")}
                    className="hover:text-white transition-colors"
                  >
                    Skill Gap Analysis
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5 text-sm">
              <p className="font-semibold text-white">Sections</p>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-white transition-colors">
                    Popular Careers
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} CareerPath AI. All rights reserved.</p>
            <p>Precision Career Roadmaps &amp; Competency Diagnostics</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
