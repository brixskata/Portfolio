import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlinePaperAirplane, HiOutlineTrash, HiOutlineXMark } from "react-icons/hi2";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "../../types/chat";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What technologies does Marion know?",
  "Tell me about FitOps.",
  "Tell me about his internship.",
  "What role is Marion looking for?",
  "Why should I hire Marion?",
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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSendMessage(trimmed);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.section
      role="dialog"
      aria-label="Brix AI Assistant"
      aria-modal="false"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-[5.5rem] right-3 left-3 sm:left-auto sm:right-6 sm:bottom-24 w-auto sm:w-[380px] h-[min(650px,calc(100dvh-7rem))] min-h-[420px] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-[100]"
    >
      <header className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <img src="/favicon.png" alt="" className="h-9 w-9 rounded-full object-cover border border-blue-400/40" />
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-white leading-tight">Brix AI Assistant</h2>
          <p className="text-[11px] text-zinc-400 mt-1 truncate">Ask me about Marion's skills, projects, and experience.</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onClear}
            disabled={messages.length === 0 || isLoading}
            aria-label="Clear chat"
            title="Clear chat"
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-colors"
          >
            <HiOutlineTrash size={17} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            title="Close chat"
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
          >
            <HiOutlineXMark size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2 overscroll-contain">
        {messages.length === 0 ? (
          <div className="flex min-h-full flex-col justify-center">
            <div className="mb-5 text-center">
              <img src="/favicon.png" alt="" className="mx-auto mb-3 h-12 w-12 rounded-full border border-blue-400/30" />
              <p className="text-sm leading-relaxed text-zinc-200">Hi! I'm Brix, Marion's portfolio assistant. Ask me about his skills, projects, internship, or career.</p>
            </div>
            <div className="space-y-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => onSendMessage(question)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-left text-xs text-zinc-300 transition-colors hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white focus-visible:border-blue-400"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {isLoading && <div className="flex justify-start mb-4"><TypingIndicator /></div>}
            <div ref={endOfMessagesRef} />
          </>
        )}
      </div>

      <div className="border-t border-zinc-800 bg-zinc-900/80 p-3">
        <form onSubmit={handleSubmit} className="relative flex items-end overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-colors focus-within:border-blue-500/70">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Marion..."
            aria-label="Message Brix AI Assistant"
            className="min-h-[46px] max-h-32 w-full resize-none bg-transparent px-3 py-3 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="absolute bottom-1.5 right-1.5 rounded-lg p-2 text-blue-400 transition-colors hover:bg-blue-500/10 hover:text-blue-300 disabled:text-zinc-600 disabled:hover:bg-transparent"
          >
            <HiOutlinePaperAirplane size={19} className="-rotate-45" />
          </button>
        </form>
        <p className="mt-1.5 text-center text-[10px] text-zinc-600">Enter to send · Shift + Enter for a new line</p>
      </div>
    </motion.section>
  );
}
