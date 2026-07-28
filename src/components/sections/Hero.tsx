import { motion, type Variants } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";


const FLOATING_BADGES = [
  { label: "React", delay: 0 },
  { label: "Laravel", delay: 0.4 },
  { label: "Flutter", delay: 0.8 },
  { label: "MySQL", delay: 1.2 },
  { label: "PHP", delay: 1.6 },
  { label: "Git", delay: 2.0 },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function Hero() {
  const scrollToAbout = () =>
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid"
    >
      {/* Glow orb */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20">
        <div className="glow-orb w-[700px] h-[500px] opacity-70" />
      </div>

      {/* Floating badges */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {FLOATING_BADGES.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.8],
              y: [0, -14, 0, -14, 0],
            }}
            transition={{
              opacity: { delay: b.delay + 1, duration: 0.5 },
              y: {
                delay: b.delay + 1,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute glass rounded-xl px-3 py-1.5 text-xs font-mono text-zinc-400"
            style={{
              top: `${18 + (i % 3) * 22}%`,
              left: i < 3 ? `${6 + i * 4}%` : undefined,
              right: i >= 3 ? `${6 + (i - 3) * 4}%` : undefined,
            }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-mono text-blue-400 tracking-widest uppercase mb-6"
          >
            Hi, I'm
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 gradient-text"
            style={{ lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Marion Brix
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-2xl sm:text-3xl font-light text-zinc-400 tracking-wide">
              Full Stack Developer
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-500 max-w-xl leading-relaxed mb-10"
          >
            Building modern web &amp; mobile experiences with clean code,
            thoughtful design, and an eye for detail. Based in{" "}
            <span className="text-zinc-300">Quezon City, PH</span>.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-14"
          >
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              View My Work
              <HiArrowDown size={15} />
            </motion.button>

            <motion.a
              href="https://github.com/brixskata"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-200 hover:bg-zinc-800/50"
            >
              <SiGithub size={15} />
              GitHub
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/marion-brix"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-200 hover:bg-zinc-800/50"
            >
              <FaLinkedinIn size={14} />
              LinkedIn
              <HiArrowUpRight size={12} />
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-zinc-700 cursor-pointer"
            onClick={scrollToAbout}
          >
            <HiArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}