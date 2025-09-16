// Arquivo removido - não utilizamos mais conexão direta com banco
// A aplicação agora usa localStorage para desenvolvimento

// Tipos básicos para compatibilidade
export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: Date
  updated_at: Date
}

export interface NewUser {
  email: string
  password_hash: string
  full_name?: string | null
  avatar_url?: string | null
}

export interface Conversation {
  id: string
  user_id: string
  role: 'user' | 'assistant'
  content: string
  day_key: string
  created_at: Date
}

export interface NewConversation {
  user_id: string
  role: 'user' | 'assistant'
  content: string
  day_key: string
}

export interface Assessment {
  id: string
  user_id: string
  assessment_type: string
  responses: any
  score?: number | null
  risk_level?: string | null
  created_at: Date
}

export interface NewAssessment {
  user_id: string
  assessment_type: string
  responses: any
  score?: number | null
  risk_level?: string | null
}
