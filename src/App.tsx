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

export default function App() {
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
