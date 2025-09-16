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
    ]
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

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
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
