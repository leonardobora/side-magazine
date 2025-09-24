# SIDE Magazine

Uma revista digital focada em arte, design e cultura contemporânea.

## Arquitetura de Segurança - Frontend/Backend

### Segregação de Código

Este projeto utiliza uma arquitetura separada que garante isolamento completo entre frontend e backend para proteger dados sensíveis.

#### Estrutura de Diretórios

```
side-magazine/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/               # Código fonte do cliente
│   └── index.html         # Template HTML
├── server/                # Backend (Express + TypeScript) 
│   ├── index.ts          # Servidor principal
│   ├── routes.ts         # Rotas da API
│   ├── storage.ts        # Camada de dados
│   └── vite.ts           # Configuração do Vite
├── shared/               # Tipos compartilhados (apenas TypeScript)
├── dist/
│   ├── public/          # ✅ Build do frontend (servido estaticamente)
│   └── index.js         # ❌ Build do backend (NÃO exposto publicamente)
└── attached_assets/     # Assets estáticos
```

#### Proteções Implementadas

**1. Isolamento de Build**
- O frontend é compilado para `dist/public/` (servido estaticamente)
- O backend é compilado para `dist/index.js` (execução server-side apenas)
- Zero vazamento de código backend no frontend

**2. Configuração do Vite**
- Exclusão explícita de módulos server-side (`express`, `drizzle-orm`, etc.)
- Negação de acesso a diretórios sensíveis (`server/`, `.env*`, etc.)
- Root isolado no diretório `client/`

**3. Servidor Seguro**
- Serve apenas `dist/public/` via express.static()
- Rotas da API sob `/api/*`
- Middleware de logging para auditoria

**4. Gitignore Robusto**
- Arquivos `.env*` nunca commitados
- Diretório `server/` protegido
- Certificados e chaves excluídos
- Build artifacts isolados

### Scripts de Build

```bash
# Desenvolvimento (frontend + backend separados)
npm run dev

# Build de produção (frontend → dist/public, backend → dist/index.js)  
npm run build

# Produção (serve apenas frontend estático + API)
npm start
```

### Variáveis de Ambiente

**Nunca commitadas no repositório:**
```bash
# .env (exemplo)
DATABASE_URL=postgresql://...
NODE_ENV=production
PORT=5000
```

**Para desenvolvimento local:**
1. Copie `.env.example` para `.env`
2. Configure suas credenciais locais
3. Execute `npm run dev`

### Validação de Segurança

Para verificar que nenhum dado sensível está exposto:

```bash
# 1. Build o projeto
npm run build

# 2. Execute a verificação automatizada de segurança
npm run security-check
```

O script verificará:
- ✅ Ausência de código backend no frontend
- ✅ Nenhuma credencial exposta  
- ✅ Estrutura de arquivos apropriada
- ✅ Nenhum arquivo de servidor acidentalmente incluído

### Deployment

**Frontend (Estático):**
- Servir apenas `dist/public/`
- CDN compatível
- Cache agressivo para assets

**Backend (API):**
- Executar `dist/index.js` em Node.js
- Variáveis de ambiente injetadas no runtime
- Proxy reverso para `/api/*`

---

## Desenvolvimento

### Pré-requisitos
- Node.js 18+
- PostgreSQL (via Neon Database)

### Setup Local
```bash
git clone https://github.com/leonardobora/side-magazine
cd side-magazine
npm install
cp .env.example .env  # Configure suas variáveis
npm run dev
```

### Tecnologias
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express, TypeScript, Drizzle ORM
- **Database**: PostgreSQL (Neon Database)
- **Deploy**: Replit

---

*Este projeto mantém a separação rigorosa entre frontend e backend para garantir a segurança dos dados e código server-side.*