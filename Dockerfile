# --- Estágio 1: Base ---
# Contém todo o código-fonte e TODAS as dependências (dev + prod)
FROM node:20 AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

# Instala TODAS as dependências
RUN npm ci
# Copia todo o código-fonte
COPY . .

# --- Estágio 2: Development ---
# Usa o "base" (com node_modules e código-fonte)
# Esta será nossa imagem de desenvolvimento
FROM base AS development

# Comando padrão. Isso será sobrescrito no docker-compose
# para especificar qual app rodar (ex: auth)
CMD ["npm", "run", "start:dev"]

# --- Estágio 3: Production Builder ---
# Este é o seu antigo "builder".
# Começa do "base" para construir o app
FROM base AS builder
# Recebe o nome do app para o build
ARG APP_NAME
RUN npx nest build $APP_NAME

# --- Estágio 4: Production (Final) ---
# Este é o seu antigo "runner".
# Imagem final enxuta para produção.
FROM node:20-alpine AS production
WORKDIR /usr/src/app

# Recebe o nome do app para copiar o build certo
ARG APP_NAME

COPY package.json package-lock.json ./
# Instala APENAS dependências de produção
RUN npm ci --omit=dev

# Copia o app compilado do estágio "builder"
COPY --from=builder /usr/src/app/dist/apps/$APP_NAME ./dist

CMD ["node", "dist/main.js"]