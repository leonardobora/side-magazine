#!/bin/bash

# Security validation script for Side Magazine
# Verifies no sensitive backend data is exposed in frontend build

echo "🔍 Executando verificação de segurança..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if dist/public exists
if [ ! -d "dist/public" ]; then
    echo -e "${RED}❌ dist/public não encontrado. Execute 'npm run build' primeiro.${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 Verificando conteúdo do build público...${NC}"

# Define CRITICAL sensitive patterns (these should NEVER appear in frontend)
CRITICAL_PATTERNS=(
    "DATABASE_URL"
    "drizzle-orm"
    "pgTable"
    "createServer.*express"
    "server/.*\.ts"
    "\.env"
    "process\.env\."
    "real_password"
    "actual_secret_key"
)

FOUND_CRITICAL=0

echo -e "\n🚨 Verificando padrões CRÍTICOS (nunca devem aparecer)..."

for pattern in "${CRITICAL_PATTERNS[@]}"; do
    echo -n "  Verificando '$pattern'... "
    
    if grep -r -E "$pattern" dist/public/ > /dev/null 2>&1; then
        echo -e "${RED}❌ CRÍTICO ENCONTRADO${NC}"
        echo -e "${RED}    Padrão '$pattern' encontrado em:${NC}"
        grep -r -E -l "$pattern" dist/public/ | sed 's/^/      /'
        FOUND_CRITICAL=$((FOUND_CRITICAL + 1))
    else
        echo -e "${GREEN}✅ OK${NC}"
    fi
done

echo -e "\n📊 Resumo dos arquivos públicos:"
find dist/public -type f | while read file; do
    size=$(du -h "$file" | cut -f1)
    echo "  📄 $file ($size)"
done

echo -e "\n🎯 Verificações estruturais:"

# Check for proper file structure
echo -n "  Estrutura correta (apenas HTML, CSS, JS, assets)... "
ALLOWED_EXTENSIONS="html|css|js|png|jpg|jpeg|gif|svg|ico|json|txt|woff|woff2|ttf|eot"
if find dist/public -type f | grep -v -E "\.(${ALLOWED_EXTENSIONS})$" > /dev/null; then
    echo -e "${YELLOW}⚠️  Arquivos inesperados encontrados:${NC}"
    find dist/public -type f | grep -v -E "\.(${ALLOWED_EXTENSIONS})$" | sed 's/^/      /'
else
    echo -e "${GREEN}✅ OK${NC}"
fi

# Check if backend server files are accidentally exposed
echo -n "  Verificando se arquivos do servidor estão expostos... "
SERVER_FILES=$(find dist/public -name "*.ts" -o -name "server" -o -name "routes.js" -o -name "db.js" 2>/dev/null)
if [ -n "$SERVER_FILES" ]; then
    echo -e "${RED}❌ CRÍTICO: Arquivos de servidor encontrados${NC}"
    echo "$SERVER_FILES" | sed 's/^/      /'
    FOUND_CRITICAL=$((FOUND_CRITICAL + 1))  
else
    echo -e "${GREEN}✅ OK${NC}"
fi

# Check build output size (frontend should be reasonable size)
echo -n "  Verificando tamanho do build... "
TOTAL_SIZE=$(du -sh dist/public | cut -f1)
echo -e "${GREEN}✅ OK ($TOTAL_SIZE)${NC}"

# Final report 
echo -e "\n📋 RELATÓRIO FINAL:"
if [ $FOUND_CRITICAL -eq 0 ]; then
    echo -e "${GREEN}✅ Build do frontend está SEGURO!${NC}"
    echo -e "${GREEN}   ✓ Nenhum código de backend exposto${NC}"
    echo -e "${GREEN}   ✓ Nenhuma credencial encontrada${NC}"
    echo -e "${GREEN}   ✓ Estrutura de arquivos apropriada${NC}"
    echo -e "${GREEN}   ✓ Tamanho do build: $TOTAL_SIZE${NC}"
    exit 0
else
    echo -e "${RED}❌ PROBLEMAS CRÍTICOS DE SEGURANÇA ENCONTRADOS!${NC}"
    echo -e "${RED}   $FOUND_CRITICAL problema(s) crítico(s) que devem ser corrigidos.${NC}"
    echo -e "${RED}   O build do frontend NÃO está seguro para produção.${NC}"
    exit 1
fi