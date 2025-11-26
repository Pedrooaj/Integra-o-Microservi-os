# Steam da Shopee
Uma monorepo em NestJS que implementa uma arquitetura de microserviços para gerenciar funcionalidade separadas (autenticação, usuários, jogos, comentários etc.). O repositório agrupa múltiplos serviços para facilitar desenvolvimento, testes e integração entre eles.

**Principais objetivos**: facilitar o desenvolvimento em equipes, permitir deploy independente de serviços e centralizar contratos (gRPC/protos) e esquemas do banco (Prisma).

**Arquitetura**
- Monorepo com múltiplos microserviços em `apps/`.
- Cada serviço é um app NestJS com seu próprio `prisma` (schema e migrations) e APIs HTTP/gRPC conforme necessário.
- Banco de dados gerenciado com Prisma + PostgreSQL.
- Docker + `docker-compose.yml` para orquestração local.

<img width="2146" height="1892" alt="Arq-MS-STEAM-SHOPEE" src="https://github.com/user-attachments/assets/506c0a15-cbf1-4a96-874c-c6a89b69e46d" />

**Serviços (em `apps/`)**
- `authentication`: login, registro e validação (gRPC/REST). Contém `proto/auth.proto`.
- `users`: gerencia usuários (API e banco) — (pasta `users/`).
- `games`: endpoints e lógica de jogos (`apps/games`).
- `comments`: endpoints para comentários relacionados aos jogos (`apps/comments`).

Tecnologias usadas
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker / docker-compose

Arquivos importantes
- `docker-compose.yml` — define serviços e infraestrutura para rodar localmente.
- `Dockerfile` — imagem base para containers.
- `API_PAYLOADS.md` — exemplos de payloads das APIs.
- `apps/*/prisma` — schemas e migrations do Prisma por serviço.
- `apps/*/proto` — arquivos .proto usados para gRPC.

Começando (Desenvolvimento local)
1. Pré-requisitos
	- Node.js (v18+ recomendado)
	- npm ou yarn
	- Docker & docker-compose (para rodar PostgreSQL e dependências mais facilmente)

2. Instalar dependências (raiz ou por app)
	- Na raiz do projeto (monorepo), execute:

	  ```bash
	  npm install
	  ```

	- Alternativa: instalar por serviço

	  ```bash
	  cd apps/<service>
	  npm install
	  ```

3. Variáveis de ambiente
	- Crie um arquivo `.env` em cada serviço (ou na raiz, conforme sua configuração) com pelo menos:

	  ```env
	  DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
	  PORT=3000
	  ```

	- Ajuste conforme necessário para cada serviço (por exemplo, portas diferentes).

4. Rodar infra com Docker (opcional/recomendado)

	```bash
	docker-compose up -d
	```

	Isso inicializa o banco PostgreSQL e outros serviços definidos no `docker-compose.yml`.

5. Preparar o Prisma para cada serviço
	- Gerar client e aplicar migrations:

	  ```bash
	  cd apps/<service>
	  npx prisma generate --schema=prisma/schema.prisma
	  npx prisma migrate deploy --schema=prisma/schema.prisma
	  # ou em ambiente dev
	  npx prisma migrate dev --schema=prisma/schema.prisma --name init
	  ```

6. Rodar um serviço em modo dev

	```bash
	cd apps/<service>
	npm run start:dev
	```

	Ou, se o monorepo tiver scripts na raiz, use-os conforme apropriado.

gRPC / Protobuf
- Os arquivos `.proto` estão em `apps/*/proto` (por exemplo `apps/authentication/proto/auth.proto`).
- Gerar clientes gRPC se necessário usando as ferramentas de sua escolha (protoc, ts-proto, @grpc/grpc-js, etc.).

Scripts úteis
- `docker-compose up -d` — sobe infra local (Postgres, etc.).
- `npx prisma migrate dev` — aplica migrations em ambiente dev e atualiza Client.
- `npx prisma generate` — gera Prisma Client.
- `npm run start:dev` — inicia serviço NestJS em modo dev.

Testes
- Cada app possui uma pasta `test` com configurações de e2e (Jest). Execute testes por serviço:

  ```bash
  cd apps/<service>
  npm run test
  npm run test:e2e
  ```

Docker e deploy
- Use `Dockerfile` no root (ou em cada serviço) para criar imagens.
- `docker-compose.yml` já contém a orquestração local; para produção, adapte para Kubernetes, Docker Swarm ou sua plataforma de escolha.

Boas práticas e observações
- Mantenha schemas do Prisma e migrations versionadas em `apps/<service>/prisma/migrations`.
- Centralize contratos (arquivos .proto) em cada serviço para tornar explícita a API gRPC entre serviços.
- Cada serviço pode expor REST e/ou gRPC conforme necessidade.

Arquivos de referência
- `API_PAYLOADS.md` — exemplos de payloads.
- `apps/*/prisma/migrations` — histórico do schema do banco.

Contribuição
- Abra uma issue descrevendo a feature/bug.
- Crie um branch com padrão `feat/<descrição>` ou `fix/<descrição>`.
- Faça testes locais e adicione/atualize migrations quando o schema mudar.
- Envie um Pull Request com descrição clara das mudanças.

Manutenção
- Autores/Contribuidores: @Pedrooaj, @Ianalas, @FabricioCrv

Licença
- Adicione a licença desejada ao repositório (por exemplo, `MIT`) se for público.

Problemas comuns
- Erro de conexão com o banco: verifique `DATABASE_URL` e se o container do Postgres está rodando.
- Erro do Prisma Client: execute `npx prisma generate` apontando para o `schema.prisma` correto.

Mais informações
- Para detalhes de payloads, veja `API_PAYLOADS.md`.
- Para ver os contratos gRPC, veja `apps/*/proto`.

---
_README gerado automaticamente com base na estrutura do repositório._