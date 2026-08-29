import { motion, type Variants } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { HiArrowUpRight } from "react-icons/hi2";
import { projects } from "../../data/projects";
import type { Project } from "../../types";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      id={`project-${project.id}`}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`scroll-mt-28 group flex min-w-0 flex-col overflow-hidden border-y border-zinc-800 lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
      style={{
        boxShadow: "0 0 0 0 rgba(59,130,246,0)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 40px rgba(59,130,246,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 0 0 rgba(59,130,246,0)";
      }}
    >
      {/* Image */}
      <div className="relative h-60 min-w-0 overflow-hidden bg-zinc-900 sm:h-80 lg:h-[28rem] lg:w-[54%]">
        {project.image || project.mobileShowcase?.[0] ? (
          <a href={`/projects/${project.id}`} aria-label={`Open ${project.title} case study`} className="relative block h-full min-w-0 w-full p-3 sm:p-5">
            <img
              src={project.image ?? project.mobileShowcase![0].image}
              alt={project.title}
              className="h-full w-full cursor-pointer object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-950/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"><span className="border border-white/30 bg-zinc-950/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">View case study <HiArrowUpRight className="ml-1 inline" size={13} /></span></span>
          </a>
        ) : (
          <div className="absolute inset-0 flex flex-col justify-end bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.28),transparent_30%),linear-gradient(135deg,#18181b,#09090b)] p-6">
            <span className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300/80">
              Case study
            </span>
            <p className="text-2xl font-semibold tracking-tight text-white">
              {project.title}
            </p>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Featured badge */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-7 lg:w-[46%] lg:justify-center lg:p-10">
        <div>
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600"><span>{String(index + 1).padStart(2, "0")}</span><span className="h-px w-8 bg-zinc-700" /><span>{project.featured ? "Project study" : "Selected work"}</span></div>
          <h3 className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-white lg:text-3xl">{project.title}</h3>
          <p className="text-sm leading-7 text-zinc-500">{project.description}</p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-zinc-800/80 pt-5">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-[11px] text-zinc-600">{t}</span>
          ))}
        </div>

        {/* Links / Navigation */}
        <div className="mt-auto flex flex-col gap-3 pt-3">
          <div className="flex items-center gap-3">
              <motion.a
                href={`/projects/${project.id}`}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-blue-400"
              >
                Case Study <HiArrowUpRight size={13} />
              </motion.a>
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <SiGithub size={14} /> Code
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  Visit <HiArrowUpRight size={13} />
                </motion.a>
              )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section scroll-mt-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-end justify-between gap-8 border-b border-zinc-800 pb-8"><div><p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-blue-400">03 / Work</p><h2 className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">Things I&apos;ve built.</h2></div><p className="hidden max-w-xs text-right text-sm leading-relaxed text-zinc-500 md:block">Software shaped around actual people, processes, and problems.</p></div>

        <div className="space-y-16">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
