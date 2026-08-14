export type Role = "user" | "ai";

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: Date;
}

export interface ChatHistoryMessage {
  role: Role;
  content: string;
}

export interface ChatApiResponse {
  text?: string;
  error?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
}
