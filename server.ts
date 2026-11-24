import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import type { Request, Response } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_ROLES = new Set([
  "AI Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Cybersecurity Engineer",
  "Cloud Engineer",
]);

const ALLOWED_LEVELS = new Set([
  "Beginner",
  "Intermediate",
  "Advanced",
  "Career Switcher",
]);

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in the server environment.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "256kb" }));

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post("/api/roadmap/generate", async (req: Request, res: Response) => {
    try {
      const body = req.body ?? {};
      const studentName =
        typeof body.studentName === "string" && body.studentName.trim().length > 0
          ? body.studentName.trim().slice(0, 80)
          : "Student";

      const targetRole =
        typeof body.targetRole === "string" && ALLOWED_ROLES.has(body.targetRole)
          ? body.targetRole
          : null;

      if (!targetRole) {
        res.status(400).json({ error: "Please select a valid target job role." });
        return;
      }

      const experienceLevel =
        typeof body.experienceLevel === "string" && ALLOWED_LEVELS.has(body.experienceLevel)
          ? body.experienceLevel
          : "Intermediate";

      const rawHours = Number(body.weeklyHours);
      const weeklyHours = Number.isFinite(rawHours)
        ? Math.min(40, Math.max(5, Math.round(rawHours)))
        : 15;

      const currentSkills: string[] = Array.isArray(body.currentSkills)
        ? body.currentSkills
            .filter((s: unknown): s is string => typeof s === "string" && s.trim().length > 0)
            .map((s: string) => s.trim().slice(0, 48))
            .slice(0, 24)
        : [];

      const learningPreferences: string[] = Array.isArray(body.learningPreferences)
        ? body.learningPreferences
            .filter((p: unknown): p is string => typeof p === "string" && p.trim().length > 0)
            .map((p: string) => p.trim().slice(0, 64))
            .slice(0, 6)
        : ["Hands-on Projects"];

      const ai = getGeminiClient();

      const prompt = `Generate a structured, realistic career roadmap and skill gap analysis for a student targeting the role of "${targetRole}".

Student Profile:
- Name: ${studentName}
- Target Role: ${targetRole}
- Experience Level: ${experienceLevel}
- Current Skills: ${currentSkills.length > 0 ? currentSkills.join(", ") : "None listed yet (starting from scratch)"}
- Weekly Study Commitment: ${weeklyHours} hours/week
- Learning Preferences: ${learningPreferences.join(", ")}

Requirements:
1. Evaluate the student's current skills honestly against industry hiring standards for a ${targetRole}.
2. Calculate a realistic readinessScore (integer 5 to 95) and estimatedTotalWeeks based on ${weeklyHours} hours/week.
3. Produce 4 progressive phases (Phase 1 to Phase 4), each with 2 to 3 actionable milestones and realistic estimatedHours aligned with their learning preferences (${learningPreferences.join(", ")}).
4. Produce 7 to 9 skillGaps covering the core competencies for ${targetRole}. Every item's status MUST be exactly one of: "Already Have", "Needs Improvement", or "Missing Skills". Ensure skills the student already listed appear accurately as "Already Have" or "Needs Improvement", and critical missing requirements appear as "Missing Skills".
5. Produce 5 categoryCompetencies (e.g. Core Coding, Systems/Architecture, Domain Frameworks, Testing/Reliability, Cloud/Deployment) with currentScore and requiredScore (0-100).
6. Produce 3 concrete recommendedSteps to tackle this week.`;

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          systemInstruction:
            "You are a senior technical career advisor and engineering hiring manager. Return strictly calibrated, practical, non-generic skill gap analyses and execution roadmaps in valid JSON matching the requested schema.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              readinessScore: {
                type: Type.INTEGER,
                description: "Overall readiness percentage from 5 to 95.",
              },
              estimatedTotalWeeks: {
                type: Type.INTEGER,
                description: "Total weeks required at the given weekly study hours.",
              },
              executiveSummary: {
                type: Type.STRING,
                description: "2-3 sentence assessment of strengths, gaps, and timeline.",
              },
              phases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phaseNumber: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    durationWeeks: { type: Type.STRING },
                    focusSummary: { type: Type.STRING },
                    skillsCovered: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    milestones: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          deliverable: { type: Type.STRING },
                          estimatedHours: { type: Type.INTEGER },
                        },
                        required: ["title", "deliverable", "estimatedHours"],
                      },
                    },
                  },
                  required: [
                    "phaseNumber",
                    "title",
                    "durationWeeks",
                    "focusSummary",
                    "skillsCovered",
                    "milestones",
                  ],
                },
              },
              skillGaps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skillName: { type: Type.STRING },
                    category: { type: Type.STRING },
                    status: {
                      type: Type.STRING,
                      description:
                        'Must be exactly "Already Have", "Needs Improvement", or "Missing Skills".',
                    },
                    currentLevel: { type: Type.INTEGER },
                    requiredLevel: { type: Type.INTEGER },
                    gapAnalysis: { type: Type.STRING },
                    priority: {
                      type: Type.STRING,
                      description:
                        'Must be exactly "Critical", "High", "Medium", or "Maintained".',
                    },
                    targetPhase: { type: Type.STRING },
                  },
                  required: [
                    "skillName",
                    "category",
                    "status",
                    "currentLevel",
                    "requiredLevel",
                    "gapAnalysis",
                    "priority",
                    "targetPhase",
                  ],
                },
              },
              categoryCompetencies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    currentScore: { type: Type.INTEGER },
                    requiredScore: { type: Type.INTEGER },
                  },
                  required: ["category", "currentScore", "requiredScore"],
                },
              },
              recommendedSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    estimatedHours: { type: Type.INTEGER },
                    priority: {
                      type: Type.STRING,
                      description: 'Must be "Critical", "High", or "Medium".',
                    },
                  },
                  required: ["title", "reason", "estimatedHours", "priority"],
                },
              },
            },
            required: [
              "readinessScore",
              "estimatedTotalWeeks",
              "executiveSummary",
              "phases",
              "skillGaps",
              "categoryCompetencies",
              "recommendedSteps",
            ],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        res.status(502).json({ error: "Model returned an empty response. Please try again." });
        return;
      }

      const parsed = JSON.parse(rawText);

      const normalizeStatus = (val: string): "Already Have" | "Needs Improvement" | "Missing Skills" => {
        if (val === "Already Have" || val === "Needs Improvement" || val === "Missing Skills") {
          return val;
        }
        const lower = String(val || "").toLowerCase();
        if (lower.includes("have") || lower.includes("met")) return "Already Have";
        if (lower.includes("improv") || lower.includes("partial")) return "Needs Improvement";
        return "Missing Skills";
      };

      const normalizePriority = (val: string): "Critical" | "High" | "Medium" | "Maintained" => {
        if (val === "Critical" || val === "High" || val === "Medium" || val === "Maintained") {
          return val;
        }
        const lower = String(val || "").toLowerCase();
        if (lower.includes("crit")) return "Critical";
        if (lower.includes("high")) return "High";
        if (lower.includes("maint")) return "Maintained";
        return "Medium";
      };

      const phases = Array.isArray(parsed.phases)
        ? parsed.phases.map((p: Record<string, unknown>, idx: number) => ({
            id: `phase-${idx + 1}`,
            phaseNumber: typeof p.phaseNumber === "number" ? p.phaseNumber : idx + 1,
            title: String(p.title || `Phase ${idx + 1}`),
            durationWeeks: String(p.durationWeeks || `Weeks ${idx * 3 + 1}–${(idx + 1) * 3}`),
            focusSummary: String(p.focusSummary || ""),
            skillsCovered: Array.isArray(p.skillsCovered) ? p.skillsCovered.map(String) : [],
            milestones: Array.isArray(p.milestones)
              ? p.milestones.map((m: Record<string, unknown>, mIdx: number) => ({
                  id: `m-${idx + 1}-${mIdx + 1}`,
                  title: String(m.title || "Complete milestone"),
                  deliverable: String(m.deliverable || "Verified project artifact"),
                  estimatedHours: Math.max(2, Number(m.estimatedHours) || 8),
                  completed: false,
                }))
              : [],
          }))
        : [];

      const skillGaps = Array.isArray(parsed.skillGaps)
        ? parsed.skillGaps.map((g: Record<string, unknown>, idx: number) => ({
            id: `sg-${idx + 1}`,
            skillName: String(g.skillName || "Core Competency"),
            category: String(g.category || "Technical"),
            status: normalizeStatus(String(g.status || "")),
            currentLevel: Math.min(100, Math.max(0, Math.round(Number(g.currentLevel) || 0))),
            requiredLevel: Math.min(100, Math.max(10, Math.round(Number(g.requiredLevel) || 80))),
            gapAnalysis: String(g.gapAnalysis || ""),
            priority: normalizePriority(String(g.priority || "")),
            targetPhase: String(g.targetPhase || "Phase 1"),
          }))
        : [];

      const categoryCompetencies = Array.isArray(parsed.categoryCompetencies)
        ? parsed.categoryCompetencies.map((c: Record<string, unknown>) => ({
            category: String(c.category || "Engineering"),
            currentScore: Math.min(100, Math.max(0, Math.round(Number(c.currentScore) || 40))),
            requiredScore: Math.min(100, Math.max(10, Math.round(Number(c.requiredScore) || 85))),
          }))
        : [];

      const recommendedSteps = Array.isArray(parsed.recommendedSteps)
        ? parsed.recommendedSteps.map((s: Record<string, unknown>, idx: number) => {
            const p = String(s.priority || "High");
            const stepPriority: "Critical" | "High" | "Medium" =
              p === "Critical" || p === "High" || p === "Medium" ? p : "High";
            return {
              id: `rec-${idx + 1}`,
              title: String(s.title || "Start Phase 1"),
              reason: String(s.reason || ""),
              estimatedHours: Math.max(1, Math.round(Number(s.estimatedHours) || 6)),
              priority: stepPriority,
            };
          })
        : [];

      const dailyTarget = Number((weeklyHours / 7).toFixed(1));
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const weeklyStudyLog = days.map((day, idx) => ({
        day,
        target: dailyTarget,
        logged: idx === 0 ? dailyTarget : 0,
      }));

      res.json({
        studentName,
        targetRole,
        experienceLevel,
        weeklyHours,
        learningPreferences,
        currentSkills,
        readinessScore: Math.min(98, Math.max(5, Math.round(Number(parsed.readinessScore) || 55))),
        estimatedTotalWeeks: Math.max(4, Math.round(Number(parsed.estimatedTotalWeeks) || 12)),
        executiveSummary: String(parsed.executiveSummary || ""),
        phases,
        skillGaps,
        categoryCompetencies,
        recommendedSteps,
        weeklyStudyLog,
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            title: `Generated ${targetRole} roadmap (${weeklyHours} hrs/wk)`,
            context: "AI Roadmap Generator",
            timestamp: "Just now",
          },
          {
            id: `act-${Date.now() + 1}`,
            title: `Assessed ${skillGaps.length} competencies against ${targetRole} rubric`,
            context: "Skill Gap Analysis",
            timestamp: "Just now",
          },
        ],
        generatedAt: new Date().toISOString().slice(0, 10),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to generate career roadmap.";
      console.error("Roadmap generation error:", err);
      res.status(500).json({ error: message });
    }
  });

  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("/{*splat}", (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`CareerPath AI server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
