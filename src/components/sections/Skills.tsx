import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../../data/skills";

const capabilityCopy: Record<string, string> = {
  Languages: "The raw materials I use to model problems and make ideas executable.",
  Frameworks: "The structures I reach for when an interface needs to feel clear and a system needs to stay maintainable.",
  Databases: "Where product information lives, connects, and remains useful over time.",
  Tools: "The everyday layer that keeps development collaborative, testable, and moving.",
  Deployment: "Getting finished work from a local environment into the hands of real users.",
  "AI Tools": "Assistive tools I use to explore, iterate, and shorten the distance from thought to prototype.",
  Concepts: "The practices underneath the interface: structure, access, quality, and care.",
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].label);
  const active = skillCategories.find((category) => category.label === activeTab) ?? skillCategories[0];

  return (
    <section id="skills" className="section px-4 md:px-6" style={{ background: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid gap-6 border-b border-zinc-800 pb-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div><p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-blue-400">02 / Practice</p><h2 className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">How I work.</h2></div>
          <p className="max-w-lg text-base leading-8 text-zinc-500">A practical stack is more than a list of logos. These are the tools and ideas I combine to make software useful, understandable, and ready to grow.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <nav aria-label="Skill categories" className="flex flex-wrap gap-2 border-zinc-800 pb-1 md:block md:border-t">
            {skillCategories.map((category, index) => <button key={category.label} type="button" onClick={() => setActiveTab(category.label)} className={`flex min-w-0 max-w-full items-center gap-2 border border-zinc-800 px-3 py-2 text-left transition-colors md:w-full md:justify-between md:border-x-0 md:border-t-0 md:px-0 md:py-4 ${activeTab === category.label ? "border-blue-500/40 text-white md:border-zinc-800" : "text-zinc-600 hover:text-zinc-300"}`}><span className="flex min-w-0 items-center gap-3"><span className="font-mono text-[11px] text-zinc-700">{String(index + 1).padStart(2, "0")}</span><span className="truncate text-xs font-medium md:text-sm">{category.label}</span></span><span className={`hidden h-1.5 w-1.5 rounded-full transition-colors md:block ${activeTab === category.label ? "bg-blue-400" : "bg-zinc-800"}`} aria-hidden="true" /></button>)}
          </nav>

          <motion.div key={active.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="mb-10 flex min-w-0 items-start justify-between gap-4"><div className="min-w-0"><p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-400">Selected discipline</p><h3 className="mt-3 break-words text-3xl font-medium tracking-tight text-white">{active.label}</h3></div><span className="shrink-0 font-mono text-xs text-zinc-600">{String(active.skills.length).padStart(2, "0")} tools</span></div>
            <p className="mb-10 max-w-xl text-lg leading-8 text-zinc-400">{capabilityCopy[active.label]}</p>
            <div className="grid border-t border-zinc-800 sm:grid-cols-2">
              {active.skills.map((skill, index) => <div key={skill.name} className="flex min-w-0 items-center gap-4 border-b border-zinc-800/80 py-4 sm:even:border-l sm:even:pl-6"><span className="shrink-0 font-mono text-[11px] text-zinc-700">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 break-words text-sm text-zinc-300">{skill.name}</span></div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
