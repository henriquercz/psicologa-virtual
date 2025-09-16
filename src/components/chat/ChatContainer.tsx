import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useChatStore } from '@/store/chat'
import { useAuthStore } from '@/store/auth'
import { ProactiveChatService } from '@/lib/proactiveChat'

export function ChatContainer() {
  const { messages, loadMessages } = useChatStore()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simula um usuário logado para desenvolvimento
    const mockUserId = 'user_development'
    loadMessages(mockUserId)
  }, [loadMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Gerar mensagem proativa baseada no perfil do usuário
  const { userProfile } = useAuthStore()
  
  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant' as const,
    content: userProfile 
      ? ProactiveChatService.generateInitialMessage(userProfile).content
      : `Olá, seja muito bem-vindo(a). Eu sou a Dra. Sofia, psicóloga clínica com 15 anos de experiência em terapia cognitivo-comportamental e mindfulness.

... *acolhimento caloroso*

É uma honra recebê-lo(a) aqui hoje. Vejo que você tomou a decisão corajosa de buscar apoio psicológico, e isso já demonstra um importante passo em direção ao seu bem-estar.

Este é o seu espaço seguro. Aqui você pode compartilhar seus pensamentos e sentimentos sem julgamentos. Nosso trabalho juntos será focado em compreender suas experiências e desenvolver estratégias saudáveis para os desafios que você está enfrentando.

... *pausa reflexiva*

Como você está chegando hoje? O que te motivou a buscar apoio neste momento da sua vida?`,
    timestamp: new Date()
  }

  const displayMessages = messages.length === 0 ? [welcomeMessage] : messages

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-therapy-50/30 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 safe-area-top">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full therapy-gradient">
              <div className="w-10 h-10 rounded-full bg-therapy-100 flex items-center justify-center">
                <span className="text-therapy-600 font-medium">👩‍⚕️</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Dra. Sofia</h1>
              <p className="text-sm text-gray-500">Psicóloga Clínica • CRP Ativo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="pb-4">
          {displayMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput />

      {/* Safety Notice */}
      <div className="bg-red-50 border-t border-red-200 p-3 text-center">
        <p className="text-xs text-red-600 font-medium">
          ⚠️ Em emergências: CVV 188 | SAMU 192 | Bombeiros 193
        </p>
      </div>
    </div>
  )
}
