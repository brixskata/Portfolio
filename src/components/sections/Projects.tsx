import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { HiArrowUpRight, HiXMark } from "react-icons/hi2";
import SectionHeader from "../ui/SectionHeader";
import Badge from "../ui/Badge";
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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function ProjectCard({
  project,
  index,
  onImageClick,
}: {
  project: Project;
  index: number;
  onImageClick: (src: string) => void;
}) {
  const isMobileShowcase = !!project.mobileShowcase && project.mobileShowcase.length > 0;
  const [currentScreen, setCurrentScreen] = useState(0);

  const nextScreen = () => {
    if (project.mobileShowcase) {
      setCurrentScreen((prev) => (prev + 1) % project.mobileShowcase!.length);
    }
  };

  const prevScreen = () => {
    if (project.mobileShowcase) {
      setCurrentScreen(
        (prev) => (prev - 1 + project.mobileShowcase!.length) % project.mobileShowcase!.length
      );
    }
  };

  useEffect(() => {
    if (!isMobileShowcase) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextScreen();
      if (e.key === "ArrowLeft") prevScreen();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileShowcase, project.mobileShowcase]);

  return (
    <motion.article
      custom={index}
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
      <div className="relative h-64 sm:h-52 bg-zinc-900 overflow-hidden flex items-center justify-center">
        {isMobileShowcase ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center w-full h-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(event, { offset, velocity }) => {
                void event;

                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  nextScreen();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevScreen();
                }
              }}
            >
              <img
                src={project.mobileShowcase![currentScreen].image}
                alt={project.mobileShowcase![currentScreen].title}
                loading="lazy"
                onClick={() => onImageClick(project.mobileShowcase![currentScreen].image)}
                className="w-auto h-[90%] object-contain rounded-md shadow-2xl z-10 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            onClick={() => onImageClick(project.image!)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
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
        {project.featured && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-4 relative z-10">
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

        {/* Links / Navigation */}
        <div className="flex flex-col gap-3 mt-auto pt-2">
          {isMobileShowcase ? (
            <div className="flex flex-col items-center gap-4 w-full pt-2">
              <div className="flex items-center justify-between w-full text-sm font-medium text-zinc-400">
                <button
                  onClick={prevScreen}
                  className="hover:text-white transition-colors px-2 py-1"
                >
                  Previous
                </button>
                <span className="font-mono text-xs">
                  {currentScreen + 1} / {project.mobileShowcase!.length}
                </span>
                <button
                  onClick={nextScreen}
                  className="hover:text-white transition-colors px-2 py-1"
                >
                  Next
                </button>
              </div>
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {project.mobileShowcase!.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentScreen(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentScreen
                      ? "bg-blue-500 w-4"
                      : "bg-zinc-600 hover:bg-zinc-500"
                      }`}
                    aria-label={`Go to screen ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
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
                  Visit <HiArrowUpRight size={13} />
                </motion.a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <section id="projects" className="section px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="03 / Projects"
          title="Featured Work"
          subtitle="Projects that showcase my skills in web, mobile, and full-stack development."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
          >
            <button
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close modal"
            >
              <HiXMark size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
