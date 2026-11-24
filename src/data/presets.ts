import type { CareerPlan, JobRole } from "../types/career";

export interface RoleSpotlight {
  role: JobRole;
  medianWeeks: number;
  focusArea: string;
  coreSkills: string[];
  demandNote: string;
}

export const ROLE_SPOTLIGHTS: RoleSpotlight[] = [
  {
    role: "AI Engineer",
    medianWeeks: 14,
    focusArea: "LLM Systems & Applied Inference",
    coreSkills: ["Python", "RAG Architecture", "Eval Frameworks", "Vector DBs", "FastAPI"],
    demandNote: "Production LLM orchestration & evaluation",
  },
  {
    role: "Data Scientist",
    medianWeeks: 16,
    focusArea: "Statistical Modeling & Experimentation",
    coreSkills: ["Python", "SQL", "A/B Testing", "Scikit-Learn", "Feature Engineering"],
    demandNote: "Causal inference & predictive modeling",
  },
  {
    role: "Machine Learning Engineer",
    medianWeeks: 18,
    focusArea: "Training Pipelines & Model Serving",
    coreSkills: ["PyTorch", "MLOps", "CUDA Optimization", "Kubernetes", "Distributed Training"],
    demandNote: "End-to-end model lifecycle & low-latency serving",
  },
  {
    role: "Full Stack Developer",
    medianWeeks: 12,
    focusArea: "End-to-End Web Architecture",
    coreSkills: ["TypeScript", "React", "Node.js", "PostgreSQL", "System Design"],
    demandNote: "Type-safe APIs, state architecture & deployment",
  },
  {
    role: "Frontend Developer",
    medianWeeks: 10,
    focusArea: "Design Systems & Web Performance",
    coreSkills: ["TypeScript", "React", "Accessibility", "CSS Architecture", "Testing"],
    demandNote: "Accessible interfaces & Core Web Vitals",
  },
  {
    role: "Backend Developer",
    medianWeeks: 12,
    focusArea: "Distributed Services & Data Integrity",
    coreSkills: ["Go / Node.js", "PostgreSQL", "Redis", "Docker", "API Security"],
    demandNote: "High-throughput APIs & fault-tolerant storage",
  },
  {
    role: "Data Analyst",
    medianWeeks: 9,
    focusArea: "Business Intelligence & SQL Modeling",
    coreSkills: ["SQL", "dbt", "Python", "Tableau / Looker", "KPI Design"],
    demandNote: "Self-serve analytics & executive reporting",
  },
  {
    role: "Cybersecurity Engineer",
    medianWeeks: 15,
    focusArea: "Application & Cloud Threat Defense",
    coreSkills: ["IAM & Zero Trust", "Network Forensics", "AppSec", "SIEM", "Terraform"],
    demandNote: "Automated posture auditing & incident response",
  },
  {
    role: "Cloud Engineer",
    medianWeeks: 13,
    focusArea: "Infrastructure as Code & Reliability",
    coreSkills: ["AWS / GCP", "Terraform", "Kubernetes", "CI/CD", "Observability"],
    demandNote: "Multi-region resilience & automated provisioning",
  },
];

export const SUGGESTED_SKILLS = [
  "Python",
  "TypeScript",
  "React",
  "SQL",
  "Node.js",
  "Docker",
  "Git",
  "PyTorch",
  "AWS",
  "FastAPI",
  "PostgreSQL",
  "Kubernetes",
  "Tailwind CSS",
  "Linux",
  "REST APIs",
  "Prompt Engineering",
];

