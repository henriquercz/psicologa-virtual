import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth'
import { Heart, Sparkles } from 'lucide-react'

const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

type SignInForm = z.infer<typeof signInSchema>
type SignUpForm = z.infer<typeof signUpSchema>

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuthStore()

  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  })

  const handleSignIn = async (data: SignInForm) => {
    setLoading(true)
    setError('')
    try {
      await signIn(data.email, data.password)
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (data: SignUpForm) => {
    setLoading(true)
    setError('')
    try {
      await signUp(data.email, data.password, data.fullName)
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-therapy-50 via-white to-calm-50">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="p-3 rounded-full therapy-gradient">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <Sparkles className="h-6 w-6 text-therapy-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Psicóloga Virtual</h1>
            <p className="text-gray-600 mt-2">Sua companheira digital de bem-estar emocional</p>
          </div>
        </div>

        <Card className="calm-shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isSignUp ? 'Criar Conta' : 'Entrar'}
            </CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Comece sua jornada de autoconhecimento' 
                : 'Bem-vindo de volta! Continue sua jornada'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {isSignUp ? (
              <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Nome completo"
                    {...signUpForm.register('fullName')}
                    className="h-12"
                  />
                  {signUpForm.formState.errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...signUpForm.register('email')}
                    className="h-12"
                  />
                  {signUpForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Input
                    type="password"
                    placeholder="Senha"
                    {...signUpForm.register('password')}
                    className="h-12"
                  />
                  {signUpForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Input
                    type="password"
                    placeholder="Confirmar senha"
                    {...signUpForm.register('confirmPassword')}
                    className="h-12"
                  />
                  {signUpForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12" 
                  variant="therapy"
                  disabled={loading}
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </form>
            ) : (
              <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...signInForm.register('email')}
                    className="h-12"
                  />
                  {signInForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {signInForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Input
                    type="password"
                    placeholder="Senha"
                    {...signInForm.register('password')}
                    className="h-12"
                  />
                  {signInForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {signInForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12" 
                  variant="therapy"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            )}

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-therapy-600 hover:text-therapy-700 text-sm font-medium"
              >
                {isSignUp 
                  ? 'Já tem uma conta? Entrar' 
                  : 'Não tem conta? Criar agora'
                }
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Informações sobre privacidade */}
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>Suas conversas são privadas e seguras</p>
          <p className="font-medium text-red-600">
            ⚠️ Em caso de emergência, ligue 188 (CVV) ou procure ajuda médica
          </p>
        </div>
      </div>
    </div>
  )
}
