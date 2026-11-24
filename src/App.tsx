import { useState, useCallback } from "react";
import type { AppView, CareerPlan, JobRole } from "./types/career";
import { INITIAL_CAREER_PLAN } from "./data/presets";
import { LandingPage } from "./components/LandingPage";
import { WorkspaceShell } from "./components/WorkspaceShell";
import { StudentDashboard } from "./components/StudentDashboard";
import { RoadmapGenerator } from "./components/RoadmapGenerator";
import { SkillGapAnalysis } from "./components/SkillGapAnalysis";
import { LoginModal } from "./components/LoginModal";

export default function App() {
  const [activeView, setActiveView] = useState<AppView>("landing");
  const [plan, setPlan] = useState<CareerPlan>(INITIAL_CAREER_PLAN);
  const [preselectedRole, setPreselectedRole] = useState<JobRole | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleNavigate = useCallback((view: AppView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectRoleForGenerator = useCallback((role: JobRole) => {
    setPreselectedRole(role);
    setActiveView("generator");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleClearPreselectedRole = useCallback(() => {
    setPreselectedRole(null);
  }, []);

  const handlePlanGenerated = useCallback((newPlan: CareerPlan) => {
    setPlan(newPlan);
  }, []);

  const handleToggleMilestone = useCallback((phaseId: string, milestoneId: string) => {
    setPlan((prev) => {
      let toggledTitle = "";
      let becameCompleted = false;

      const updatedPhases = prev.phases.map((phase) => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          milestones: phase.milestones.map((m) => {
            if (m.id !== milestoneId) return m;
            toggledTitle = m.title;
            becameCompleted = !m.completed;
            return { ...m, completed: !m.completed };
          }),
        };
      });

      const newActivity = toggledTitle
        ? [
            {
              id: `act-${Date.now()}`,
              title: `${becameCompleted ? "Completed" : "Reopened"} "${toggledTitle}"`,
              context: `${prev.targetRole} Roadmap`,
              timestamp: "Just now",
            },
            ...prev.recentActivity.slice(0, 6),
          ]
        : prev.recentActivity;

      return {
        ...prev,
        phases: updatedPhases,
        recentActivity: newActivity,
      };
    });
  }, []);

  const handleLogStudyHour = useCallback(() => {
    setPlan((prev) => {
      const updatedLog = prev.weeklyStudyLog.map((entry, idx) =>
        idx === prev.weeklyStudyLog.length - 1
          ? { ...entry, logged: Number((entry.logged + 1).toFixed(1)) }
          : entry
      );
      return {
        ...prev,
        weeklyStudyLog: updatedLog,
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            title: "Logged +1.0h focused study session",
            context: "Weekly Momentum",
            timestamp: "Just now",
          },
          ...prev.recentActivity.slice(0, 6),
        ],
      };
    });
  }, []);

  const handleBoostSkill = useCallback((skillId: string) => {
    setPlan((prev) => {
      let boostedSkillName = "";
      const updatedGaps = prev.skillGaps.map((gap) => {
        if (gap.id !== skillId) return gap;
        boostedSkillName = gap.skillName;
        const nextLevel = Math.min(100, gap.currentLevel + 10);
        const nextStatus =
          nextLevel >= gap.requiredLevel
            ? ("Already Have" as const)
            : nextLevel >= 40
            ? ("Needs Improvement" as const)
            : ("Missing Skills" as const);
        const nextPriority = nextStatus === "Already Have" ? ("Maintained" as const) : gap.priority;
        return {
          ...gap,
          currentLevel: nextLevel,
          status: nextStatus,
          priority: nextPriority,
        };
      });

      const avgCurrent =
        updatedGaps.length > 0
          ? Math.round(
              updatedGaps.reduce((sum, g) => sum + Math.min(1, g.currentLevel / g.requiredLevel), 0) /
                updatedGaps.length *
                100
            )
          : prev.readinessScore;

      return {
        ...prev,
        readinessScore: Math.min(99, Math.max(prev.readinessScore, avgCurrent)),
        skillGaps: updatedGaps,
        recentActivity: boostedSkillName
          ? [
              {
                id: `act-${Date.now()}`,
                title: `Practiced ${boostedSkillName} (+10% proficiency)`,
                context: "Skill Gap Analysis",
                timestamp: "Just now",
              },
              ...prev.recentActivity.slice(0, 6),
            ]
          : prev.recentActivity,
      };
    });
  }, []);

  const handleLogin = useCallback((name: string) => {
    setPlan((prev) => ({
      ...prev,
      studentName: name,
    }));
    setLoginOpen(false);
    setActiveView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {activeView === "landing" ? (
        <LandingPage
          onNavigate={handleNavigate}
          onSelectRoleForGenerator={handleSelectRoleForGenerator}
          onOpenLogin={() => setLoginOpen(true)}
        />
      ) : (
        <WorkspaceShell activeView={activeView} plan={plan} onNavigate={handleNavigate}>
          {activeView === "dashboard" && (
            <StudentDashboard
              plan={plan}
              onNavigate={handleNavigate}
              onToggleMilestone={handleToggleMilestone}
              onLogStudyHour={handleLogStudyHour}
            />
          )}
          {activeView === "generator" && (
            <RoadmapGenerator
              plan={plan}
              preselectedRole={preselectedRole}
              onClearPreselectedRole={handleClearPreselectedRole}
              onPlanGenerated={handlePlanGenerated}
              onToggleMilestone={handleToggleMilestone}
              onNavigate={handleNavigate}
            />
          )}
          {activeView === "skill-gap" && (
            <SkillGapAnalysis
              plan={plan}
              onBoostSkill={handleBoostSkill}
              onNavigate={handleNavigate}
            />
          )}
        </WorkspaceShell>
      )}

      <LoginModal
        isOpen={loginOpen}
        initialName={plan.studentName}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
