import { motion, type Variants } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { timeline } from "../../data/certificates";

/** Fade+slide-up animation triggered when element enters viewport */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function About() {
  return (
    <section id="about" className="section px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="01 / About"
          title="Behind the Code"
          subtitle="A little about who I am and how I got here."
        />

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — photo + bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Avatar */}
            <div className="relative w-fit">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-xl shadow-black/40">
                <img
                  src="/photo1.jpg"
                  alt="Marion Brix Quiling"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status dot */}
              <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 rounded-full px-2.5 py-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-zinc-400 font-mono">Open to work</span>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-4">
              <p className="text-zinc-400 leading-relaxed">
                I'm <span className="text-white font-medium">Marion Brix Quiling</span>, a
                passionate Junior Full Stack Developer from Quezon City, Philippines. I build
                web and mobile applications that solve real problems with clean, maintainable
                code.
              </p>
              <p className="text-zinc-500 leading-relaxed">
                My journey started with curiosity about how websites work, and quickly evolved
                into a love for crafting complete end-to-end experiences — from database design
                to pixel-perfect UIs. I embrace AI-assisted development tools to work smarter
                and ship faster.
              </p>
              <p className="text-zinc-500 leading-relaxed">
                <span className="text-zinc-300">Career objective:</span> To join a team where
                I can contribute meaningfully, grow rapidly, and build products that actually
                matter to people.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: "Projects", value: "3+" },
                { label: "Tech Stack", value: "15+" },
                { label: "Location", value: "QC, PH" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl p-3 text-center"
                >
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <div className="relative">
            <h3 className="text-sm font-mono text-zinc-500 tracking-widest uppercase mb-8">
              Timeline
            </h3>
            {/* Vertical line */}
            <div className="absolute left-3 top-12 bottom-0 w-px bg-zinc-800" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="relative pl-10"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-zinc-900 border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>

                  <div className="glass rounded-xl p-4 hover:border-zinc-600 transition-colors">
                    <span className="text-xs font-mono text-blue-400">{item.year}</span>
                    <h4 className="text-white font-semibold mt-1 mb-1">{item.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
