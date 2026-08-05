import type { Message } from "../types/chat";

export const sendMessageToAPI = async (message: string, history: Message[]): Promise<string> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history: history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to communicate with AI assistant.");
  }

  const data = await response.json();
  return data.text;
};
