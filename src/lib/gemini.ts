// Biblioteca de cliente removida do front-end. Agora usamos a função Edge /api/gemini.

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export class GeminiService {
  private conversationHistory: Message[] = []

  // No-op para compatibilidade com chamadas existentes
  async initializeChat(): Promise<void> {
    return
  }

  // Overloads para compatibilidade com chamadas antigas (0 args) e novas (message, onTyping)
  async sendMessage(): Promise<string>
  async sendMessage(message: string, onTyping?: (text: string) => void): Promise<string>
  async sendMessage(message?: string, onTyping?: (text: string) => void): Promise<string> {
    const userText = (message ?? '').toString()

    // Tentar via função Edge /api/gemini (servidor)
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      })

      if (res.ok) {
        const data = await res.json() as { text?: string }
        const text = (data.text ?? '').toString()

        if (text) {
          // Adiciona ao histórico local
          this.conversationHistory.push({
            id: `user_${Date.now()}_${Math.random()}`,
            role: 'user',
            content: userText,
            timestamp: new Date()
          })
          this.conversationHistory.push({
            id: `assistant_${Date.now()}_${Math.random()}`,
            role: 'assistant',
            content: text,
            timestamp: new Date()
          })

          return text
        }
      }

      // Se falhou, tenta ler detalhe do erro para log
      const detail = await res.text().catch(() => '')
      console.warn('Falha em /api/gemini:', res.status, detail)
      // Cai no fallback abaixo
    } catch (err) {
      console.warn('Erro ao chamar /api/gemini:', err)
      // Cai no fallback abaixo
    }

    // Fallback contextual no cliente (sem anotações e com uso da entrada do usuário)
    const input = userText.trim()
    const followUps = [
      'O que você percebe que mais pesa quando essa situação acontece?',
      'Quais pensamentos vêm primeiro quando isso acontece?',
      'Como isso tem afetado seu dia a dia nas últimas semanas?',
      'Há algo que costuma aliviar, mesmo que um pouco, quando isso acontece?',
      'Se pudesse nomear essa emoção principal em uma palavra, qual seria?'
    ]
    const pick = followUps[Math.floor(Math.random() * followUps.length)]
    const preface = input
      ? `Estou acompanhando o que você trouxe: "${input.slice(0, 180)}".`
      : 'Obrigado por compartilhar. Estou aqui com você.'
    const contextualResponse = `${preface}\n\n${pick}`

    if (onTyping) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500))
      onTyping(contextualResponse)
    }
    return contextualResponse
  }

  getConversationHistory(): Message[] {
    return this.conversationHistory
  }

  clearHistory() {
    this.conversationHistory = []
  }
}

export const geminiService = new GeminiService()
