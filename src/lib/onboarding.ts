/**
 * Sistema de Onboarding e Perfil Psicológico
 * Autor: Capitão Henrique
 * Data: 2025-09-15
 * Versão: 1.0
 * 
 * Este módulo gerencia o processo de onboarding com questionário
 * psicológico para criar o perfil inicial do paciente.
 */

export interface OnboardingQuestion {
  id: string
  type: 'single' | 'multiple' | 'scale' | 'text'
  category: 'demographic' | 'psychological' | 'clinical' | 'lifestyle'
  question: string
  options?: string[]
  scale?: { min: number; max: number; labels: string[] }
  required: boolean
}

export interface UserProfile {
  // Dados demográficos
  age_range: string
  gender: string
  occupation: string
  relationship_status: string
  
  // Histórico clínico
  previous_therapy: boolean
  current_medication: boolean
  mental_health_history: string[]
  
  // Estado emocional atual
  main_concerns: string[]
  stress_level: number
  sleep_quality: number
  energy_level: number
  
  // Objetivos terapêuticos
  therapy_goals: string[]
  preferred_approach: string
  
  // Estilo de vida
  exercise_frequency: string
  social_support: number
  work_stress: number
  
  // Personalidade e preferências
  communication_style: string
  coping_mechanisms: string[]
  triggers: string[]
  
  completed_at: Date
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  // Seção 1: Apresentação e Demografia
  {
    id: 'welcome',
    type: 'text',
    category: 'demographic',
    question: 'Olá! Sou a Dra. Sofia e será um prazer acompanhá-lo(a) nesta jornada. Para começarmos, como você gostaria que eu te chamasse?',
    required: true
  },
  {
    id: 'age_range',
    type: 'single',
    category: 'demographic',
    question: 'Em qual faixa etária você se encontra?',
    options: ['18-25 anos', '26-35 anos', '36-45 anos', '46-55 anos', '56-65 anos', '65+ anos'],
    required: true
  },
  {
    id: 'occupation',
    type: 'single',
    category: 'demographic',
    question: 'Qual é sua situação profissional atual?',
    options: ['Estudante', 'Empregado(a)', 'Autônomo(a)', 'Desempregado(a)', 'Aposentado(a)', 'Do lar'],
    required: true
  },
  
  // Seção 2: Histórico Clínico
  {
    id: 'previous_therapy',
    type: 'single',
    category: 'clinical',
    question: 'Você já fez terapia psicológica antes?',
    options: ['Sim, recentemente', 'Sim, há alguns anos', 'Nunca fiz', 'Prefiro não responder'],
    required: true
  },
  {
    id: 'main_concerns',
    type: 'multiple',
    category: 'psychological',
    question: 'Quais são suas principais preocupações ou dificuldades atualmente? (Pode escolher mais de uma)',
    options: [
      'Ansiedade e preocupação excessiva',
      'Tristeza ou depressão',
      'Estresse no trabalho',
      'Problemas de relacionamento',
      'Baixa autoestima',
      'Dificuldades de sono',
      'Luto ou perda',
      'Traumas do passado',
      'Vícios ou compulsões',
      'Questões familiares',
      'Outros'
    ],
    required: true
  },
  
  // Seção 3: Estado Emocional Atual
  {
    id: 'stress_level',
    type: 'scale',
    category: 'psychological',
    question: 'Em uma escala de 1 a 10, como você avaliaria seu nível de estresse atual?',
    scale: { min: 1, max: 10, labels: ['Muito baixo', 'Baixo', 'Moderado', 'Alto', 'Muito alto'] },
    required: true
  },
  {
    id: 'sleep_quality',
    type: 'scale',
    category: 'lifestyle',
    question: 'Como tem sido a qualidade do seu sono nas últimas semanas?',
    scale: { min: 1, max: 10, labels: ['Muito ruim', 'Ruim', 'Regular', 'Boa', 'Excelente'] },
    required: true
  },
  {
    id: 'energy_level',
    type: 'scale',
    category: 'psychological',
    question: 'Como está seu nível de energia e disposição no dia a dia?',
    scale: { min: 1, max: 10, labels: ['Muito baixo', 'Baixo', 'Regular', 'Alto', 'Muito alto'] },
    required: true
  },
  
  // Seção 4: Objetivos e Expectativas
  {
    id: 'therapy_goals',
    type: 'multiple',
    category: 'psychological',
    question: 'O que você espera alcançar com a terapia? (Pode escolher mais de uma)',
    options: [
      'Reduzir ansiedade e estresse',
      'Melhorar autoestima e confiança',
      'Desenvolver habilidades de enfrentamento',
      'Resolver conflitos de relacionamento',
      'Superar traumas do passado',
      'Encontrar propósito e direção',
      'Melhorar comunicação',
      'Controlar emoções intensas',
      'Desenvolver autocuidado',
      'Outros objetivos específicos'
    ],
    required: true
  },
  {
    id: 'preferred_approach',
    type: 'single',
    category: 'psychological',
    question: 'Que tipo de abordagem terapêutica mais te atrai?',
    options: [
      'Focada em soluções práticas e estratégias',
      'Exploração profunda de emoções e pensamentos',
      'Técnicas de relaxamento e mindfulness',
      'Análise de padrões e comportamentos',
      'Não tenho preferência específica'
    ],
    required: true
  },
  
