#!/usr/bin/env python3
import os
from google import genai

# Configurar cliente Gemini
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Contexto do projeto
context = """
Estou desenvolvendo uma aplicação PWA de fitness com Next.js 15, TypeScript, Supabase e Vercel.

FLUXO DE AUTENTICAÇÃO ATUAL:
1. Página inicial redireciona para login de aluno (/auth/student-login)
2. Alunos NÃO podem se cadastrar sozinhos
3. Personal Trainer cria conta do aluno através do dashboard
4. Sistema envia email para aluno completar cadastro (definir senha)
5. Botão "Login Personal" no canto da página leva para /auth/personal-login

ESTRUTURA DO BANCO (Supabase):
- auth.users (tabela de autenticação do Supabase)
- public.users (id, email, user_type, full_name, avatar_url)
- public.student_profiles (id, personal_trainer_id, date_of_birth, gender, height_cm, etc)
- public.personal_profiles (id, specialization, bio, certifications, etc)

TECNOLOGIAS:
- Next.js 15.2.4 com App Router
- Supabase Auth + Database
- Server Actions para operações do servidor
- TypeScript

NECESSIDADES:
1. Criar uma página/componente para Personal Trainer cadastrar alunos
2. Implementar Server Action para criar aluno no Supabase Auth
3. Enviar email de boas-vindas com link para aluno definir senha
4. Validar dados do aluno (email único, campos obrigatórios)
5. Associar aluno ao Personal Trainer automaticamente

Por favor, me forneça:
1. Código completo da página de cadastro de alunos (React/Next.js)
2. Server Action para criar aluno
3. Melhor forma de enviar email de convite usando Supabase Auth
4. Validações e tratamento de erros
5. UX/UI seguindo o padrão dark theme com cores cyan/blue/purple
"""

print("🤖 Consultando Gemini para solução de cadastro de alunos...\n")

response = client.models.generate_content(
    model='gemini-2.0-flash-exp',
    contents=context
)

print(response.text)

