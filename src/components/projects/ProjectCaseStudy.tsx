import { motion } from "framer-motion";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Chatbot from "../chat/Chatbot";
import Badge from "../ui/Badge";
import type { Project } from "../../types";

interface ProjectCaseStudyProps {
  project: Project;
}

function ContentList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <section className="glass rounded-2xl p-6 sm:p-8">
      <h2 className="mb-5 text-xl font-semibold text-white">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const media = project.media;
  const screenshots = media?.screenshots ?? [];
  const overview = project.caseStudy?.overview ?? project.description;
  const hero = media?.hero ?? project.image;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-32 sm:pt-40">
        <motion.a
          href={`/#project-${project.id}`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <HiArrowLeft size={16} /> Back to projects
        </motion.a>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">Project case study</p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">{overview}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((technology) => <Badge key={technology}>{technology}</Badge>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-500 hover:text-white">
                Visit live project <HiArrowUpRight size={15} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
                <SiGithub size={15} /> View code
              </a>
            )}
          </div>
        </motion.header>

        {hero && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="group relative mb-8 flex min-h-[18rem] items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30 sm:min-h-[24rem]">
            <img src={hero} alt={`${project.title} preview`} className="max-h-[34rem] w-full object-contain transition-transform duration-700 group-hover:scale-[1.01]" />
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-zinc-950/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-label={`Visit ${project.title}`}><span className="border border-white/30 bg-zinc-950/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">Visit live project <HiArrowUpRight className="ml-1 inline" size={13} /></span></a>}
          </motion.div>
        )}

        <div className="grid gap-6">
          {project.caseStudy?.role && <ContentList title="My Role" items={[project.caseStudy.role]} />}
          <ContentList title="Features" items={project.caseStudy?.features} />
          <ContentList title="Contributions" items={project.caseStudy?.contributions} />
          <ContentList title="Challenges" items={project.caseStudy?.challenges} />

          {media?.video && (
            <section className="glass rounded-2xl p-4 sm:p-6">
              <h2 className="mb-4 px-2 text-xl font-semibold text-white">Walkthrough</h2>
              <video className="w-full rounded-xl" controls preload="metadata">
                <source src={media.video} />
                Your browser does not support the video element.
              </video>
            </section>
          )}

          {screenshots.length > 0 && (
            <section>
              <h2 className="mb-5 text-2xl font-semibold text-white">Screenshots</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {screenshots.map((screenshot) => (
                  <figure key={screenshot.src} className="glass overflow-hidden rounded-2xl bg-zinc-900">
                    <img src={screenshot.src} alt={screenshot.title ?? `${project.title} screenshot`} loading="lazy" className="aspect-video w-full object-contain" />
                    {(screenshot.title || screenshot.description) && (
                      <figcaption className="p-4">
                        {screenshot.title && <h3 className="text-sm font-medium text-white">{screenshot.title}</h3>}
                        {screenshot.description && <p className="mt-1 text-xs leading-relaxed text-zinc-500">{screenshot.description}</p>}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
