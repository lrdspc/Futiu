# 🚀 Guia Rápido - Personal & Aluno

## 🎯 Visão Geral

A plataforma **Personal & Aluno** conecta personal trainers e alunos em um ambiente digital completo, com treinos interativos, acompanhamento de progresso e comunicação em tempo real.

## 🏃 Início Rápido

### 1. Instalação
```bash
# Clone o repositório
git clone <seu-repo>

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Adicione suas credenciais do Supabase
```

### 2. Configuração do Supabase
```bash
# Execute os scripts SQL na ordem:
scripts/001_create_users_and_profiles.sql
scripts/002_create_exercises_and_workouts.sql
scripts/003_create_progress_tracking.sql
scripts/004_create_achievements_and_messages.sql
scripts/005_seed_exercises.sql
scripts/006_create_auth_triggers.sql
```

### 3. Executar
```bash
pnpm dev
# Acesse http://localhost:3000
```

## 👤 Fluxo do Personal Trainer

### Dashboard
1. Acesse `/dashboard/trainer`
2. Visualize estatísticas de alunos ativos, treinos criados e progresso
3. Veja próximas avaliações e atividade recente

### Criar Treino
1. Vá para **Treinos** → **Criar Novo Treino**
2. Preencha nome, categoria e descrição
3. Clique em **Adicionar Exercício**
4. Busque e selecione exercícios da biblioteca
5. Configure séries, repetições e descanso
6. Salve o treino

### Enviar Mensagem Motivacional
1. No dashboard, role até **Mensagens Motivacionais**
2. Selecione um aluno
3. Escolha um template rápido ou escreva sua mensagem
4. Selecione o tipo (texto, vídeo ou imagem)
5. Clique em **Enviar Mensagem**

### Ajustar Treino em Tempo Real
1. No dashboard, use **Ajuste em Tempo Real**
2. Selecione o exercício a ajustar
3. Modifique séries, repetições ou descanso
4. Adicione observações
5. Salve o ajuste (aluno será notificado)

### Gerenciar Alunos
1. Vá para **Alunos**
2. Visualize lista de alunos cadastrados
3. Clique em um aluno para ver detalhes
4. Acompanhe medidas, progresso e histórico

## 💪 Fluxo do Aluno

### Dashboard
1. Acesse `/dashboard/student`
2. Veja seus treinos do dia
3. Acompanhe progresso semanal
4. Visualize conquistas recentes

### Executar Treino
1. Clique em um treino disponível
2. Revise os exercícios e informações
3. Clique em **Iniciar Treino**
4. Para cada exercício:
   - Veja vídeo e instruções
   - Marque cada série como concluída ✓
   - Registre carga e repetições realizadas
   - Clique em **Próximo Exercício**
5. Ao finalizar, clique em **Finalizar Treino**
6. Receba notificação de conclusão 🎉

### Acompanhar Progresso
1. Vá para **Progresso**
2. Aba **Visão Geral**: veja gráficos e estatísticas
3. Aba **Medidas**: histórico de medidas corporais
4. Aba **Fotos**: compare fotos de progresso

### Comparar Fotos de Progresso
1. Em **Progresso** → **Fotos**
2. Clique em **Upload** para adicionar nova foto
3. Clique em **Comparar**
4. Selecione 2 fotos para comparação lado a lado
5. Visualize sua evolução!

### Chat com Personal
1. Vá para **Mensagens**
2. Veja conversas com seu personal trainer
3. Envie mensagens e feedbacks
4. Receba mensagens motivacionais

### Conquistas
1. Vá para **Conquistas**
2. Visualize badges desbloqueados
3. Veja progresso de conquistas pendentes
4. Receba notificações ao desbloquear novas conquistas

## 🔔 Notificações

### Ativar Notificações
1. Ao acessar a plataforma, aparecerá um prompt
2. Clique em **Ativar** para permitir notificações
3. Receba alertas sobre:
   - Lembretes de treino
   - Mensagens do personal
   - Treinos completados
   - Novas conquistas
   - Ajustes de treino

### Tipos de Notificações
- 🏋️ **Hora do Treino**: lembrete para treinar
- 💪 **Mensagem Motivacional**: do seu personal
- 🎉 **Treino Concluído**: parabéns!
- 🏆 **Nova Conquista**: badge desbloqueado
- 💬 **Nova Mensagem**: chat atualizado
- ⚡ **Treino Ajustado**: modificações em tempo real

## 📱 Modo Offline

### Como Funciona
1. A plataforma detecta automaticamente quando você está offline
2. Todas as ações são salvas localmente
3. Indicador visual mostra status: 🔴 Offline / 🟢 Online / 🔄 Sincronizando
4. Ao voltar online, dados são sincronizados automaticamente

### O Que Funciona Offline
- ✅ Visualizar treinos salvos
- ✅ Executar treinos
- ✅ Marcar séries como concluídas
- ✅ Registrar carga e repetições
- ✅ Escrever mensagens (enviadas ao voltar online)
- ✅ Visualizar progresso salvo

## 🎨 Personalização

### Tema
- Tema escuro por padrão
- Cores vibrantes: cyan (#22d3ee), azul, roxo
- Animações suaves e energéticas

### Atalhos
- **Cmd/Ctrl + B**: Toggle sidebar
- Atalhos PWA para acesso rápido

## 🆘 Solução de Problemas

### Notificações não funcionam
1. Verifique se está usando HTTPS (ou localhost)
2. Confirme permissão no navegador
3. Limpe cache e recarregue

### Sincronização travada
1. Verifique conexão com internet
2. Veja indicador de status no canto inferior direito
3. Recarregue a página se necessário

### Treino não salva
1. Verifique se está online
2. Se offline, dados serão sincronizados ao voltar online
3. Veja fila de sincronização no indicador

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação completa em `FEATURES.md`
2. Verifique os logs do console do navegador
3. Entre em contato com o suporte técnico

## 🎯 Dicas de Uso

### Para Personal Trainers
- ✨ Use templates de mensagens para agilizar comunicação
- ⚡ Ajuste treinos em tempo real conforme feedback dos alunos
- 📊 Acompanhe estatísticas para identificar alunos que precisam de atenção
- 💬 Mantenha comunicação ativa para motivar alunos

### Para Alunos
- 📸 Tire fotos de progresso regularmente para comparação
- ✅ Marque todas as séries para registro preciso
- 💪 Registre carga e repetições para acompanhar evolução
- 🏆 Busque desbloquear todas as conquistas
- 💬 Dê feedback ao personal sobre os treinos

## 🚀 Próximos Passos

1. Explore todas as funcionalidades
2. Configure notificações
3. Instale o PWA no seu dispositivo
4. Comece a treinar e acompanhar progresso!

---

**Bons treinos! 💪🔥**
