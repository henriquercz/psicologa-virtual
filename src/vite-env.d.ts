/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEON_DATABASE_URL: string
  readonly VITE_JWT_SECRET: string
  readonly VITE_GEMINI_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
