# 🤝 Guia de Contribuição

## 🎯 Como Contribuir

### 1. Fork e Clone
```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/personal-aluno-platform.git
cd personal-aluno-platform
```

### 2. Instalar Dependências
```bash
pnpm install
```

### 3. Criar Branch
```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-fix
```

### 4. Desenvolver
- Siga as [Boas Práticas](./BEST_PRACTICES.md)
- Escreva testes quando apropriado
- Mantenha commits atômicos e descritivos

### 5. Testar
```bash
pnpm type-check  # Verificar tipos
pnpm lint        # Verificar linting
pnpm test        # Rodar testes
pnpm build       # Testar build
```

### 6. Commit
```bash
git add .
git commit -m "feat: adicionar nova funcionalidade"
```

#### Convenção de Commits
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

### 7. Push e Pull Request
```bash
git push origin feature/minha-feature
```
Abra um Pull Request no GitHub com descrição detalhada.

## 📋 Checklist de PR

- [ ] Código segue as boas práticas
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Build passa sem erros
- [ ] Type-check passa
- [ ] Lint passa
- [ ] Testado em diferentes navegadores
- [ ] Testado em mobile

## 🐛 Reportar Bugs

### Template de Issue
```markdown
**Descrição**
Descrição clara do bug

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável

**Ambiente**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Versão: [e.g. 22]
```

## 💡 Sugerir Features

### Template de Feature Request
```markdown
**Problema**
Qual problema esta feature resolve?

**Solução Proposta**
Como você imagina a solução?

**Alternativas**
Outras soluções consideradas

**Contexto Adicional**
Qualquer outra informação relevante
```

## 🎨 Padrões de Código

### TypeScript
- Use tipos explícitos
- Evite `any`
- Prefira interfaces para objetos

### React
- Componentes funcionais
- Hooks para lógica
- Props tipadas

### Estilo
- Tailwind CSS
- Componentes shadcn/ui
- Mobile-first

## 🧪 Testes

### Estrutura
```typescript
describe('ComponentName', () => {
  it('should do something', () => {
    // Arrange
    const props = { ... }
    
    // Act
    render(<Component {...props} />)
    
    // Assert
    expect(screen.getByText('...')).toBeInTheDocument()
  })
})
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

## 💬 Comunicação

- Issues: Para bugs e features
- Discussions: Para perguntas e ideias
- Pull Requests: Para contribuições de código

## 🙏 Agradecimentos

Obrigado por contribuir para o Personal & Aluno! 💪

---

**Juntos construímos uma plataforma melhor! 🚀**
