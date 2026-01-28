## `curl` commands** for Mini CRM Backend 

## 1. **Authentication Module**

### Register a user (POST /auth/register)

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "StrongPassword1!",
    "role": "ADMIN"
  }'
```

### Login (POST /auth/login)

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "StrongPassword1!"
  }'
```

Response will include a JWT token:

```json
{
  "accessToken": "YOUR_JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

---

## 2. **Users Module (Admin only)**

> Use `$TOKEN` from login: `export TOKEN=YOUR_JWT_TOKEN`

### Get all users (GET /users)

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer $TOKEN"
```

### Get a user by ID (GET /users/:id)

```bash
curl -X GET http://localhost:3000/users/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Update user role (PATCH /users/:id)

```bash
curl -X PATCH http://localhost:3000/users/2 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "EMPLOYEE"}'
```

---

## 3. **Customers Module**

### Create a customer (POST /customers – Admin only)

```bash
curl -X POST http://localhost:3000/customers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corp",
    "email": "acme@example.com",
    "phone": "1234567890",
    "company": "Acme Co"
  }'
```

### Get all customers (GET /customers)

```bash
curl -X GET "http://localhost:3000/customers?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

### Search customers (GET /customers?search=term)

```bash
curl -X GET "http://localhost:3000/customers?search=Acme" \
  -H "Authorization: Bearer $TOKEN"
```

### Get a customer by ID (GET /customers/:id)

```bash
curl -X GET http://localhost:3000/customers/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Update a customer (PATCH /customers/:id – Admin only)

```bash
curl -X PATCH http://localhost:3000/customers/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "0987654321",
    "company": "Acme Updated Co"
  }'
```

### Delete a customer (DELETE /customers/:id – Admin only)

```bash
curl -X DELETE http://localhost:3000/customers/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 4. **Tasks Module**

### Create a task (POST /tasks – Admin only)

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Follow up with client",
    "description": "Call to discuss contract details",
    "assignedTo": 2,
    "customerId": 1,
    "status": "PENDING"
  }'
```

### Get tasks (GET /tasks)

```bash
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer $TOKEN"
```

* **ADMIN:** sees all tasks
* **EMPLOYEE:** sees only assigned tasks

### Update task status (PATCH /tasks/:id/status)

```bash
curl -X PATCH http://localhost:3000/tasks/1/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "IN_PROGRESS"}'
```

* **EMPLOYEE:** can only update their own tasks
* **ADMIN:** can update any task