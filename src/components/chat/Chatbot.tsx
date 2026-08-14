import { AnimatePresence, motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { useChat } from "../../hooks/useChat";
import ChatWindow from "./ChatWindow";

export default function Chatbot() {
  const { messages, isLoading, isOpen, toggleChat, clearChat, sendMessage } = useChat();

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
        onClick={toggleChat}
        aria-label={isOpen ? "Close Brix AI Assistant" : "Open Brix AI Assistant"}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 h-14 w-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-900/40 z-[100] flex items-center justify-center transition-colors border border-blue-400/40"
      >
        <img src="/favicon.png" alt="" className="h-8 w-8 rounded-full object-cover" />
        <HiSparkles aria-hidden="true" className="absolute -right-0.5 -top-0.5 text-blue-100" size={14} />
      </motion.button>
    </>
  );
}
