import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import {
  SiJavascript,
  SiPhp,
  SiCplusplus,
  SiSharp,
  SiDart,
  SiHtml5,
  SiReact,
  SiLaravel,
  SiFlutter,
  SiBootstrap,
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  
  SiAnthropic,
} from "react-icons/si";

import { FaCss3Alt } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import { skillCategories } from "../../data/skills";

/** Map icon string names → actual icon components */
const ICON_MAP: Record<string, React.ReactNode> = {
  SiJavascript: <SiJavascript />,
  SiPhp: <SiPhp />,
  SiCplusplus: <SiCplusplus />,
  SiSharp: <SiSharp />,
  SiDart: <SiDart />,
  SiHtml5: <SiHtml5 />,
  SiCss3: <FaCss3Alt />,
  SiReact: <SiReact />,
  SiLaravel: <SiLaravel />,
  SiFlutter: <SiFlutter />,
  SiBootstrap: <SiBootstrap />,
  SiTailwindcss: <SiTailwindcss />,
  SiMysql: <SiMysql />,
  SiMongodb: <SiMongodb />,
  SiGit: <SiGit />,
  SiGithub: <SiGithub />,
  SiPostman: <SiPostman />,
  SiFigma: <SiFigma />,
 
  SiAnthropic: <SiAnthropic />,
};

/** Category accent colors */
const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#f59e0b",
  Frameworks: "#3b82f6",
  Databases: "#10b981",
  Tools: "#8b5cf6",
  "AI Tools": "#ec4899",
  Concepts: "#06b6d4",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].label);
  const active = skillCategories.find((c) => c.label === activeTab)!;
  const accent = CATEGORY_COLORS[activeTab] ?? "#3b82f6";

  return (
    <section id="skills" className="section px-6" style={{ background: "var(--bg-surface)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="02 / Skills"
          title="Tech Stack"
          subtitle="The languages, frameworks, and tools I work with."
        />

        {/* Tab bar */}
        <div className="relative flex flex-wrap gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(cat.label)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === cat.label
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {/* Animated background pill */}
              {activeTab === cat.label && (
                <motion.span
                  layoutId="skill-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: `${accent}20`, border: `1px solid ${accent}40` }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skill cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {active.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass rounded-xl p-4 flex flex-col items-center gap-3 cursor-default group"
                style={{ "--accent-color": accent } as React.CSSProperties}
              >
                {/* Icon */}
                <div
                  className="text-2xl transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="group-hover:text-current transition-colors" style={{ color: accent }}>
                    {ICON_MAP[skill.icon] ?? <SiReact />}
                  </span>
                </div>
                <span className="text-xs font-medium text-zinc-400 text-center leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
