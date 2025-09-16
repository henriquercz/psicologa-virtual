import { useEffect } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'
import { ChatContainer } from '@/components/chat/ChatContainer'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'
import { useAuthStore } from '@/store/auth'

function App() {
  const { user, loading, needsOnboarding, userProfile, initialize, completeOnboarding } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    // Verificar se usuário precisa fazer onboarding
    if (user && !userProfile) {
      const savedProfile = localStorage.getItem('user_profile')
      if (!savedProfile) {
        // Marcar que precisa fazer onboarding
        useAuthStore.setState({ needsOnboarding: true })
      } else {
        // Carregar perfil salvo
        const profile = JSON.parse(savedProfile)
        useAuthStore.setState({ userProfile: profile, needsOnboarding: false })
      }
    }
  }, [user, userProfile])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-therapy-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-therapy-200 border-t-therapy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-therapy-600 font-medium">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  if (needsOnboarding) {
    return <OnboardingFlow onComplete={completeOnboarding} />
  }

  return <ChatContainer />
}

export default App
