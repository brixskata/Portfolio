import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}

/**
 * SectionHeader — reused by every major section.
 * Uses Framer Motion's viewport-triggered fade+slide-up animation.
 * `eyebrow` is the small label above the title (e.g., "01 / About").
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
  children,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className="text-xs font-mono tracking-widest uppercase mb-3"
          style={{ color: "var(--accent)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        style={{ color: "var(--text-heading)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl leading-relaxed ${center ? "mx-auto" : ""}`}
          style={{ color: "var(--text-body)" }}
        >
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}
