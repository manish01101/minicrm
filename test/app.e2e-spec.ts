import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('E2E Tests (Auth, Users, Customers, Tasks)', () => {
  let app: INestApplication;

  let adminToken: string;
  let employeeToken: string;

  let employeeId: number;
  let customerId: number;
  let taskCustomerId: number;
  let taskId: number;

  const unique = Date.now();

  const adminEmail = `admin+${unique}@test.com`;
  const employeeEmail = `employee+${unique}@test.com`;
  const taskEmployeeEmail = `task-emp+${unique}@test.com`;
  const customerEmail = `customer+${unique}@test.com`;
  const taskCustomerEmail = `task-customer+${unique}@test.com`;

  const customerPhone = `8${unique}`.slice(0, 10);
  const taskCustomerPhone = `9${unique}`.slice(0, 10);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /* ================= AUTH ================= */

  it('POST /auth/register - ADMIN registers', async () => {
    const res = await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Admin',
      email: adminEmail,
      password: 'password123',
      role: 'ADMIN',
    });

    expect(res.status).toBe(201);
  });

  it('POST /auth/login - ADMIN login', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: adminEmail, password: 'password123' });

    expect(res.status).toBe(201);
    adminToken = res.body.accessToken;
  });

  /* ================= USERS ================= */

  it('POST /users - ADMIN creates EMPLOYEE', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Employee',
        email: employeeEmail,
        password: 'password123',
        role: 'EMPLOYEE',
      });

    expect(res.status).toBe(201);
    employeeId = res.body.id;
  });

  it('GET /users - ADMIN lists users', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /users/:id - ADMIN gets user', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${employeeId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(employeeId);
  });

  it('PATCH /users/:id - ADMIN updates user role', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/users/${employeeId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'ADMIN' });

    expect(res.status).toBe(200);
    expect(res.body.role).toBe('ADMIN');
  });

  /* ================= CUSTOMERS ================= */

  it('POST /customers - ADMIN creates customer', async () => {
    const res = await request(app.getHttpServer())
      .post('/customers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Acme Corp',
        email: customerEmail,
        phone: customerPhone,
        company: 'Acme',
      });

    expect(res.status).toBe(201);
    customerId = res.body.id;
  });

  it('GET /customers - ADMIN lists customers with pagination', async () => {
    const res = await request(app.getHttpServer())
      .get('/customers?page=1&limit=10')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('page');
    expect(res.body).toHaveProperty('limit');
    expect(res.body).toHaveProperty('totalRecords');
    expect(res.body).toHaveProperty('totalPages');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /customers/:id - ADMIN gets customer', async () => {
    const res = await request(app.getHttpServer())
      .get(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(customerId);
  });

  it('PATCH /customers/:id - ADMIN updates customer', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Updated Customer' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Customer');
  });

  /* ================= TASKS ================= */

  it('POST /users - create EMPLOYEE for tasks', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Task Employee',
        email: taskEmployeeEmail,
        password: 'password123',
        role: 'EMPLOYEE',
      });

    expect(res.status).toBe(201);
    employeeId = res.body.id;
  });

  it('POST /auth/login - EMPLOYEE login', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: taskEmployeeEmail, password: 'password123' });

    expect(res.status).toBe(201);
    employeeToken = res.body.accessToken;
  });

  it('POST /customers - create customer for task', async () => {
    const res = await request(app.getHttpServer())
      .post('/customers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Task Customer',
        email: taskCustomerEmail,
        phone: taskCustomerPhone,
      });

    expect(res.status).toBe(201);
    taskCustomerId = res.body.id;
  });

  it('POST /tasks - ADMIN creates task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Follow up',
        description: 'Call customer',
        assignedTo: employeeId,
        customerId: taskCustomerId,
      });

    expect(res.status).toBe(201);
    taskId = res.body.id;
  });

  it('GET /tasks - ADMIN sees all tasks', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.some((t: any) => t.id === taskId)).toBe(true);
  });

  it('GET /tasks - EMPLOYEE sees only own tasks', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${employeeToken}`);

    expect(res.status).toBe(200);
    expect(res.body.every((t: any) => t.assignedTo.id === employeeId)).toBe(
      true,
    );
  });

  it('PATCH /tasks/:id/status - EMPLOYEE updates own task', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}/status`)
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({ status: 'IN_PROGRESS' });

    expect(res.status).toBe(200);
  });

  it('PATCH /tasks/:id/status - ADMIN updates task', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'DONE' });

    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
