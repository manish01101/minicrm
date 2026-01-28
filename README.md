<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).



---
---
---
## testing with curl

## **1 Auth Module Testing**

### **1.1 Register Admin User**

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "password123",
  "role": "ADMIN"
}'
```

**Expected Response:**

```json
{
  "id": 1,
  "name": "Admin User",
  "email": "admin@test.com",
  "role": "ADMIN"
}
```

---

### **1.2 Login Admin User**

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@test.com",
  "password": "password123"
}'
```

**Expected Response:**

```json
{
  "accessToken": "YOUR_JWT_TOKEN_HERE",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "ADMIN"
  }
}
```

> Copy `accessToken` — you’ll use it for all Users module requests.

---

## 2.Users Module Testing (ADMIN only)

> **Important:** All requests must include:
> `-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"`

---

### **2.1 Create a new user**

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2OTYwNDc3OSwiZXhwIjoxNzY5NjkxMTc5fQ.W6qZoy29EMshvk6qW-c681kiYcE5lUt9MLyPRihWMPI" \
-d '{
  "name": "Test User",
  "email": "testuser23@test.com",
  "password": "password123",
  "role": "ADMIN"
}'
```

**Response:**

```json
{
  "id": 2,
  "name": "Test User",
  "email": "testuser@test.com",
  "role": "USER"
}
```

---

### **2.2 List all users**

```bash
curl -X GET http://localhost:3000/users \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2OTYwNDc3OSwiZXhwIjoxNzY5NjkxMTc5fQ.W6qZoy29EMshvk6qW-c681kiYcE5lUt9MLyPRihWMPI"
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "ADMIN"
  },
  {
    "id": 2,
    "name": "Test User",
    "email": "testuser@test.com",
    "role": "USER"
  }
]
```

---

### **2.3 Get a single user**

```bash
curl -X GET http://localhost:3000/users/2 \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**

```json
{
  "id": 2,
  "name": "Test User",
  "email": "testuser@test.com",
  "role": "USER"
}
```

---

### **2.4 Update a user**

```bash
curl -X PATCH http://localhost:3000/users/2 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2OTYwMDg1MywiZXhwIjoxNzY5Njg3MjUzfQ.0QFATjMwhn1oEEY87cdqkra5n9wdrm5We5AyXxuYBOU" \
-d '{
  "name": "Updated User",
  "role": "ADMIN"
}'
```

**Response:**

```json
{
  "id": 2,
  "name": "Updated User",
  "email": "testuser@test.com",
  "role": "USER"
}
```

> Password can also be updated; it will be hashed automatically.

---

### **2.5 Delete a user**

```bash
curl -X DELETE http://localhost:3000/users/2 \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**

```json
{
  "id": 2,
  "name": "Updated User",
  "email": "testuser@test.com",
  "role": "USER"
}
```

---

### **2.6 Test JWT & Roles Guard**

* **Without token:** should return `401 Unauthorized`
* **Non-ADMIN token:** should return `403 Forbidden`
* **Admin token:** full access

---
**Postman**:

1. POST `/auth/login` → get token
2. Create a **Bearer Token** in Authorization tab
3. Test all `/users` endpoints using JSON body

---

`curl` commands** for **all Customers module endpoints**
* **POST /customers** → ADMIN only
* **GET /customers** → ADMIN + EMPLOYEE
* **GET /customers/:id** → ADMIN + EMPLOYEE
* **PATCH /customers/:id** → ADMIN only
* **DELETE /customers/:id** → ADMIN only
* Include **JWT Authorization**

---
### **Create a customer (ADMIN only)**

```bash
curl -X POST http://localhost:3000/customers \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2OTYwNDc3OSwiZXhwIjoxNzY5NjkxMTc5fQ.W6qZoy29EMshvk6qW-c681kiYcE5lUt9MLyPRihWMPI" \
-d '{
  "name": "Acme Corp",
  "email": "contact1234@acme.com",
  "phone": "1234567777"
}'
```

**Expected response:**

```json
{
  "id": 1,
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "1234567890"
}
```

> Duplicate email or phone → `409 Conflict`

---

### **4. Get customers list (ADMIN + EMPLOYEE)**

```bash
curl -X GET "http://localhost:3000/customers?page=1&limit=10" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2OTYwNDc3OSwiZXhwIjoxNzY5NjkxMTc5fQ.W6qZoy29EMshvk6qW-c681kiYcE5lUt9MLyPRihWMPI"
```

Or with employee token:

```bash
-H "Authorization: Bearer EMPLOYEE_JWT_TOKEN"
```

**Response:**

```json
{
  "data": [
    { "id": 1, "name": "Acme Corp", "email": "contact@acme.com", "phone": "1234567890" }
  ],
  "page": 1,
  "limit": 10,
  "totalRecords": 1,
  "totalPages": 1
}
```

---

### **5. Get a single customer (ADMIN + EMPLOYEE)**

```bash
curl -X GET http://localhost:3000/customers/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2OTYwNDc3OSwiZXhwIjoxNzY5NjkxMTc5fQ.W6qZoy29EMshvk6qW-c681kiYcE5lUt9MLyPRihWMPI"
```

Or with employee token:

```bash
-H "Authorization: Bearer EMPLOYEE_JWT_TOKEN"
```

**Response:**

```json
{
  "id": 1,
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "1234567890"
}
```

> Invalid ID → `404 Not Found`

---

### **6. Update customer (ADMIN only)**

```bash
curl -X PATCH http://localhost:3000/customers/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2OTYwNDc3OSwiZXhwIjoxNzY5NjkxMTc5fQ.W6qZoy29EMshvk6qW-c681kiYcE5lUt9MLyPRihWMPI" \
-d '{
  "name": "Acme Corporation",
  "phone": "0987654321"
}'
```

**Response:**

```json
{
  "id": 1,
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "phone": "0987654321"
}
```

> Non-admin token → `403 Forbidden`
> Duplicate email/phone → `409 Conflict`

---

### **7. Delete customer (ADMIN only)**

```bash
curl -X DELETE http://localhost:3000/customers/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2OTYwNDc3OSwiZXhwIjoxNzY5NjkxMTc5fQ.W6qZoy29EMshvk6qW-c681kiYcE5lUt9MLyPRihWMPI"
```

**Response:**

```json
{
  "id": 1,
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "phone": "0987654321"
}
```

> Non-admin → `403 Forbidden`
> Invalid ID → `404 Not Found`