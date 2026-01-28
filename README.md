
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

## Project Description

Mini CRM Backend built with **NestJS**, **PostgreSQL**, and **Prisma ORM**.  
Features include:

- JWT Authentication with **ADMIN** and **EMPLOYEE** roles  
- Users, Customers, and Tasks modules  
- Role-based access control  
- CRUD operations, pagination, search  
- Swagger API documentation  
- Docker support with PostgreSQL  

---

## Environment Variables

Copy `.env.example` to `.env` and update values:

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=mini_crm

# Prisma
DATABASE_URL=postgresql://postgres:postgres@db:5432/mini_crm?schema=public

# JWT
JWT_SECRET=supersecretkey

# Application
PORT=3000
````

---

## Project Setup

Install dependencies:

```bash
$ npm install
```

---

## Docker Setup (Recommended)

Start backend + PostgreSQL via Docker:

```bash
$ docker-compose up --build
```

Prisma migrations (inside container):

```bash
# Open shell in app container
docker exec -it mini-crm-app sh

# Run migrations
npx prisma migrate dev
```

---

## Database Migration (Prisma)

Generate Prisma client and apply migrations:

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name init
```

---

## Running the Server

```bash
# Development mode (with hot reload)
$ npm run start:dev

# Production mode
$ npm run start:prod

# Default port
http://localhost:3000
```

---

## Swagger API Documentation

Once server is running, access Swagger UI at:

```
http://localhost:3000/api
```

Swagger allows testing endpoints with JWT authentication.

---

## Running Tests

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

---

## Curl Commands / Postman Collection

A complete **Postman collection** is available in the repository:

* `MiniCRM.postman_collection.json`
* Includes **Auth, Users, Customers, Tasks** endpoints
* Supports JWT token authentication

Example `curl` for login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"StrongPassword1!"}'
```

---

## Deployment
```bash
https://minicrm-ffua.onrender.com
```