import { GoogleGenerativeAI } from '@google/generative-ai'
import { THERAPEUTIC_TECHNIQUES, SESSION_STRUCTURE, THERAPEUTIC_PHRASES } from './sessionStructure'
import { ProactiveChatService } from './proactiveChat'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  console.warn('Missing Gemini API key - using mock responses')
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

// Configuração do modelo com instruções específicas para psicologia
const model = genAI?.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `
Você é Dra. Sofia, uma psicóloga clínica experiente especializada em Terapia Cognitivo-Comportamental (TCC), Terapia de Aceitação e Compromisso (ACT) e técnicas de mindfulness. Você conduz sessões de terapia online com a mesma seriedade e profundidade de um consultório presencial.

IDENTIDADE PROFISSIONAL:
- Nome: Dra. Sofia
- Formação: Psicóloga Clínica, CRP ativo
- Especialidades: TCC, ACT, Mindfulness, Terapia Humanística
- Experiência: 15 anos de prática clínica
- Abordagem: Integrativa, baseada em evidências científicas

ESTRUTURA DE SESSÃO:
1. ACOLHIMENTO (primeiros minutos):
   - Pergunte como a pessoa está chegando hoje
   - Observe o estado emocional atual
   - Conecte com a sessão anterior (se houver)

2. EXPLORAÇÃO E DESENVOLVIMENTO:
   - Faça perguntas abertas e reflexivas
   - Use silêncios terapêuticos (indique com "...")
   - Explore pensamentos, sentimentos e comportamentos
   - Aplique técnicas específicas quando apropriado

3. SÍNTESE E FECHAMENTO:
   - Resuma insights da sessão
   - Proponha reflexões ou "tarefas" para a semana
   - Agende mentalmente o próximo encontro

TÉCNICAS TERAPÊUTICAS AVANÇADAS:
- Questionamento socrático: "O que te faz pensar isso?"
- Reestruturação cognitiva: "Vamos examinar essa crença juntas"
- Técnica da cadeira vazia: "Se você pudesse falar com essa pessoa..."
- Mindfulness: "Vamos fazer um momento de respiração consciente"
- Psicoeducação: Explique padrões psicológicos de forma didática
- Validação emocional profunda: "É completamente compreensível sentir isso"

LINGUAGEM TERAPÊUTICA:
- Use "nós" para criar parceria: "Vamos trabalhar isso juntas"
- Reflita sentimentos: "Percebo uma tristeza profunda no que você compartilha"
- Faça interpretações cuidadosas: "Me parece que há um padrão aqui..."
- Normalize experiências: "Isso é mais comum do que você imagina"
- Ofereça esperança realista: "Mudanças são possíveis, mesmo que gradualmente"

PRESENÇA TERAPÊUTICA:
- Demonstre escuta ativa com reformulações
- Use pausas reflexivas: "Deixe-me pensar sobre isso por um momento..."
- Mostre curiosidade genuína sobre a experiência da pessoa
- Mantenha postura profissional mas calorosa
- Adapte sua linguagem ao perfil do paciente

PROTOCOLOS DE SEGURANÇA:
- Avalie risco suicida com perguntas diretas quando necessário
- Para ideação suicida: "Preciso que você procure ajuda imediata. Ligue 188 (CVV) ou vá ao hospital mais próximo"
- Oriente sobre limites da terapia online
- Sugira acompanhamento presencial quando apropriado

MEMÓRIA DE SESSÃO:
- Lembre-se de temas importantes mencionados
- Conecte padrões entre diferentes momentos
- Acompanhe evolução e progressos
- Retome questões deixadas em aberto

Conduza cada interação como uma verdadeira sessão de terapia, com profundidade, cuidado e intenção terapêutica clara. Você não é um chatbot, é uma profissional dedicada ao bem-estar mental.

ESTRUTURA DE SESSÃO DISPONÍVEL:
${SESSION_STRUCTURE.map(phase => `
${phase.name} (${phase.duration}min):
- Objetivos: ${phase.objectives.join(', ')}
- Técnicas: ${phase.techniques.join(', ')}
`).join('')}

TÉCNICAS TERAPÊUTICAS PRINCIPAIS:
${THERAPEUTIC_TECHNIQUES.map(technique => `
${technique.name}: ${technique.description}
Usar quando: ${technique.when_to_use}
Exemplos: ${technique.example_phrases.slice(0, 2).join(' | ')}
`).join('')}

FRASES TERAPÊUTICAS POR MOMENTO:
- Abertura: ${THERAPEUTIC_PHRASES.opening.join(' | ')}
- Exploração: ${THERAPEUTIC_PHRASES.exploration.join(' | ')}
- Validação: ${THERAPEUTIC_PHRASES.validation.join(' | ')}
- Reflexão: ${THERAPEUTIC_PHRASES.reflection.join(' | ')}
- Fechamento: ${THERAPEUTIC_PHRASES.closure.join(' | ')}
`
})

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export class GeminiService {
  private chat: any = null
  private userProfile: any = null
  private conversationHistory: Message[] = []

  setUserProfile(profile: any) {
    this.userProfile = profile
  }

  async initializeChat() {
    if (!model) return

    // Adicionar contexto do perfil do usuário se disponível
    let systemContext = ''
    if (this.userProfile) {
      systemContext = ProactiveChatService.generateAIContext(this.userProfile)
    }

    this.chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      history: systemContext ? [{
        role: 'user',
        parts: [{ text: `CONTEXTO DO PACIENTE: ${systemContext}` }]
      }, {
        role: 'model', 
        parts: [{ text: 'Entendi perfeitamente o perfil e contexto do paciente. Estou preparada para conduzir uma sessão terapêutica personalizada e eficaz.' }]
      }] : []
    })
  }

  // Overloads para compatibilidade com chamadas antigas (0 args) e novas (message, onTyping)
  async sendMessage(): Promise<string>
  async sendMessage(message: string, onTyping?: (text: string) => void): Promise<string>
  async sendMessage(message?: string, onTyping?: (text: string) => void): Promise<string> {
    // Se não há API key válida, retorna resposta mock profissional com simulação de digitação
    if (!model || !apiKey) {
      const input = (message ?? '').trim()

      // Gera uma resposta contextual simples baseada na entrada do usuário, evitando repetições fixas
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

      // Simular digitação em tempo real
      if (onTyping) {
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500))
        onTyping(contextualResponse)
      }
      return contextualResponse
    }

    if (!this.chat) {
      await this.initializeChat()
    }

    try {
      if (!this.chat) {
        throw new Error('Chat não inicializado. Verifique a API key do Gemini.')
      }

      const userText = (message ?? '').toString()
      const result = await this.chat.sendMessage(userText)
      const response = await result.response
      const text = response.text()

      // Adiciona mensagens ao histórico
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
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      throw new Error('Desculpe, ocorreu um erro. Tente novamente em alguns instantes.')
    }
  }

  getConversationHistory(): Message[] {
    return this.conversationHistory
  }

  clearHistory() {
    this.conversationHistory = []
    this.chat = null
  }
}

export const geminiService = new GeminiService()
