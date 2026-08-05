export type Role = "user" | "ai";

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
}
