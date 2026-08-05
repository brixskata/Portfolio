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

      const lowerContent = content.toLowerCase();

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);

      // Extra Feature: Hardcoded triggers
      if (lowerContent.includes("resume")) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "Here is a link to my resume:\n\n<a href='/resume.pdf' target='_blank' class='inline-block px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>View Resume PDF</a>",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        return;
      }

      if (lowerContent.includes("github")) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "You can check out my GitHub profile here:\n\n[github.com/mikemadz](https://github.com/mikemadz)",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        return;
      }

      if (lowerContent.includes("contact")) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "You can contact me through the following channels:\n\n- **Email:** [brixquils16@gmail.com](mailto:[EMAIL_ADDRESS])\n- **LinkedIn:** [Marion Brix Quiling](https://linkedin.com)\n- **GitHub:** [mikemadz](https://github.com/mikemadz)",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        return;
      }

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
          content: `Oops! Something went wrong: ${errorMessage}`,
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
