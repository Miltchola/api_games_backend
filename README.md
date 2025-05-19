
# 🛡️ Backend Express + MongoDB com Autenticação JWT

Este projeto é uma aplicação backend desenvolvida com **Node.js**, **Express** e **MongoDB**, estruturada em camadas e com autenticação de usuários via **JWT (JSON Web Token)**.

---

## 📁 Estrutura do Projeto

```
backend-express-mongodb/
├── api/
│   ├── controller/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── service/
├── requests/
│   ├── protected/
│   │── tasks/
│   └── user/
├── .env.example
├── docker-compose.yml
├── package.json
├── README.md
```

---

## 🚀 Funcionalidades

### 🔓 Rotas Públicas

- `POST /register` – Criação de novo usuário.
- `POST /login` – Autenticação e geração de token JWT.

### 🔐 Rotas Protegidas (JWT necessário no header `Authorization`)

#### ✅ Usuário

- `GET /protected` – Verifica se o token JWT é válido.

#### ✅ Tarefas (Tasks)

| Método | Rota              | Descrição                              |
|--------|-------------------|----------------------------------------|
| POST   | `/tasks`          | Cria nova tarefa para o usuário logado |
| GET    | `/tasks`          | Retorna todas as tarefas do usuário    |
| GET    | `/tasks/:id`      | Retorna uma tarefa específica          |
| PUT    | `/tasks/:id`      | Atualiza totalmente uma tarefa         |
| PATCH  | `/tasks/:id`      | Atualiza parcialmente uma tarefa       |
| DELETE | `/tasks/:id`      | Remove uma tarefa                      |

**Validações**: todos os campos passam por validações com `express-validator`.

---

## 👤 Modelo de Usuário

```js
{
  name: String,       // obrigatório
  email: String,      // obrigatório, único
  password: String    // obrigatório, armazenado como hash (não selecionável)
}
```

## 📋 Modelo de Tarefa

```js
{
  title: String,        // obrigatório, máx. 100 caracteres
  description: String,  // obrigatório, máx. 500 caracteres
  completed: Boolean,   // opcional, padrão false
  userId: ObjectId      // obrigatório, referencia o usuário
}
```

---

## 🔒 Segurança

- Senhas armazenadas com **bcrypt**
- Tokens gerados com **jsonwebtoken**
- Chaves e informações sensíveis são armazenadas via `.env`

---

## ⚙️ Scripts

```bash
npm run dev                   # Inicia servidor com nodemon
npm run start                 # Inicia com Docker
npm run generate-secret-key  # Gera chave secreta JWT aleatória
```

---

## 🧪 Requisições de Teste

A pasta `requests/` contém scripts `.sh` com comandos `curl` para testar a API. Exemplos incluídos:

### 📂 Registro e Login

- `POST_Register_User.sh`
- `POST_Login_User.sh`
- ...e variações com erros esperados

### 📂 Rota Protegida

- `GET_Protected_Valid_Token.sh`
- `GET_Protected_No_Token.sh`
- `GET_Protected_Invalid_Token.sh`

### 📂 Tarefas (JWT obrigatório)

- `POST_Create_Task.sh`
- `GET_All_User_Tasks.sh`
- `PUT_Update_Task.sh`
- `DELETE_Task.sh`

---

## 🌐 Hospedagem

A aplicação está disponível em ambiente de produção via [Vercel](https://backend-express-mongodb-one.vercel.app).

---

## 📽️ Demonstração em Vídeo

Assista à demonstração da aplicação funcionando localmente e em produção, com os testes sendo executados via terminal:

🔗 [Clique aqui para assistir ao vídeo](https://youtu.be/7AEkXUgWPQc)

🔗 [Clique aqui para assistir ao vídeo da nova funcionalidade de tarefas](https://youtu.be/19tDHZMzjKI)

---

## 📦 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **Bcrypt**
- **Dotenv**
- **Docker**
- **Curl**
- **express-validator**

---

🧑‍💻 Desenvolvido como atividade prática de backend com autenticação, persistência de dados no MongoDB e operações protegidas por JWT.
