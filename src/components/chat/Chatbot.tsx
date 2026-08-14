import { AnimatePresence, motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useChat } from "../../hooks/useChat";
import ChatWindow from "./ChatWindow";

const ATTENTION_MESSAGES = [
  "Hey! Have a question? 👋",
  "Want to know what I've built?",
  "Curious about my experience?",
  "Ask me anything about my work.",
];
const ATTENTION_STORAGE_KEY = "brix-chat-attention-seen";

export default function Chatbot() {
  const { messages, isLoading, isOpen, toggleChat, clearChat, sendMessage } = useChat();
  const [attentionMessage, setAttentionMessage] = useState<string | null>(null);

  useEffect(() => {
    let hideTimeoutId: number | undefined;

    try {
      if (window.localStorage.getItem(ATTENTION_STORAGE_KEY)) return;
    } catch {
      // Continue without persistence if storage is unavailable.
    }

    const timeoutId = window.setTimeout(() => {
      if (isOpen) return;
      const message = ATTENTION_MESSAGES[Math.floor(Math.random() * ATTENTION_MESSAGES.length)];
      setAttentionMessage(message);

      try {
        window.localStorage.setItem(ATTENTION_STORAGE_KEY, "true");
      } catch {
        // Ignore storage errors; the bubble remains limited to this visit.
      }

      hideTimeoutId = window.setTimeout(() => setAttentionMessage(null), 5000);
    }, 2000);

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (hideTimeoutId !== undefined) window.clearTimeout(hideTimeoutId);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setAttentionMessage(null);
    toggleChat();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSendMessage={sendMessage}
            onClear={clearChat}
            onClose={toggleChat}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        aria-label={isOpen ? "Close Chat with Brix" : "Open Chat with Brix"}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { boxShadow: ["0 10px 30px rgba(30, 64, 175, 0.28)", "0 10px 34px rgba(59, 130, 246, 0.5)", "0 10px 30px rgba(30, 64, 175, 0.28)"] } : undefined}
        transition={{ duration: 2.8, repeat: isOpen ? 0 : Infinity, ease: "easeInOut" }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 h-14 w-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-900/40 z-[100] flex items-center justify-center transition-colors border border-blue-400/40"
      >
        <img src="/favicon.png" alt="" className="h-8 w-8 rounded-full object-cover" />
        <HiSparkles aria-hidden="true" className="absolute -right-0.5 -top-0.5 text-blue-100" size={14} />
      </motion.button>

      <AnimatePresence>
        {!isOpen && attentionMessage && (
          <motion.button
            type="button"
            onClick={handleToggle}
            initial={{ opacity: 0, y: 8, x: 8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 6, x: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-[5.5rem] right-5 max-w-[calc(100vw-6rem)] rounded-xl border border-blue-400/30 bg-zinc-900 px-3 py-2 text-left text-xs font-medium text-zinc-100 shadow-xl shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:right-6"
            aria-label="Open Chat with Brix"
          >
            {attentionMessage}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
