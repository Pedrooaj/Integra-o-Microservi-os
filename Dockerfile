# --- Estágio 1: O "Builder" ---
# Usamos uma imagem node completa para ter o compilador TypeScript e npm
FROM node:20 AS builder

# Define o diretório de trabalho
WORKDIR /usr/src/app

# [Opcional mas recomendado] Recebe o nome do app como argumento
# Vamos usar isso para construir o app específico
ARG APP_NAME

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala TODAS as dependências (incluindo devDependencies)
RUN npm ci

# Copia o resto do código-fonte (apps e libs)
COPY . .

# Comando para construir (build) o app específico
# Ex: npx nest build auth-service
RUN npx nest build $APP_NAME

# --- Estágio 2: O "Final" (Produção) ---
# Usamos uma imagem "alpine" que é muito menor
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Recebe o nome do app de novo
ARG APP_NAME

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala APENAS dependências de produção
RUN npm ci --omit=dev

# Copia os artefatos construídos (o app compilado) do estágio "builder"
# O caminho é dist/apps/[nome-do-app]
COPY --from=builder /usr/src/app/dist/apps/$APP_NAME ./dist

# Define o comando para iniciar o app
# O ponto de entrada (main.js) estará em /dist/main.js
CMD ["node", "dist/main.js"]