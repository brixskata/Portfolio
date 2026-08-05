import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlinePaperAirplane, HiOutlineTrash, HiOutlineXMark } from "react-icons/hi2";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "../../types/chat";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (msg: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Tell me about yourself",
  "What technologies do you know?",
  "Tell me about your internship",
  "Show your projects",
  "Summarize your experience",
  "How can I contact you?",
];

export default function ChatWindow({
  messages,
  isLoading,
  onSendMessage,
  onClear,
  onClose,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-6 w-[calc(100vw-48px)] max-w-[380px] h-[550px] max-h-[75vh] flex flex-col bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-[100]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div>
          <h3 className="font-semibold text-white flex items-center gap-2">
            🤖 Brix AI Assistant
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Ask me about Marion's experience, projects, or resume.
          </p>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={onClear}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
              title="Clear Chat"
            >
              <HiOutlineTrash size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
          >
            <HiOutlineXMark size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70 mb-4">
              <span className="text-4xl mb-3">👋</span>
              <p className="text-sm text-zinc-300">
                Hi! I'm Marion's AI assistant.
                <br /> How can I help you today?
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => onSendMessage(q)}
                  className="text-xs px-3 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded-full border border-zinc-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <TypingIndicator />
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-end bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-blue-500/50 transition-colors"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="w-full max-h-32 min-h-[44px] bg-transparent text-white placeholder-zinc-500 text-sm px-4 py-3 resize-none focus:outline-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 mb-1 mr-1 text-blue-500 hover:text-blue-400 disabled:text-zinc-600 disabled:bg-transparent rounded-lg transition-colors flex-shrink-0"
          >
            <HiOutlinePaperAirplane size={20} className="-rotate-45" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
