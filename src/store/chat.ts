import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { geminiService } from '../lib/gemini'
import { getDayKey } from '../lib/utils'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  currentDayKey: string
  loadMessages: (userId: string) => Promise<void>
  sendMessage: (content: string, userId: string) => Promise<void>
  clearMessages: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      currentDayKey: getDayKey(new Date()),

      loadMessages: async (userId: string) => {
        try {
          const dayKey = getDayKey(new Date())
          
          // Busca conversas do localStorage
          const storageKey = `conversations_${userId}_${dayKey}`
          const storedConversations = localStorage.getItem(storageKey)
          
          if (storedConversations) {
            const conversations = JSON.parse(storedConversations)
            const messages: Message[] = conversations.map((conv: any) => ({
              id: conv.id,
              role: conv.role,
              content: conv.content,
              timestamp: new Date(conv.timestamp),
            }))

            set({ messages, currentDayKey: dayKey })
          } else {
            set({ messages: [], currentDayKey: dayKey })
          }
        } catch (error) {
          console.error('Erro ao carregar mensagens:', error)
          set({ messages: [], currentDayKey: getDayKey(new Date()) })
        }
      },

      sendMessage: async (content: string, userId: string) => {
        const { messages } = get()
        const dayKey = getDayKey(new Date())
        
        // Adiciona mensagem do usuário
        const userMessage: Message = {
          id: `user_${Date.now()}`,
          role: 'user',
          content,
          timestamp: new Date(),
        }

        set({ 
          messages: [...messages, userMessage], 
          isLoading: true,
          currentDayKey: dayKey 
        })

        try {
          // Salva mensagem do usuário no localStorage
          const storageKey = `conversations_${userId}_${dayKey}`
          const existingConversations = JSON.parse(localStorage.getItem(storageKey) || '[]')
          
          const userConversation = {
            id: userMessage.id,
            user_id: userId,
            role: 'user',
            content,
            day_key: dayKey,
            timestamp: userMessage.timestamp.toISOString(),
          }
          
          existingConversations.push(userConversation)
          localStorage.setItem(storageKey, JSON.stringify(existingConversations))

          // Gera resposta da IA
          await geminiService.initializeChat([...messages, userMessage])
          const aiResponse = await geminiService.sendMessage(content)

          const assistantMessage: Message = {
            id: `assistant_${Date.now()}`,
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date(),
          }

          // Salva resposta da IA no localStorage
          const assistantConversation = {
            id: assistantMessage.id,
            user_id: userId,
            role: 'assistant',
            content: aiResponse,
            day_key: dayKey,
            timestamp: assistantMessage.timestamp.toISOString(),
          }
          
          const updatedConversations = JSON.parse(localStorage.getItem(storageKey) || '[]')
          updatedConversations.push(assistantConversation)
          localStorage.setItem(storageKey, JSON.stringify(updatedConversations))

          set(state => ({
            messages: [...state.messages, assistantMessage],
            isLoading: false,
          }))
        } catch (error) {
          console.error('Erro ao enviar mensagem:', error)
          set({ isLoading: false })
          
          // Adiciona mensagem de erro
          const errorMessage: Message = {
            id: `error_${Date.now()}`,
            role: 'assistant',
            content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
            timestamp: new Date(),
          }
          
          set(state => ({
            messages: [...state.messages, errorMessage],
          }))
        }
      },

      clearMessages: () => {
        set({ messages: [], currentDayKey: getDayKey(new Date()) })
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ 
        messages: state.messages,
        currentDayKey: state.currentDayKey 
      }),
    }
  )
)
