import { motion } from "framer-motion";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import SectionHeader from "../ui/SectionHeader";

const CONTACT_ITEMS = [
  {
    icon: <HiMail size={18} />,
    label: "Email",
    value: "brixquils16@gmail.com",
    href: "mailto:brixquils16@gmail.com",
  },
  {
    icon: <FaLinkedinIn size={14} />,
    label: "LinkedIn",
    value: "linkedin.com/in/marion-brix",
    href: "https://linkedin.com/in/marion-brix",
  },
  {
    icon: <SiGithub size={16} />,
    label: "GitHub",
    value: "github.com/brixskata",
    href: "https://github.com/brixskata",
  },
  {
    icon: <HiLocationMarker size={18} />,
    label: "Location",
    value: "Quezon City, Philippines",
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="05 / Contact"
          title="Let's Build Something"
          subtitle="I'm currently open to junior developer roles and freelance collaborations. Let's connect."
          center
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-lg mx-auto"
        >
          <div
            className="glass rounded-2xl p-8 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(24,24,27,0.9) 0%, rgba(9,9,11,0.95) 100%)",
            }}
          >
            {/* Subtle blue glow at top */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
              }}
            />

            <div className="space-y-4 mb-8">
              {CONTACT_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 text-zinc-400">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-600 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-300 hover:text-white transition-colors truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-zinc-400">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Primary CTA */}
            <motion.a
              href="mailto:brixquils16@gmail.com"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              <HiMail size={16} />
              Send an Email
              <HiArrowUpRight size={14} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
