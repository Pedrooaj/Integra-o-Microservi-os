# API Payloads - Games e Users

## 🎮 GAMES SERVICE

### REST API (PORT 3000)

#### 1. Create Game
**Method:** `POST /games`

**Request Body:**
```json
{
  "title": "The Witcher 3",
  "description": "An open-world RPG with amazing story and characters",
  "genres": ["RPG", "Action", "Adventure"],
  "releaseDate": "2015-05-19",
  "developer": "CD Projekt Red",
  "rating": 9.5,
  "price": 59.99
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "The Witcher 3",
  # API Payloads - Serviços

  Este arquivo descreve os endpoints REST e RPC (gRPC) disponíveis no monorepo, com exemplos de request/response e comandos `curl`/`grpcurl`.

  Observação: alguns endpoints exigem cabeçalho `Authorization: Bearer <token>` (ex.: criação de usuário pela API interna). Ajuste URLs/ports conforme sua configuração local.

  ## 🎮 Games Service

  Base REST (ex.: `http://localhost:3000`)

  ### 1) Criar Jogo
  Method: `POST /games`

  Request body (JSON):
  ```json
  {
    "title": "The Witcher 3",
    "description": "Um RPG de mundo aberto com ótima história",
    "genres": ["RPG", "Action", "Adventure"],
    "releaseDate": "2015-05-19T00:00:00.000Z",
    "developer": "CD Projekt Red",
    "rating": 9.5,
    "price": 59.99
  }
  ```

  Response (exemplo): objeto do jogo criado (ID, timestamps conforme implementação).

  ### 2) Listar jogos
  Method: `GET /games`

  Response: array de jogos.

  ### 3) Obter jogo por ID
  Method: `GET /games/:id`

  Response: objeto do jogo.

  ### 4) Atualizar jogo
  Method: `PUT /games/:id`

  Request body: campos parciais ou completos (`CreateGameDto` usado para validação). Exemplo:
  ```json
  {
    "title": "The Witcher 3: Wild Hunt",
    "rating": 9.7,
    "price": 39.99
  }
  ```

  ### 5) Deletar jogo
  Method: `DELETE /games/:id`

  Response (exemplo):
  ```json
  { "message": "Game with ID 1 has been deleted." }
  ```

  gRPC
  - RPC `FindOneGame` expõe busca por ID (aceita `{ id: bigint }`).

  ---

  ## 👥 Users Service

  Base REST (ex.: `http://localhost:3002`)

  > Observação: o endpoint `POST /users` (no controller atual) espera um header `Authorization` e valida o token antes de criar o usuário.

  ### 1) Criar usuário
  Method: `POST /users`

  Headers:
  - `Authorization: Bearer <token>` (obrigatório conforme `UsersController`)

  Request body (JSON `CreateUserDto`):
  ```json
  {
    "nickname": "player_pro",
    "avatarUrl": "https://example.com/avatars/player.jpg",
    "realName": "João Silva",
    "bio": "Gamer apaixonado",
    "country": "Brazil"
  }
  ```

  Response (exemplo): objeto do usuário criado com `id`, `level`, `experience`, timestamps.

  ### 2) Listar usuários
  Method: `GET /users`

  Response: array de usuários.

  ### 3) Obter usuário por ID
  Method: `GET /users/:id`

  Response: objeto do usuário.

  ### 4) Atualizar usuário
  Method: `PATCH /users/:id`

  Request body (parcial, `UpdateUserDto`):
  ```json
  {
    "level": 3,
    "experience": 250,
    "bio": "Bio atualizada"
  }
  ```

  ### 5) Deletar usuário
  Method: `DELETE /users/:id`

  Response: geralmente `{}` quando removido com sucesso.

  gRPC (Users)
  - Métodos esperados (conforme protos): `CreateUser`, `FindAll`, `FindOne`, `UpdateUser`, `RemoveUser`.
  - Payloads similares às estruturas JSON acima (IDs numéricos conforme proto).

  ---

  ## 🔐 Authentication Service

  Base REST (ex.: `http://localhost:3001`)

  ### 1) Registro (REST + gRPC)
  Method: `POST /register`

  Request body (`RegisterDto`):
  ```json
  {
    "name": "João",
    "email": "joao@example.com",
    "password": "suaSenhaSecreta"
  }
  ```

  Response (exemplo): pode retornar o usuário criado ou token, conforme implementação do `AuthenticationService`.

  ### 2) Login (REST + gRPC)
  Method: `POST /login`

  Request body (`LoginDto`):
  ```json
  {
    "email": "joao@example.com",
    "password": "suaSenhaSecreta"
  }
  ```

  Response (exemplo):
  ```json
  {
    "accessToken": "<jwt>",
    "user": { "id": 1, "email": "joao@example.com", "name": "João" }
  }
  ```

  ### 3) Validate (REST + gRPC)
  Method: `POST /validate` (REST: envia token no header `Authorization`)

  REST: enviar header `Authorization: Bearer <token>`; o controller extrai o token e chama `validate`.

  gRPC: `Validate` recebe `{ token: string }`.

  Response: validação do token (ex.: `{ valid: true, userId: '...' }` ou dados do usuário).

  ---

  ## 💬 Comments Service

  Base REST (ex.: `http://localhost:3003`)

  DTO importante: `CreateCommentDto` (campos obrigatórios/validados)
  - `description` (string, 1-500)
  - `timePlayed` (number, minutos, >=0)
  - `gameId` (string / bigint)
  - `userId` (string)

  ### 1) Criar comentário
  Method: `POST /comments`

  Request body:
  ```json
  {
    "description": "Muito divertido, joguei por horas!",
    "timePlayed": 120,
    "gameId": "123456789012345678",
    "userId": "user-uuid-or-id"
  }
  ```

  ### 2) Listar comentários
  Method: `GET /comments`

  Query params suportados:
  - `gameId` (filtrar por jogo)
  - `userId` (filtrar por usuário)

  Exemplo: `GET /comments?gameId=123456789012345678`

  ### 3) Obter comentário por ID
  Method: `GET /comments/:id`

  O controller converte `id` para `BigInt` internamente.

  ### 4) Atualizar comentário
  Method: `PATCH /comments/:id`

  Request body (exemplo - `UpdateCommentDto` é parcial):
  ```json
  {
    "description": "Atualizei a avaliação",
    "timePlayed": 130
  }
  ```

  ### 5) Deletar comentário
  Method: `DELETE /comments/:id`

  gRPC (Comments)
  - Métodos implementados no controller: `CreateComment`, `FindAll`, `FindOne`, `FindByGame`, `FindByUser`, `UpdateComment`, `RemoveComment`.
  - Exemplos de payloads gRPC coincidem com os JSON acima (usar `id` como bigint onde aplicável).

  ---

  ## 🔧 Exemplos Rápidos (cURL e grpcurl)

  ### cURL (REST)

  Criar jogo:
  ```bash
  curl -X POST http://localhost:3000/games \
    -H "Content-Type: application/json" \
    -d '{
      "title": "The Witcher 3",
      "description": "Um RPG de mundo aberto",
      "genres": ["RPG", "Action"],
      "releaseDate": "2015-05-19T00:00:00.000Z",
      "developer": "CD Projekt Red",
      "rating": 9.5,
      "price": 59.99
    }'
  ```

  Criar comentário:
  ```bash
  curl -X POST http://localhost:3003/comments \
    -H "Content-Type: application/json" \
    -d '{
      "description": "Ótimo jogo!",
      "timePlayed": 90,
      "gameId": "123456789012345678",
      "userId": "user-123"
    }'
  ```

  Criar usuário (requere Authorization header):
  ```bash
  curl -X POST http://localhost:3002/users \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <token>" \
    -d '{
      "nickname": "player_pro",
      "avatarUrl": "https://example.com/avatars/player.jpg",
      "realName": "João Silva",
      "bio": "Gamer",
      "country": "Brazil"
    }'
  ```

  ### grpcurl (gRPC)

  Instalar grpcurl:
  ```bash
  go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
  ```

  Exemplo: validar token via gRPC (AuthService.Validate):
  ```bash
  grpcurl -plaintext -d '{"token":"<jwt>"}' localhost:50051 AuthService.Validate
  ```

  Criar comentário via gRPC (CommentsService.CreateComment):
  ```bash
  grpcurl -plaintext -d '{"description":"Ótimo jogo","timePlayed":60,"gameId":"123456789012345678","userId":"user-123"}' localhost:50053 CommentsService.CreateComment
  ```

  ---

  ## 📝 Observações finais e próximos passos
  - Confirme as portas de cada serviço no `apps/*/main.ts` e em `docker-compose.yml` para garantir que os exemplos (`3000`, `3001`, `3002`, `3003`, `5005x`) batem com sua configuração local.
  - Posso:
    - padronizar portas no `README.md` e neste arquivo;
    - gerar README por serviço (`apps/games/README.md`, `apps/comments/README.md`, etc.);
    - gerar exemplos de `.env.example` para cada serviço.

  _Arquivo gerado a partir da análise dos controllers e DTOs presentes no repositório._
      "experience": 0,
