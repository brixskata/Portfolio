import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: [
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "PHP", icon: "SiPhp" },
      { name: "C++", icon: "SiCplusplus" },
      { name: "C#", icon: "SiCsharp" },
      { name: "Dart", icon: "SiDart" },
      { name: "Python", icon: "SiPython" },
      { name: "Java", icon: "FaJava" },
      { name: "Visual Basic", icon: "FaVisualBasic" },
      { name: "HTML", icon: "SiHtml5" },
      { name: "CSS", icon: "SiCss3" },
    ],
  },
  {
    label: "Frameworks",
    skills: [
      { name: "React", icon: "SiReact" },
      { name: "Laravel", icon: "SiLaravel" },
      { name: "Flutter", icon: "SiFlutter" },
      { name: "Bootstrap", icon: "SiBootstrap" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "MySQL", icon: "SiMysql" },
      { name: "MongoDB", icon: "SiMongodb" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "REST APIs", icon: "SiPostman" },
      { name: "Postman", icon: "SiPostman" },
    ],
  },
  {
    label: "AI Tools",
    skills: [
      
      { name: "Cursor", icon: "SiCursor" },
      { name: "ChatGPT", icon: "SiOpenai" },
    ],
  },
  {
    label: "Concepts",
    skills: [
      { name: "API Integration", icon: "SiPostman" },
      { name: "UI/UX Design", icon: "SiFigma" },
      { name: "Quality Assurance", icon: "SiTestinglibrary" },
    ],
  },
];
