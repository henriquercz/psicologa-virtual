/**
 * Componente de Fluxo de Onboarding
 * Autor: Capitão Henrique
 * Data: 2025-09-15
 * Versão: 1.0
 * 
 * Gerencia o processo completo de onboarding com questionário
 * psicológico para novos usuários.
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { ONBOARDING_QUESTIONS, type OnboardingQuestion, type UserProfile } from '@/lib/onboarding'

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isCompleting, setIsCompleting] = useState(false)

  const currentQuestion = ONBOARDING_QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      completeOnboarding()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const completeOnboarding = async () => {
    setIsCompleting(true)
    
    // Construir perfil do usuário
    const profile: UserProfile = {
      age_range: answers.age_range || '',
      gender: answers.gender || '',
      occupation: answers.occupation || '',
      relationship_status: answers.relationship_status || '',
      previous_therapy: answers.previous_therapy === 'Sim, recentemente' || answers.previous_therapy === 'Sim, há alguns anos',
      current_medication: answers.current_medication || false,
      mental_health_history: answers.mental_health_history || [],
      main_concerns: answers.main_concerns || [],
      stress_level: answers.stress_level || 5,
      sleep_quality: answers.sleep_quality || 5,
      energy_level: answers.energy_level || 5,
      therapy_goals: answers.therapy_goals || [],
      preferred_approach: answers.preferred_approach || '',
      exercise_frequency: answers.exercise_frequency || '',
      social_support: answers.social_support || 5,
      work_stress: answers.work_stress || 5,
      communication_style: answers.communication_style || '',
      coping_mechanisms: answers.coping_mechanisms || [],
      triggers: answers.triggers || [],
      completed_at: new Date()
    }

    // Salvar perfil no banco de dados (implementar depois)
    // await saveUserProfile(user?.id, profile)

    onComplete(profile)
  }

  const isAnswered = () => {
    const answer = answers[currentQuestion.id]
    if (!currentQuestion.required) return true
    
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0
    }
    
    return answer !== undefined && answer !== null && answer !== ''
  }

  const renderQuestion = (question: OnboardingQuestion) => {
    const answer = answers[question.id]

    switch (question.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Digite sua resposta..."
              value={answer || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="text-lg p-4"
            />
          </div>
        )

      case 'single':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={answer === option ? "default" : "outline"}
                className="w-full text-left justify-start p-4 h-auto"
                onClick={() => handleAnswer(question.id, option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )

      case 'multiple':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={Array.isArray(answer) && answer.includes(option) ? "default" : "outline"}
                className="w-full text-left justify-start p-4 h-auto"
                onClick={() => {
                  const currentAnswers = Array.isArray(answer) ? answer : []
                  const newAnswers = currentAnswers.includes(option)
                    ? currentAnswers.filter(a => a !== option)
                    : [...currentAnswers, option]
                  handleAnswer(question.id, newAnswers)
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        )

      case 'scale':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{question.scale?.labels[0]}</span>
              <span className="text-sm text-gray-500">{question.scale?.labels[question.scale.labels.length - 1]}</span>
            </div>
            <div className="flex justify-between">
              {Array.from({ length: question.scale?.max || 10 }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  variant={answer === num ? "default" : "outline"}
                  className="w-12 h-12 rounded-full"
                  onClick={() => handleAnswer(question.id, num)}
                >
                  {num}
                </Button>
              ))}
            </div>
            {answer && (
              <div className="text-center text-sm text-gray-600">
                Você selecionou: {answer}/10
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-therapy-50/30 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-therapy-100 flex items-center justify-center">
              <span className="text-2xl">👩‍⚕️</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-therapy-800">
            Conhecendo Você Melhor
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Para oferecer o melhor acompanhamento, preciso conhecer um pouco sobre você
          </p>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Pergunta {currentStep + 1} de {ONBOARDING_QUESTIONS.length}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-therapy-50/50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-therapy-800 mb-4">
              {currentQuestion.question}
            </h3>
            
            {renderQuestion(currentQuestion)}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isAnswered() || isCompleting}
              className="min-w-24"
            >
              {isCompleting ? (
                "Finalizando..."
              ) : currentStep === ONBOARDING_QUESTIONS.length - 1 ? (
                "Finalizar"
              ) : (
                "Próxima"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
