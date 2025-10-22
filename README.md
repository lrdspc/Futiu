# Personal & Aluno - Fitness Training Platform 💪

A complete PWA for personal trainers and gym students, with a modern design, immersive experience, and advanced features for workout management and progress tracking.

Uma PWA completa para personal trainers e alunos de academia, com design moderno, experiência imersiva e funcionalidades avançadas de gestão de treinos e acompanhamento de evolução.

## ✨ Novidades Implementadas

- 📸 **Comparação de Fotos de Progresso** - Compare fotos antes/depois lado a lado
- 💬 **Mensagens Motivacionais** - Personal trainers podem enviar mensagens instantâneas
- ⚡ **Ajuste de Treinos em Tempo Real** - Modifique treinos durante a execução
- 🔔 **Notificações Push** - Lembretes, mensagens e conquistas
- 📱 **Sincronização Offline** - Funciona sem internet e sincroniza automaticamente
- ✅ **Modo Treino Interativo** - Marque séries, registre carga e repetições
- 🎨 **UX Aprimorada** - Animações suaves e design energético
- 🚀 **PWA 2025 Completo** - Todas as práticas modernas implementadas

## 📚 Documentação Completa

### Funcionalidades
- **[FEATURES.md](./FEATURES.md)** - Lista completa de funcionalidades
- **[QUICK_START.md](./QUICK_START.md)** - Guia rápido de uso
- **[COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)** - Exemplos de código
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Resumo executivo

### Desenvolvimento
- **[OPTIMIZATION.md](./OPTIMIZATION.md)** - Otimizações implementadas
- **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** - Boas práticas de código
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guia de contribuição
- **[PWA_SETUP.md](./PWA_SETUP.md)** - Configuração completa PWA 2025

## 🚀 Features / Funcionalidades

### For Personal Trainers / Para Personal Trainers
- **Interactive Dashboard**: Progress statistics, alerts, and student status. / **Dashboard Interativo**: Estatísticas de progresso, alertas e status dos alunos.
- **Student Management**: Complete registration with physical data, goals, and evolution. / **Gestão de Alunos**: Cadastro completo com dados físicos, metas e evolução.
- **Workout Creation**: Visual interface to build personalized workouts. / **Criação de Treinos**: Interface visual para montar treinos personalizados.
- **Exercise Library**: Complete database with videos and detailed instructions. / **Biblioteca de Exercícios**: Base completa com vídeos e instruções detalhadas.
- **Direct Chat**: Instant communication with students. / **Chat Direto**: Comunicação instantânea com os alunos.
- **Reports**: Complete overview of each student's evolution. / **Relatórios**: Visão completa da evolução de cada aluno.

### For Students / Para Alunos
- **Today's Workouts**: Clear view of scheduled workouts. / **Treinos do Dia**: Visualização clara dos treinos programados.
- **Guided Workout Mode**: Step-by-step execution with videos and instructions. / **Modo Treino Guiado**: Execução passo a passo com vídeos e instruções.
- **History and Evolution**: Graphs, measurements, and progress photos. / **Histórico e Evolução**: Gráficos, medidas e fotos de progresso.
- **Achievement System**: Gamification with badges and goals. / **Sistema de Conquistas**: Gamificação com badges e metas.
- **Chat with Personal Trainer**: Direct channel for feedback and questions. / **Chat com Personal**: Canal direto para feedback e dúvidas.
- **Offline Mode**: Access to workouts even without internet. / **Modo Offline**: Acesso aos treinos mesmo sem internet.

## 🛠️ Tech Stack / Tecnologias

- **Next.js 15.2.4** - React framework with App Router
- **TypeScript 5** - Static typing
- **Tailwind CSS v4.1.9** - Modern styling
- **Supabase** - Backend, authentication, and database
- **shadcn/ui** - UI components
- **Recharts 2.15.4** - Charts and visualizations
- **PWA** - Progressive Web App with offline support
- **Push Notifications** - Native notification support
- **Offline Sync** - Automatic synchronization

## 📦 Getting Started / Instalação

Follow these steps to set up the project locally.

Siga estes passos para configurar o projeto localmente.

1.  **Clone the repository / Clone o repositório:**
    ```bash
    git clone https://github.com/your-username/personal-aluno-platform.git
    cd personal-aluno-platform
    ```

2.  **Install dependencies / Instale as dependências:**
    The project uses `pnpm` as the package manager.
    O projeto usa `pnpm` como gerenciador de pacotes.
    ```bash
    pnpm install
    ```

3.  **Set up environment variables / Configure as variáveis de ambiente:**
    Create a `.env.local` file in the root of the project and add your Supabase credentials.
    Crie um arquivo `.env.local` na raiz do projeto e adicione suas credenciais do Supabase.
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Set up the database / Configure o banco de dados:**
    Run the SQL scripts located in the `/scripts` directory in your Supabase SQL editor in the following order:
    Execute os scripts SQL localizados no diretório `/scripts` no seu editor SQL do Supabase na seguinte ordem:
    ```
    001_create_users_and_profiles.sql
    002_create_exercises_and_workouts.sql
    003_create_progress_tracking.sql
    004_create_achievements_and_messages.sql
    005_seed_exercises.sql
    006_create_auth_triggers.sql
    ```

