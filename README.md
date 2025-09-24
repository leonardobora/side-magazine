# SIDE Magazine Website

Uma aplicação full-stack moderna construída com React + TypeScript + Express.js para showcasing do lançamento de "CORES E FORMAS", primeira edição da SIDE Magazine.

## Arquitetura

- **Frontend**: React 18 com TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js com TypeScript  
- **Build**: Vite para frontend, ESBuild para backend
- **ORM**: Drizzle ORM com PostgreSQL (Neon Database)

## Desenvolvimento

### Pré-requisitos

- Node.js 20.x
- npm

### Instalação

```bash
npm install
```

### Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção (frontend + backend)
- `npm start` - Inicia servidor de produção
- `npm run check` - Verificação de tipos TypeScript
- `npm run lint` - Executa ESLint
- `npm run lint:fix` - Executa ESLint com correção automática
- `npm run db:push` - Aplica mudanças de schema no banco

## CI/CD

### Continuous Integration

O projeto utiliza GitHub Actions para CI com pipeline automatizado que executa:

1. **Instalação de dependências** (`npm ci`)
2. **Linting** (`npm run lint`) - ESLint para qualidade do código
3. **Type Checking** (`npm run check`) - Verificação de tipos TypeScript
4. **Build** (`npm run build`) - Build completo frontend + backend
5. **Verificação de artefatos** - Confirmação de que build foi gerado

### Triggers

O CI é executado automaticamente em:
- Push para branches `main` e `develop`
- Pull Requests para `main` e `develop`

### Falhas

O pipeline falhará e rejeitará PRs em caso de:
- Erros de linting (ESLint errors)
- Erros de type checking (TypeScript errors)
- Falhas no build process
- Falta de artefatos de build

### Configuração

A configuração do CI está em `.github/workflows/ci.yml` e pode ser ajustada conforme necessário.

## Estrutura do Projeto

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Código compartilhado (schemas, tipos)
├── attached_assets/ # Assets estáticos
└── dist/           # Build artifacts (gerado)
```

## Linting

O projeto usa ESLint com configurações específicas para:
- TypeScript
- React + React Hooks
- Globals para Node.js e Browser

Configuração em `eslint.config.js`.