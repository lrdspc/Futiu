# Personal & Aluno - Fitness Training Platform

Uma PWA completa para personal trainers e alunos de academia, com design moderno, experiência imersiva e funcionalidades avançadas de gestão de treinos e acompanhamento de evolução.

## 🚀 Funcionalidades

### Para Personal Trainers
- **Dashboard Interativo**: Estatísticas de progresso, alertas e status dos alunos
- **Gestão de Alunos**: Cadastro completo com dados físicos, metas e evolução
- **Criação de Treinos**: Interface visual para montar treinos personalizados
- **Biblioteca de Exercícios**: Base completa com vídeos e instruções detalhadas
- **Chat Direto**: Comunicação instantânea com os alunos
- **Relatórios**: Visão completa da evolução de cada aluno

### Para Alunos
- **Treinos do Dia**: Visualização clara dos treinos programados
- **Modo Treino Guiado**: Execução passo a passo com vídeos e instruções
- **Histórico e Evolução**: Gráficos, medidas e fotos de progresso
- **Sistema de Conquistas**: Gamificação com badges e metas
- **Chat com Personal**: Canal direto para feedback e dúvidas
- **Modo Offline**: Acesso aos treinos mesmo sem internet

## 🛠️ Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização moderna
- **Supabase** - Backend, autenticação e banco de dados
- **shadcn/ui** - Componentes de UI
- **Recharts** - Gráficos e visualizações
- **PWA** - Progressive Web App com suporte offline

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
\`\`\`bash
npm install
# ou
pnpm install
\`\`\`

3. Configure as variáveis de ambiente (já configuradas no projeto v0)

4. Execute os scripts SQL na ordem:
\`\`\`bash
# Os scripts estão em /scripts
001_create_users_and_profiles.sql
002_create_exercises_and_workouts.sql
003_create_progress_tracking.sql
004_create_achievements_and_messages.sql
005_seed_exercises.sql
\`\`\`

5. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
# ou
pnpm dev
\`\`\`

## 🎨 Design

O app utiliza um tema escuro com cores vibrantes neon (cyan, azul e roxo), tipografia moderna e bold, e animações suaves para criar uma experiência energética e motivadora.

### Paleta de Cores
- **Primary**: Cyan (#22d3ee) - Energia e foco
- **Secondary**: Blue (#3b82f6) - Confiança e estabilidade
- **Accent**: Purple (#a855f7) - Motivação e conquista
- **Background**: Dark (#0a0b14) - Contraste e legibilidade

## 📱 PWA Features

- Instalável em dispositivos móveis e desktop
- Funciona offline com cache inteligente
- Notificações push para lembretes e mensagens
- Atalhos rápidos para funcionalidades principais
- Otimizado para performance

## 🔐 Autenticação

O sistema usa Supabase Auth com:
- Login por email e senha
- Perfis separados para Personal Trainers e Alunos
- Row Level Security (RLS) para proteção de dados
- Middleware para proteção de rotas

## 📊 Banco de Dados

Estrutura completa com:
- Perfis de usuários (trainers e alunos)
- Biblioteca de exercícios
- Treinos e atribuições
- Sessões de treino e logs
- Medidas corporais e fotos de progresso
- Sistema de conquistas
- Mensagens e chat

## 🚀 Deploy

O projeto está pronto para deploy na Vercel:
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente do Supabase
3. Deploy automático

## 📄 Licença

Este projeto foi criado com v0.app
