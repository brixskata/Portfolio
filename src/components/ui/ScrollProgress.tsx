import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — thin blue bar fixed at the very top of the viewport.
 * useScroll returns a MotionValue tracking 0→1 as user scrolls the page.
 * useSpring smooths it out so it doesn't jump abruptly.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #2563eb, #60a5fa)",
        zIndex: 9999,
      }}
    />
  );
}
