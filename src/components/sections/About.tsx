import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { timeline } from "../../data/certificates";

const ABOUT_PHOTOS = ["/gallery-2.webp", "/about-graduation.webp", "/gallery-3.webp", "/gallery-4.webp", "/gallery-5.webp"];
const fadeUp: Variants = { hidden: { opacity: 0, y: 18 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] } }) };

export default function About() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const showPreviousPhoto = () => setPhotoIndex((index) => (index - 1 + ABOUT_PHOTOS.length) % ABOUT_PHOTOS.length);
  const showNextPhoto = () => setPhotoIndex((index) => (index + 1) % ABOUT_PHOTOS.length);

  return (
    <section id="about" className="section px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 flex items-end justify-between gap-8 border-b border-zinc-800 pb-6">
          <div><p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-blue-400">01 / About</p><h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">Building with intent.</h2></div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-zinc-500 md:block">A developer’s notebook. the people, systems, and questions behind the work.</p>
        </div>
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
            <div className="group relative overflow-hidden border border-zinc-800 bg-zinc-900">
              <img src={ABOUT_PHOTOS[photoIndex]} alt={`Marion Brix Quiling portrait ${photoIndex + 1}`} className="aspect-[4/5] w-full object-cover object-top grayscale-[12%] transition duration-500 group-hover:scale-[1.02]" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-12"><span className="font-mono text-[11px] text-zinc-400">PERSONAL ARCHIVE</span><span className="font-mono text-xs text-zinc-400">{String(photoIndex + 1).padStart(2, "0")} / {String(ABOUT_PHOTOS.length).padStart(2, "0")}</span></div>
              <button type="button" onClick={showPreviousPhoto} aria-label="Show previous photo" className="absolute bottom-2 right-20 p-2 text-zinc-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-blue-500"><HiChevronLeft size={18} /></button>
              <button type="button" onClick={showNextPhoto} aria-label="Show next photo" className="absolute bottom-2 right-3 p-2 text-zinc-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-blue-500"><HiChevronRight size={18} /></button>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-600"><span>Quezon City, PH</span><span>Full stack</span><span>Web + mobile</span></div>
          </motion.div>
          <div>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="max-w-2xl">
              <p className="text-2xl leading-tight tracking-[-0.025em] text-zinc-200 md:text-4xl">I build modern web and mobile applications that turn real workflows into clear, useful experiences.</p>
              <p className="mt-7 max-w-xl text-base leading-8 text-zinc-500">I&apos;m Marion Brix Quiling, a fresh graduate with a Bachelor of Science in Information Technology. I enjoy the space where thoughtful interfaces meet dependable systems, and I&apos;m eager to keep learning while contributing to meaningful products.</p>
            </motion.div>
            <div className="mt-20 border-t border-zinc-800"><div className="flex items-center justify-between py-5"><p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">The path so far</p><span className="font-mono text-xs text-zinc-700">2022 — 2026</span></div>
              {timeline.map((item, i) => <motion.div key={`${item.year}-${item.title}`} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] gap-4 border-t border-zinc-800/80 py-5 md:grid-cols-[88px_1fr] md:gap-8"><span className="font-mono text-xs text-blue-400">{item.year}</span><div className="min-w-0"><h3 className="text-sm font-medium text-zinc-200">{item.title}</h3><p className="mt-2 max-w-xl break-words text-sm leading-7 text-zinc-600">{item.description}</p></div></motion.div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
