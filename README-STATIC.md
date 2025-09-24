# Side Magazine - Build Estático

## Visão Geral

Este documento explica como gerar e deployar uma versão completamente estática do site Side Magazine, adequada para hospedagem em serviços como GitHub Pages, Netlify, Vercel ou qualquer servidor de arquivos estáticos.

## Comandos de Build

### Build Padrão (com servidor backend)
```bash
npm run build
```
Gera arquivos estáticos em `dist/public` + servidor backend em `dist/index.js`

### Build Estático (apenas frontend)
```bash
npm run build:static
```
Gera apenas arquivos estáticos em `dist/public` com todas as funcionalidades adaptadas para modo estático.

## Características do Build Estático

### ✅ Funcionalidades Funcionais
- **Navegação completa**: Todas as páginas (`/`, `/galeria`, `/parcerias`) funcionam
- **Client-side routing**: SPAs com rotas funcionando corretamente
- **Newsletter**: Formulário funciona com feedback visual (modo simulação)
- **Formulário de Parcerias**: Envio funciona com feedback adequado
- **Galeria**: Visualização com dados mock (sem chamadas API)
- **Design responsivo**: Mantém toda a experiência visual

### 🔧 Adaptações para Modo Estático
- **Chamadas de API desabilitadas**: Console warnings informativos
- **Fallbacks graceful**: Mensagens adequadas para modo estático
- **Roteamento SPA**: HTML files gerados para cada rota
- **Assets otimizados**: CSS, JS e imagens com cache busting

## Estrutura dos Arquivos Gerados

```
dist/public/
├── index.html              # Página inicial
├── parcerias/
│   └── index.html          # Página de parcerias
├── galeria/
│   └── index.html          # Página da galeria
├── assets/
│   ├── index-[hash].js     # Bundle JavaScript otimizado
│   ├── index-[hash].css    # Estilos compilados
│   └── *.png              # Assets de imagem
└── _redirects             # Configurações para Netlify
```

## Deploy em Serviços de Hospedagem

### GitHub Pages
1. Execute `npm run build:static`
2. Faça upload da pasta `dist/public` para o repositório `gh-pages`
3. Configure o GitHub Pages para usar a pasta raiz

### Netlify
1. Execute `npm run build:static`
2. Faça deploy da pasta `dist/public`
3. O arquivo `_redirects` já está configurado para SPAs

### Vercel
1. Execute `npm run build:static`
2. Configure build command: `npm run build:static`
3. Configure output directory: `dist/public`

### Servidor HTTP Simples
```bash
# Teste local
cd dist/public
python3 -m http.server 8080
# ou
npx serve -s . -l 8080
```

## Verificações de Qualidade

### ✅ Checklist de Testes
- [ ] Página inicial carrega corretamente
- [ ] Navegação entre páginas funciona
- [ ] Newsletter pode ser "inscrita" (modo simulação)
- [ ] Formulário de parcerias pode ser enviado (modo simulação)
- [ ] Galeria exibe conteúdo mock
- [ ] Design responsivo mantido
- [ ] Assets carregam corretamente
- [ ] Console não mostra erros críticos

### Performance
- Bundle JavaScript: ~471KB (145KB gzipped)
- CSS: ~62KB (11KB gzipped)
- Assets de imagem: ~4.2MB total
- Tempo de build: ~4 segundos

## Diferenças do Modo Completo

| Funcionalidade | Modo Completo | Modo Estático |
|---|---|---|
| Newsletter | Salva no banco | Simulação visual |
| Formulário Parcerias | Envia email | Simulação visual |
| Galeria | Dados dinâmicos | Dados mock |
| Autenticação | Backend | N/A |
| APIs | Funcionais | Desabilitadas |

## Troubleshooting

### Roteamento não funciona
- Certifique-se que o servidor suporta SPA routing
- Para Apache: adicione `.htaccess` com rewrite rules
- Para Nginx: configure `try_files`

### Assets não carregam
- Verifique se o `base path` está correto
- Confirme que os arquivos estão sendo servidos com MIME types corretos

### Formulários não respondem
- Console warnings são normais em modo estático
- Funcionalidade visual deve funcionar normalmente

## Notas Técnicas

- **Vite define**: `__STATIC_MODE__` habilitado durante build estático
- **Plugin customizado**: Gera HTML files para roteamento SPA
- **Query client**: Configurado para fallbacks em modo estático
- **Bundle otimizado**: Tree shaking e minificação automática