import { motion, useReducedMotion, type Variants } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const scrollToAbout = () =>
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen overflow-hidden bg-zinc-950"
      aria-label="Introduction"
    >
      <div
        className="absolute inset-0 hidden bg-zinc-100 md:block [clip-path:polygon(0_0,56%_0,46%_100%,0_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 hidden h-[70%] w-[55%] bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.22),transparent_68%)] md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 pb-12 pt-28 md:px-10 md:pb-0 md:pt-24">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="z-10 flex max-w-xl flex-col justify-center text-center text-zinc-100 md:min-h-[calc(100vh-6rem)] md:w-[46%] md:text-left md:text-zinc-950"
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blue-400 md:text-blue-700"
          >
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold tracking-[-0.055em] sm:text-6xl lg:text-7xl"
          >
            Marion Brix Quiling
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-3 text-base font-medium text-zinc-400 md:text-zinc-600 sm:text-lg"
          >
          Software Engineer | Laravel Developer | Flutter Developer
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-zinc-400 md:mx-0 md:text-zinc-600 sm:text-base"
          >
            I build modern web and mobile applications with clean, maintainable
            code and thoughtful interfaces.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-3 md:justify-start"
          >
            <motion.a
              href="https://github.com/brixskata"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200 transition-colors hover:bg-zinc-800 md:border-zinc-300 md:bg-white md:text-zinc-800 md:hover:bg-zinc-200"
            >
              <SiGithub size={18} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/marion-brix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200 transition-colors hover:bg-zinc-800 md:border-zinc-300 md:bg-white md:text-zinc-800 md:hover:bg-zinc-200"
            >
              <FaLinkedinIn size={16} />
            </motion.a>
            <motion.button
              type="button"
              onClick={scrollToAbout}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              View work <HiArrowDown size={15} />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative z-10 mt-10 flex flex-1 items-end justify-center md:absolute md:bottom-0 md:right-0 md:mt-0 md:h-[88%] md:w-[59%] md:justify-end"
        >
          <img
            src="/hero.png"
            alt="Marion Brix Quiling"
            className="h-auto max-h-[54vh] w-auto max-w-full object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.55)] md:max-h-none md:h-full"
          />
        </motion.div>
      </div>

    </section>
  );
}
