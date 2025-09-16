// Arquivo removido - não utilizamos mais Supabase
// A aplicação agora usa localStorage para desenvolvimento
export const supabase = null

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          date: string
          messages: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          messages?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          messages?: any[]
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          user_id: string
          type: 'PHQ-9' | 'GAD-7' | 'C-SSRS'
          responses: any
          score: number
          risk_level: 'low' | 'moderate' | 'high'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'PHQ-9' | 'GAD-7' | 'C-SSRS'
          responses: any
          score: number
          risk_level: 'low' | 'moderate' | 'high'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'PHQ-9' | 'GAD-7' | 'C-SSRS'
          responses?: any
          score?: number
          risk_level?: 'low' | 'moderate' | 'high'
        }
      }
    }
  }
}
