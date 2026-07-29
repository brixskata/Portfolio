import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

/**
 * Navbar — sticky, glass-blur nav with:
 * - Scroll-aware background opacity
 * - Animated underline on hover
 * - Mobile menu with AnimatePresence
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-2 left-0 right-0 z-50 px-4"
      >
        <nav
          className={`max-w-5xl mx-auto px-5 py-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "glass shadow-2xl shadow-black/20"
              : "bg-zinc-950/85 border border-zinc-800/80 backdrop-blur-md"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="text-white font-bold text-lg tracking-tight flex items-center gap-1 cursor-pointer"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Brix
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mb-0.5 inline-block" />
            </motion.button>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className={`nav-link text-sm font-medium pb-0.5 bg-transparent border-none cursor-pointer ${
                      active === link.href ? "text-white" : ""
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <div>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
                aria-label="Toggle menu"
              >
                {menuOpen ? <HiX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl glass p-6 md:hidden shadow-2xl"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-zinc-300 hover:text-white text-base font-medium transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
