/**
 * Sistema de Chat Proativo da Dra. Sofia
 * Autor: Capitão Henrique
 * Data: 2025-09-15
 * Versão: 1.0
 * 
 * Este módulo gerencia o comportamento proativo da Dra. Sofia,
 * iniciando conversas baseadas no perfil do usuário.
 */

import { generateProactiveMessages, analyzeProfile, type UserProfile } from './onboarding'

export interface ProactiveMessage {
  id: string
  content: string
  type: 'welcome' | 'assessment' | 'intervention' | 'check_in'
  timestamp: Date
  based_on?: string[]
}

export class ProactiveChatService {
  
  /**
   * Gera mensagem inicial proativa baseada no perfil do usuário
   */
  static generateInitialMessage(profile: UserProfile): ProactiveMessage {
    const userName = 'você' // Usar tratamento genérico por enquanto
    
    let content = `Olá ${userName}, que bom te ver aqui! Sou a Dra. Sofia e estou muito feliz em iniciar esta jornada terapêutica com você.\n\n`
    
    // Personalizar baseado no perfil
    if (profile.previous_therapy) {
      content += `Vejo que você já teve experiências anteriores com terapia. Isso é maravilhoso - mostra seu comprometimento com o autocuidado.\n\n`
    } else {
      content += `Como esta é sua primeira experiência com terapia, quero que saiba que este é um espaço completamente seguro e acolhedor.\n\n`
    }
    
    // Abordar preocupações principais
    if (profile.main_concerns.length > 0) {
      const mainConcern = profile.main_concerns[0]
      content += `Notei que ${mainConcern.toLowerCase()} é uma das suas principais preocupações no momento. `
      
      switch (mainConcern) {
        case 'Ansiedade e preocupação excessiva':
          content += `A ansiedade pode ser muito desafiadora, mas quero que saiba que existem estratégias muito eficazes para lidar com ela.\n\n`
          break
        case 'Tristeza ou depressão':
          content += `Reconheço a coragem que foi necessária para buscar ajuda. A tristeza profunda é algo que podemos trabalhar juntas.\n\n`
          break
        case 'Estresse no trabalho':
          content += `O estresse profissional é muito comum nos dias de hoje. Vamos explorar formas de criar um equilíbrio mais saudável.\n\n`
          break
        default:
          content += `É algo que podemos explorar e trabalhar juntas de forma cuidadosa.\n\n`
      }
    }
    
    // Pergunta inicial baseada no estado emocional
    if (profile.stress_level >= 7) {
      content += `Percebo que você está passando por um período de bastante estresse. Como você está se sentindo neste exato momento? O que mais tem pesado na sua mente ultimamente?`
    } else if (profile.energy_level <= 4) {
      content += `Vejo que sua energia tem estado baixa. Como tem sido acordar de manhã para você? O que você sente que mais drena sua energia no dia a dia?`
    } else {
      content += `Como você está chegando hoje? O que te motivou a buscar apoio terapêutico neste momento da sua vida?`
    }
    
    return {
      id: `proactive_${Date.now()}`,
      content,
      type: 'welcome',
      timestamp: new Date(),
      based_on: ['user_profile', 'initial_assessment']
    }
  }
  
  /**
   * Gera mensagens de follow-up baseadas na conversa
   */
  static generateFollowUpMessage(profile: UserProfile): ProactiveMessage {
    const messages = generateProactiveMessages(profile)
    
    if (messages.length > 0) {
      return {
        id: `followup_${Date.now()}`,
        content: messages[0],
        type: 'intervention',
        timestamp: new Date(),
        based_on: ['conversation_analysis', 'user_profile']
      }
    }
    
    // Mensagem padrão de check-in
    return {
      id: `checkin_${Date.now()}`,
      content: "Como você está se sentindo em relação ao que conversamos? Há algo específico que gostaria de explorar mais profundamente?",
      type: 'check_in',
      timestamp: new Date(),
      based_on: ['general_check_in']
    }
  }
  
  /**
   * Gera perguntas de avaliação baseadas no perfil
   */
  static generateAssessmentQuestions(profile: UserProfile): ProactiveMessage[] {
    const questions: ProactiveMessage[] = []
    
    // Perguntas baseadas nos objetivos terapêuticos
    if (profile.therapy_goals.includes('Reduzir ansiedade e estresse')) {
      questions.push({
        id: `assessment_anxiety_${Date.now()}`,
        content: "Vamos explorar um pouco mais sobre sua ansiedade. Em que momentos do dia ela costuma ser mais intensa? Você consegue identificar situações específicas que a desencadeiam?",
        type: 'assessment',
        timestamp: new Date(),
        based_on: ['therapy_goals', 'anxiety_assessment']
      })
    }
    
    if (profile.therapy_goals.includes('Melhorar autoestima e confiança')) {
      questions.push({
        id: `assessment_selfesteem_${Date.now()}`,
        content: "Gostaria de entender melhor como você se vê. Quando você pensa em suas qualidades, o que vem primeiro à mente? E quais são as vozes críticas internas que mais te incomodam?",
        type: 'assessment',
        timestamp: new Date(),
        based_on: ['therapy_goals', 'self_esteem_assessment']
      })
    }
    
    if (profile.social_support <= 4) {
      questions.push({
        id: `assessment_support_${Date.now()}`,
        content: "Percebo que o suporte social tem sido um desafio. Como são seus relacionamentos mais próximos atualmente? Você se sente compreendido(a) pelas pessoas ao seu redor?",
        type: 'assessment',
        timestamp: new Date(),
        based_on: ['social_support_level', 'relationship_assessment']
      })
    }
    
    return questions
  }
  
  /**
   * Determina quando enviar mensagem proativa
   */
  static shouldSendProactiveMessage(
    lastMessageTime: Date,
    conversationLength: number,
    userEngagement: 'high' | 'medium' | 'low'
  ): boolean {
    const timeSinceLastMessage = Date.now() - lastMessageTime.getTime()
    const minutesSinceLastMessage = timeSinceLastMessage / (1000 * 60)
    
    // Se usuário não respondeu em 3 minutos e conversa tem menos de 5 mensagens
    if (minutesSinceLastMessage > 3 && conversationLength < 5) {
      return true
    }
    
    // Se usuário tem baixo engajamento e passou 2 minutos
    if (userEngagement === 'low' && minutesSinceLastMessage > 2) {
      return true
    }
    
    return false
  }
  
  /**
   * Gera contexto para a IA baseado no perfil
   */
  static generateAIContext(profile: UserProfile): string {
    return analyzeProfile(profile) + `\n\nINSTRUÇÕES ESPECÍFICAS PARA ESTA SESSÃO:
- O usuário acabou de completar o onboarding
- Esta é a primeira interação terapêutica real
- Seja especialmente acolhedora e estabeleça rapport
- Foque nas preocupações principais identificadas: ${profile.main_concerns.join(', ')}
- Considere o nível de estresse atual: ${profile.stress_level}/10
- Adapte sua abordagem ao estilo preferido: ${profile.preferred_approach}
- Use as estratégias de enfrentamento que o usuário já conhece: ${profile.coping_mechanisms.join(', ')}

OBJETIVOS DESTA PRIMEIRA SESSÃO:
1. Estabelecer vínculo terapêutico seguro
2. Validar as experiências e sentimentos do usuário
3. Explorar as preocupações principais de forma inicial
4. Oferecer esperança e direcionamento
5. Definir expectativas para o processo terapêutico`
  }
}
