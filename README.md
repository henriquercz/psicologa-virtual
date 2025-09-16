# Psicóloga Virtual 💙

Uma aplicação web moderna de psicóloga virtual desenvolvida com React, TypeScript, Tailwind CSS e Shadcn/ui. A IA utiliza o Gemini 2.5-flash e é baseada em protocolos clínicos científicos para oferecer apoio emocional acolhedor e empático.

## 🌟 Funcionalidades

- **Chat Inteligente**: Conversas naturais com IA treinada em TCC, ACT e mindfulness
- **Memória Persistente**: Conversas organizadas por dia com memória contínua
- **Design Mobile-First**: Interface otimizada para dispositivos móveis
- **Autenticação Segura**: Sistema de login/registro com NeonDB + JWT
- **Protocolos de Segurança**: Triagem de risco e orientações de emergência
- **Interface Acolhedora**: Design baseado na psicologia das cores

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **IA**: Google Gemini 2.5-flash
- **Backend**: NeonDB (PostgreSQL) + JWT Auth
- **Estado**: Zustand
- **Validação**: Zod + React Hook Form

## 📋 Pré-requisitos

- Node.js 18+ 
- Conta no NeonDB
- API Key do Google Gemini

## ⚙️ Configuração

### 1. Clone o repositório
```bash
git clone <repository-url>
cd psicologa-virtual
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
VITE_NEON_DATABASE_URL=sua_connection_string_do_neondb
VITE_JWT_SECRET=sua_chave_secreta_jwt
VITE_GEMINI_API_KEY=sua_api_key_do_gemini
```

### 4. Configure o banco de dados NeonDB

Execute os seguintes comandos SQL no console do NeonDB:

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de conversas
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Tabela de avaliações
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('PHQ-9', 'GAD-7', 'C-SSRS')),
  responses JSONB NOT NULL,
  score INTEGER NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'moderate', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_conversations_user_date ON conversations(user_id, date);
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
CREATE INDEX idx_users_email ON users(email);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 5. Execute o projeto
```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── auth/           # Componentes de autenticação
│   ├── chat/           # Componentes do chat
│   └── ui/             # Componentes base (Shadcn/ui)
├── lib/
│   ├── supabase.ts     # Configuração do Supabase
│   ├── gemini.ts       # Serviço do Gemini AI
│   └── utils.ts        # Utilitários
├── store/
│   ├── auth.ts         # Estado de autenticação
│   └── chat.ts         # Estado do chat
└── App.tsx             # Componente principal
```

## 🎨 Design System

### Cores Terapêuticas
- **Therapy**: Tons de azul calmo (#0ea5e9)
- **Calm**: Tons de cinza suave (#64748b)  
- **Warm**: Tons de laranja acolhedor (#f97316)

### Componentes
- Interface mobile-first responsiva
- Animações suaves e acolhedoras
- Sombras sutis (calm-shadow)
- Gradientes terapêuticos

## 🔒 Segurança

- **Protocolos de Triagem**: Detecção de risco suicida
- **Avisos de Emergência**: CVV 188, SAMU 192
- **RLS**: Row Level Security no Supabase
- **Validação**: Zod schemas para todos os formulários

## 🧠 IA e Psicologia

A IA é treinada com base em:
- **TCC**: Terapia Cognitivo-Comportamental
- **ACT**: Terapia de Aceitação e Compromisso  
- **Mindfulness**: Técnicas de atenção plena
- **Protocolos Clínicos**: PHQ-9, GAD-7, C-SSRS

## 📱 Funcionalidades Mobile

- Design mobile-first
- Suporte a reconhecimento de voz
- Interface touch-friendly
- Safe areas para dispositivos com notch

## 🚀 Deploy

Para fazer deploy da aplicação:

1. Build do projeto:
```bash
npm run build
```

2. Configure as variáveis de ambiente no seu provedor de hosting
3. Faça upload da pasta `dist/`

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue primeiro para discutir mudanças importantes.

## ⚠️ Aviso Importante

Esta aplicação não substitui atendimento psicológico profissional. Em caso de emergência, procure ajuda imediata:
- CVV: 188
- SAMU: 192
- Bombeiros: 193

---

Desenvolvido com 💙 para cuidar da saúde mental digital
