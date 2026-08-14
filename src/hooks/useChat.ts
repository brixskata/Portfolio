import { useState, useCallback } from "react";
import type { Message } from "../types/chat";
import { sendMessageToAPI } from "../services/chatService";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);
  const clearChat = () => setMessages([]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);

      setIsLoading(true);
      try {
        const reply = await sendMessageToAPI(content, messages);
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: reply,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to send message.";
        const aiError: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
        content: errorMessage,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiError]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return {
    messages,
    isLoading,
    isOpen,
    toggleChat,
    clearChat,
    sendMessage,
  };
};
