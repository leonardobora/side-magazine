# SIDE Magazine Website

Um site moderno e responsivo para a revista SIDE, apresentando o lançamento da Edição 01 "CORES E FORMAS". Construído como uma aplicação full-stack React com backend Express.js, o site serve como landing page para o evento de lançamento da primeira edição da revista, programado para 28 de setembro na Soma Galeria em Curitiba.

## Sobre o Projeto

O SIDE Magazine é uma revista que explora a interseção entre moda, arte e cultura visual. Este website apresenta seções para showcases de artistas, informações do evento, lineup musical e inscrição na newsletter, tudo com uma estética vibrante e contemporânea que reflete o foco da revista.

## Tech Stack

### Frontend
- **React 18** com TypeScript para type safety e experiência de desenvolvimento moderna
- **Vite** para desenvolvimento rápido e builds otimizados para produção
- **Wouter** para roteamento client-side leve
- **Tailwind CSS** com variáveis CSS customizadas para paleta de cores da marca
- **Shadcn/ui** biblioteca de componentes construída sobre Radix UI primitives
- **TanStack Query** para gerenciamento de estado do servidor
- **React Hook Form** com resolvers Zod para validação de formulários
- **date-fns** para formatação e manipulação de datas

### Backend
- **Express.js** com TypeScript para endpoints da API
- **TSX** para execução de TypeScript em desenvolvimento
- **ESBuild** para bundling de produção com formato ES modules
- **Drizzle ORM** configurado para PostgreSQL com queries type-safe
- **Neon Database** plataforma serverless PostgreSQL
- **Zod** para validação de schemas e dados

### Ferramentas de Desenvolvimento
- **TypeScript 5.6** para type safety
- **Drizzle Kit** para migrações e gerenciamento de schema do banco
- **PostCSS** e **Autoprefixer** para processamento CSS
- **Replit plugins** para integração com ambiente de desenvolvimento

## Instalação e Setup Local

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- PostgreSQL (local ou Neon Database)

### 1. Clone o repositório
```bash
git clone https://github.com/leonardobora/side-magazine.git
cd side-magazine
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
```bash
# Configure suas variáveis de ambiente (crie um arquivo .env se necessário)
# DATABASE_URL=sua_url_do_postgresql

# Execute as migrações do banco
npm run db:push
```

### 4. Execute em desenvolvimento

#### Opção 1: Desenvolvimento integrado (recomendado)
```bash
npm run dev
```
Isso iniciará tanto o servidor Express quanto o Vite dev server integrados na porta 5000.

#### Opção 2: Executar separadamente
```bash
# Terminal 1 - Backend
cd server
npx tsx index.ts

# Terminal 2 - Frontend  
cd client
npx vite
```

### 5. Acesse a aplicação
- Frontend: http://localhost:5000
- API: http://localhost:5000/api

## Build e Produção

### Build para produção
```bash
npm run build
```

Este comando:
1. Executa `vite build` para construir os assets do frontend
2. Executa `esbuild` para bundlar o servidor Express
3. Gera arquivos otimizados em `dist/`

### Executar em produção
```bash
npm start
```

## Estrutura de Pastas

```
side-magazine/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React reutilizáveis
│   │   │   ├── ui/        # Componentes base (Shadcn/ui)
│   │   │   ├── header.tsx
│   │   │   ├── hero.tsx
│   │   │   └── ...
│   │   ├── pages/         # Páginas da aplicação
│   │   │   └── home.tsx   # Página inicial
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilitários e configurações
│   │   └── main.tsx       # Entry point React
│   ├── index.html         # Template HTML
│   └── vite.config.ts     # Configuração Vite
├── server/                # Backend Express
│   ├── index.ts          # Entry point do servidor
│   ├── routes.ts         # Definições de rotas da API
│   ├── storage.ts        # Abstração da camada de dados
│   ├── db.ts             # Configuração do banco de dados
│   └── vite.ts           # Integração Vite/Express
├── shared/               # Código compartilhado
│   └── schema.ts         # Schemas Drizzle/Zod
├── attached_assets/      # Assets estáticos (imagens, etc)
├── dist/                 # Build de produção (gerado)
│   ├── public/          # Assets frontend buildados
│   └── index.js         # Servidor bundlado
├── package.json          # Dependencies e scripts
├── tsconfig.json         # Configuração TypeScript
├── tailwind.config.ts    # Configuração Tailwind
├── drizzle.config.ts     # Configuração Drizzle ORM
└── vite.config.ts        # Configuração Vite principal
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm start` - Executa versão de produção
- `npm run check` - Verificação de tipos TypeScript
- `npm run db:push` - Aplica mudanças do schema no banco

## Deploy

### Frontend (GitHub Pages / Netlify / Vercel)
O frontend é uma SPA que pode ser hospedada em qualquer serviço de hospedagem estática:

1. Execute `npm run build`
2. Deploy da pasta `dist/public/` 
3. Configure rewrites para SPAs (todas as rotas apontam para `index.html`)

### Backend (Railway / Heroku / VPS)
O backend requer um servidor Node.js:

1. Configure variáveis de ambiente:
   - `DATABASE_URL` - URL de conexão PostgreSQL
   - `PORT` - Porta do servidor (padrão: 5000)
2. Execute `npm run build && npm start`

### Deploy Full-Stack (Replit / Railway)
Para deploy integrado (frontend + backend):

1. Configure `DATABASE_URL` 
2. Execute `npm run build && npm start`
3. O servidor Express servirá tanto a API quanto os assets estáticos

## API Endpoints

### Newsletter
- `POST /api/newsletter` - Inscrever email na newsletter
- `GET /api/newsletter` - Listar inscrições (admin)

### Sponsors
- `POST /api/sponsors` - Criar parceria de patrocínio
- `GET /api/sponsors` - Listar patrocinadores

### Galleries
- `POST /api/galleries` - Criar galeria
- `GET /api/galleries` - Listar galerias
- `GET /api/galleries/:id` - Obter galeria específica

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

- Website: [SIDE Magazine](https://side-magazine.com)
- Instagram: [@side.magazine](https://www.instagram.com/side.magazine)
- Email: antoniavonhart@gmail.com
- Desenvolvido por: [Leo Bora](https://linkedin.com/in/leonardobora)