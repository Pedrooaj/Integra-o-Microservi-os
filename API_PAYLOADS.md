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
  "description": "An open-world RPG with amazing story and characters",
  "genres": ["RPG", "Action", "Adventure"],
  "releaseDate": "2015-05-19T00:00:00.000Z",
  "developer": "CD Projekt Red",
  "rating": 9.5,
  "price": 59.99
}
```

---

#### 2. Get All Games
**Method:** `GET /games`

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "The Witcher 3",
    "description": "An open-world RPG with amazing story and characters",
    "genres": ["RPG", "Action", "Adventure"],
    "releaseDate": "2015-05-19T00:00:00.000Z",
    "developer": "CD Projekt Red",
    "rating": 9.5,
    "price": 59.99
  },
  {
    "id": 2,
    "title": "Cyberpunk 2077",
    "description": "A futuristic action RPG",
    "genres": ["RPG", "Action", "Sci-Fi"],
    "releaseDate": "2020-12-10T00:00:00.000Z",
    "developer": "CD Projekt Red",
    "rating": 7.8,
    "price": 49.99
  }
]
```

---

#### 3. Get Game by ID
**Method:** `GET /games/:id`

**Example:** `GET /games/1`

**Response (200):**
```json
{
  "id": 1,
  "title": "The Witcher 3",
  "description": "An open-world RPG with amazing story and characters",
  "genres": ["RPG", "Action", "Adventure"],
  "releaseDate": "2015-05-19T00:00:00.000Z",
  "developer": "CD Projekt Red",
  "rating": 9.5,
  "price": 59.99
}
```

---

#### 4. Update Game
**Method:** `PUT /games/:id`

**Example:** `PUT /games/1`

**Request Body:**
```json
{
  "title": "The Witcher 3: Wild Hunt",
  "rating": 9.7,
  "price": 39.99
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "The Witcher 3: Wild Hunt",
  "description": "An open-world RPG with amazing story and characters",
  "genres": ["RPG", "Action", "Adventure"],
  "releaseDate": "2015-05-19T00:00:00.000Z",
  "developer": "CD Projekt Red",
  "rating": 9.7,
  "price": 39.99
}
```

---

#### 5. Delete Game
**Method:** `DELETE /games/:id`

**Example:** `DELETE /games/1`

**Response (200):**
```json
{
  "message": "Game with ID 1 has been deleted."
}
```

---

## 👥 USERS SERVICE

### REST API (PORT 3002)

#### 1. Create User
**Method:** `POST /users`

**Request Body:**
```json
{
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Passionate gamer and collector",
  "country": "Brazil"
}
```

**Response (201):**
```json
{
  "id": 1,
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Passionate gamer and collector",
  "level": 1,
  "experience": 0,
  "country": "Brazil",
  "createdAt": "2025-11-22T21:45:00.000Z",
  "updatedAt": "2025-11-22T21:45:00.000Z"
}
```

---

#### 2. Get All Users
**Method:** `GET /users`

**Response (200):**
```json
[
  {
    "id": 1,
    "nickname": "player_pro",
    "avatarUrl": "https://example.com/avatars/player.jpg",
    "realName": "João Silva",
    "bio": "Passionate gamer and collector",
    "level": 1,
    "experience": 0,
    "country": "Brazil",
    "createdAt": "2025-11-22T21:45:00.000Z",
    "updatedAt": "2025-11-22T21:45:00.000Z"
  },
  {
    "id": 2,
    "nickname": "gamer_king",
    "avatarUrl": "https://example.com/avatars/king.jpg",
    "realName": "Maria Santos",
    "bio": null,
    "level": 5,
    "experience": 500,
    "country": "Portugal",
    "createdAt": "2025-11-22T20:30:00.000Z",
    "updatedAt": "2025-11-22T20:30:00.000Z"
  }
]
```

---

#### 3. Get User by ID
**Method:** `GET /users/:id`

**Example:** `GET /users/1`

**Response (200):**
```json
{
  "id": 1,
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Passionate gamer and collector",
  "level": 1,
  "experience": 0,
  "country": "Brazil",
  "createdAt": "2025-11-22T21:45:00.000Z",
  "updatedAt": "2025-11-22T21:45:00.000Z"
}
```

---

#### 4. Update User
**Method:** `PATCH /users/:id`

**Example:** `PATCH /users/1`

**Request Body:**
```json
{
  "level": 3,
  "experience": 250,
  "bio": "Updated bio"
}
```

**Response (200):**
```json
{
  "id": 1,
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Updated bio",
  "level": 3,
  "experience": 250,
  "country": "Brazil",
  "createdAt": "2025-11-22T21:45:00.000Z",
  "updatedAt": "2025-11-22T21:50:00.000Z"
}
```

---

#### 5. Delete User
**Method:** `DELETE /users/:id`

**Example:** `DELETE /users/1`

**Response (200):**
```json
{}
```

---

## 📡 gRPC API

### Users Service (PORT 50052)

#### 1. CreateUser RPC

**Request:**
```json
{
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Passionate gamer and collector",
  "country": "Brazil"
}
```

