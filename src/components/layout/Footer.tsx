export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 px-4 py-8">
      <div className="mx-auto flex min-w-0 max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="max-w-full break-words text-center text-xs leading-6 text-zinc-500 sm:text-left sm:text-sm" style={{ fontFamily: "var(--font-mono)" }}>
          Brix<span className="text-blue-500"></span> — Designed &amp; Built by Marion Brix Quiling
        </p>
        <div className="flex items-center">
          <span className="text-xs text-zinc-600">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
