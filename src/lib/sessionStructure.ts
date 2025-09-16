/**
 * Estrutura e Gerenciamento de Sessões Terapêuticas
 * Autor: Capitão Henrique
 * Data: 2025-09-15
 * Versão: 1.0
 * 
 * Este módulo define a estrutura formal de uma sessão de terapia,
 * incluindo fases, técnicas e protocolos clínicos.
 */

export interface SessionPhase {
  name: string
  duration: number // em minutos
  objectives: string[]
  techniques: string[]
}

export interface TherapeuticTechnique {
  name: string
  description: string
  when_to_use: string
  example_phrases: string[]
}

export interface SessionMemory {
  session_id: string
  date: Date
  main_themes: string[]
  emotional_state: string
  progress_notes: string
  homework_assigned?: string
  next_session_focus?: string
}

// Estrutura padrão de uma sessão de 50 minutos
export const SESSION_STRUCTURE: SessionPhase[] = [
  {
    name: "Acolhimento e Check-in",
    duration: 10,
    objectives: [
      "Estabelecer rapport terapêutico",
      "Avaliar estado emocional atual",
      "Conectar com sessão anterior"
    ],
    techniques: [
      "Escuta ativa",
      "Validação emocional",
      "Perguntas abertas"
    ]
  },
  {
    name: "Exploração e Desenvolvimento",
    duration: 30,
    objectives: [
      "Explorar questões centrais",
      "Identificar padrões disfuncionais",
      "Aplicar intervenções terapêuticas"
    ],
    techniques: [
      "Questionamento socrático",
      "Reestruturação cognitiva",
      "Técnicas de mindfulness",
      "Psicoeducação"
    ]
  },
  {
    name: "Síntese e Fechamento",
    duration: 10,
    objectives: [
      "Resumir insights da sessão",
      "Definir tarefas para casa",
      "Planejar próxima sessão"
    ],
    techniques: [
      "Síntese reflexiva",
      "Estabelecimento de metas",
      "Reforço positivo"
    ]
  }
]

// Técnicas terapêuticas avançadas com exemplos práticos
export const THERAPEUTIC_TECHNIQUES: TherapeuticTechnique[] = [
  {
    name: "Questionamento Socrático",
    description: "Perguntas que levam o paciente à autorreflexão e descoberta",
    when_to_use: "Quando há crenças disfuncionais ou pensamentos automáticos",
    example_phrases: [
      "O que te faz pensar dessa forma?",
      "Que evidências você tem para essa crença?",
      "Como você chegou a essa conclusão?",
      "Existe uma forma alternativa de ver isso?"
    ]
  },
  {
    name: "Validação Emocional",
    description: "Reconhecimento e normalização das emoções do paciente",
    when_to_use: "Quando o paciente se sente incompreendido ou julga suas emoções",
    example_phrases: [
      "É completamente compreensível sentir-se assim",
      "Suas emoções fazem muito sentido considerando o que você passou",
      "Não há emoção certa ou errada, apenas sinais do que está acontecendo",
      "Percebo o quanto isso é difícil para você"
    ]
  },
  {
    name: "Reestruturação Cognitiva",
    description: "Identificação e modificação de pensamentos disfuncionais",
    when_to_use: "Para pensamentos catastróficos, generalizações ou distorções cognitivas",
    example_phrases: [
      "Vamos examinar esse pensamento mais de perto",
      "Que evidências contradizem essa ideia?",
      "Como um amigo querido responderia a isso?",
      "Qual seria uma forma mais equilibrada de pensar sobre isso?"
    ]
  },
  {
    name: "Técnica da Cadeira Vazia",
    description: "Diálogo imaginário com pessoas significativas",
    when_to_use: "Para resolver conflitos não resolvidos ou expressar emoções reprimidas",
    example_phrases: [
      "Se você pudesse falar com essa pessoa agora, o que diria?",
      "Imagine que ela está aqui. Como você se sente?",
      "O que você gostaria de ouvir dela?",
      "Que resposta você imagina que ela daria?"
    ]
  },
  {
    name: "Mindfulness Terapêutico",
    description: "Exercícios de atenção plena para regulação emocional",
    when_to_use: "Para ansiedade, ruminalção ou desconexão do momento presente",
    example_phrases: [
      "Vamos fazer uma pausa e respirar juntos",
      "O que você está sentindo no seu corpo agora?",
      "Traga sua atenção para este momento presente",
      "Observe seus pensamentos sem julgá-los"
    ]
  }
]

// Protocolos de avaliação de risco
export const RISK_ASSESSMENT_PROTOCOLS = {
  suicide_risk: {
    questions: [
      "Você tem pensado em se machucar?",
      "Tem pensado que seria melhor não estar aqui?",
      "Você tem um plano específico?",
      "Já tentou se machucar antes?"
    ],
    immediate_action: "Preciso que você procure ajuda imediata. Ligue 188 (CVV) ou vá ao hospital mais próximo",
    follow_up: "Vamos trabalhar juntos para garantir sua segurança"
  },
  crisis_intervention: {
    signs: [
      "Ideação suicida ativa",
      "Plano suicida específico",
      "Episódio psicótico",
      "Violência iminente"
    ],
    protocol: "Interromper sessão, orientar busca imediata por ajuda profissional presencial"
  }
}

// Frases terapêuticas para diferentes momentos
export const THERAPEUTIC_PHRASES = {
  opening: [
    "Como você está chegando hoje?",
    "O que te trouxe aqui neste momento?",
    "Como tem sido para você desde nossa última conversa?"
  ],
  exploration: [
    "Me conte mais sobre isso...",
    "Como isso se manifesta no seu dia a dia?",
    "O que você sente quando isso acontece?"
  ],
  validation: [
    "Isso deve ser muito difícil para você",
    "Faz todo sentido você se sentir assim",
    "Reconheço sua coragem em compartilhar isso"
  ],
  reflection: [
    "O que você está percebendo sobre si mesmo?",
    "Que padrão você consegue identificar?",
    "Como isso se conecta com outras situações?"
  ],
  closure: [
    "O que você leva de mais importante da nossa conversa hoje?",
    "Como você se sente agora comparado ao início?",
    "O que você gostaria de explorar na próxima vez?"
  ]
}