**Response:**
```json
{
  "id": 1,
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Passionate gamer and collector",
  "level": 1,
  "experience": 0,
  "country": "Brazil",
  "createdAt": "2025-11-22T21:45:00Z",
  "updatedAt": "2025-11-22T21:45:00Z"
}
```

---

#### 2. FindAll RPC

**Request:**
```json
{}
```

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "nickname": "player_pro",
      "avatarUrl": "https://example.com/avatars/player.jpg",
      "realName": "João Silva",
      "bio": "Passionate gamer and collector",
      "level": 1,
      "experience": 0,
      "country": "Brazil",
      "createdAt": "2025-11-22T21:45:00Z",
      "updatedAt": "2025-11-22T21:45:00Z"
    },
    {
      "id": 2,
      "nickname": "gamer_king",
      "avatarUrl": "https://example.com/avatars/king.jpg",
      "realName": "Maria Santos",
      "bio": null,
      "level": 5,
      "experience": 500,
      "country": "Portugal",
      "createdAt": "2025-11-22T20:30:00Z",
      "updatedAt": "2025-11-22T20:30:00Z"
    }
  ]
}
```

---

#### 3. FindOne RPC

**Request:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "id": 1,
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Passionate gamer and collector",
  "level": 1,
  "experience": 0,
  "country": "Brazil",
  "createdAt": "2025-11-22T21:45:00Z",
  "updatedAt": "2025-11-22T21:45:00Z"
}
```

---

#### 4. UpdateUser RPC

**Request:**
```json
{
  "id": 1,
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Updated bio",
  "country": "Brazil"
}
```

**Response:**
```json
{
  "id": 1,
  "nickname": "player_pro",
  "avatarUrl": "https://example.com/avatars/player.jpg",
  "realName": "João Silva",
  "bio": "Updated bio",
  "level": 1,
  "experience": 0,
  "country": "Brazil",
  "createdAt": "2025-11-22T21:45:00Z",
  "updatedAt": "2025-11-22T21:50:00Z"
}
```

---

#### 5. RemoveUser RPC

**Request:**
```json
{
  "id": 1
}
```

**Response:**
```json
{}
```

---

## 🔧 Como Testar com cURL (REST)

### Games
```bash
# Create Game
curl -X POST http://localhost:3000/games \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Witcher 3",
    "description": "An open-world RPG",
    "genres": ["RPG", "Action"],
    "releaseDate": "2015-05-19",
    "developer": "CD Projekt Red",
    "rating": 9.5,
    "price": 59.99
  }'

# Get All Games
curl http://localhost:3000/games

# Get Game by ID
curl http://localhost:3000/games/1

# Update Game
curl -X PUT http://localhost:3000/games/1 \
  -H "Content-Type: application/json" \
  -d '{"rating": 9.7}'

# Delete Game
curl -X DELETE http://localhost:3000/games/1
```

### Users
```bash
# Create User
curl -X POST http://localhost:3002/users \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "player_pro",
    "avatarUrl": "https://example.com/avatars/player.jpg",
    "realName": "João Silva",
    "bio": "Passionate gamer",
    "country": "Brazil"
  }'

# Get All Users
curl http://localhost:3002/users

# Get User by ID
curl http://localhost:3002/users/1

# Update User
curl -X PATCH http://localhost:3002/users/1 \
  -H "Content-Type: application/json" \
  -d '{"level": 3, "experience": 250}'

# Delete User
curl -X DELETE http://localhost:3002/users/1
```

---

## 🔧 Como Testar gRPC

### Usar grpcurl (CLI tool)

```bash
# Instalar grpcurl
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

# CreateUser
grpcurl -plaintext -d '{"nickname":"player_pro","realName":"João"}' \
  localhost:50052 users.UsersService.CreateUser

# FindAll
grpcurl -plaintext -d '{}' \
  localhost:50052 users.UsersService.FindAll

# FindOne
grpcurl -plaintext -d '{"id":1}' \
  localhost:50052 users.UsersService.FindOne

# UpdateUser
grpcurl -plaintext -d '{"id":1,"nickname":"updated_nick"}' \
  localhost:50052 users.UsersService.UpdateUser

# RemoveUser
grpcurl -plaintext -d '{"id":1}' \
  localhost:50052 users.UsersService.RemoveUser
```

---

## 📊 Resumo de Endpoints

### Games (REST) - PORT 3000
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /games | Criar jogo |
| GET    | /games | Listar todos os jogos |
| GET    | /games/:id | Obter jogo por ID |
| PUT    | /games/:id | Atualizar jogo |
| DELETE | /games/:id | Deletar jogo |

### Users (REST) - PORT 3002
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /users | Criar usuário |
| GET    | /users | Listar todos os usuários |
| GET    | /users/:id | Obter usuário por ID |
| PATCH  | /users/:id | Atualizar usuário |
| DELETE | /users/:id | Deletar usuário |

### Users (gRPC) - PORT 50052
| RPC | Descrição |
|-----|-----------|
| CreateUser | Criar usuário |
| FindAll | Listar todos os usuários |
| FindOne | Obter usuário por ID |
| UpdateUser | Atualizar usuário |
| RemoveUser | Deletar usuário |