export const STUDENT_SUCCESS_STORIES = [
  {
    id: "elena",
    name: "Elena Rostova",
    role: "Machine Learning Engineer",
    company: "Linearity Labs",
    avatar: "/src/assets/images/avatar_alumni_elena_1795408092833.jpg",
    previousBackground: "Former Physics Research Assistant",
    outcomeMetric: "62% to 93% role readiness in 11 weeks",
    quote:
      "I already knew Python and linear algebra, so CareerPath AI skipped introductory tutorials and focused my 15 weekly hours directly on PyTorch serving, Docker, and evaluation benchmarks.",
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    role: "Cloud Infrastructure Engineer",
    company: "Northstar Systems",
    avatar: "/src/assets/images/avatar_alumni_marcus_1795408092830.jpg",
    previousBackground: "Mid-Level IT Systems Administrator",
    outcomeMetric: "Closed 6 critical IaC gaps in 9 weeks",
    quote:
      "The skill gap table showed me exactly where my on-prem networking fell short of modern cloud engineering—especially Terraform state management and Kubernetes ingress policies.",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Senior Data Scientist",
    company: "Veloce Commerce",
    avatar: "/src/assets/images/avatar_alumni_priya_1795408092701.jpg",
    previousBackground: "Marketing Operations Analyst",
    outcomeMetric: "Completed 4 production capstones in 14 weeks",
    quote:
      "Having my roadmap calibrated around 12 hours a week kept me consistent while working full time. Every milestone produced a portfolio artifact I walked through in technical interviews.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How does CareerPath AI calculate my Skill Readiness Score?",
    answer:
      "Your readiness score weights your existing skills against the core technical competencies required for your target role. Core foundational skills and production system requirements carry higher weight than secondary tooling.",
  },
  {
    question: "Can I customize the roadmap around my university or work schedule?",
    answer:
      "Yes. Using the Weekly Study Hours slider (5 to 40 hours per week), CareerPath AI recalculates phase timelines, milestone pacing, and estimated completion dates so your plan stays realistic.",
  },
  {
    question: "What makes the Skill Gap Analysis different from a generic course list?",
    answer:
      "Instead of recommending generic beginner playlists, the Skill Gap table categorizes every competency into Already Have, Needs Improvement, or Missing Skills—with explicit target proficiency percentages and concrete reasons why each gap matters.",
  },
  {
    question: "Which career tracks and experience levels are supported?",
    answer:
      "You can generate roadmaps for AI Engineer, Data Scientist, Machine Learning Engineer, Full Stack Developer, Frontend Developer, Backend Developer, Data Analyst, Cybersecurity Engineer, and Cloud Engineer across Beginner, Intermediate, Advanced, and Career Switcher levels.",
  },
  {
    question: "Can I update my skills as I complete roadmap milestones?",
    answer:
      "Yes. Checking off milestones in your Student Dashboard updates your roadmap completion progress and activity log in real time, and you can regenerate your plan anytime as your stack grows.",
  },
];

