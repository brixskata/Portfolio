import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../../hooks/useChat";
import ChatWindow from "./ChatWindow";

const ATTENTION_MESSAGES = [
  "Hey! Have a question?",
];
const ATTENTION_STORAGE_KEY = "brix_chat_attention_seen";
const ATTENTION_SOUND_PATH = "/sounds/chat-pop.mp3";

function audioDiagnostic(message: string, enabled: boolean) {
  if (enabled) console.info(`Brix chat audio: ${message}`);
}

function playAttentionSound(
  audio: HTMLAudioElement | null,
  diagnosticsEnabled: boolean,
) {
  if (!audio) return;

  try {
    audio.currentTime = 0;
    audioDiagnostic("attempting autoplay", diagnosticsEnabled);
    void audio.play()
      .then(() => audioDiagnostic("played", diagnosticsEnabled))
      .catch(() => audioDiagnostic("autoplay blocked", diagnosticsEnabled));
  } catch {
    audioDiagnostic("autoplay blocked", diagnosticsEnabled);
  }
}

export default function Chatbot() {
  const { messages, isLoading, isOpen, toggleChat, clearChat, sendMessage } = useChat();
  const [attentionMessage, setAttentionMessage] = useState<string | null>(null);
  const attentionHandledRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const diagnosticsEnabled = import.meta.env.DEV;
    const audio = new Audio(ATTENTION_SOUND_PATH);
    audio.preload = "auto";
    audio.volume = 1.0;
    audioRef.current = audio;

    const handleLoaded = () => audioDiagnostic("asset loaded", diagnosticsEnabled);
    const handleLoadError = () => audioDiagnostic("failed to load", diagnosticsEnabled);
    const unlockAudio = () => {
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      document.removeEventListener("click", unlockAudio);

      audio.muted = true;
      void audio.play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = false;
          audioUnlockedRef.current = true;
          audioDiagnostic("unlocked", diagnosticsEnabled);
        })
        .catch(() => {
          audio.muted = false;
          audioDiagnostic("autoplay blocked", diagnosticsEnabled);
        });
    };

    audio.addEventListener("canplaythrough", handleLoaded, { once: true });
    audio.addEventListener("error", handleLoadError, { once: true });
    document.addEventListener("pointerdown", unlockAudio, { passive: true });
    document.addEventListener("touchstart", unlockAudio, { passive: true });
    document.addEventListener("keydown", unlockAudio, { passive: true });
    document.addEventListener("click", unlockAudio, { passive: true });
    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleLoaded);
      audio.removeEventListener("error", handleLoadError);
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      document.removeEventListener("click", unlockAudio);
      audio.src = "";
      audioRef.current = null;
      audioUnlockedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let hideTimeoutId: number | undefined;

    try {
      if (!import.meta.env.DEV && window.localStorage.getItem(ATTENTION_STORAGE_KEY)) return;
    } catch {
      // Continue without persistence if storage is unavailable.
    }

    if (attentionHandledRef.current) return;

    const timeoutId = window.setTimeout(() => {
      if (isOpen) return;
      attentionHandledRef.current = true;
      const message = ATTENTION_MESSAGES[Math.floor(Math.random() * ATTENTION_MESSAGES.length)];
      setAttentionMessage(message);
      playAttentionSound(audioRef.current, import.meta.env.DEV);

      try {
        if (!import.meta.env.DEV) window.localStorage.setItem(ATTENTION_STORAGE_KEY, "true");
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
    if (!isOpen) {
      attentionHandledRef.current = true;
      try {
        if (!import.meta.env.DEV) window.localStorage.setItem(ATTENTION_STORAGE_KEY, "true");
      } catch {
        // Ignore storage errors; opening the chatbot still cancels the timer.
      }
    }
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
        animate={!isOpen && !reducedMotion ? { boxShadow: ["0 10px 30px rgba(30, 64, 175, 0.28)", "0 10px 34px rgba(59, 130, 246, 0.5)", "0 10px 30px rgba(30, 64, 175, 0.28)"] } : undefined}
        transition={{ duration: 2.8, repeat: isOpen || reducedMotion ? 0 : Infinity, ease: "easeInOut" }}
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
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, x: 8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, x: 8 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
            className="fixed bottom-[5.5rem] right-5 z-[110] max-w-[calc(100vw-5rem)] rounded-xl border border-zinc-200 bg-white px-4 py-3 text-left text-xs font-medium leading-relaxed text-zinc-800 shadow-xl shadow-black/20 after:absolute after:-bottom-1.5 after:right-5 after:h-3 after:w-3 after:rotate-45 after:border-b after:border-r after:border-zinc-200 after:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:right-6 sm:max-w-[320px]"
            aria-label="Open Chat with Brix"
          >
            {attentionMessage}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
