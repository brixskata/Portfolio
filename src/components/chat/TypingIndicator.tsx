import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex space-x-1 p-3 bg-zinc-800/80 backdrop-blur-md rounded-2xl rounded-bl-sm w-14 justify-center items-center h-10 border border-zinc-700/50">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
