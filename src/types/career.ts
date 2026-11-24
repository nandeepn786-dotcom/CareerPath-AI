export const POPULAR_JOB_ROLES = [
  "AI Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Cybersecurity Engineer",
  "Cloud Engineer",
] as const;

export type JobRole = (typeof POPULAR_JOB_ROLES)[number];

export const EXPERIENCE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Career Switcher",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const LEARNING_PREFERENCES = [
  "Hands-on Projects",
  "Video Courses",
  "Documentation & Books",
  "Interactive Labs",
  "Mentorship & Code Review",
] as const;

export type LearningPreference = (typeof LEARNING_PREFERENCES)[number];

export type SkillGapStatus = "Already Have" | "Needs Improvement" | "Missing Skills";

export type SkillPriority = "Critical" | "High" | "Medium" | "Maintained";

export interface SkillGapItem {
  id: string;
  skillName: string;
  category: string;
  status: SkillGapStatus;
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  gapAnalysis: string;
  priority: SkillPriority;
  targetPhase: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  deliverable: string;
  estimatedHours: number;
  completed: boolean;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  durationWeeks: string;
  focusSummary: string;
  skillsCovered: string[];
  milestones: RoadmapMilestone[];
}

export interface CategoryCompetency {
  category: string;
  currentScore: number;
  requiredScore: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  context: string;
  timestamp: string;
}

export interface RecommendedStep {
  id: string;
  title: string;
  reason: string;
  estimatedHours: number;
  priority: "Critical" | "High" | "Medium";
}

export interface CareerPlan {
  studentName: string;
  targetRole: JobRole;
  experienceLevel: ExperienceLevel;
  weeklyHours: number;
  learningPreferences: LearningPreference[];
  currentSkills: string[];
  readinessScore: number;
  estimatedTotalWeeks: number;
  executiveSummary: string;
  phases: RoadmapPhase[];
  skillGaps: SkillGapItem[];
  categoryCompetencies: CategoryCompetency[];
  recommendedSteps: RecommendedStep[];
  weeklyStudyLog: { day: string; target: number; logged: number }[];
  recentActivity: ActivityItem[];
  generatedAt: string;
}

export interface RoadmapGenerationPayload {
  studentName: string;
  currentSkills: string[];
  targetRole: JobRole;
  experienceLevel: ExperienceLevel;
  weeklyHours: number;
  learningPreferences: LearningPreference[];
}

export type AppView = "landing" | "dashboard" | "generator" | "skill-gap";