export const INITIAL_CAREER_PLAN: CareerPlan = {
  studentName: "Jordan Alvarez",
  targetRole: "AI Engineer",
  experienceLevel: "Intermediate",
  weeklyHours: 16,
  learningPreferences: ["Hands-on Projects", "Documentation & Books"],
  currentSkills: ["Python", "TypeScript", "React", "SQL", "REST APIs", "Git"],
  readinessScore: 68,
  estimatedTotalWeeks: 12,
  executiveSummary:
    "Strong software and Python fundamentals provide a 68% baseline for AI Engineering. Priority focus areas over the next 12 weeks are structured LLM evaluation harnesses, hybrid RAG retrieval pipelines, and containerized FastAPI model serving.",
  phases: [
    {
      id: "phase-1",
      phaseNumber: 1,
      title: "LLM Foundations & Structured Tool Use",
      durationWeeks: "Weeks 1–3",
      focusSummary:
        "Bridge existing Python and REST API knowledge into deterministic model orchestration, JSON schema outputs, and function calling.",
      skillsCovered: ["Prompt Architecture", "Structured Outputs", "Function Calling"],
      milestones: [
        {
          id: "m-1-1",
          title: "Build a schema-validated extraction service with Gemini API",
          deliverable: "Typed Python FastAPI endpoint returning validated JSON records",
          estimatedHours: 14,
          completed: true,
        },
        {
          id: "m-1-2",
          title: "Implement multi-step tool-calling agent with retry guardrails",
          deliverable: "CLI workflow with deterministic error recovery and tracing",
          estimatedHours: 18,
          completed: true,
        },
        {
          id: "m-1-3",
          title: "Benchmark latency and token cost across model tiers",
          deliverable: "Markdown evaluation report comparing 3 prompt strategies",
          estimatedHours: 10,
          completed: false,
        },
      ],
    },
    {
      id: "phase-2",
      phaseNumber: 2,
      title: "Hybrid RAG & Vector Retrieval Systems",
      durationWeeks: "Weeks 4–7",
      focusSummary:
        "Extend SQL database intuition into vector embeddings, semantic chunking, reranking, and grounded citation synthesis.",
      skillsCovered: ["Embeddings", "Vector Databases", "Hybrid Search"],
      milestones: [
        {
          id: "m-2-1",
          title: "Design document chunking and pgvector indexing pipeline",
          deliverable: "PostgreSQL + pgvector ingestion worker handling technical PDFs",
          estimatedHours: 20,
          completed: false,
        },
        {
          id: "m-2-2",
          title: "Add BM25 + dense vector hybrid reranking with citations",
          deliverable: "Search API returning source-grounded spans with precision@5 metrics",
          estimatedHours: 22,
          completed: false,
        },
      ],
    },
    {
      id: "phase-3",
      phaseNumber: 3,
      title: "Evaluation Harnesses & Production Deployment",
      durationWeeks: "Weeks 8–10",
      focusSummary:
        "Close infrastructure and observability gaps with automated LLM-as-a-judge regression suites, Docker containers, and streaming APIs.",
      skillsCovered: ["Eval Harnesses", "Docker", "Streaming SSE"],
      milestones: [
        {
          id: "m-3-1",
          title: "Create 50-case golden dataset & automated regression suite",
          deliverable: "CI check blocking prompt regressions below 85% accuracy",
          estimatedHours: 18,
          completed: false,
        },
        {
          id: "m-3-2",
          title: "Containerize full-stack AI workspace with streaming SSE",
          deliverable: "Multi-stage Dockerfile and Cloud Run deployment config",
          estimatedHours: 16,
          completed: false,
        },
      ],
    },
    {
      id: "phase-4",
      phaseNumber: 4,
      title: "Capstone Portfolio & Architecture Interviews",
      durationWeeks: "Weeks 11–12",
      focusSummary:
        "Synthesize all skills into a deployed production capstone and practice AI system design trade-offs.",
      skillsCovered: ["System Design", "Guardrails", "Technical Storytelling"],
      milestones: [
        {
          id: "m-4-1",
          title: "Publish end-to-end AI engineering capstone with live eval dashboard",
          deliverable: "Public repository, architecture diagram, and recorded walkthrough",
          estimatedHours: 24,
          completed: false,
        },
      ],
    },
  ],
  skillGaps: [
    {
      id: "sg-1",
      skillName: "Python Engineering",
      category: "Core Language",
      status: "Already Have",
      currentLevel: 88,
      requiredLevel: 85,
      gapAnalysis: "Meets production bar for async backends, typing, and data pipelines.",
      priority: "Maintained",
      targetPhase: "Phase 1",
    },
    {
      id: "sg-2",
      skillName: "SQL & Relational Modeling",
      category: "Data Layer",
      status: "Already Have",
      currentLevel: 82,
      requiredLevel: 75,
      gapAnalysis: "Strong query fundamentals; ready to extend into pgvector hybrid indexing.",
      priority: "Maintained",
      targetPhase: "Phase 2",
    },
    {
      id: "sg-3",
      skillName: "TypeScript & React UI",
      category: "Application Layer",
      status: "Already Have",
      currentLevel: 86,
      requiredLevel: 70,
      gapAnalysis: "Exceeds full-stack AI interface needs for streaming clients and dashboards.",
      priority: "Maintained",
      targetPhase: "Phase 3",
    },
    {
      id: "sg-4",
      skillName: "FastAPI & Async Services",
      category: "Backend Serving",
      status: "Needs Improvement",
      currentLevel: 54,
      requiredLevel: 85,
      gapAnalysis: "REST experience transfers well; needs SSE streaming and concurrency tuning.",
      priority: "High",
      targetPhase: "Phase 1",
    },
    {
      id: "sg-5",
      skillName: "Vector DBs & Hybrid RAG",
      category: "AI Systems",
      status: "Missing Skills",
      currentLevel: 18,
      requiredLevel: 85,
      gapAnalysis: "Requires hands-on chunking strategies, embeddings, and reranking pipelines.",
      priority: "Critical",
      targetPhase: "Phase 2",
    },
    {
      id: "sg-6",
      skillName: "LLM Evaluation & Evals CI",
      category: "Quality & Reliability",
      status: "Missing Skills",
      currentLevel: 15,
      requiredLevel: 80,
      gapAnalysis: "Essential differentiator for hiring; build golden datasets and rubric graders.",
      priority: "Critical",
      targetPhase: "Phase 3",
    },
    {
      id: "sg-7",
      skillName: "Docker & Container Deployment",
      category: "Infrastructure",
      status: "Needs Improvement",
      currentLevel: 42,
      requiredLevel: 75,
      gapAnalysis: "Needs multi-stage builds, env secret hygiene, and health-check probes.",
      priority: "Medium",
      targetPhase: "Phase 3",
    },
    {
      id: "sg-8",
      skillName: "AI System Design & Guardrails",
      category: "Architecture",
      status: "Needs Improvement",
      currentLevel: 48,
      requiredLevel: 80,
      gapAnalysis: "Practice latency budgets, fallback routing, and prompt injection defenses.",
      priority: "High",
      targetPhase: "Phase 4",
    },
  ],
  categoryCompetencies: [
    { category: "Core Coding", currentScore: 86, requiredScore: 85 },
    { category: "Data & SQL", currentScore: 80, requiredScore: 80 },
    { category: "AI / LLM Systems", currentScore: 32, requiredScore: 85 },
    { category: "Evals & Testing", currentScore: 24, requiredScore: 80 },
    { category: "Cloud & Containers", currentScore: 45, requiredScore: 75 },
  ],
  recommendedSteps: [
    {
      id: "rec-1",
      title: "Complete FastAPI SSE Streaming Benchmark",
      reason: "Bridges your REST API knowledge into low-latency AI service delivery.",
      estimatedHours: 6,
      priority: "High",
    },
    {
      id: "rec-2",
      title: "Build pgvector Hybrid Search Prototype",
      reason: "Addresses your highest-priority missing skill for AI Engineer roles.",
      estimatedHours: 10,
      priority: "Critical",
    },
    {
      id: "rec-3",
      title: "Author a 50-Question Retrieval Eval Suite",
      reason: "Demonstrates measurable engineering rigor on portfolio projects.",
      estimatedHours: 8,
      priority: "Critical",
    },
  ],
  weeklyStudyLog: [
    { day: "Mon", target: 2.5, logged: 2.5 },
    { day: "Tue", target: 2.5, logged: 3.0 },
    { day: "Wed", target: 2.0, logged: 1.5 },
    { day: "Thu", target: 2.5, logged: 2.5 },
    { day: "Fri", target: 2.0, logged: 2.0 },
    { day: "Sat", target: 2.5, logged: 3.5 },
    { day: "Sun", target: 2.0, logged: 1.0 },
  ],
  recentActivity: [
    {
      id: "act-1",
      title: "Completed Phase 1 tool-calling guardrail workflow",
      context: "AI Engineer Roadmap · Phase 1",
      timestamp: "2 hours ago",
    },
    {
      id: "act-2",
      title: "Verified Python & SQL proficiency benchmarks",
      context: "Skill Gap Analysis",
      timestamp: "Yesterday",
    },
    {
      id: "act-3",
      title: "Generated 12-week AI Engineer roadmap (16 hrs/wk)",
      context: "Roadmap Generator",
      timestamp: "3 days ago",
    },
  ],
  generatedAt: "2026-11-22",
};