  // Seção 5: Suporte e Recursos
  {
    id: 'social_support',
    type: 'scale',
    category: 'lifestyle',
    question: 'Como você avalia seu suporte social (família, amigos, parceiro)?',
    scale: { min: 1, max: 10, labels: ['Muito fraco', 'Fraco', 'Regular', 'Forte', 'Muito forte'] },
    required: true
  },
  {
    id: 'coping_mechanisms',
    type: 'multiple',
    category: 'psychological',
    question: 'Como você costuma lidar com situações difíceis? (Pode escolher mais de uma)',
    options: [
      'Converso com amigos ou família',
      'Faço exercícios físicos',
      'Medito ou pratico relaxamento',
      'Escuto música ou assisto filmes',
      'Escrevo ou desenho',
      'Evito pensar no problema',
      'Busco soluções práticas',
      'Procuro ajuda profissional',
      'Outros métodos'
    ],
    required: true
  }
]

// Mensagens proativas baseadas no perfil
export const generateProactiveMessages = (profile: Partial<UserProfile>): string[] => {
  const messages: string[] = []
  
  if (profile.stress_level && profile.stress_level >= 7) {
    messages.push("Percebo que você está passando por um período de muito estresse. Que tal começarmos com algumas técnicas de respiração para te ajudar a se sentir mais centrado(a)?")
  }
  
  if (profile.sleep_quality && profile.sleep_quality <= 4) {
    messages.push("Vejo que o sono tem sido um desafio para você. O sono é fundamental para nossa saúde mental. Vamos explorar o que pode estar interferindo no seu descanso?")
  }
  
  if (profile.main_concerns?.includes('Ansiedade e preocupação excessiva')) {
    messages.push("Notei que a ansiedade é uma das suas principais preocupações. É muito corajoso da sua parte buscar ajuda. Como a ansiedade tem se manifestado no seu dia a dia?")
  }
  
  if (profile.previous_therapy === false) {
    messages.push("Como esta é sua primeira experiência com terapia, quero que saiba que este é um espaço completamente seguro. Não há julgamentos aqui, apenas acolhimento e compreensão.")
  }
  
  if (profile.social_support && profile.social_support <= 4) {
    messages.push("Percebo que você pode estar se sentindo um pouco isolado(a). Vamos conversar sobre como podemos fortalecer sua rede de apoio?")
  }
  
  return messages
}

// Análise do perfil para contexto da IA
export const analyzeProfile = (profile: UserProfile): string => {
  let analysis = `PERFIL DO PACIENTE - ${profile.completed_at.toLocaleDateString()}:\n\n`
  
  analysis += `DADOS DEMOGRÁFICOS:\n`
  analysis += `- Faixa etária: ${profile.age_range}\n`
  analysis += `- Ocupação: ${profile.occupation}\n`
  analysis += `- Status de relacionamento: ${profile.relationship_status}\n\n`
  
  analysis += `HISTÓRICO CLÍNICO:\n`
  analysis += `- Terapia anterior: ${profile.previous_therapy ? 'Sim' : 'Não'}\n`
  analysis += `- Medicação atual: ${profile.current_medication ? 'Sim' : 'Não'}\n`
  analysis += `- Histórico: ${profile.mental_health_history.join(', ')}\n\n`
  
  analysis += `ESTADO ATUAL:\n`
  analysis += `- Principais preocupações: ${profile.main_concerns.join(', ')}\n`
  analysis += `- Nível de estresse: ${profile.stress_level}/10\n`
  analysis += `- Qualidade do sono: ${profile.sleep_quality}/10\n`
  analysis += `- Nível de energia: ${profile.energy_level}/10\n`
  analysis += `- Suporte social: ${profile.social_support}/10\n\n`
  
  analysis += `OBJETIVOS TERAPÊUTICOS:\n`
  analysis += `- Metas: ${profile.therapy_goals.join(', ')}\n`
  analysis += `- Abordagem preferida: ${profile.preferred_approach}\n\n`
  
  analysis += `RECURSOS E ESTRATÉGIAS:\n`
  analysis += `- Mecanismos de enfrentamento: ${profile.coping_mechanisms.join(', ')}\n`
  
  if (profile.triggers.length > 0) {
    analysis += `- Gatilhos identificados: ${profile.triggers.join(', ')}\n`
  }
  
  return analysis
}
