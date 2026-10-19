export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  score: string;
  details?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  type: string; // e.g. "Individual Project" or "Team Project (5 Members)"
  guide?: string;
  role?: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  scoreOrDate?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  yearOrSemester: string;
  description: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  type: string; // "Hackathon" | "Workshop" | "Conclave"
  durationOrDate?: string;
  description: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    phone: string;
    email: string;
    location: string;
    headline: string;
    linkedinUrl: string;
    githubUrl: string;
  };
  careerObjective: string;
  education: EducationItem[];
  skills: {
    programming: string[];
    webDevelopment: string[];
    databases: string[];
    tools: string[];
    aiAndAutomation: string[];
  };
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  activities: ActivityItem[];
  strengths: string[];
}

export interface AtsAuditMetric {
  category: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'room_to_grow';
  summary: string;
  strengths: string[];
  improvements: string[];
}
