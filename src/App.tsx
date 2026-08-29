import { useEffect } from "react";
import ScrollProgress from "./components/ui/ScrollProgress";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";
import Chatbot from "./components/chat/Chatbot";
import ProjectCaseStudy from "./components/projects/ProjectCaseStudy";
import { projects } from "./data/projects";

function getProjectFromPathname() {
  const match = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (!match) return undefined;
  return projects.find((project) => project.id === decodeURIComponent(match[1]));
}

export default function App() {
  const project = getProjectFromPathname();

  useEffect(() => {
    if (project || !window.location.hash) return;

    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "auto", block: "start" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [project]);

  if (project) {
    return <ProjectCaseStudy project={project} />;
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Fixed UI */}
      <ScrollProgress />
      <Navbar />

      {/* Page Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
