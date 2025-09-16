import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatTime } from '@/lib/utils'
import { Bot, User } from 'lucide-react'
import type { Message } from '@/lib/gemini'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 p-4 chat-message ${isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className={`${isUser ? 'bg-therapy-100' : 'therapy-gradient'} shrink-0`}>
        <AvatarFallback className={isUser ? 'text-therapy-700' : 'text-white'}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col space-y-2 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-therapy-500 text-white rounded-br-md'
              : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md calm-shadow'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        <span className="text-xs text-gray-500 px-2">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
