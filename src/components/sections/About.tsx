import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SectionHeader from "../ui/SectionHeader";
import { timeline } from "../../data/certificates";

const ABOUT_PHOTOS = [
  "/gallery-2.webp",
  "/about-graduation.webp",
  "/gallery-3.webp",
  "/gallery-4.webp",
  "/gallery-5.webp",
];

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
  const [photoIndex, setPhotoIndex] = useState(0);
  const currentPhoto = ABOUT_PHOTOS[photoIndex];

  const showPreviousPhoto = () =>
    setPhotoIndex((index) => (index - 1 + ABOUT_PHOTOS.length) % ABOUT_PHOTOS.length);
  const showNextPhoto = () =>
    setPhotoIndex((index) => (index + 1) % ABOUT_PHOTOS.length);

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
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/30">
              <img
                key={currentPhoto}
                src={currentPhoto}
                alt={`Marion Brix Quiling graduation portrait ${photoIndex + 1}`}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900 px-3 py-2">
                <button
                  type="button"
                  onClick={showPreviousPhoto}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  aria-label="Show previous photo"
                >
                  <HiChevronLeft size={19} />
                </button>
                <span className="text-xs font-mono text-zinc-500">
                  {photoIndex + 1} / {ABOUT_PHOTOS.length}
                </span>
                <button
                  type="button"
                  onClick={showNextPhoto}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  aria-label="Show next photo"
                >
                  <HiChevronRight size={19} />
                </button>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-4">
              <p className="text-zinc-400 leading-relaxed">
                I'm <span className="text-white font-medium">Marion Brix Quiling</span>, a fresh graduate with a Bachelor of Science in Information Technology who is passionate about web and mobile development. I enjoy creating modern applications that combine clean design, efficient code, and great user experiences. As I begin my professional career, I'm eager to keep learning new technologies, sharpen my skills, and contribute to meaningful projects.
                




              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: "Specialization", value: "Full Stack" },
                { label: "Mobile Apps", value: "Flutter" },
                { label: "Backend", value: "Laravel" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl p-3 text-center"
                >
                  <p className="text-base font-bold leading-tight text-white sm:text-xl">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <div className="relative">
            <h3 className="text-sm font-mono text-zinc-500 tracking-widest uppercase mb-8">
              Journey
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