5.  **Run the development server / Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.
    A aplicação estará disponível em `http://localhost:3000`.

## 📂 Project Structure / Estrutura do Projeto

-   `app/`: Contains all the routes, pages, and layouts. / Contém todas as rotas, páginas e layouts.
-   `components/`: Shared React components. / Componentes React compartilhados.
-   `lib/`: Core logic, Supabase clients, and utility functions. / Lógica principal, clientes Supabase e funções utilitárias.
-   `hooks/`: Custom React hooks. / Hooks React customizados.
-   `scripts/`: SQL database schemas and seeding. / Esquemas de banco de dados SQL e seeding.
-   `public/`: Static assets. / Arquivos estáticos.
-   `styles/`: Global styles. / Estilos globais.

## ✅ Testing / Testes

The project uses Jest and React Testing Library for testing. To run the tests, use the following command:
O projeto usa Jest e React Testing Library para testes. Para rodar os testes, use o seguinte comando:
```bash
pnpm test
```

## 🎨 Design

The app uses a dark theme with vibrant neon colors (cyan, blue, and purple), modern and bold typography, and smooth animations to create an energetic and motivating experience.

O app utiliza um tema escuro com cores vibrantes neon (cyan, azul e roxo), tipografia moderna e bold, e animações suaves para criar uma experiência energética e motivadora.

### Color Palette / Paleta de Cores
- **Primary**: Cyan (#22d3ee) - Energy and focus / Energia e foco
- **Secondary**: Blue (#3b82f6) - Trust and stability / Confiança e estabilidade
- **Accent**: Purple (#a855f7) - Motivation and achievement / Motivação e conquista
- **Background**: Dark (#0a0b14) - Contrast and readability / Contraste e legibilidade

## 📱 PWA Features (2025 Standards)

- ✅ Installable on mobile and desktop devices / Instalável em dispositivos móveis e desktop
- ✅ Works offline with smart caching / Funciona offline com cache inteligente
- ✅ Push notifications for reminders and messages / Notificações push para lembretes e mensagens
- ✅ Quick shortcuts for main features / Atalhos rápidos para funcionalidades principais
- ✅ Optimized for performance / Otimizado para performance
- ✅ **Automatic offline sync** / **Sincronização offline automática**
- ✅ **Visual sync status indicator** / **Indicador visual de status de sincronização**
- ✅ **Modern manifest with display_override** / **Manifest moderno com display_override**
- ✅ **Share target for progress photos** / **Share target para fotos de progresso**
- ✅ **Protocol handlers (web+fitness://)** / **Protocol handlers (web+fitness://)**
- ✅ **Launch handler for app navigation** / **Launch handler para navegação do app**
- ✅ **Security headers (HSTS, CSP)** / **Headers de segurança (HSTS, CSP)**
- ✅ **Web Vitals monitoring** / **Monitoramento de Web Vitals**
- ✅ **Background sync support** / **Suporte a background sync**
- ✅ **Install prompt component** / **Componente de prompt de instalação**
- ✅ **TWA and Universal Links ready** / **Pronto para TWA e Universal Links**

## 🔐 Authentication / Autenticação

The system uses Supabase Auth with:
O sistema usa Supabase Auth com:
- Email and password login. / Login por email e senha.
- Separate profiles for Personal Trainers and Students. / Perfis separados para Personal Trainers e Alunos.
- Row Level Security (RLS) for data protection. / Row Level Security (RLS) para proteção de dados.
- Middleware for route protection. / Middleware para proteção de rotas.

## 📊 Database / Banco de Dados

Complete structure with:
Estrutura completa com:
- User profiles (trainers and students). / Perfis de usuários (trainers e alunos).
- Exercise library. / Biblioteca de exercícios.
- Workouts and assignments. / Treinos e atribuições.
- Workout sessions and logs. / Sessões de treino e logs.
- Body measurements and progress photos. / Medidas corporais e fotos de progresso.
- Achievement system. / Sistema de conquistas.
- Messages and chat. / Mensagens e chat.

## 🚀 Deploy

The project is ready for deployment on Vercel:
O projeto está pronto para deploy na Vercel:
1. Connect your GitHub repository. / Conecte seu repositório GitHub.
2. Configure Supabase environment variables. / Configure as variáveis de ambiente do Supabase.
3. Automatic deploy. / Deploy automático.

## 🎉 What's New

### Latest Updates
- 📸 Progress photo comparison with side-by-side view
- 💬 Motivational messages system for trainers
- ⚡ Real-time workout adjustments
- 🔔 Complete push notification system (6 types)
- 📱 Offline sync with automatic queue management
- ✅ Interactive workout mode with checkboxes
- 🎨 Enhanced UX with smooth animations

### Últimas Atualizações
- 📸 Comparação de fotos de progresso lado a lado
- 💬 Sistema de mensagens motivacionais para trainers
- ⚡ Ajustes de treino em tempo real
- 🔔 Sistema completo de notificações push (6 tipos)
- 📱 Sincronização offline com gerenciamento automático de fila
- ✅ Modo treino interativo com checkboxes
- 🎨 UX aprimorada com animações suaves

## 📄 License / Licença

This project was created with v0.app.
Este projeto foi criado com v0.app.

---

**Ready to transform your fitness journey! 💪🔥**

**Pronto para transformar sua jornada fitness! 💪🔥**
