import { AnimatePresence, motion } from "framer-motion";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-900/20 z-[100] flex items-center justify-center transition-colors border border-blue-400/30"
      >
        <HiChatBubbleLeftEllipsis size={28} />
      </motion.button>
    </>
  );
}
