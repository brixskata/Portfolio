import { motion, type Variants } from "framer-motion";
import { HiAcademicCap } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import SectionHeader from "../ui/SectionHeader";
import { certificates } from "../../data/certificates";

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function Certificates() {
  const hasCerts = certificates.length > 0;

  return (
    <section id="certificates" className="section px-6" style={{ background: "var(--bg-surface)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="04 / Certificates"
          title="Certifications and Achievements"
          subtitle="Verified credentials and completed courses."
        />

        {hasCerts ? (
          <div className="flex flex-col gap-3">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.name}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass rounded-xl px-5 py-4 flex items-center gap-4 group"
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <HiAcademicCap size={18} className="text-blue-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm leading-snug truncate">
                    {cert.name}
                  </p>
                  <p className="text-zinc-500 text-xs mt-0.5">{cert.issuer}</p>
                </div>

                {/* Year */}
                <span
                  className="text-xs font-mono text-zinc-600 flex-shrink-0"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {cert.year}
                </span>

                {/* Verify link */}
                {cert.url && (
                  <motion.a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-zinc-600 hover:text-blue-400 transition-colors flex-shrink-0"
                    aria-label="Verify certificate"
                  >
                    <HiArrowUpRight size={15} />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12 text-center"
          >
            <HiAcademicCap size={40} className="text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-sm">
              Certificates coming soon — actively pursuing credentials.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
