// ─── Types for the entire portfolio ───────────────────────────────────────

export interface Skill {
  name: string;
  icon: string; // react-icons component name
  level?: number; // 0-100 optional proficiency
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export interface MobileScreen {
  image: string;
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  mobileShowcase?: MobileScreen[];
}

export interface Certificate {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  icon?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}
