import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { motion } from "framer-motion";

const SOCIALS = [
  {
    icon: <SiGithub size={16} />,
    href: "https://github.com/brixskata",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn size={14} />,
    href: "https://linkedin.com/in/marion-brix",
    label: "LinkedIn",
  },
  {
    icon: <HiMail size={16} />,
    href: "mailto:brixquils16@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Wordmark */}
        <p
          className="text-sm text-zinc-500"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Brix<span className="text-blue-500"></span> — Designed & Built by Marion Brix Quiling
        </p>

        {/* Socials + year */}
        <div className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.15, y: -1 }}
              whileTap={{ scale: 0.93 }}
              className="text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              {s.icon}
            </motion.a>
          ))}
          <span className="text-zinc-700 text-xs select-none">·</span>
          <span className="text-zinc-600 text-xs">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
