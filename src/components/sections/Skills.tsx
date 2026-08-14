import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import {
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiCplusplus,
  SiSharp,
  SiDart,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
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
  SiCursor,
  SiTestinglibrary,
  SiPython,
  SiHostinger,
  SiVercel,
  SiComposer,
} from "react-icons/si";

import { FaCode, FaCss3Alt, FaDatabase, FaJava, FaLock, FaRobot, FaShieldHalved } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import { skillCategories } from "../../data/skills";

/** Map icon string names → actual icon components */
const ICON_MAP: Record<string, React.ReactNode> = {
  SiJavascript: <SiJavascript />,
  SiTypescript: <SiTypescript />,
  SiPhp: <SiPhp />,
  SiCplusplus: <SiCplusplus />,
  SiCsharp: <SiSharp />,
  SiSharp: <SiSharp />,
  SiDart: <SiDart />,
  SiHtml5: <SiHtml5 />,
  SiCss3: <FaCss3Alt />,
  SiReact: <SiReact />,
  SiNextdotjs: <SiNextdotjs />,
  SiNodedotjs: <SiNodedotjs />,
  SiLaravel: <SiLaravel />,
  SiFlutter: <SiFlutter />,
  SiBootstrap: <SiBootstrap />,
  SiTailwindcss: <SiTailwindcss />,
  SiMysql: <SiMysql />,
  SiMongodb: <SiMongodb />,
  SiOracle: <FaDatabase />,
  SiGit: <SiGit />,
  SiGithub: <SiGithub />,
  SiPostman: <SiPostman />,
  SiFigma: <SiFigma />,
  SiAnthropic: <SiAnthropic />,
  SiCursor: <SiCursor />,
  SiHostinger: <SiHostinger />,
  SiVercel: <SiVercel />,
  SiComposer: <SiComposer />,
  SiOpenai: <FaRobot />,
  SiTestinglibrary: <SiTestinglibrary />,
  SiPython: <SiPython />,
  FaJava: <FaJava />,
  FaVisualBasic: <FaCode />,
  FaLock: <FaLock />,
  FaShieldHalved: <FaShieldHalved />,
};

const TECH_ACCENT = "#3b82f6";

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
                  style={{ background: `${TECH_ACCENT}20`, border: `1px solid ${TECH_ACCENT}40` }}
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
            className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3"
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
              >
                {/* Icon */}
                <div className="text-2xl text-blue-500 transition-transform duration-200 group-hover:scale-110">
                  {ICON_MAP[skill.icon] ?? <SiReact />}
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
