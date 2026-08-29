import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) });
      const result = await response.json() as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      setStatus("success");
      setStatusMessage(result.message || "Thanks — your message has been sent.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to send your message.");
    }
  };

  return (
    <section id="contact" className="section scroll-mt-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl border-t border-zinc-800 pt-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <div><p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-blue-400">05 / Contact</p><h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl md:text-7xl">Have a useful problem to solve?</h2><p className="mt-8 max-w-xl text-lg leading-8 text-zinc-500">I&apos;m currently open to junior developer roles and freelance collaborations. If the work matters, I&apos;d like to hear about it.</p></div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col justify-end lg:pb-2">
            <a href="mailto:brixquils16@gmail.com" className="group flex min-w-0 items-center justify-between gap-3 border-b border-zinc-700 py-5 text-zinc-200 transition-colors hover:border-blue-400 hover:text-white"><span className="min-w-0 break-all text-base sm:text-lg">brixquils16@gmail.com</span><HiArrowUpRight className="shrink-0 text-zinc-600 transition group-hover:text-blue-400" size={20} /></a>
            <form onSubmit={submitForm} className="mt-8 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="sr-only">Name</span><input name="name" type="text" required maxLength={100} placeholder="Your name" autoComplete="name" className="w-full border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors focus:border-blue-400" /></label>
                <label className="block"><span className="sr-only">Email</span><input name="email" type="email" required maxLength={254} placeholder="Your email" autoComplete="email" className="w-full border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors focus:border-blue-400" /></label>
              </div>
              <label className="block"><span className="sr-only">Message</span><textarea name="message" required maxLength={4000} rows={4} placeholder="Tell me a little about the problem you’re solving." className="w-full resize-y border-b border-zinc-800 bg-transparent px-0 py-3 text-sm leading-7 text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors focus:border-blue-400" /></label>
              <label className="hidden" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2"><button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 transition-colors hover:text-blue-400 disabled:cursor-wait disabled:text-zinc-600">{status === "sending" ? "Sending…" : "Send message"}<HiArrowUpRight size={15} /></button><p role="status" aria-live="polite" className={`text-xs ${status === "error" ? "text-red-400" : status === "success" ? "text-emerald-400" : "text-zinc-600"}`}>{statusMessage}</p></div>
            </form>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600 sm:gap-x-6 sm:text-xs"><span>Quezon City, PH</span><a href="https://linkedin.com/in/marion-brix" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-zinc-300"><FaLinkedinIn /> LinkedIn</a><a href="https://github.com/brixskata" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-zinc-300"><SiGithub /> GitHub</a></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
