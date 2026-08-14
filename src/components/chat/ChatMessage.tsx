import type { Message } from "../../types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        aria-live={isUser ? undefined : "polite"}
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 text-zinc-200 rounded-bl-sm"
        }`}
      >
        <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ className, children, ...props }) => (
                  <code className={`${className ?? ""} rounded bg-black/30 px-1 py-0.5 text-[0.85em]`} {...props}>
                    {children}
                  </code>
                ),
              a: (props) => (
                <a 
                  {...props} 
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                />
              )
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
