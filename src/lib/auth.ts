export interface AuthUser {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
}

export interface AuthResponse {
  user: AuthUser
  token: string
}

// Simulação de autenticação para desenvolvimento
// Em produção, isso seria feito no backend
export class AuthService {
  private static generateId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9)
  }

  private static generateToken(user: AuthUser): string {
    const payload = {
      userId: user.id,
      email: user.email,
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 dias
    }
    return btoa(JSON.stringify(payload))
  }

  private static verifyTokenFormat(token: string): { userId: string; email: string; exp: number } | null {
    try {
      const payload = JSON.parse(atob(token))
      if (payload.exp < Date.now()) {
        throw new Error('Token expirado')
      }
      return payload
    } catch {
      return null
    }
  }

  static async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    // Simula verificação de email existente
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = existingUsers.find((u: any) => u.email === email)
    
    if (existingUser) {
      throw new Error('Usuário já existe com este email')
    }

    // Cria novo usuário
    const user: AuthUser = {
      id: this.generateId(),
      email,
      full_name: fullName,
      avatar_url: null,
    }

    // Salva no localStorage (simulando banco)
    const userData = {
      ...user,
      password_hash: btoa(password), // Simulação simples de hash
      created_at: new Date().toISOString(),
    }

    existingUsers.push(userData)
    localStorage.setItem('users', JSON.stringify(existingUsers))

    const token = this.generateToken(user)

    return { user, token }
  }

  static async signIn(email: string, password: string): Promise<AuthResponse> {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.email === email)

    if (!user) {
      throw new Error('Email ou senha incorretos')
    }

    // Verifica senha (simulação simples)
    if (atob(user.password_hash) !== password) {
      throw new Error('Email ou senha incorretos')
    }

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
    }

    const token = this.generateToken(authUser)

    return { user: authUser, token }
  }

  static async verifyToken(token: string): Promise<AuthUser> {
    const payload = this.verifyTokenFormat(token)
    
    if (!payload) {
      throw new Error('Token inválido')
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.id === payload.userId)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
    }
  }

  static async updateProfile(userId: string, updates: Partial<Pick<AuthUser, 'full_name' | 'avatar_url'>>): Promise<AuthUser> {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u: any) => u.id === userId)

    if (userIndex === -1) {
      throw new Error('Usuário não encontrado')
    }

    users[userIndex] = { ...users[userIndex], ...updates, updated_at: new Date().toISOString() }
    localStorage.setItem('users', JSON.stringify(users))

    return {
      id: users[userIndex].id,
      email: users[userIndex].email,
      full_name: users[userIndex].full_name,
      avatar_url: users[userIndex].avatar_url,
    }
  }
}
