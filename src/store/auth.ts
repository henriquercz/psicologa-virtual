import { create } from 'zustand'
import { AuthService, type AuthUser } from '@/lib/auth'

interface AuthState {
  user: AuthUser | null
  token: string | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => void
  initialize: () => void
  updateProfile: (updates: Partial<Pick<AuthUser, 'full_name' | 'avatar_url'>>) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { user, token } = await AuthService.signIn(email, password)
      
      // Salva token no localStorage
      localStorage.setItem('auth_token', token)
      
      set({ user, token, loading: false })
    } catch (error) {
      throw error
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    try {
      const { user, token } = await AuthService.signUp(email, password, fullName)
      
      // Salva token no localStorage
      localStorage.setItem('auth_token', token)
      
      set({ user, token, loading: false })
    } catch (error) {
      throw error
    }
  },

  signOut: () => {
    localStorage.removeItem('auth_token')
    set({ user: null, token: null })
  },

  initialize: () => {
    set({ loading: true })
    
    const token = localStorage.getItem('auth_token')
    
    if (token) {
      AuthService.verifyToken(token)
        .then((user) => {
          set({ user, token, loading: false })
        })
        .catch(() => {
          localStorage.removeItem('auth_token')
          set({ user: null, token: null, loading: false })
        })
    } else {
      set({ loading: false })
    }
  },

  updateProfile: async (updates: Partial<Pick<AuthUser, 'full_name' | 'avatar_url'>>) => {
    const { user } = get()
    if (!user) throw new Error('Usuário não autenticado')

    try {
      const updatedUser = await AuthService.updateProfile(user.id, updates)
      set({ user: updatedUser })
    } catch (error) {
      throw error
    }
  },
}))
