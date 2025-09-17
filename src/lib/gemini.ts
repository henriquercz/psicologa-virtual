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
          // Simula digitação natural (sem quebrar em chunks, pois agora as respostas são curtas)
          if (onTyping) {
            await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 800))
            onTyping(text)
          }

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

    // Fallback contextual no cliente - respostas curtas e naturais
    const input = userText.trim()
    const shortResponses = [
      'Entendo. O que mais te preocupa sobre isso?',
      'Percebo que isso é importante para você. Como se sente agora falando sobre isso?',
      'Isso deve ser difícil. Quando começou a perceber esses sentimentos?',
      'Obrigada por compartilhar. O que você gostaria de explorar primeiro?',
      'Vejo que há muito acontecendo. Qual parte pesa mais?',
      'Como isso tem afetado você no dia a dia?',
      'O que passa pela sua cabeça quando isso acontece?'
    ]
    
    const contextualResponse = input.length > 10 
      ? shortResponses[Math.floor(Math.random() * shortResponses.length)]
      : 'Olá, eu sou a Dra. Sofia. Como você está chegando hoje?'

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
