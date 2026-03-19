<!-- Badges -->
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" alt="Docker Compose">
  <img src="https://img.shields.io/badge/Auth-JWT-F7DF1E?logo=jsonwebtokens&logoColor=black" alt="JWT">
  <img src="https://img.shields.io/badge/Security-bcryptjs-orange" alt="bcryptjs">
</p>

# NodeJS Auth Service

A simple and practical authentication service built with **Node.js**, **Express**, **PostgreSQL** and **Docker**.

The idea behind this project was pretty straightforward: build a clean backend foundation that covers the basics well — user registration, login, password hashing, protected routes, database integration and a setup that is easy to run locally.

It is not trying to be a huge framework or an overengineered boilerplate. It is a small service with real-world fundamentals, organized in a way that is easy to understand, test and evolve.

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Requirements](#requirements)
- [Getting the Project](#getting-the-project)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [Stopping the Project](#stopping-the-project)
- [Running without Docker](#running-without-docker)
- [Available Endpoints](#available-endpoints)
- [Recommended Test Flow](#recommended-test-flow)
- [Common Issues](#common-issues)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

---

## About

This service currently supports:

- user registration
- login with email and password
- password hashing with bcrypt
- JWT token generation
- protected routes with Bearer Token
- user listing for authenticated requests
- PostgreSQL integration
- containerized local execution with Docker Compose

It is a solid base for expanding into things like:

- role-based access control
- admin dashboard
- identity microservice
- frontend integration
- Swagger/OpenAPI docs
- automated tests
- layered architecture

---

## Tech Stack

### Backend
- Node.js
- Express

### Database
- PostgreSQL

### Security
- JSON Web Token (JWT)
- bcryptjs

### Infrastructure
- Docker
- Docker Compose

---

## Project Structure

```bash
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── .env
└── src
    ├── app.js
    ├── server.js
    ├── config
    │   └── db.js
    ├── middleware
    │   └── auth.js
    └── routes
        ├── auth.routes.js
        └── user.routes.js
```

---

## Features

### Authentication
- create user account
- login with email and password
- issue JWT token

### Users
- list authenticated users
- fetch user by id
- update user by id
- delete user by id

### Infrastructure
- automatic database connection
- automatic table initialization
- retry logic while database is starting
- Docker-based local environment

---

## Requirements

To run this project locally, you will need:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

> On newer Docker versions, Compose is already available through `docker compose`.

---

## Getting the Project

### Option 1 — Clone from GitHub

```bash
git clone https://github.com/fabricioandrad/NodeJS-Auth-Service.git
cd NodeJS-Auth-Service
```

### Option 2 — Download the ZIP

1. Open the repository on GitHub
2. Click on **Code**
3. Click on **Download ZIP**
4. Extract the files
5. Open the project folder in your terminal

Example:

```bash
unzip NodeJS-Auth-Service.zip
cd NodeJS-Auth-Service
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=authdb
JWT_SECRET=segredo_super_forte
```

If the `.env` file already exists in the project, you can keep it as is for local development.

---

## Running with Docker

From the project root, run:

```bash
docker compose up --build
```

If everything is working correctly, you should see something close to:

```bash
🟢 Banco conectado!
🚀 Server running on port 3000
```

After that, the API should be available at:

```bash
http://localhost:3000
```

If you are using **GitHub Codespaces** or another remote development environment, open the forwarded port provided by the platform.

---

## Stopping the Project

To stop the running containers:

```bash
CTRL + C
```

To remove containers and network:

```bash
docker compose down
```

To remove containers, network and volumes:

```bash
docker compose down -v
```

---

## Running without Docker

If you want to run the project without containers:

### 1. Install dependencies

```bash
npm install
```

### 2. Update the `.env`

Use your local database host, for example:

```env
DB_HOST=localhost
```

### 3. Make sure PostgreSQL is running locally

Create a database with the same name used in the `.env` file:

```env
DB_NAME=authdb
```

### 4. Start the application

```bash
npm start
```

---

## Available Endpoints

### Base Routes

#### `GET /`
Returns a simple message showing that the API is running.

**Response**
```json
{
  "message": "Auth API is running"
}
```

#### `GET /health`
Returns the health status of the application.

**Response**
```json
{
  "status": "ok"
}
```

---

### Authentication

#### `POST /auth/register`
Creates a new user.

**Request body**
```json
{
  "name": "Fabricio",
  "email": "fabricio@email.com",
  "password": "123456"
}
```

**Expected response**
```json
{
  "id": 1,
  "name": "Fabricio",
  "email": "fabricio@email.com"
}
```

---

#### `POST /auth/login`
Authenticates a user and returns a JWT token.

**Request body**
```json
{
  "email": "fabricio@email.com",
  "password": "123456"
}
```

**Expected response**
```json
{
  "token": "SEU_TOKEN_AQUI"
}
```

---

### Protected User Routes

All routes below require a Bearer Token.

**Required header**
```http
Authorization: Bearer SEU_TOKEN_AQUI
```

#### `GET /users`
Returns all users.

**Example response**
```json
[
  {
    "id": 1,
    "name": "Fabricio",
    "email": "fabricio@email.com"
  }
]
```

#### `GET /users/:id`
Returns one user by id.

**Example**
```http
GET /users/1
```

#### `PUT /users/:id`
Updates a user.

**Request body**
```json
{
  "name": "Novo Nome",
  "email": "novo@email.com"
}
```

#### `DELETE /users/:id`
Deletes a user.

---

## Recommended Test Flow

### 1. Check if the API is online

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
```

### 2. Register a user

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Fabricio","email":"fabricio@email.com","password":"123456"}'
```

### 3. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fabricio@email.com","password":"123456"}'
```

### 4. Copy the returned token and call a protected route

```bash
curl http://localhost:3000/users \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## Common Issues

### `ECONNREFUSED 5432`
This usually means the application tried to connect to PostgreSQL before the database was fully ready.

**What to check**
- wait a few seconds and try again
- confirm the database container is running
- confirm your environment variables are correct
- verify the retry logic is enabled in `server.js`

---

### `Cannot GET /` or `Cannot GET /health`
These routes are only available if they were added in `src/app.js`.

If you are seeing this message, check whether your current version includes:

```javascript
app.get("/", (req, res) => {
  res.json({ message: "Auth API is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
```

---

### Docker warning: `the attribute version is obsolete`
This warning comes from the `docker-compose.yml` file and does not stop the project from running.

You can safely remove this line:

```yml
version: "3.9"
```

---

### Port 3000 already in use
If port `3000` is already being used on your machine, change the mapping in `docker-compose.yml`:

```yml
ports:
  - "3001:3000"
```

Then access the app at:

```bash
http://localhost:3001
```

---

## Roadmap

Some improvements that would make this project more production-ready:

- request validation with Zod or Joi
- Swagger/OpenAPI documentation
- automated tests
- layered architecture
- refresh token flow
- role-based authorization
- pagination
- structured logs
- CI/CD pipeline

---

## Author

**Fabricio Andrade**

- GitHub: [@fabricioandrad](https://github.com/fabricioandrad)
- LinkedIn: [fabricioandradelima1](https://www.linkedin.com/in/fabricioandradelima1/)

---

## License

This project is available for study, adaptation and further improvement.
