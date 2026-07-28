import { motion, type Variants } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { HiArrowUpRight } from "react-icons/hi2";
import SectionHeader from "../ui/SectionHeader";
import Badge from "../ui/Badge";
import { projects } from "../../data/projects";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="section px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="03 / Projects"
          title="Featured Work"
          subtitle="Projects I've designed, built, and shipped — end to end."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass rounded-2xl overflow-hidden group flex flex-col"
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
              <div className="relative h-52 bg-zinc-900 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{project.description}</p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 mt-auto pt-2">
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
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white text-sm font-medium transition-all duration-200 border border-blue-500/20 hover:border-blue-500"
                    >
                      Live Demo <HiArrowUpRight size={13} />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
