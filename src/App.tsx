import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthForm } from '@/components/auth/AuthForm'
import { ChatContainer } from '@/components/chat/ChatContainer'
import { useAuthStore } from '@/store/auth'

function App() {
  const { user, loading, initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-therapy-50 via-white to-calm-50">
        <div className="text-center space-y-4">
          <div className="animate-pulse-gentle">
            <div className="w-16 h-16 therapy-gradient rounded-full mx-auto flex items-center justify-center">
              <span className="text-white text-2xl">💙</span>
            </div>
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/chat" replace /> : <AuthForm />} 
        />
        <Route 
          path="/chat" 
          element={user ? <ChatContainer /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/chat" : "/auth"} replace />} 
        />
      </Routes>
    </Router>
  )
}

export default App
