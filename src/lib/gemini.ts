import { GoogleGenerativeAI } from '@google/generative-ai'
import { THERAPEUTIC_TECHNIQUES, SESSION_STRUCTURE, THERAPEUTIC_PHRASES } from './sessionStructure'

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
  private conversationHistory: Message[] = []

  async initializeChat(history: Message[] = []) {
    this.conversationHistory = history
    
    // Converte histórico para formato do Gemini
    const geminiHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    this.chat = model?.startChat({
      history: geminiHistory,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    })
  }

  async sendMessage(message: string): Promise<string> {
    // Se não há API key válida, retorna resposta mock profissional
    if (!model || !apiKey) {
      const professionalResponses = [
        "Olá, eu sou a Dra. Sofia. É um prazer recebê-lo(a) aqui hoje. Vejo que você decidiu buscar apoio, e isso já demonstra uma grande coragem e autoconhecimento.\n\n... *pausa reflexiva*\n\nComo você está chegando hoje? O que te trouxe até aqui neste momento?",
        
        "Percebo que há algo importante que você gostaria de compartilhar comigo. Na nossa conversa, quero que você se sinta completamente à vontade para expressar o que está sentindo.\n\n... *escuta atentamente*\n\nMe conte, como tem sido para você lidar com essas questões no seu dia a dia?",
        
        "Entendo que você está passando por um momento desafiador. É completamente natural sentir-se assim diante das circunstâncias que você está vivenciando.\n\n... *validação empática*\n\nVamos trabalhar isso juntos. Que tal começarmos explorando como esses sentimentos se manifestam no seu corpo? Você consegue identificar onde sente essas emoções fisicamente?",
        
        "Vejo que há uma busca genuína por compreensão e mudança. Isso me diz muito sobre sua força interior, mesmo que talvez você não se sinta forte neste momento.\n\n... *reflexão terapêutica*\n\nMe ajude a entender melhor: quando você pensa sobre essa situação, quais são os primeiros pensamentos que vêm à sua mente?",
        
        "Obrigada por confiar em mim e compartilhar algo tão pessoal. Reconheço a vulnerabilidade que isso exige, e quero que saiba que este é um espaço seguro para você.\n\n... *presença terapêutica*\n\nVamos fazer uma pausa por um momento. Respire comigo: inspire lentamente... segure... e expire devagar. Como você se sente agora, neste momento presente?"
      ]
      
      const contextualResponse = professionalResponses[Math.floor(Math.random() * professionalResponses.length)]
      
      // Simula tempo de reflexão terapêutica
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))
      
      return contextualResponse
    }

    if (!this.chat) {
      await this.initializeChat()
    }

    try {
      const result = await this.chat.sendMessage(message)
      const response = await result.response
      const text = response.text()

      // Adiciona mensagens ao histórico
      this.conversationHistory.push({
        id: `user_${Date.now()}_${Math.random()}`,
        role: 'user',
        content: message,
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
