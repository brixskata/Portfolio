import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { certificates } from "../../data/certificates";

export default function Certificates() {
  return (
    <section id="certificates" className="section px-4 md:px-6" style={{ background: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid gap-6 border-b border-zinc-800 pb-8 md:grid-cols-[0.8fr_1.2fr] md:items-end"><div><p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-blue-400">04 / Proof</p><h2 className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">A few receipts.</h2></div><p className="max-w-lg text-base leading-8 text-zinc-500">Credentials, courses, and moments that mark the path, kept here as supporting evidence, not the headline.</p></div>
        <div className="border-t border-zinc-800">
          {certificates.map((certificate, index) => <motion.div key={certificate.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.06, duration: 0.45 }} className="group grid min-w-0 grid-cols-[28px_minmax(0,1fr)_auto_auto] items-center gap-2 border-b border-zinc-800/80 py-4 md:grid-cols-[56px_1fr_120px_24px] md:gap-6 md:py-5"><span className="font-mono text-[11px] text-zinc-700">{String(index + 1).padStart(2, "0")}</span><div className="min-w-0"><p className="break-words text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">{certificate.name}</p><p className="mt-1 break-words text-xs text-zinc-600">{certificate.issuer}</p></div><span className="font-mono text-xs text-zinc-600 md:text-right">{certificate.year}</span>{certificate.url ? <a href={certificate.url} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${certificate.name}`} className="text-zinc-600 transition-colors hover:text-blue-400"><HiArrowUpRight size={16} /></a> : <span />}</motion.div>)}
        </div>
      </div>
    </section>
  );
}
