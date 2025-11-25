FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM development AS build

ARG APP_NAME
ENV APP_NAME=${APP_NAME}


RUN npx prisma generate --schema=apps/${APP_NAME}/prisma/schema.prisma


# Gera o Prisma Client antes do build 
RUN npm run build ${APP_NAME}

FROM node:20-alpine AS production

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

WORKDIR /usr/src/app

COPY package*.json ./



# Copia a pasta prisma do app específico para raiz do container de produção
COPY --from=build /usr/src/app/apps/${APP_NAME}/prisma ./prisma

#Instala apenas as dependências de produção
RUN npm install --only=production


# Gera o Prisma client no ambiente de Produção
RUN npx prisma generate

COPY --from=build /usr/src/app/dist/apps/${APP_NAME} ./dist

CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node dist/main.js"]