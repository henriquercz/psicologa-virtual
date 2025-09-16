import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Mic, MicOff } from 'lucide-react'
import { useChatStore } from '@/store/chat'

export function ChatInput() {
  const [message, setMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const { sendMessage, isLoading } = useChatStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const messageToSend = message.trim()
    setMessage('')
    await sendMessage(messageToSend, 'user_development')
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Função para reconhecimento de voz (placeholder)
  const toggleVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(!isListening)
      // Implementar reconhecimento de voz aqui
    } else {
      alert('Reconhecimento de voz não suportado neste navegador')
    }
  }

  return (
    <div className="border-t bg-white p-4 safe-area-bottom">
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="pr-12 h-12 text-base resize-none"
            maxLength={1000}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleVoiceRecognition}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            disabled={isLoading}
          >
            {isListening ? (
              <MicOff className="h-4 w-4 text-red-500" />
            ) : (
              <Mic className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
        
        <Button
          type="submit"
          variant="therapy"
          size="icon"
          disabled={!message.trim() || isLoading}
          className="h-12 w-12 shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
      
      {isLoading && (
        <div className="flex items-center justify-center mt-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-therapy-400 rounded-full animate-pulse-gentle"></div>
            <div className="w-2 h-2 bg-therapy-400 rounded-full animate-pulse-gentle" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-therapy-400 rounded-full animate-pulse-gentle" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="ml-3 text-sm text-gray-500">Psicóloga está digitando...</span>
        </div>
      )}
    </div>
  )
}
