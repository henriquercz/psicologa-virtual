// api/gemini.ts
// Função Edge no Vercel para chamar o Gemini com chave segura e retry/backoff
// Autor: Cascade (Windsurf)
// Data: 2025-09-16
// Versão: 1.0.0

export const config = {
  runtime: 'edge'
}

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

async function callGemini(message: string, apiKey: string, attempt = 1): Promise<Response> {
  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ],
    generationConfig: {
      maxOutputTokens: 200, // Limita resposta para ~150-200 palavras (consulta real)
      temperature: 0.7,
      topP: 0.8,
      topK: 40
    },
    systemInstruction: `Você é Dra. Sofia, psicóloga clínica experiente. 

IMPORTANTE: Suas respostas devem ser CURTAS e NATURAIS, como em uma consulta presencial real:
- Máximo 2-3 frases por resposta
- Foque em UMA questão ou reflexão por vez
- Use linguagem acolhedora mas concisa
- Faça perguntas abertas para aprofundar
- Evite listas ou explicações longas
- Simule o ritmo natural de uma conversa terapêutica

Exemplo de boa resposta: "Entendo que isso tem sido difícil para você. Quando você sente essa ansiedade, o que costuma passar pela sua cabeça primeiro?"

Exemplo de resposta RUIM (muito longa): "Entendo que você está passando por um momento difícil e quero que saiba que é completamente normal sentir-se assim diante das circunstâncias que está vivenciando. A ansiedade pode se manifestar de várias formas..."

Mantenha sempre o foco terapêutico, mas seja BREVE e DIRETA.`
  }

  const url = `${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (res.status === 503 && attempt < 3) {
    // Backoff exponencial simples: 300ms, 800ms
    const delay = attempt === 1 ? 300 : 800
    await new Promise(r => setTimeout(r, delay))
    return callGemini(message, apiKey, attempt + 1)
  }

  return res
}

export default async function handler(req: Request) {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } })
    }

    // Debug: verificar variáveis de ambiente disponíveis
    const envKeys = Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('API'))
    console.log('Environment keys containing GEMINI or API:', envKeys)
    
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
    console.log('API Key found:', apiKey ? 'YES' : 'NO')
    
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        error: 'Missing GEMINI_API_KEY', 
        debug: { envKeys, hasGeminiKey: !!process.env.GEMINI_API_KEY, hasViteGeminiKey: !!process.env.VITE_GEMINI_API_KEY }
      }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const { message } = await req.json() as { message?: string }
    const text = (message ?? '').trim()
    if (!text) {
      return new Response(JSON.stringify({ error: 'Missing message' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const res = await callGemini(text, apiKey)

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      // Retornar erro normalizado ao cliente
      return new Response(JSON.stringify({ error: 'Gemini request failed', status: res.status, detail: errText }), { status: 502, headers: { 'Content-Type': 'application/json' } })
    }

    const data = await res.json() as any
    // Extrair texto de resposta do payload do Gemini
    const modelText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    if (!modelText) {
      return new Response(JSON.stringify({ error: 'Empty response from model' }), { status: 502, headers: { 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ text: modelText }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Internal error', message: error?.message ?? 'unknown' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
