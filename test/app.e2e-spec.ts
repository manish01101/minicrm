import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('E2E Tests (Auth, Users, Customers)', () => {
  let app: INestApplication;
  let adminToken: string;
  let userId: number;
  let customerId: number;

  // Generate unique emails per test run
  const uniqueSuffix = Date.now();
  const adminEmail = `admin+${uniqueSuffix}@test.com`;
  const userEmail = `employee+${uniqueSuffix}@test.com`;
  const customerEmail = `customer+${uniqueSuffix}@test.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /** ----------------- Auth Module ----------------- */
  it('POST /auth/register - register new admin', async () => {
    const res = await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Admin User',
      email: adminEmail,
      password: 'password123',
      role: 'ADMIN', // enum value must match Prisma Role
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('POST /auth/login - login admin', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: adminEmail, password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
    adminToken = res.body.accessToken;
  });

  /** ----------------- Users Module ----------------- */
  it('POST /users - create employee user (admin)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Normal Employee',
        email: userEmail,
        password: 'password123',
        role: 'EMPLOYEE', // must match Prisma Role enum
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('GET /users - list users (admin)', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /users/:id - get user (admin)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('PATCH /users/:id - update user role (admin)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'ADMIN' }); // only role is updatable
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('role', 'ADMIN');
  });

  it('DELETE /users/:id - delete user (admin)', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });

  /** ----------------- Customers Module ----------------- */
  it('POST /customers - create customer (admin)', async () => {
    const res = await request(app.getHttpServer())
      .post('/customers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Acme Corp',
        email: customerEmail,
        phone: '1234567890',
        company: 'Acme',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    customerId = res.body.id;
  });

  it('GET /customers - list customers (admin)', async () => {
    const res = await request(app.getHttpServer())
      .get('/customers?page=1&limit=10')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });

  it('GET /customers/:id - get customer (admin)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', customerId);
  });

  it('PATCH /customers/:id - update customer (admin)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Updated Customer' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated Customer');
  });

  it('DELETE /customers/:id - delete customer (admin)', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
});
